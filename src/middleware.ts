import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export const middleware = withAuth(
  async function middlewareFn(request: NextRequest) {
    console.log(request.url);
  },
  {
    isReturnToCurrentPage: true,
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except those starting with:
     * - api
     * - _next/static
     * - _next/image
     * - auth
     * - favicon.ico    
     * - robots.txt
     * - images
     * - login
     */
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login).*)",
  ],
};
