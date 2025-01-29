// app/actions/getListings.ts

import prisma from "@/app/libs/prismadb";
import { Listing } from "@prisma/client";  // import the Prisma model

// Your existing query params
export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

// We'll define a "safe" listing type that
// replaces the Date fields with string fields.
export interface SafeListing extends Omit<Listing, "createdAt"> {
    createdAt: string;
}

/** 
 * If you need an explicit type for the query,
 * you can keep it. (It won't hurt to keep or remove it.)
 */
interface QueryType {
    userId?: string;
    guestCount?: { gte: number };
    roomCount?: { gte: number };
    bathroomCount?: { gte: number };
    locationValue?: string;
    category?: string;
    NOT?: {
        reservation: {
            some: {
                OR: Array<{
                    startDate?: { lte: string };
                    endDate?: { gte: string };
                }>;
            };
        };
    };
}

/**
 * Fetch listings from your DB using prisma
 * and return them in a type-safe way that includes `id`.
 */
export default async function getListings(
    params: IListingsParams
): Promise<SafeListing[]> {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        // Build up your query object
        const query: QueryType = {};

        if (userId) {
            query.userId = userId;
        }
        if (category) {
            query.category = category;
        }
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            };
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount,
            };
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount,
            };
        }
        if (locationValue) {
            query.locationValue = locationValue;
        }
        if (startDate && endDate) {
            query.NOT = {
                reservation: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            },
                        ],
                    },
                },
            };
        }

        // Fetch from Prisma
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc",
            },
        });

        // Convert createdAt (Date) to string for Next.js serializable props
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}
