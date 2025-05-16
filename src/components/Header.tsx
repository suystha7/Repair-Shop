import React from "react";
import NavButton from "./NavButton";
import { HomeIcon, Ticket, UsersRound } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-10 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" label="Home" icon={HomeIcon} />

          <Link
            href="/home"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-lg font-bold m-0">
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton href="/tickets" label="Tickets" icon={Ticket} />
          <NavButton href="/customers" label="Customers" icon={UsersRound} />

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
