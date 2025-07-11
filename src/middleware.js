import { withAuth } from "next-auth/middleware";

/**
 * Runs for every request that matches `config.matcher`.
 * Redirects unauthenticated users to /login.
 */
export default withAuth(
  function middleware(req) {
    // Add debugging to see what's happening
    console.log("🔍 Middleware running for:", req.nextUrl.pathname);
    console.log("🎫 Token exists:", !!req.nextauth.token);
    console.log("👤 User:", req.nextauth.token?.email || "No user");
    
    // Additional logic can go here if needed
    // For example, role-based access control
  },
  {
    callbacks: {
      authorized({ token, req }) {
        console.log("🛡️ Authorization check - Token:", !!token);
        console.log("🛡️ Path:", req.nextUrl.pathname);
        
        // Allow access only if token exists
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

/**
 * Protect **all** routes except:
 *   - /login   (sign‑in page)
 *   - /api/*   (NextAuth + any other APIs)
 *   - Next.js static assets  (_next, images, etc.)
 *   - favicon.ico
 *
 * Feel free to extend the ignore list.
 */
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /api routes
     * - /_next static files
     * - /favicon.ico
     * - /login page
     */
    "/((?!login|api|_next|favicon.ico).*)",
  ],
};