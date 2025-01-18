import { PrismaClient } from "@prisma/client";

declare global {
    const prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = client

export default client;