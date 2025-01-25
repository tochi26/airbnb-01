import { PrismaClient } from "@prisma/client";

declare global {
    // For globalThis
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// If this file is a module, you need at least one export statement
export { };
