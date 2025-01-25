import { PrismaClient } from "@prisma/client";

declare global {
    // Use var, not const. (Block-scoped const can conflict with repeated declarations.)
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export { };
