import { Router } from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createTicket);
router.get('/', authenticate, getTickets);
router.get('/:id', authenticate, getTicketById);
router.put('/:id', authenticate, updateTicket);
router.delete('/:id', authenticate, deleteTicket);

export default router;
