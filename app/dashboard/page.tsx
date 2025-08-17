// app/dashboard/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/dashboard");

  const user = await currentUser();

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-semibold">
        Welcome back{user?.firstName ? `, ${user.firstName}` : ""}! 🎮
      </h1>
      <p className="mt-2 text-muted-foreground">You’re signed in to AGM.</p>
    </main>
  );
}
