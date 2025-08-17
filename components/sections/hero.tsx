"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Fill most of the screen height, center content vertically */}
      <div className="flex min-h-[80svh] items-center">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Keep your gaming crew together — even when life gets busy.
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              AGM helps adult friend groups plan sessions, vote time slots,
              track availability, and lock in game nights without endless group
              chats.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/create-group">Create a group</Link>
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  toast("Feature preview", {
                    description: "This will showcase a quick demo soon.",
                  })
                }
              >
                Try a demo toast
              </Button>
              <Button asChild variant="outline">
                <Link href="#how-it-works">How it works</Link>
              </Button>
            </div>

            {/* Feature pills row */}
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 text-sm text-muted-foreground sm:mx-auto sm:text-base">
              <div className="rounded-2xl border border-border/50 bg-card/40 px-4 py-3 shadow-soft">
                ✅ Smart availability polls
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/40 px-4 py-3 shadow-soft">
                🎮 Game rotation & veto rules
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/40 px-4 py-3 shadow-soft">
                📅 Calendar sync & reminders
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/40 px-4 py-3 shadow-soft">
                🗳️ Quick votes, fair scheduling
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
