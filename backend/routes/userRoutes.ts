// backend/routes/userRoutes.ts

import { Router } from 'express';
import { loginUser, register } from '../controllers/userController';

const router = Router();

// Route for registering a new user
router.post('/register', register);
router.post('/login', loginUser);


export default router;
