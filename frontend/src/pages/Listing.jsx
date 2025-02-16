import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListingDetails } from "@/backend/listings";

const ListingDetails = () => {
  const { id } = useParams();

  console.log('here');

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const listing = await getListingDetails(id)
        setListing(listing)
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setLoading(false);
    })();
  }, [id]);

  // TODO: use real UI here
  if (loading) {
    return (<p>Loading...</p>);
  }
  if (error) {
    return (<p>Error: ${error}</p>);
  }

  if (!listing) {
    return (<p>Not Found</p>);
  }

  return (
    <>
      <h1>{listing.title}</h1>
      <p>
        <b>Price: </b>
        ${listing.price}
      </p>
      <p>{listing.description}</p>
    </>
  );
};

export default ListingDetails;
