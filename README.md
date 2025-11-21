# Enterprise Management System (EMS)

A comprehensive, full-stack enterprise resource planning (ERP) system with content management, HR, payroll, analytics, and more.

## 🚀 Features

### Core Functionality
- **Content Management System (CMS)**: Create, publish, and manage organizational content
- **Multi-Role Authentication**: Role-based access control (Admin, HR Manager, Manager, Employee)
- **Mobile-Friendly**: Fully responsive design for all devices
- **Analytics Dashboard**: Real-time insights with interactive charts and graphs

### HR Management
- **Employee Management**: Complete CRUD operations for employee records
- **Attendance System**: Clock in/out tracking with status monitoring
- **Leave Management**: Leave requests with approval workflow
- **Performance Tracking**: Monitor employee metrics

### Financial Management
- **Payroll System**: Automated salary calculations with allowances and deductions
- **Budget Management**: Department-wise budget allocation and tracking
- **Financial Reports**: Comprehensive financial analytics

### Operations
- **Ticketing System**: IT support and issue tracking
- **Department Analytics**: Team performance metrics
- **Trend Analysis**: Historical data visualization

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

### Frontend
- **Library**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Heroicons
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Components**: Headless UI

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database Migrations**: Prisma Migrate

## 📋 Prerequisites

- Node.js 20+ and npm
- PostgreSQL 15+ (or use Docker)
- Docker and Docker Compose (optional, for containerized deployment)

## 🔧 Installation & Setup

### Method 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enterprise-management-system
   ```

2. **Configure environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Start all services with Docker**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

### Method 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enterprise-management-system
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup PostgreSQL Database**
   
   Create a database:
   ```bash
   createdb enterprise_db
   ```

4. **Configure Backend Environment**
   
   Create `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=postgresql://postgres:password@localhost:5432/enterprise_db
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Configure Frontend Environment**
   
   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

6. **Run Database Migrations**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

7. **Start Development Servers**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 👤 Default Users

After seeding, you can login with these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | admin123 |
| HR Manager | hr@company.com | admin123 |
| Manager | manager@company.com | admin123 |
| Employee | employee@company.com | admin123 |

## 📊 Database Schema

The system uses a relational PostgreSQL database with the following main entities:

- **User**: Authentication and basic user information
- **Employee**: Extended employee details
- **Attendance**: Check-in/check-out records
- **Leave**: Leave request management
- **Payroll**: Salary and payment records
- **Ticket**: Support ticket tracking
- **Budget**: Financial budget allocation
- **Content**: CMS content pages
- **Analytics**: System metrics and KPIs

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

### Employees
- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get employee details
- `POST /api/employees` - Create employee (Admin/HR only)
- `PUT /api/employees/:id` - Update employee (Admin/HR only)
- `DELETE /api/employees/:id` - Delete employee (Admin/HR only)

### Attendance
- `POST /api/attendance/check-in` - Check in
- `POST /api/attendance/check-out` - Check out
- `GET /api/attendance` - Get attendance records
- `PUT /api/attendance/:id` - Update attendance (Admin/HR/Manager)

### Leaves
- `POST /api/leaves` - Create leave request
- `GET /api/leaves` - Get leave requests
- `PUT /api/leaves/:id/status` - Approve/reject leave (Admin/HR/Manager)

### Payroll
- `POST /api/payroll` - Create payroll (Admin/HR only)
- `GET /api/payroll` - Get payroll records
- `PUT /api/payroll/:id` - Update payroll (Admin/HR only)
- `DELETE /api/payroll/:id` - Delete payroll (Admin/HR only)

### Tickets
- `POST /api/tickets` - Create ticket
- `GET /api/tickets` - List tickets
- `GET /api/tickets/:id` - Get ticket details
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### Budget
- `POST /api/budgets` - Create budget (Admin/HR only)
- `GET /api/budgets` - List budgets
- `PUT /api/budgets/:id` - Update budget (Admin/HR only)
- `DELETE /api/budgets/:id` - Delete budget (Admin/HR only)

### Content
- `POST /api/contents` - Create content (Admin/HR/Manager)
- `GET /api/contents` - List content
- `GET /api/contents/:slug` - Get content by slug
- `PUT /api/contents/:id` - Update content (Admin/HR/Manager)
- `DELETE /api/contents/:id` - Delete content (Admin/HR)

### Analytics
- `GET /api/analytics/dashboard` - Dashboard statistics
- `GET /api/analytics/employees/department` - Employee distribution
- `GET /api/analytics/attendance/trends` - Attendance trends
- `GET /api/analytics/tickets/stats` - Ticket statistics
- `GET /api/analytics/payroll/trends` - Payroll trends (Admin/HR)
- `GET /api/analytics/budget/utilization` - Budget utilization (Admin/HR)

## 🎨 User Interface

### Dashboard
- Real-time statistics cards
- Interactive charts (Pie, Bar, Line)
- Department-wise analytics
- Attendance trends
- Ticket status overview

### Employee Management
- Searchable employee list
- Department filtering
- Employee details view
- CRUD operations (role-based)

### Attendance Tracking
- One-click check-in/check-out
- Attendance history
- Status indicators
- Date range filtering

### Leave Management
- Leave request submission
- Approval workflow
- Status tracking
- Calendar integration

### Payroll System
- Monthly payroll generation
- Salary components breakdown
- Payment status tracking
- Payslip generation

### Ticketing System
- Ticket creation
- Priority management
- Assignment tracking
- Status updates

### Budget Management
- Budget allocation by department
- Utilization tracking
- Visual progress indicators
- Quarterly reporting

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- SQL injection prevention (Prisma ORM)
- XSS protection
- CORS configuration

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🚀 Production Deployment

### Environment Variables

Ensure all production environment variables are properly set:

**Backend (.env)**
```env
NODE_ENV=production
DATABASE_URL=<your-production-database-url>
JWT_SECRET=<strong-random-secret>
CORS_ORIGIN=<your-frontend-url>
```

**Frontend (.env)**
```env
VITE_API_URL=<your-backend-api-url>
```

### Build for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

### Deployment Options

1. **Docker Deployment**
   ```bash
   docker-compose up -d
   ```

2. **Traditional Hosting**
   - Deploy backend to Node.js hosting (Heroku, AWS, DigitalOcean)
   - Deploy frontend to static hosting (Vercel, Netlify, AWS S3)
   - Configure PostgreSQL database (AWS RDS, Heroku Postgres)

3. **Cloud Platforms**
   - AWS: EC2, RDS, S3, CloudFront
   - Google Cloud: Cloud Run, Cloud SQL, Cloud Storage
   - Azure: App Service, Azure Database for PostgreSQL

## 🧪 Testing

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

## 📈 Performance Optimization

- Database indexing on frequently queried fields
- API response caching
- Lazy loading for frontend components
- Image optimization
- Code splitting
- Gzip compression

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Known Issues

None at the moment. Please report issues on the GitHub repository.

## 📞 Support

For support, email support@company.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Real-time notifications
- [ ] Email integration
- [ ] Advanced reporting
- [ ] Mobile app (React Native)
- [ ] API documentation (Swagger)
- [ ] Unit and integration tests
- [ ] Performance monitoring
- [ ] Audit logs

## 👏 Acknowledgments

- React community
- Prisma team
- Tailwind CSS
- Heroicons
- Recharts

---

**Built with ❤️ for modern enterprises**
