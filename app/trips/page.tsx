import EmptyState from "../components/EmptyState";
import Clientonly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <Clientonly>
                <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
                />
            </Clientonly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id,
        listingId: '',
        authorId: ''
    });
     
      if (reservations.length === 0) {
        return (
            <Clientonly>
                <EmptyState 
                title="No trips found"
                subtitle="Looks like you havent reserved any trips"
                />
            </Clientonly>
        )
      }

      return (
        <Clientonly>
            <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
            />
        </Clientonly>
      )
}
export default TripsPage;