import { SiteNavbar } from "@/components/site-navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <Hero />
        <Features />
      </main>
      <footer className="border-t border-border/40">
        <div className="container py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} AGM — Adult Gaming Management
        </div>
      </footer>
    </>
  );
}
