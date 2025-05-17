"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ButtonHTMLAttributes } from "react";

type Props = {
  title: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton = ({ title, className, variant }: Props) => {
  const router = useRouter();
  return (
    <>
      <Button
        variant={variant}
        className={className}
        onClick={() => router.back()}
        title={title}
      >
        {title}
      </Button>
    </>
  );
};

export default BackButton;
