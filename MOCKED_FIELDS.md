# Mocked Fields Documentation

This document lists all fields that are still using mocked/default values because they are not available from the backend API.

## CurrentStudents Component (`src/views/Schools/CurrentStudents`)

The CurrentStudents component now uses the `getAthletes()` API to fetch student-athlete data, filtered by the school's ID. 

### Fields Available from Backend (Working):
- `id`, `firstName`, `lastName`, `email`, `phone`
- `sport` (from `athletics.sport`)
- `position` (from `athletics.position`)
- `major` (from `academics.major`)
- `gpa` (from `academics.gpa`)
- `expectedGraduation` (from `academics.graduationDate`)
- `classYear` (calculated from `academics.graduationDate` by parsing the year and determining class standing)
- `location`

### Notes:
The following fields were removed from the display as they are not available from the backend:
- `preferredIndustry` - Removed from UI
- `internships` - Removed from UI
- `connections` - Removed from UI
- `status` - Removed from UI
- `offer` - Removed from UI

The component now displays a cleaner, simpler interface focusing on academic information that is actually available from the backend API.

---

## StaffDirectory Component (`src/views/Schools/StaffDirectory`)

The StaffDirectory component now uses the `getSchoolEmployees()` API to fetch staff data, filtered by the school's ID. However, the following fields from the `StaffMember` type are not available in the backend response:

### Missing Fields:

1. **`title`** (string)
   - **Current Mock Value:** `'Staff Member'`
   - **Expected Values:** 'Director of Career Services', 'Career Counselor', etc.
   - **Usage:** Primary job title displayed on staff cards
   - **Backend Field Needed:** Job title field

2. **`department`** (string)
   - **Current Mock Value:** `'-'`
   - **Expected Values:** 'Career Services', 'NIL Oversight', 'Academic Support', etc.
   - **Usage:** Used for filtering and organizing staff
   - **Backend Field Needed:** Department/division field

3. **`phone`** (string)
   - **Current Mock Value:** `'Not provided'`
   - **Expected Values:** Phone numbers in format '(555) 123-4567'
   - **Usage:** Contact information displayed on staff cards
   - **Backend Field Needed:** Phone number field

4. **`location`** (string)
   - **Current Mock Value:** `'Not provided'`
   - **Expected Values:** Office location like 'Student Services Building, Room 201'
   - **Usage:** Physical location displayed on staff cards
   - **Backend Field Needed:** Office/location field

5. **`yearsAtPortal`** (number)
   - **Current Mock Value:** `0`
   - **Expected Values:** Number of years employed
   - **Usage:** Displayed as tenure information
   - **Backend Field Needed:** Employment start date or years of service

6. **`teamsResponsibleFor`** (string[])
   - **Current Mock Value:** `[]` (empty array)
   - **Expected Values:** Array of sport team names like ['Basketball', 'Football']
   - **Usage:** Shows which sports/teams this staff member supports, used for filtering
   - **Backend Field Needed:** Teams/sports assignment array

7. **`specialties`** (string[])
   - **Current Mock Value:** `[]` (empty array)
   - **Expected Values:** Array like ['Career Counseling', 'Resume Development']
   - **Usage:** Displayed as tags showing staff expertise, used for search
   - **Backend Field Needed:** Skills/specialties array

8. **`availability`** (string)
   - **Current Mock Value:** `'Available'`
   - **Expected Values:** 'Available' or 'Limited'
   - **Usage:** Displayed as colored badge showing current availability
   - **Backend Field Needed:** Availability status field

9. **`bio`** (string)
   - **Current Mock Value:** `''` (empty string)
   - **Expected Values:** Biography text describing the staff member
   - **Usage:** Displayed in staff card as description
   - **Backend Field Needed:** Biography/description text field

### Fields Available from Backend (Working):
- `id`, `firstName`, `lastName`, `email`
- `schoolRef` (school reference object)

---

## SchoolDashboard Component (`src/views/Schools/SchoolDashboard`)

The SchoolDashboard component now uses two API endpoints:
- `getSchoolDashboardMetrics()` - for metrics data
- `getSchoolActivity()` - for recent activity feed

### Dashboard Metrics - All Working with Real API

The following metrics are now fetched from the backend via `getSchoolDashboardMetrics()`:

1. **Placed Graduates** - `placedGraduates` and `placedGraduatesChange`
2. **NIL Compliance Rate** - `nilComplianceRate` and `nilComplianceRateChange`
3. **Active Sponsors** - `activeSponsors` and `activeSponsorsChange`
4. **Community Members** - `communityMembers` and `communityMembersChange`

All metrics display with their change values and direction (up/down).

### Recent Activity - Working with Real API

The activity feed now uses `getSchoolActivity()` which returns:
- `id` - Activity ID
- `title` - Activity description
- `timestamp` - Time information
- `type` - Activity type ('approved', 'info', 'compliance', 'partnership')

### Quick Actions - No API Needed

Quick actions are UI-only buttons that trigger client-side actions:
- Add New Student
- Review NIL Deal
- Generate Report
- Schedule Meeting

These don't require backend data as they are action triggers.

---

## StaffDirectory Statistics - Still Mocked

The statistics overview in the StaffDirectory component uses `MOCK_STATS` constant:

### Missing Statistics Fields:

1. **`totalStaff`** (number)
   - **Current Mock Value:** `47`
   - **Usage:** Displayed in statistics overview
   - **Backend Needed:** Count of staff members or aggregate endpoint

2. **`totalStaffChange`** (number)
   - **Current Mock Value:** `3`
   - **Usage:** Shows change from previous period
   - **Backend Needed:** Period-over-period comparison

3. **`departments`** (number)
   - **Current Mock Value:** `8`
   - **Usage:** Number of distinct departments
   - **Backend Needed:** Department count or aggregate

4. **`departmentsChange`** (number)
   - **Current Mock Value:** `1`
   - **Usage:** Shows change from previous period
   - **Backend Needed:** Period-over-period comparison

5. **`sportsCovered`** (number)
   - **Current Mock Value:** `12`
   - **Usage:** Number of sports covered by staff
   - **Backend Needed:** Sports count or aggregate

6. **`sportsCoveredChange`** (number)
   - **Current Mock Value:** `0`
   - **Usage:** Shows change from previous period
   - **Backend Needed:** Period-over-period comparison

7. **`studentAthletes`** (number)
   - **Current Mock Value:** `340`
   - **Usage:** Total number of student-athletes served
   - **Backend Needed:** Athlete count for school

8. **`studentAthletesChange`** (number)
   - **Current Mock Value:** `25`
   - **Usage:** Shows change from previous period
   - **Backend Needed:** Period-over-period comparison

### Recommendation:
Consider creating a `getSchoolEmployeeStats()` API endpoint that returns all these statistics in one call.

---

## Summary

### APIs Successfully Integrated:
✅ `getAthletes()` with `schoolId` filter - for CurrentStudents
✅ `getSchoolEmployees()` with `schoolId` filter - for StaffDirectory
✅ `getSchoolDashboardMetrics()` - for SchoolDashboard metrics
✅ `getSchoolActivity()` - for SchoolDashboard activity feed

### Backend Development Needed:

**Priority 1 (High Impact):**
- Student athlete career fields: `classYear`, `status`, `preferredIndustry`
- Staff member core info: `title`, `department`, `phone`, `location`

**Priority 2 (Medium Impact):**
- Student athlete extended: `internships`, `connections`, `offer`
- Staff member extended: `yearsAtPortal`, `availability`, `bio`
- Staff member assignments: `teamsResponsibleFor`, `specialties`

**Priority 3 (Analytics):**
- Staff directory statistics endpoint
- Period-over-period change tracking for all metrics

### Files Modified:
1. `src/api/athlete.ts` - Added `schoolId` filter
2. `src/api/schoolEmployee.ts` - Added `getSchoolEmployees()` function
3. `src/api/school.ts` - Added `getSchoolDashboardMetrics()` and `getSchoolActivity()`
4. `src/views/Schools/CurrentStudents/index.tsx` - Replaced mocks with API
5. `src/views/Schools/StaffDirectory/index.tsx` - Replaced mocks with API
6. `src/views/Schools/SchoolDashboard.tsx` - Replaced mocks with API
