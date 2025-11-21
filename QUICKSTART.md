# Quick Start Guide

Get the Enterprise Management System up and running in minutes!

## 🚀 Quick Setup (Using Docker - Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Git

### Steps

1. **Clone and Navigate**
   ```bash
   git clone <repository-url>
   cd enterprise-management-system
   ```

2. **Start Everything**
   ```bash
   docker-compose up -d
   ```

3. **Wait for Services** (30-60 seconds)
   ```bash
   docker-compose logs -f
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

5. **Login**
   - Email: `admin@company.com`
   - Password: `admin123`

That's it! 🎉

## 📦 Manual Setup (Without Docker)

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm

### Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd enterprise-management-system
   ```

2. **Setup Database**
   ```bash
   createdb enterprise_db
   ```

3. **Install Dependencies**
   ```bash
   # Install all dependencies
   npm run install:all
   ```

4. **Configure Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Configure Frontend**
   ```bash
   cd ../frontend
   cp .env.example .env
   ```

6. **Initialize Database**
   ```bash
   cd ../backend
   npx prisma migrate dev
   npx prisma db seed
   ```

7. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```

8. **Start Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```

9. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

10. **Login**
    - Admin: `admin@company.com` / `admin123`
    - Employee: `employee@company.com` / `admin123`

## 🎯 What to Try First

1. **Explore Dashboard**
   - View real-time statistics
   - Check interactive charts
   - See employee distribution

2. **Check Attendance**
   - Click "Check In" button
   - View your attendance record
   - See attendance history

3. **Create a Ticket**
   - Navigate to Tickets
   - Create a support ticket
   - Watch status updates

4. **View Employees**
   - Browse employee list
   - Search for employees
   - View employee details

5. **Check Payroll**
   - View salary information
   - See payment history
   - Check allowances/deductions

## 🔧 Common Commands

**Docker:**
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart backend

# Rebuild
docker-compose up -d --build
```

**Development:**
```bash
# Backend
cd backend
npm run dev          # Start dev server
npm run build        # Build for production
npx prisma studio    # Open database GUI

# Frontend
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
```

**Database:**
```bash
cd backend
npx prisma migrate dev      # Run migrations
npx prisma db seed          # Seed database
npx prisma studio          # Open Prisma Studio
npx prisma generate        # Generate client
```

## 📚 Next Steps

1. **Read Documentation**
   - [README.md](README.md) - Overview
   - [docs/USER_GUIDE.md](docs/USER_GUIDE.md) - User manual
   - [docs/TECHNICAL_DOCUMENTATION.md](docs/TECHNICAL_DOCUMENTATION.md) - Tech details
   - [docs/API_REFERENCE.md](docs/API_REFERENCE.md) - API docs
   - [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) - Production deployment

2. **Explore Features**
   - Try all user roles (Admin, HR, Manager, Employee)
   - Create sample data
   - Test workflows
   - Explore analytics

3. **Customize**
   - Update company branding
   - Configure settings
   - Add custom fields
   - Integrate with existing systems

## 🐛 Troubleshooting

**Port Already in Use:**
```bash
# Change ports in .env files
# Backend: PORT=5001
# Frontend: Update vite.config.ts
```

**Database Connection Error:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify DATABASE_URL in backend/.env
```

**Cannot Login:**
```bash
# Reseed database
cd backend
npx prisma db seed
```

**Prisma Client Error:**
```bash
cd backend
npx prisma generate
```

## 📞 Need Help?

- Check [docs/USER_GUIDE.md](docs/USER_GUIDE.md)
- Review [docs/TECHNICAL_DOCUMENTATION.md](docs/TECHNICAL_DOCUMENTATION.md)
- Create an issue on GitHub
- Contact support

## 🎨 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | admin123 |
| HR Manager | hr@company.com | admin123 |
| Manager | manager@company.com | admin123 |
| Employee | employee@company.com | admin123 |

## ✅ Verification Checklist

- [ ] Services are running
- [ ] Can access frontend (http://localhost:3000)
- [ ] Can login successfully
- [ ] Dashboard loads with charts
- [ ] Can navigate between pages
- [ ] Can create a ticket
- [ ] Can check-in attendance

---

**You're all set! Start exploring the Enterprise Management System!** 🚀
