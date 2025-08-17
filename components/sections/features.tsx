// components/sections/features.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type FeatureItem = {
  title: string;
  body: string;
};

const ITEMS: FeatureItem[] = [
  {
    title: "Availability without chaos",
    body: "Members mark windows that work. AGM proposes the best slot automatically, factoring time zones and preferences.",
  },
  {
    title: "Pick the game, fairly",
    body: "Rotate your library or run quick votes. Weight past picks so everyone gets turns, with optional veto rules.",
  },
  {
    title: "Commit and show up",
    body: "Lock in dates, auto-post to calendars, and get reminders. No more last-minute confusion.",
  },
  {
    title: "Group-first design",
    body: "Multiple groups, sub-teams, and roles. Works for duo nights, squads, or the entire server.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="container">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Why AGM?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for grown-up gamers who love the hobby—but have jobs,
            families, and schedules.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <Card key={it.title} className="bg-card/60">
              <CardHeader>
                <CardTitle className="text-primary">{it.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {it.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
