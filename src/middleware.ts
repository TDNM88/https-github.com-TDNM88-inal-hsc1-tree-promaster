import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register"]
  const isPublicPath = publicPaths.includes(pathname)

  // Admin paths that require admin role
  const adminPaths = ["/admin"]
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

  // User paths that require user authentication
  const userPaths = ["/trade", "/deposit", "/withdraw", "/orders", "/account"]
  const isUserPath = userPaths.some((path) => pathname.startsWith(path))

  // If no token and trying to access protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If has token and trying to access auth pages, redirect based on role
  if (token && isPublicPath) {
    // We can't easily decode the token here, so redirect to home
    // The home page will handle the proper redirect based on role
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
