"use client";

import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

type Task = { id: number; name: string; user_id: string; created_at?: string };

export function TasksPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clerk hooks
  const { user, isLoaded: userLoaded } = useUser();
  const { session, isLoaded: sessionLoaded } = useSession();

  // Create a Supabase client that injects the Clerk session token
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!, // (this is the anon key in your tutorial)
      {
        // If you created a Clerk JWT Template named "supabase", prefer:
        // async accessToken() { return (await session?.getToken({ template: "supabase" })) ?? null }
        async accessToken() {
          return (await session?.getToken()) ?? null;
        },
        auth: { persistSession: false }, // Clerk is the source of truth; do not keep a separate Supabase auth session
      },
    );
  }

  // Build the client (same pattern as Clerk’s guide)
  const client = createClerkSupabaseClient();

  // Only query when both user AND session are loaded
  const canQuery = userLoaded && sessionLoaded && !!user && !!session;

  useEffect(() => {
    if (!canQuery) return;

    (async () => {
      setErrorMsg(null);
      setLoading(true);
      const { data, error } = await client
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setTasks((data as Task[]) ?? []);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canQuery]); // run once when Clerk session is ready

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !user) return;

    setErrorMsg(null);

    // Optional but recommended: include user_id to satisfy WITH CHECK explicitly
    const { error } = await client.from("tasks").insert({
      name: name.trim(),
      user_id: user.id,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setName("");

    // Re-fetch
    const { data } = await client
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });
    setTasks((data as Task[]) ?? []);
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
      <h2 className="text-xl font-semibold">Tasks (CSR)</h2>

      {errorMsg && <p className="mt-2 text-sm text-red-400">{errorMsg}</p>}

      {loading && <p className="mt-2 text-muted-foreground">Loading…</p>}

      {!loading && tasks.length === 0 && !errorMsg && (
        <p className="mt-2 text-muted-foreground">No tasks found</p>
      )}

      {!loading && tasks.length > 0 && (
        <ul className="mt-3 space-y-1">
          {tasks.map((t) => (
            <li key={t.id} className="text-sm">
              {t.name}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={createTask} className="mt-4 flex items-center gap-2">
        <input
          className="h-10 flex-1 rounded-lg border border-border/50 bg-background px-3 text-sm outline-none"
          autoFocus
          type="text"
          name="name"
          placeholder="Enter new task"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          type="submit"
          className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Add
        </button>
      </form>
    </div>
  );
}
