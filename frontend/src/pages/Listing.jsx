import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingDetails } from "@/backend/listings";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";
import { Heart, Send } from "lucide-react";

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
      <div className=" pt-20 w-full grid md:grid-cols-2 items-start mx-auto py-6 gap-6 md:gap-32">
        <div className="grid gap-5 items-start">
          <div className="pt-32 flex items-start">
            <h1 className="font-bold text-2xl sm:text-3xl">
              {listing.title}
            </h1>
            <div className="text-3xl font-bold ml-auto">{"$" + listing.price}</div>
          </div>
          <Label htmlFor="color" className="text-base text-left">
            {"Seller: " + listing.seller.username}
          </Label>
          <Label htmlFor="size" className="text-base text-left">
            {"Location: Edmonton"}
          </Label>
          <div className="grid grid-cols-2 w-full gap-4">
            <Button onClick={handleStartConversation} ><Send className="size-4" /> Message Seller</Button>
            <Button onClick={handleStartConversation} variant="primary" className="border"><Heart className="size-4" /> Add to wishlist</Button>
          </div>
          <Separator className="border-gray-200 dark:border-gray-800" />
          <div className="grid gap-4 text-sm leading-loose">
            <h2 className="text-lg text-left font-bold">
              Descritpion:
            </h2>
            <p>
              {listing.description}
            </p>
          </div>
        </div>
        <div className="grid gap-3 items-start">
          <div className="hidden md:flex gap-4 items-start">
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 1</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 2</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 3</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 4</span>
            </button>
            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
              <span className="sr-only">View Image 4</span>
            </button>
          </div>
          <div className="grid gap-4 md:gap-10">
            <img
              src="/placeholder.svg"
              alt="Product Image"
              width={600}
              height={600}
              className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            />
            <div className="flex md:hidden items-start">
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
                <span className="sr-only">View Image 1</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
                <span className="sr-only">View Image 2</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
                <span className="sr-only">View Image 3</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
                <span className="sr-only">View Image 4</span>
              </button>
              <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                <img
                  src="/placeholder.svg"
                  alt="Preview thumbnail"
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
                <span className="sr-only">View Image 4</span>
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default ListingDetails;
