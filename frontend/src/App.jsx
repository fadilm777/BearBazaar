import { useState } from "react";
import "./App.css";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import bearBazaar from "./assets/bearbazaar.svg";

export function SearchBar() {
  return <Input type="search" placeholder="Search" className="w-64 p-2 border rounded-md" />;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="flex items-center p-4 bg-gray-100 shadow-md">
        {/* BearBazaar logo on the far left */}
        <img src={bearBazaar} alt="Bear Bazaar" className="h-12 w-auto" />

        {/* Search bar */}
        <SearchBar className="ml-4" />

        {/* Menubar aligned to the far right */}
        <Menubar className="ml-auto flex gap-x-4">
          <MenubarMenu>
            <MenubarTrigger>Home</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Sell</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>My Listings</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profile</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Bottom Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default App;
