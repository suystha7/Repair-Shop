import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="w-full h-dvh grid place-content-center">
        <LoaderCircle className="h-24 w-24 text-foreground/20 animate-spin" />
      </div>
    </div>
  );
}
