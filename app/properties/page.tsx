import EmptyState from "../components/EmptyState";
import Clientonly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
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

    const listings = await getListings({
        userId: currentUser.id,
    });
     
      if (listings.length === 0) {
        return (
            <Clientonly>
                <EmptyState 
                title="No properties found"
                subtitle="Looks like you have no properties"
                />
            </Clientonly>
        )
      }

      return (
        <Clientonly>
            <PropertiesClient 
            listings={listings}
            currentUser={currentUser}
            />
        </Clientonly>
      )
}
export default PropertiesPage;