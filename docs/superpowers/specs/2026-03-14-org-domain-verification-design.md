# Organization Domain Verification Design

## Goal

Replace the current fragmented domain verification system (separate `school_domain` table + `company.orgDomain` column) with a unified `org_domain` model. Add org owner role for user management, enforce access control for unverified users, and provide admin domain management tools.

## Background

Currently, athletes auto-verify when their email domain matches a school domain, but there is no equivalent for companies. Company domain verification is a single `orgDomain` column with no multi-domain support. School employees have no org owner management capability.

## Architecture

**Unified `org_domain` table** replaces both `school_domain` and `company.orgDomain`. Each row links a verified domain to either a school or a company (mutually exclusive foreign keys). Domains are admin-managed only.

**Org owner** is a flag on the existing user record (`isOrgOwner: boolean`). Org owners can view, approve/deny, revoke, and whitelist employees on their org's domains. Athletes are unaffected -- they still join without approval.

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
- Drop `school_domain` table and `company.orgDomain` column after migration.

---

## 2. Org Owner Dashboard

### User model changes

Add `isOrgOwner: boolean` (default false) to the User entity. Admins or the system can set this flag.

### "Members" sidebar tab

A new "Members" entry in the sidebar for school and company users who have `isOrgOwner = true`. Routes to `/school/members` or `/company/members`.

### Dashboard sections

**Pending Approvals**: List of employees who registered with a matching domain but are not yet verified. Org owner can approve (sets `isVerified = true` in DB + Keycloak) or deny (deletes the user account or marks as denied).

**Current Members**: List of verified employees. Org owner can revoke verification (sets `isVerified = false`).

**Whitelisted Emails**: List of pre-approved email addresses. When a user registers with a whitelisted email, they auto-verify without needing org owner approval. Org owner can add/remove emails from this list.

### API endpoints

- `GET /org/members` -- returns pending, verified, and whitelisted lists
- `PUT /org/members/:userId/approve` -- approve pending employee
- `PUT /org/members/:userId/deny` -- deny pending employee
- `PUT /org/members/:userId/revoke` -- revoke verified employee
- `POST /org/whitelist` -- add email to whitelist
- `DELETE /org/whitelist/:email` -- remove email from whitelist

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

### Frontend enforcement

- Sidebar: conditionally render nav items based on `isVerified` (already partially done for companies and schools, needs extension).
- Route guards: redirect unverified users to a "pending verification" page.
- Athletes with no `schoolId` see a "select your school" prompt instead.

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

1. **Push notification** sent to org owner(s): "New employee registration: [name] ([email]) is awaiting approval."
2. **Activity feed entry** created for org owner(s), linking to the Members dashboard.

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
                |-- Yes --> Auto-verify, set schoolId
                |-- No  --> Is email whitelisted by org owner?
                              |-- Yes --> Auto-verify
                              |-- No  --> Stay unverified, notify org owner(s)
                                          Org owner approves/denies from Members dashboard
```
