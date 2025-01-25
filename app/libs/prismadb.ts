import { PrismaClient } from "@prisma/client";

// Use a global variable to ensure a single PrismaClient instance
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}

export default prisma;
