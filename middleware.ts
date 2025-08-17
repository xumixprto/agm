// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();
  const path = req.nextUrl.pathname;

  // 1) If you're signed in and hit the homepage, go to /dashboard
  if (userId && path === "/") {
    return Response.redirect(new URL("/dashboard", req.url));
  }

  // 2) Protect /dashboard (and subpaths)
  if (path.startsWith("/dashboard")) {
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
