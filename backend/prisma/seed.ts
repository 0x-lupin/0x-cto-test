import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      email: 'admin@company.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('Created admin user:', admin.email);

  const hrManager = await prisma.user.upsert({
    where: { email: 'hr@company.com' },
    update: {},
    create: {
      email: 'hr@company.com',
      password: hashedPassword,
      firstName: 'HR',
      lastName: 'Manager',
      role: 'HR_MANAGER',
      isActive: true,
    },
  });

  console.log('Created HR Manager:', hrManager.email);

  const manager = await prisma.user.upsert({
    where: { email: 'manager@company.com' },
    update: {},
    create: {
      email: 'manager@company.com',
      password: hashedPassword,
      firstName: 'Team',
      lastName: 'Manager',
      role: 'MANAGER',
      isActive: true,
    },
  });

  console.log('Created Manager:', manager.email);

  const employee = await prisma.user.upsert({
    where: { email: 'employee@company.com' },
    update: {},
    create: {
      email: 'employee@company.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'EMPLOYEE',
      isActive: true,
    },
  });

  console.log('Created Employee:', employee.email);

  const employeeRecord = await prisma.employee.upsert({
    where: { employeeCode: 'EMP001' },
    update: {},
    create: {
      userId: employee.id,
      employeeCode: 'EMP001',
      department: 'Engineering',
      designation: 'Software Engineer',
      dateOfJoining: new Date('2023-01-15'),
      dateOfBirth: new Date('1995-05-20'),
      phone: '+1234567890',
      address: '123 Main St, City, Country',
      emergencyContact: '+1987654321',
      bankAccount: 'BANK123456',
      baseSalary: 60000,
    },
  });

  console.log('Created employee record:', employeeRecord.employeeCode);

  const sampleContent = await prisma.content.upsert({
    where: { slug: 'welcome-to-company' },
    update: {},
    create: {
      title: 'Welcome to Our Company',
      slug: 'welcome-to-company',
      content: 'Welcome to our enterprise management system. This is a sample content post.',
      excerpt: 'Welcome message for new employees',
      authorId: admin.id,
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log('Created sample content:', sampleContent.title);

  const budget = await prisma.budget.create({
    data: {
      department: 'Engineering',
      category: 'Development Tools',
      allocated: 50000,
      spent: 15000,
      year: new Date().getFullYear(),
      quarter: Math.ceil((new Date().getMonth() + 1) / 3),
      description: 'Budget for software licenses and development tools',
    },
  });

  console.log('Created sample budget for:', budget.department);

  console.log('✅ Database seeding completed successfully!');
  console.log('\nDefault login credentials:');
  console.log('Admin: admin@company.com / admin123');
  console.log('HR Manager: hr@company.com / admin123');
  console.log('Manager: manager@company.com / admin123');
  console.log('Employee: employee@company.com / admin123');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
