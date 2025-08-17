import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppToaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AGM – Adult Gaming Management",
  description: "Plan and manage gaming sessions with your adult friend group.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-dvh">
          {children}
          <AppToaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
