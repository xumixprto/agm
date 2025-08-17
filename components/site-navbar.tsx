"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-primary">AGM</span>{" "}
          <span className="text-muted-foreground">Adult Gaming Management</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/#features"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            How it works
          </Link>

          <SignedOut>
            <Button asChild variant="outline">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
