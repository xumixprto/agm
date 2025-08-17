// app/dashboard/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { TasksPanel } from "@/components/dashboard/tasks-panel";

export const dynamic = "force-dynamic"; // never prerender statically

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/dashboard");

  const user = await currentUser();

  return (
    <main className="container py-8 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}! 🎮
          </h1>
          <p className="text-muted-foreground">
            This panel reads/writes Supabase on the client using your Clerk
            session token.
          </p>
        </div>

        {/* Avatar with dropdown (includes Sign out). Redirects home on sign-out */}
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10", // size tweak to match your UI
              },
            }}
            // Optional: if you add a dedicated profile page:
            // userProfileMode="navigation"
            // userProfileUrl="/user"
          />
        </SignedIn>
      </header>

      <section className="space-y-6">
        <TasksPanel />
      </section>
    </main>
  );
}
