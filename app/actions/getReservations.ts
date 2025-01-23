import prisma from "@/app/libs/prismadb";


interface IParams {
    listingId: string;
    userId: string;
    authorId: string;
}
interface QueryType {
    listingId?: string;
    userId?: string;
    Listing?: {
        userId?: string;
    };
}



export default async function getReservations(
    params: IParams
) {
    try {
        const { listingId, userId, authorId } = params;

        const query: QueryType = {};

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.Listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                Listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map(
            (reservation: { createdAt: { toISOString: () => any; }; startDate: { toISOString: () => any; }; endDate: { toISOString: () => any; }; Listing: { createdAt: { toISOString: () => any; }; }; }) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.Listing,
                    createdAt: reservation.Listing.createdAt.toISOString(),
                }
            })
        );
        return safeReservations;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
} 