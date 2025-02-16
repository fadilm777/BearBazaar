import { Link } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export function AppMenuBar() {
  return (
    <Menubar className="ml-auto flex gap-x-4">
      <MenubarMenu>
        <MenubarTrigger>
          <Link to="/">Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to="/sell">Sell</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to="/my-listings">My Listings</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to="/profile">Profile</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export default AppMenuBar;
