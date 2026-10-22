import { Router } from 'express';
import { TicketController } from '../controllers/TicketController.js';

export const ticketRoutes = Router();
const ticketController = new TicketController();

ticketRoutes.post('/', (req, res) => ticketController.create(req, res));
ticketRoutes.get('/user/:userId', (req, res) => ticketController.listByUser(req, res));