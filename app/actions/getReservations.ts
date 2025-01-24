import prisma from "@/app/libs/prismadb";
import { Reservation, Listing } from "@prisma/client";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

type ReservationWithListing = Reservation & {
    Listing: Listing;
};

export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;

        // Build the query object
        const query: {
            listingId?: string;
            userId?: string;
            Listing?: { userId?: string };
        } = {};

        if (listingId) {
            query.listingId = listingId;
        }
        if (userId) {
            query.userId = userId;
        }
        if (authorId) {
            query.Listing = { userId: authorId };
        }

        // Fetch Reservations
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                Listing: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Transform date fields to strings
        const safeReservations = reservations.map((reservation: ReservationWithListing) => {
            return {
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.Listing,
                    createdAt: reservation.Listing.createdAt.toISOString(),
                },
            };
        });

        return safeReservations;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}
