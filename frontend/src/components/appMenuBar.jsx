import { Link } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

export function AppMenuBar() {
  const { logout } = useAuth();

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

      <Button onClick={logout}>
        Logout
      </Button>
    </Menubar>
  );
}

export default AppMenuBar;
