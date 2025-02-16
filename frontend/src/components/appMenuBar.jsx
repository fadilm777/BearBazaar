import { Link } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export function AppMenuBar() {
  return (
    <Menubar className="ml-auto flex gap-x-4">
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-2">
          <Link to="/dms">DMs</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-2">
          <Link to="/sell">Sell</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-2">
          <Link to="/my-listings">My Listings</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-2">
          <Link to="/profile">Profile</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export default AppMenuBar;
