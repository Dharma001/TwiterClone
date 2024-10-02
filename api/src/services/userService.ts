import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserService = {
    getAllUsers: async () => {
        return await prisma.user.findMany();
    },
};
