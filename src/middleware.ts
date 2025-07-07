import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value || 
               request.cookies.get("auth_token")?.value || 
               request.headers.get("authorization")?.replace("Bearer ", "")

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/api/login", "/api/register"]
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // Admin paths that require admin role
  const adminPaths = ["/admin"]
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

  // User paths that require user authentication
  const userPaths = ["/trade", "/deposit", "/withdraw", "/orders", "/account"]
  const isUserPath = userPaths.some((path) => pathname.startsWith(path))

  // If no token and trying to access protected route
  if (!token && (isAdminPath || isUserPath)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If has token and trying to access auth pages, redirect to dashboard
  if (token && isPublicPath) {
    // Redirect to home which will handle the role-based redirect
    return NextResponse.redirect(new URL("/", request.url))
  }

  // For root path, redirect to login if no token
  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
