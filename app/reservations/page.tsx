import EmptyState from "../components/EmptyState";
import Clientonly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <Clientonly>
            <EmptyState 
            title="Unauthorized"
            subtitle="Please login"
            />
            </Clientonly>
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
        listingId: "",
        userId: ""
    });

    if (reservations.length === 0) {
        return (
            <Clientonly>
                <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your page"
                 />

            </Clientonly>
        )
    }
    return (
        <Clientonly>
            <ReservationsClient 
            reservations={reservations}
            currentUser={currentUser}
            />
        </Clientonly>
    )
};

export default ReservationsPage;