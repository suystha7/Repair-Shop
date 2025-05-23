import React from "react";
import NavButton from "./NavButton";
import { HomeIcon, UsersRound, LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { NavButtonMenu } from "./NavButtonMenu";

const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <div className="flex h-10 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/tickets" label="Home" icon={HomeIcon} />

          <Link
            href="/tickets"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-lg font-bold m-0">
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customers", href: "/customers/form" },
            ]}
          />

          <ModeToggle />

          <Button
            variant="ghost"
            size="icon"
            aria-label="LogOut"
            title="LogOut"
            className="rounded-full"
            asChild
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
