import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

const NavButton = ({ icon: Icon, label, href }: Props) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className="rounded-full text-xl"
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon className="w-10 h-10" />
        </Link>
      ) : (
        <Icon className="w-10 h-10" />
      )}
    </Button>
  );
};

export default NavButton;
