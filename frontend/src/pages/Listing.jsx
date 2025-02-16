import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingDetails } from "@/backend/listings";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { createConversation } = useChat();

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

  const handleStartConversation = async () => {
    if (listing.conversations.length == 0) {
      const conversationId = await createConversation(id);
      navigate(`/dms?conversationId=${conversationId}`);
    } else {
      navigate(`/dms?conversationId=${listing.conversations[0].id}`);
    }
  };

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
      <p>
        <b>Seller: </b>
        {listing.seller.username}
      </p>
      <p>{listing.description}</p>

      <Button onClick={handleStartConversation}>
        Send Message
      </Button>
    </>
  );
};

export default ListingDetails;
