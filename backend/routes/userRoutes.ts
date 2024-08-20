// backend/routes/userRoutes.ts

import { Router } from 'express';
import { register } from '../controllers/userController';

const router = Router();

// Route for registering a new user
router.post('/register', register);



export default router;
