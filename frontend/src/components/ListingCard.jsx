import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil, Send, HeartIcon, PlusIcon } from "lucide-react";
export default function ListingCard({ key, location, listing }) {

  if (location == "sell") {
    var isSelling = true
  } else {
    var isSelling = false
  }

  return (
    <div className="w-[300px] group relative space-y-4">
      <figure className="group-hover:opacity-90">
        <img
          className="w-full rounded-lg aspect-square"
          src={"/src/assets/image.png"}
          width={300}
          height={500}
          alt={listing.title}
        />
      </figure>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg">
            <Link href="/////">
              {listing.title}
            </Link>
          </h3>
          <div className="h-2"></div>
          <p className="text-sm text-muted-foreground">{"category"}</p>
        </div>
        <p className="text-lg font-semibold">{"$" + listing.price}</p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="icon" className="flex-shrink-0">
          <HeartIcon className="size-4" />
        </Button>
        {(!isSelling) ? (

          <Link to={"/listing/" + listing.id} className={buttonVariants({ variant: "outline", className: "w-full" })}>
            <Send className="size-4 me-1" /> Go to listing
          </Link>
        ) : (
          <Link className={buttonVariants({ variant: "outline", className: "w-full" })}>
            <Pencil className="size-4 me-1" /> Edit Listing
          </Link>
        )
        }
      </div>
    </div>
  );
}
