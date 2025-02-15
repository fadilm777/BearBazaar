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
} from "@/components/ui/pagination"


export function SearchBar() {
    return <Input type="search" placeholder="Search" className="w-64 p-2 border rounded-md" />;
}

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            {/* Flex container to align SearchBar & Menubar in one row */}
            <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
                {/* Search bar on the left */}
                <SearchBar />

                {/* Navigation Menubar */}
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Home</MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>Sell</MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>Profile</MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
                </div>

                <Pagination>
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
