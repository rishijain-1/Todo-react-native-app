// backend/index.ts

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { json } from 'body-parser';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/users', userRoutes);  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
