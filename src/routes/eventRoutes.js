import { Router } from 'express';
import { EventController } from '../controllers/EventController.js';

export const eventRoutes = Router();
const eventController = new EventController();

eventRoutes.post('/', (req, res) => eventController.create(req, res));
eventRoutes.get('/', (req, res) => eventController.list(req, res));
eventRoutes.get('/:id', (req, res) => eventController.getById(req, res));