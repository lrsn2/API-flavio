import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', (req, res) => userController.create(req, res));
userRoutes.get('/', (req, res) => userController.list(req, res));