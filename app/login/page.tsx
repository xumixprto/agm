import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="container py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-border/50 bg-card/60 p-6 shadow-soft">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to AGM
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your groups, schedules, and game nights.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
