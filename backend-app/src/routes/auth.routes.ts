import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.get('/me', authMiddleware, getCurrentUser);

export default authRouter;
