import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing.id}`}>
      {listing.title} (${listing.price})
    </Link>
  );
};

export default ListingCard;
