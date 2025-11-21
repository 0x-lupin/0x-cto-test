# API Reference Guide

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.your-domain.com/api
```

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## Common Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Authentication Endpoints

### Register User

Creates a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "EMPLOYEE"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "EMPLOYEE"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

Authenticates a user and returns a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "EMPLOYEE",
    "employee": {
      "id": "uuid",
      "employeeCode": "EMP001",
      "department": "Engineering"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Profile

Retrieves the current authenticated user's profile.

**Endpoint:** `GET /auth/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "EMPLOYEE",
  "employee": {
    "employeeCode": "EMP001",
    "department": "Engineering"
  }
}
```

---

## Employee Endpoints

### List All Employees

**Endpoint:** `GET /employees`

**Query Parameters:**
- `department` (optional): Filter by department
- `search` (optional): Search by name or employee code

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "employeeCode": "EMP001",
    "department": "Engineering",
    "designation": "Software Engineer",
    "baseSalary": 60000,
    "user": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    }
  }
]
```

### Get Employee by ID

**Endpoint:** `GET /employees/:id`

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "employeeCode": "EMP001",
  "department": "Engineering",
  "designation": "Software Engineer",
  "dateOfJoining": "2024-01-15T00:00:00Z",
  "dateOfBirth": "1995-05-20T00:00:00Z",
  "phone": "+1234567890",
  "address": "123 Main St",
  "emergencyContact": "+1987654321",
  "baseSalary": 60000,
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "manager": {
    "user": {
      "firstName": "Jane",
      "lastName": "Smith"
    }
  }
}
```

### Create Employee

**Endpoint:** `POST /employees`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Request Body:**
```json
{
  "userId": "user-uuid",
  "employeeCode": "EMP002",
  "department": "Marketing",
  "designation": "Marketing Manager",
  "dateOfJoining": "2024-02-01",
  "dateOfBirth": "1990-08-15",
  "phone": "+1234567890",
  "address": "456 Oak Ave",
  "emergencyContact": "+1987654321",
  "bankAccount": "BANK123456",
  "baseSalary": 70000,
  "managerId": "manager-uuid"
}
```

**Response:** `201 Created`

### Update Employee

**Endpoint:** `PUT /employees/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Request Body:** (partial updates allowed)
```json
{
  "designation": "Senior Software Engineer",
  "baseSalary": 75000
}
```

**Response:** `200 OK`

### Delete Employee

**Endpoint:** `DELETE /employees/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Response:** `200 OK`
```json
{
  "message": "Employee deleted successfully"
}
```

---

## Attendance Endpoints

### Check In

Records employee check-in for the day.

**Endpoint:** `POST /attendance/check-in`

**Request Body:**
```json
{
  "employeeId": "employee-uuid"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "employeeId": "employee-uuid",
  "date": "2024-01-15T00:00:00Z",
  "checkIn": "2024-01-15T09:00:00Z",
  "status": "PRESENT"
}
```

### Check Out

Records employee check-out for the day.

**Endpoint:** `POST /attendance/check-out`

**Request Body:**
```json
{
  "employeeId": "employee-uuid"
}
```

**Response:** `200 OK`

### Get Attendance Records

**Endpoint:** `GET /attendance`

**Query Parameters:**
- `employeeId` (optional): Filter by employee
- `startDate` (optional): Start date (YYYY-MM-DD)
- `endDate` (optional): End date (YYYY-MM-DD)

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "date": "2024-01-15T00:00:00Z",
    "checkIn": "2024-01-15T09:00:00Z",
    "checkOut": "2024-01-15T18:00:00Z",
    "status": "PRESENT",
    "employee": {
      "employeeCode": "EMP001",
      "user": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  }
]
```

### Update Attendance

**Endpoint:** `PUT /attendance/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`, `MANAGER`

**Request Body:**
```json
{
  "status": "LATE",
  "notes": "Arrived late due to traffic"
}
```

**Response:** `200 OK`

---

## Leave Endpoints

### Create Leave Request

**Endpoint:** `POST /leaves`

**Request Body:**
```json
{
  "employeeId": "employee-uuid",
  "leaveType": "Annual Leave",
  "startDate": "2024-03-01",
  "endDate": "2024-03-05",
  "reason": "Family vacation"
}
```

**Response:** `201 Created`

### Get Leave Requests

**Endpoint:** `GET /leaves`

**Query Parameters:**
- `employeeId` (optional): Filter by employee
- `status` (optional): Filter by status (PENDING, APPROVED, REJECTED)

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "leaveType": "Annual Leave",
    "startDate": "2024-03-01T00:00:00Z",
    "endDate": "2024-03-05T00:00:00Z",
    "reason": "Family vacation",
    "status": "PENDING",
    "employee": {
      "user": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  }
]
```

### Update Leave Status

**Endpoint:** `PUT /leaves/:id/status`

**Authorization:** `ADMIN`, `HR_MANAGER`, `MANAGER`

**Request Body:**
```json
{
  "status": "APPROVED"
}
```

**Response:** `200 OK`

---

## Payroll Endpoints

### Create Payroll

**Endpoint:** `POST /payroll`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Request Body:**
```json
{
  "employeeId": "employee-uuid",
  "month": 1,
  "year": 2024,
  "allowances": 5000,
  "deductions": 2000,
  "tax": 8000
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "employeeId": "employee-uuid",
  "month": 1,
  "year": 2024,
  "baseSalary": 60000,
  "allowances": 5000,
  "deductions": 2000,
  "tax": 8000,
  "netSalary": 55000,
  "isPaid": false
}
```

### Get Payroll Records

**Endpoint:** `GET /payroll`

**Query Parameters:**
- `employeeId` (optional): Filter by employee
- `year` (optional): Filter by year
- `month` (optional): Filter by month

**Response:** `200 OK`

### Update Payroll

**Endpoint:** `PUT /payroll/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Request Body:**
```json
{
  "isPaid": true,
  "paymentDate": "2024-01-31"
}
```

**Response:** `200 OK`

### Delete Payroll

**Endpoint:** `DELETE /payroll/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Response:** `200 OK`

---

## Ticket Endpoints

### Create Ticket

**Endpoint:** `POST /tickets`

**Request Body:**
```json
{
  "title": "Login Issue",
  "description": "Unable to login to the system",
  "priority": "HIGH",
  "category": "Technical Support",
  "assignedToId": "user-uuid"
}
```

**Response:** `201 Created`

### Get Tickets

**Endpoint:** `GET /tickets`

**Query Parameters:**
- `status` (optional): OPEN, IN_PROGRESS, RESOLVED, CLOSED
- `priority` (optional): LOW, MEDIUM, HIGH, URGENT
- `category` (optional): Ticket category
- `assignedToId` (optional): Filter by assigned user
- `createdById` (optional): Filter by creator

**Response:** `200 OK`

### Get Ticket by ID

**Endpoint:** `GET /tickets/:id`

**Response:** `200 OK`

### Update Ticket

**Endpoint:** `PUT /tickets/:id`

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "assignedToId": "user-uuid"
}
```

**Response:** `200 OK`

### Delete Ticket

**Endpoint:** `DELETE /tickets/:id`

**Response:** `200 OK`

---

## Budget Endpoints

### Create Budget

**Endpoint:** `POST /budgets`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Request Body:**
```json
{
  "department": "Engineering",
  "category": "Software Licenses",
  "allocated": 50000,
  "year": 2024,
  "quarter": 1,
  "description": "Annual software licenses"
}
```

**Response:** `201 Created`

### Get Budgets

**Endpoint:** `GET /budgets`

**Query Parameters:**
- `department` (optional): Filter by department
- `year` (optional): Filter by year
- `quarter` (optional): Filter by quarter (1-4)

**Response:** `200 OK`

### Update Budget

**Endpoint:** `PUT /budgets/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Request Body:**
```json
{
  "spent": 15000
}
```

**Response:** `200 OK`

### Delete Budget

**Endpoint:** `DELETE /budgets/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Response:** `200 OK`

---

## Content Endpoints

### Create Content

**Endpoint:** `POST /contents`

**Authorization:** `ADMIN`, `HR_MANAGER`, `MANAGER`

**Request Body:**
```json
{
  "title": "Company Policy Update",
  "slug": "company-policy-update-2024",
  "content": "Full content here...",
  "excerpt": "Brief summary",
  "isPublished": true
}
```

**Response:** `201 Created`

### Get All Content

**Endpoint:** `GET /contents`

**Query Parameters:**
- `isPublished` (optional): true/false
- `authorId` (optional): Filter by author

**Response:** `200 OK`

### Get Content by Slug

**Endpoint:** `GET /contents/:slug`

**Response:** `200 OK`

### Update Content

**Endpoint:** `PUT /contents/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`, `MANAGER`

**Request Body:**
```json
{
  "isPublished": true,
  "content": "Updated content..."
}
```

**Response:** `200 OK`

### Delete Content

**Endpoint:** `DELETE /contents/:id`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Response:** `200 OK`

---

## Analytics Endpoints

### Get Dashboard Statistics

**Endpoint:** `GET /analytics/dashboard`

**Response:** `200 OK`
```json
{
  "employees": {
    "total": 50,
    "active": 48
  },
  "tickets": {
    "total": 120,
    "open": 15
  },
  "budget": {
    "allocated": 500000,
    "spent": 320000
  },
  "leaves": {
    "pending": 5
  },
  "attendance": {
    "today": 45
  }
}
```

### Get Employees by Department

**Endpoint:** `GET /analytics/employees/department`

**Response:** `200 OK`
```json
[
  {
    "department": "Engineering",
    "count": 25
  },
  {
    "department": "Marketing",
    "count": 15
  }
]
```

### Get Attendance Trends

**Endpoint:** `GET /analytics/attendance/trends`

**Query Parameters:**
- `days` (optional): Number of days (default: 7)

**Response:** `200 OK`
```json
[
  {
    "date": "2024-01-15",
    "PRESENT": 45,
    "ABSENT": 2,
    "LATE": 3,
    "HALF_DAY": 0,
    "LEAVE": 0
  }
]
```

### Get Ticket Statistics

**Endpoint:** `GET /analytics/tickets/stats`

**Response:** `200 OK`
```json
{
  "byStatus": [
    { "status": "OPEN", "count": 15 },
    { "status": "IN_PROGRESS", "count": 25 },
    { "status": "RESOLVED", "count": 60 },
    { "status": "CLOSED", "count": 20 }
  ],
  "byPriority": [
    { "priority": "LOW", "count": 30 },
    { "priority": "MEDIUM", "count": 50 },
    { "priority": "HIGH", "count": 30 },
    { "priority": "URGENT", "count": 10 }
  ]
}
```

### Get Payroll Trends

**Endpoint:** `GET /analytics/payroll/trends`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Query Parameters:**
- `months` (optional): Number of months (default: 6)

**Response:** `200 OK`
```json
[
  {
    "period": "2024-01",
    "totalPayroll": 500000,
    "employeeCount": 50
  }
]
```

### Get Budget Utilization

**Endpoint:** `GET /analytics/budget/utilization`

**Authorization:** `ADMIN`, `HR_MANAGER`

**Response:** `200 OK`
```json
[
  {
    "department": "Engineering",
    "allocated": 200000,
    "spent": 150000,
    "remaining": 50000,
    "utilization": 75.0
  }
]
```

### Track Custom Analytics

**Endpoint:** `POST /analytics/track`

**Request Body:**
```json
{
  "metric": "user_login",
  "value": 1,
  "metadata": {
    "userId": "uuid",
    "timestamp": "2024-01-15T10:00:00Z"
  }
}
```

**Response:** `201 Created`

---

## Error Responses

### Validation Error

```json
{
  "error": "Validation error",
  "details": {
    "field": "email",
    "message": "Invalid email format"
  }
}
```

### Unauthorized

```json
{
  "error": "Authentication required"
}
```

### Forbidden

```json
{
  "error": "Insufficient permissions"
}
```

### Not Found

```json
{
  "error": "Resource not found"
}
```

### Conflict

```json
{
  "error": "A record with this value already exists"
}
```

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

## Pagination

Not currently implemented. For future implementation:

```
GET /employees?page=1&limit=20
```

Response:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```
