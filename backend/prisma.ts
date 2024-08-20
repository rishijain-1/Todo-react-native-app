// backend/prisma.ts

import { PrismaClient } from '@prisma/client';

// Instantiate the PrismaClient
const prisma = new PrismaClient();

// Export the Prisma client instance
export default prisma;
