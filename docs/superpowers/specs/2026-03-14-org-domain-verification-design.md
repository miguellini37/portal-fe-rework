# Organization Domain Verification Design

## Goal

Replace the current fragmented domain verification system (separate `school_domain` table + `company.orgDomain` column) with a unified `org_domain` model. Add org owner role for user management, enforce access control for unverified users, and provide admin domain management tools.

## Background

Currently, athletes auto-verify when their email domain matches a school domain, but there is no equivalent for companies. Company domain verification is a single `orgDomain` column with no multi-domain support. School employees have no org owner management capability.

## Architecture

**Unified `org_domain` table** replaces both `school_domain` and `company.orgDomain`. Each row links a verified domain to either a school or a company (mutually exclusive foreign keys). Domains are admin-managed only.

**Org owner** is determined by the existing `ownerId` field on School and Company entities. No new `isOrgOwner` flag is needed -- a user is an org owner if `school.ownerId === user.id` or `company.ownerId === user.id`. The existing `OrgOwnerGuard` already implements this check. Each org has exactly one owner (single `ownerId`).

**Access control** restricts unverified users from seeing sensitive data (applications, talent pool, jobs, messages, NIL opportunities). Verification gates are enforced in both frontend (sidebar/route guards) and backend (API middleware).

---

## 1. Data Model: `org_domain` Table

### Schema

```sql
CREATE TABLE org_domain (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain VARCHAR(255) NOT NULL,
  school_id UUID REFERENCES school(id) ON DELETE CASCADE,
  company_id UUID REFERENCES company(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT chk_org_type CHECK (
    (school_id IS NOT NULL AND company_id IS NULL) OR
    (school_id IS NULL AND company_id IS NOT NULL)
  ),
  UNIQUE(domain)
);
```

### Key decisions

- Domain is globally unique (no domain can belong to two orgs).
- Companies support multiple domains (multiple rows with same `company_id`).
- Schools support multiple domains (multiple rows with same `school_id`).
- Only admins can add/remove domains.

### Migration

- Copy existing `school_domain` rows into `org_domain` with `school_id` set.
- Copy existing `company.orgDomain` values into `org_domain` with `company_id` set.
- **Conflict resolution**: If the same domain string exists in both `school_domain` and `company.orgDomain`, the migration fails with an error listing the conflicting domains. Admin must resolve manually before re-running (e.g., remove one of the duplicates). In practice this is unlikely since schools and companies use different email domains.
- Drop `school_domain` table and `company.orgDomain` column after migration succeeds.

---

## 2. Org Owner Dashboard

### Org owner identity

Org ownership is determined by the existing `ownerId` field on School and Company entities. The existing `OrgOwnerGuard` checks `school.ownerId === jwt.sub` or `company.ownerId === jwt.sub`. No new user flag is needed.

Each org has exactly one owner. To transfer ownership, the admin changes `ownerId` on the org.

### Frontend: `isOrgOwner` JWT claim

Add `isOrgOwner: boolean` as a Keycloak JWT claim. This is computed during token generation by checking if the user's ID matches any `school.ownerId` or `company.ownerId`. The frontend reads this from `IUserData` to conditionally show the "Members" sidebar tab. The backend uses the existing `OrgOwnerGuard` (not the JWT claim) for authorization.

### "Members" sidebar tab

A new "Members" entry in the sidebar for school and company users who have `isOrgOwner = true` in their JWT. Routes to `/school/members` or `/company/members`.

### Dashboard sections

**Pending Approvals**: List of employees who registered with a matching domain but are not yet verified. Org owner can approve (sets `isVerified = true` in DB + Keycloak) or deny (sets `status = 'denied'` on user record -- user account is preserved but cannot access org features; they can re-register with a different org if desired).

**Current Members**: List of verified employees. Org owner can revoke verification (sets `isVerified = false` in DB + Keycloak).

**Whitelisted Emails**: Reuses the existing `EmailWhitelist` entity (fields: `id`, `orgId`, `email`, `isActive`, `createdAt`, `updatedAt`). `orgId` references either a `schoolId` or `companyId`. Org owner can add/remove emails. When a user registers with a whitelisted email, they auto-verify without needing org owner approval.

### Keycloak sync mechanism

Approve/deny/revoke actions update both the database and Keycloak attributes via the existing `keycloakService.updateUserAttributes()` method. This is a direct Keycloak Admin API call (already used in the codebase). Both updates happen in a single request handler -- if the Keycloak call fails, the DB transaction rolls back.

### API endpoints

- `GET /org/members` -- returns pending, verified, and whitelisted lists. Org is inferred from the caller's JWT: if the user has a `companyId`, returns members for that company's domains; if `schoolId`, returns members for that school's domains. Protected by `OrgOwnerGuard`.
- `PUT /org/members/:userId/approve` -- approve pending employee
- `PUT /org/members/:userId/deny` -- deny pending employee (sets `status = 'denied'`)
- `PUT /org/members/:userId/revoke` -- revoke verified employee
- `POST /org/whitelist` -- add email to `EmailWhitelist` table
- `DELETE /org/whitelist/:email` -- soft-delete (set `isActive = false`) from `EmailWhitelist`

---

## 3. Access Control for Unverified Users

### What unverified users cannot see

| Feature | Athlete | Company Employee | School Employee |
|---------|---------|-----------------|-----------------|
| Jobs / Internships | Hidden | Hidden | Hidden |
| NIL Opportunities | Hidden | Hidden | Hidden |
| Applications | Hidden | Hidden | Hidden |
| Talent Pool | N/A | Hidden | N/A |
| Messages | Disabled | Disabled | Disabled |
| Interviews | Hidden | Hidden | Hidden |

Talent Pool is only accessible to company users (schools and athletes do not use it).

### Frontend enforcement

- Sidebar: conditionally render nav items based on `isVerified` (already partially done for companies and schools, needs extension to athletes).
- Route guards: redirect unverified users to a verification status page showing:
  - "Your account is pending verification by your organization." (for employees awaiting approval)
  - "Your account has been denied. Contact your organization administrator." (for denied employees)
  - Athletes with no `schoolId` see a "select your school" prompt instead (separate from verification).

### Backend enforcement

- Middleware on sensitive API routes checks `isVerified` from JWT claims.
- Returns 403 with message explaining verification is required.

---

## 4. Admin Domain Management

### Existing admin pages

`AdminSchools` and `AdminCompanies` pages already exist. Domain management is added as a section within these pages.

### School domain management

On the AdminSchools page, each school's detail/edit view gets a "Domains" section:
- List current domains for that school
- Add new domain (text input + add button)
- Remove domain (delete button with confirmation)

### Company domain management

Same pattern on AdminCompanies page.

### API endpoints

- `GET /admin/org-domains?schoolId=X` or `?companyId=X` -- list domains for an org
- `POST /admin/org-domains` -- add domain `{ domain, schoolId?, companyId? }`
- `DELETE /admin/org-domains/:id` -- remove domain

### Validation

- Domain format validation (e.g., `example.com`, no protocol prefix)
- Uniqueness check (domain not already claimed by another org)
- At least one of `schoolId` or `companyId` must be provided

---

## 5. Notifications

### When a new employee registers with a matching domain

1. **Push notification** sent to org owner: "New employee registration: [name] ([email]) is awaiting approval."
2. **Activity feed entry** created for org owner, linking to the Members dashboard.

### Implementation

- Uses existing notification infrastructure (activity table + push notification service).
- Triggered in the registration/profile-completion flow when domain match is detected and user is not whitelisted.
- If whitelisted, no notification is sent (auto-verified silently).

---

## Verification Flow Summary

```
User registers with email@example.com
  |
  v
Domain "example.com" exists in org_domain?
  |-- No  --> User stays unverified, no org association
  |-- Yes --> Is user an athlete?
  |             |-- Yes --> Auto-verify, set schoolId to the school
  |             |           that owns the matching domain
  |             |-- No  --> Is email in EmailWhitelist for this org?
  |                           |-- Yes --> Auto-verify, set companyId/schoolId
  |                           |-- No  --> Stay unverified, set companyId/schoolId,
  |                                       notify org owner
  |                                       Org owner approves/denies from Members dashboard
```

**Athlete school assignment**: When an athlete registers with a domain matching a school, the system auto-assigns `schoolId` to that school. The athlete does not manually select their school in this case. If no domain match exists, the athlete must select their school manually from a list.
