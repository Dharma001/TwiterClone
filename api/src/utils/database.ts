import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to the database successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
};

export const getPrismaClient = () => {
    return prisma;
};
