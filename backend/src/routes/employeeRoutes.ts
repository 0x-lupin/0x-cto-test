import { Router } from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAllEmployees);
router.get('/:id', authenticate, getEmployeeById);
router.post('/', authenticate, authorize('ADMIN', 'HR_MANAGER'), createEmployee);
router.put('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER'), updateEmployee);
router.delete('/:id', authenticate, authorize('ADMIN', 'HR_MANAGER'), deleteEmployee);

export default router;
