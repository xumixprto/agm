// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  // protect /dashboard and its subpaths
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const { userId, redirectToSignIn } = await auth(); // v5 requires await
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
  // otherwise continue
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // skip Next internals & static files
    "/(api|trpc)(.*)",
  ],
};
