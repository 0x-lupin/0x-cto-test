import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/config';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import leaveRoutes from './routes/leaveRoutes';
import payrollRoutes from './routes/payrollRoutes';
import ticketRoutes from './routes/ticketRoutes';
import budgetRoutes from './routes/budgetRoutes';
import contentRoutes from './routes/contentRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

const app = express();

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
});

export default app;
