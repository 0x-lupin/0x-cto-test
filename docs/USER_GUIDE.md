# User Guide - Enterprise Management System

## Table of Contents

1. [Getting Started](#getting-started)
2. [User Roles](#user-roles)
3. [Dashboard](#dashboard)
4. [Employee Management](#employee-management)
5. [Attendance System](#attendance-system)
6. [Leave Management](#leave-management)
7. [Payroll System](#payroll-system)
8. [Ticketing System](#ticketing-system)
9. [Budget Management](#budget-management)
10. [Content Management](#content-management)

## Getting Started

### First Login

1. **Access the Application**
   - Open your web browser
   - Navigate to the application URL
   - You'll see the login page

2. **Login Credentials**
   - Enter your email address
   - Enter your password
   - Click "Sign in"

3. **Default Demo Accounts** (for testing):
   - Admin: `admin@company.com` / `admin123`
   - HR Manager: `hr@company.com` / `admin123`
   - Manager: `manager@company.com` / `admin123`
   - Employee: `employee@company.com` / `admin123`

### Navigation

The system uses a sidebar navigation menu with the following sections:
- Dashboard (Home)
- Employees
- Attendance
- Leaves
- Payroll
- Tickets
- Budget
- Content

## User Roles

### Admin
**Full system access including:**
- Manage all users and employees
- View and edit all data
- Approve/reject requests
- Manage budgets and payroll
- System configuration

### HR Manager
**Human resources operations:**
- Manage employee records
- Process payroll
- Approve leave requests
- View attendance records
- Manage budgets
- Create and publish content

### Manager
**Team management capabilities:**
- View team members
- Approve leave requests
- View team attendance
- Create tickets
- Create content

### Employee
**Self-service access:**
- View own profile
- Check-in/check-out
- Request leaves
- Create tickets
- View own payroll
- View published content

## Dashboard

### Overview

The dashboard provides a comprehensive view of key metrics:

**Statistics Cards:**
- Total Employees
- Open Tickets
- Budget Spent
- Today's Attendance

**Charts and Graphs:**
- Employees by Department (Pie Chart)
- Ticket Status (Bar Chart)
- Attendance Trends (Line Chart)

**How to Use:**
1. Dashboard loads automatically after login
2. Cards show real-time statistics
3. Click on charts for detailed views
4. Hover over data points for specific values

## Employee Management

### Viewing Employees

1. Click "Employees" in the sidebar
2. View complete list of employees
3. See employee details:
   - Employee Code
   - Name
   - Department
   - Designation
   - Base Salary

### Search and Filter

- Use the search box to find employees by name or code
- Filter by department using dropdown
- Results update automatically

### Adding New Employee

**Admin/HR Manager only:**

1. Click "Add Employee" button
2. Fill in required information:
   - Personal Details (Name, DOB, Contact)
   - Employment Details (Code, Department, Designation)
   - Financial Details (Base Salary, Bank Account)
   - Manager Assignment
3. Click "Submit"
4. Employee record is created

### Editing Employee

1. Find the employee in the list
2. Click "Edit" button
3. Update necessary fields
4. Click "Save Changes"

### Employee Profile

View detailed employee information:
- Personal Information
- Employment History
- Reporting Structure
- Current Status

## Attendance System

### For Employees

**Daily Check-in:**
1. Navigate to Attendance page
2. Click "Check In" button
3. System records current time
4. Confirmation message appears

**Daily Check-out:**
1. Return to Attendance page
2. Click "Check Out" button
3. System records departure time

**View Own Attendance:**
- See your attendance history
- Check-in and check-out times
- Attendance status (Present, Late, etc.)

### For Managers/HR

**View Team Attendance:**
1. Navigate to Attendance page
2. View all employee attendance
3. Filter by:
   - Employee
   - Date range
   - Status

**Update Attendance:**
1. Find attendance record
2. Click "Edit" or status badge
3. Update status
4. Add notes if needed
5. Save changes

**Attendance Statuses:**
- **Present**: On time
- **Late**: Arrived after scheduled time
- **Absent**: Did not attend
- **Half Day**: Partial day attendance
- **Leave**: Approved leave

## Leave Management

### Requesting Leave

**For All Users:**

1. Navigate to Leaves page
2. Click "Request Leave"
3. Fill in leave details:
   - Leave Type (Annual, Sick, Personal, etc.)
   - Start Date
   - End Date
   - Reason
4. Submit request
5. Wait for approval

### Managing Leave Requests

**For Managers/HR:**

1. View pending leave requests
2. Review leave details:
   - Employee information
   - Leave duration
   - Reason
3. Take action:
   - Approve: Click "Approve"
   - Reject: Click "Reject" and provide reason
4. Employee receives notification

### Leave Status

- **Pending**: Awaiting approval
- **Approved**: Leave granted
- **Rejected**: Leave denied

### Leave Balance

View your available leave balance:
- Annual Leave
- Sick Leave
- Personal Leave
- Leave taken
- Leave remaining

## Payroll System

### For Employees

**View Payslips:**
1. Navigate to Payroll page
2. View monthly payroll records
3. See breakdown:
   - Base Salary
   - Allowances
   - Deductions
   - Tax
   - Net Salary
4. Download payslip (if available)

### For HR/Admin

**Generate Payroll:**
1. Navigate to Payroll page
2. Click "Generate Payroll"
3. Select:
   - Month
   - Year
   - Employee (or bulk generate)
4. System calculates:
   - Base salary from employee record
   - Adds allowances
   - Subtracts deductions and tax
   - Calculates net salary
5. Review and submit

**Process Payments:**
1. Find payroll record
2. Mark as paid
3. Enter payment date
4. Save changes

**Payroll Reports:**
- Monthly payroll summary
- Department-wise breakdown
- Year-to-date totals
- Tax reports

## Ticketing System

### Creating a Ticket

**For All Users:**

1. Navigate to Tickets page
2. Click "Create Ticket"
3. Enter details:
   - Title: Brief description
   - Category: Type of issue
   - Priority: Low, Medium, High, Urgent
   - Description: Full details
   - Assign to: Select user (if known)
4. Submit ticket

**Ticket Categories:**
- Technical Support
- HR Query
- Facility Issue
- Equipment Request
- Other

### Managing Tickets

**View Tickets:**
- Filter by status, priority, category
- Search by title or description
- View assigned tickets
- View created tickets

**Update Ticket:**
1. Open ticket details
2. Update status:
   - Open → In Progress
   - In Progress → Resolved
   - Resolved → Closed
3. Add comments/notes
4. Reassign if needed
5. Save changes

**Ticket Workflow:**
```
Open → In Progress → Resolved → Closed
```

### Ticket Notifications

- Email notifications on status change
- Dashboard alerts for assigned tickets
- Reminders for pending tickets

## Budget Management

### For HR/Admin

**Create Budget:**
1. Navigate to Budget page
2. Click "Create Budget"
3. Enter details:
   - Department
   - Category
   - Allocated Amount
   - Year
   - Quarter (Q1-Q4)
   - Description
4. Submit

**Track Spending:**
1. View budget list
2. Update spent amount
3. System calculates:
   - Remaining budget
   - Utilization percentage
4. Visual indicators show status

**Budget Categories:**
- Software Licenses
- Hardware
- Training & Development
- Travel & Entertainment
- Office Supplies
- Marketing
- Miscellaneous

**Budget Reports:**
- Department-wise utilization
- Quarterly spending trends
- Budget vs. Actual comparison
- Variance analysis

### Budget Alerts

- Warning when 80% utilized
- Alert when 100% reached
- Monthly spending reports

## Content Management

### For Managers/HR/Admin

**Create Content:**
1. Navigate to Content page
2. Click "Create Content"
3. Enter information:
   - Title
   - Slug (URL-friendly identifier)
   - Content (main text)
   - Excerpt (summary)
   - Publishing status
4. Save as draft or publish

**Content Types:**
- Company Announcements
- Policy Documents
- News & Updates
- Training Materials
- Knowledge Base Articles

**Editing Content:**
1. Find content in list
2. Click "Edit"
3. Make changes
4. Update publishing status
5. Save changes

**Publishing Workflow:**
```
Draft → Review → Published
```

### For All Users

**View Content:**
1. Navigate to Content page
2. Browse published content
3. Click on item to read full content
4. Content displays:
   - Title
   - Author
   - Publication date
   - Full content

## Mobile Access

### Responsive Design

The system is fully mobile-responsive:
- Works on phones and tablets
- Touch-friendly interface
- Optimized navigation
- Readable text and charts

### Mobile Features

**Quick Actions:**
- Check-in/Check-out
- View dashboard
- Create tickets
- Request leaves
- View notifications

**Best Practices:**
- Use mobile browser
- Bookmark for easy access
- Enable notifications
- Use landscape mode for charts

## Tips and Best Practices

### Security

- Change default password on first login
- Use strong passwords
- Log out when finished
- Don't share credentials
- Report suspicious activity

### Data Entry

- Fill all required fields
- Use consistent formats
- Double-check before submitting
- Save drafts regularly
- Keep records updated

### Communication

- Use clear, descriptive ticket titles
- Provide detailed descriptions
- Respond to notifications promptly
- Check dashboard regularly
- Update status when tasks complete

### Efficiency

- Use keyboard shortcuts (if available)
- Bookmark frequently used pages
- Set up filters for quick access
- Review reports regularly
- Archive old records

## Troubleshooting

### Common Issues

**Can't Login:**
- Verify email and password
- Check caps lock
- Reset password if needed
- Contact admin

**Page Not Loading:**
- Refresh browser
- Clear cache
- Check internet connection
- Try different browser

**Data Not Saving:**
- Check all required fields
- Verify permissions
- Check network connection
- Contact support

**Charts Not Displaying:**
- Update browser
- Enable JavaScript
- Check compatibility
- Try different device

## Support

### Getting Help

1. **Check Documentation**
   - User Guide
   - FAQ section
   - Video tutorials

2. **Contact Support**
   - Create support ticket
   - Email: support@company.com
   - Phone: (if available)

3. **Report Issues**
   - Use ticketing system
   - Provide details:
     - What happened
     - Steps to reproduce
     - Screenshots
     - Browser/device info

## Glossary

- **Check-in/Check-out**: Record arrival and departure
- **Leave Balance**: Available leave days
- **Payslip**: Monthly salary statement
- **Net Salary**: Take-home pay after deductions
- **Budget Utilization**: Percentage of budget used
- **Ticket**: Support request or issue report
- **Content**: Published information or documents

---

**For additional help, contact your system administrator or HR department.**
