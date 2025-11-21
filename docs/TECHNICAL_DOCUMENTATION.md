# Technical Documentation - Enterprise Management System

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Backend Architecture](#backend-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Database Design](#database-design)
5. [API Documentation](#api-documentation)
6. [Authentication & Authorization](#authentication--authorization)
7. [Deployment Guide](#deployment-guide)
8. [Development Guidelines](#development-guidelines)

## Architecture Overview

### System Architecture

The Enterprise Management System follows a modern three-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (React SPA - Mobile Responsive with Tailwind CSS)          │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS/REST
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│    (Node.js + Express.js + TypeScript Backend API)          │
│  - Authentication & Authorization (JWT)                      │
│  - Business Logic                                            │
│  - Data Validation                                           │
└─────────────────────────────────────────────────────────────┘
                            ↕ Prisma ORM
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│              (PostgreSQL 15 Database)                        │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Backend
- **Runtime**: Node.js 20.x LTS
- **Framework**: Express.js 4.18
- **Language**: TypeScript 5.3
- **Database**: PostgreSQL 15
- **ORM**: Prisma 5.7
- **Authentication**: JWT (jsonwebtoken 9.0)
- **Password Security**: bcryptjs 2.4
- **Logging**: Morgan
- **CORS**: cors middleware

#### Frontend
- **Framework**: React 18.2
- **Language**: TypeScript 5.3
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router 6.20
- **HTTP Client**: Axios 1.6
- **Charts**: Recharts 2.10
- **UI Components**: Headless UI 1.7
- **Icons**: Heroicons 2.1
- **Notifications**: React Hot Toast

## Backend Architecture

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # Prisma client configuration
│   │   └── config.ts             # Environment configuration
│   ├── controllers/
│   │   ├── authController.ts     # Authentication logic
│   │   ├── employeeController.ts # Employee management
│   │   ├── attendanceController.ts
│   │   ├── leaveController.ts
│   │   ├── payrollController.ts
│   │   ├── ticketController.ts
│   │   ├── budgetController.ts
│   │   ├── contentController.ts
│   │   └── analyticsController.ts
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── errorHandler.ts      # Global error handling
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── employeeRoutes.ts
│   │   ├── attendanceRoutes.ts
│   │   ├── leaveRoutes.ts
│   │   ├── payrollRoutes.ts
│   │   ├── ticketRoutes.ts
│   │   ├── budgetRoutes.ts
│   │   ├── contentRoutes.ts
│   │   └── analyticsRoutes.ts
│   ├── services/               # Business logic (future)
│   ├── utils/
│   │   ├── jwt.ts              # JWT utilities
│   │   └── password.ts         # Password hashing
│   └── server.ts               # Application entry point
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seeding
├── .env                        # Environment variables
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

### Key Design Patterns

#### 1. MVC Pattern (Modified)
- **Models**: Defined in Prisma schema
- **Views**: JSON responses
- **Controllers**: Handle request/response logic

#### 2. Middleware Chain
```typescript
Request → CORS → Body Parser → Authentication → Authorization → Controller → Response
```

#### 3. Dependency Injection
- Prisma client injected through imports
- Configuration through environment variables

### Authentication Flow

```
1. User Login Request
   ↓
2. Validate Credentials (email + password)
   ↓
3. Verify User in Database
   ↓
4. Compare Hashed Password
   ↓
5. Generate JWT Token (payload: userId, email, role)
   ↓
6. Return Token + User Data
   ↓
7. Client Stores Token (localStorage)
   ↓
8. Subsequent Requests Include Token in Authorization Header
   ↓
9. Middleware Verifies Token
   ↓
10. Extract User Info, Attach to Request
   ↓
11. Proceed to Route Handler
```

### Authorization Model

**Role Hierarchy:**
```
ADMIN (Full Access)
  ↓
HR_MANAGER (HR + Employee Operations)
  ↓
MANAGER (Team Management)
  ↓
EMPLOYEE (Self-Service)
```

**Permission Matrix:**

| Feature | ADMIN | HR_MANAGER | MANAGER | EMPLOYEE |
|---------|-------|------------|---------|----------|
| View Dashboard | ✓ | ✓ | ✓ | ✓ |
| Manage Employees | ✓ | ✓ | ✗ | ✗ |
| View All Attendance | ✓ | ✓ | ✓ | Own Only |
| Approve Leaves | ✓ | ✓ | ✓ | ✗ |
| Manage Payroll | ✓ | ✓ | ✗ | View Own |
| Manage Budget | ✓ | ✓ | ✗ | ✗ |
| Create Tickets | ✓ | ✓ | ✓ | ✓ |
| Manage Content | ✓ | ✓ | ✓ | ✗ |

## Frontend Architecture

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Layout.tsx           # Main layout with sidebar
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication state
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Employees.tsx
│   │   ├── Attendance.tsx
│   │   ├── Leaves.tsx
│   │   ├── Payroll.tsx
│   │   ├── Tickets.tsx
│   │   ├── Budget.tsx
│   │   └── Content.tsx
│   ├── services/
│   │   └── api.ts               # Axios configuration
│   ├── hooks/                   # Custom hooks (future)
│   ├── utils/                   # Utility functions (future)
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Application entry
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

### State Management

**Context API for Global State:**
- `AuthContext`: User authentication state
- Token management
- Login/Logout functionality

**Local State (useState):**
- Component-level data
- Form inputs
- UI state (loading, modals)

### Routing Structure

```
/                       → Dashboard (Protected)
├── /login              → Login Page (Public)
├── /employees          → Employee Management (Protected)
├── /attendance         → Attendance Tracking (Protected)
├── /leaves             → Leave Management (Protected)
├── /payroll            → Payroll System (Protected)
├── /tickets            → Ticketing System (Protected)
├── /budget             → Budget Management (Protected)
└── /content            → Content Management (Protected)
```

### API Integration Pattern

```typescript
// 1. Make API call
const response = await api.get('/endpoint');

// 2. Update local state
setState(response.data);

// 3. Show notification
toast.success('Operation successful');

// 4. Handle errors
catch (error) {
  toast.error(error.response?.data?.error);
}
```

## Database Design

### Entity Relationship Diagram

```
User (1) ←──→ (0..1) Employee
                        ↓
                        ├── (1) ←──→ (N) Attendance
                        ├── (1) ←──→ (N) Leave
                        ├── (1) ←──→ (N) Payroll
                        └── (1) ←──→ (N) Employee (subordinates)

User (1) ←──→ (N) Ticket (created)
User (1) ←──→ (N) Ticket (assigned)
User (1) ←──→ (N) Content (author)

Budget (independent)
Analytics (independent)
```

### Key Database Tables

#### User Table
```sql
- id (UUID, PK)
- email (String, Unique)
- password (String, Hashed)
- firstName (String)
- lastName (String)
- role (Enum: ADMIN, HR_MANAGER, MANAGER, EMPLOYEE)
- isActive (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)
```

#### Employee Table
```sql
- id (UUID, PK)
- userId (UUID, FK → User, Unique)
- employeeCode (String, Unique)
- department (String)
- designation (String)
- dateOfJoining (DateTime)
- dateOfBirth (DateTime)
- phone (String)
- address (String)
- emergencyContact (String)
- bankAccount (String)
- baseSalary (Float)
- managerId (UUID, FK → Employee)
```

#### Attendance Table
```sql
- id (UUID, PK)
- employeeId (UUID, FK → Employee)
- date (DateTime)
- checkIn (DateTime)
- checkOut (DateTime)
- status (Enum: PRESENT, ABSENT, LATE, HALF_DAY, LEAVE)
- notes (String)
- Unique constraint: (employeeId, date)
```

#### Payroll Table
```sql
- id (UUID, PK)
- employeeId (UUID, FK → Employee)
- month (Int)
- year (Int)
- baseSalary (Float)
- allowances (Float)
- deductions (Float)
- tax (Float)
- netSalary (Float)
- paymentDate (DateTime)
- isPaid (Boolean)
- Unique constraint: (employeeId, month, year)
```

### Indexes

**Critical Indexes for Performance:**
```sql
- User.email (unique index)
- Employee.employeeCode (unique index)
- Employee.department (index)
- Attendance.(employeeId, date) (composite index)
- Leave.employeeId (index)
- Leave.status (index)
- Payroll.(year, month) (composite index)
- Ticket.status (index)
- Content.slug (unique index)
- Content.isPublished (index)
- Analytics.(metric, date) (composite index)
```

## API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Request/Response Format

**Standard Success Response:**
```json
{
  "data": { ... },
  "message": "Success message"
}
```

**Standard Error Response:**
```json
{
  "error": "Error message",
  "details": { ... }
}
```

### Endpoint Examples

#### 1. User Authentication

**POST /api/auth/login**
```json
Request:
{
  "email": "admin@company.com",
  "password": "admin123"
}

Response (200):
{
  "user": {
    "id": "uuid",
    "email": "admin@company.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Get Dashboard Stats

**GET /api/analytics/dashboard**
```json
Response (200):
{
  "employees": {
    "total": 50,
    "active": 45
  },
  "tickets": {
    "total": 120,
    "open": 15
  },
  "budget": {
    "allocated": 500000,
    "spent": 350000
  },
  "attendance": {
    "today": 42
  }
}
```

#### 3. Create Employee

**POST /api/employees**
```json
Request:
{
  "userId": "user-uuid",
  "employeeCode": "EMP001",
  "department": "Engineering",
  "designation": "Software Engineer",
  "dateOfJoining": "2024-01-15",
  "dateOfBirth": "1995-05-20",
  "phone": "+1234567890",
  "address": "123 Main St",
  "emergencyContact": "+1987654321",
  "baseSalary": 60000
}

Response (201):
{
  "id": "employee-uuid",
  "employeeCode": "EMP001",
  ...
}
```

## Authentication & Authorization

### JWT Token Structure

**Payload:**
```json
{
  "userId": "uuid",
  "email": "user@company.com",
  "role": "ADMIN",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Token Expiry**: 7 days (configurable)

### Password Security

- **Algorithm**: bcrypt
- **Salt Rounds**: 10
- **Password Requirements**: Minimum 8 characters (recommended to add validation)

### Security Best Practices

1. **HTTPS Only**: Use HTTPS in production
2. **Environment Variables**: Store secrets in .env files
3. **CORS Configuration**: Restrict origins
4. **Input Validation**: Validate all inputs
5. **SQL Injection Prevention**: Use Prisma ORM (parameterized queries)
6. **XSS Prevention**: Sanitize outputs
7. **Rate Limiting**: Implement rate limiting (recommended)
8. **Security Headers**: Add helmet.js (recommended)

## Deployment Guide

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Docker (optional)
- Domain name and SSL certificate (production)

### Environment Setup

#### Backend .env
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=<256-bit-random-string>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Frontend .env
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Docker Deployment

1. **Build and start containers:**
```bash
docker-compose up -d
```

2. **View logs:**
```bash
docker-compose logs -f
```

3. **Stop services:**
```bash
docker-compose down
```

### Manual Deployment

#### Backend Deployment

1. **Install dependencies:**
```bash
cd backend
npm ci --production
```

2. **Generate Prisma client:**
```bash
npx prisma generate
```

3. **Run migrations:**
```bash
npx prisma migrate deploy
```

4. **Seed database (optional):**
```bash
npx prisma db seed
```

5. **Build TypeScript:**
```bash
npm run build
```

6. **Start server:**
```bash
npm start
```

#### Frontend Deployment

1. **Install dependencies:**
```bash
cd frontend
npm ci
```

2. **Build for production:**
```bash
npm run build
```

3. **Serve static files:**
   - Upload `dist/` folder to hosting service
   - Configure web server (nginx/Apache)
   - Set up SSL certificate

### Database Backup

```bash
# Backup
pg_dump -U postgres enterprise_db > backup.sql

# Restore
psql -U postgres enterprise_db < backup.sql
```

## Development Guidelines

### Code Style

**TypeScript:**
- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type
- Use async/await over promises

**React:**
- Functional components only
- Use hooks for state management
- Keep components small and focused
- Extract reusable logic to custom hooks

**Naming Conventions:**
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Functions: camelCase (e.g., `fetchUserData`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Interfaces: PascalCase with 'I' prefix or descriptive name

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create pull request
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

### Testing Strategy

**Unit Tests:**
- Test individual functions
- Mock external dependencies
- Aim for 80%+ coverage

**Integration Tests:**
- Test API endpoints
- Test database operations
- Use test database

**E2E Tests:**
- Test critical user flows
- Login → Dashboard → Actions
- Use Cypress or Playwright

### Performance Optimization

**Backend:**
- Database indexing
- Query optimization
- Caching (Redis)
- Pagination for large datasets
- Connection pooling

**Frontend:**
- Code splitting
- Lazy loading routes
- Image optimization
- Memoization (useMemo, useCallback)
- Virtual scrolling for large lists

### Monitoring & Logging

**Recommended Tools:**
- **Error Tracking**: Sentry
- **Performance Monitoring**: New Relic / Datadog
- **Logging**: Winston / Pino
- **Database Monitoring**: Prisma Pulse
- **Uptime Monitoring**: UptimeRobot

### Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] SQL injection prevented (ORM)
- [ ] XSS prevention
- [ ] CSRF tokens (if needed)
- [ ] Rate limiting
- [ ] Security headers (helmet.js)
- [ ] Regular dependency updates
- [ ] Database backups automated
- [ ] Access logs maintained

---

**Document Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained By**: Development Team
