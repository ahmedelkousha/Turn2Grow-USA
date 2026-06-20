"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn&apos;t load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            variant="orange"
            size="premium-sm"
            shape="full"
            onClick={reset}
          >
            Try again
          </Button>
          <Button
            asChild
            variant="premium-outline"
            size="premium-sm"
            shape="full"
          >
            <Link href="/">
              Go home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
