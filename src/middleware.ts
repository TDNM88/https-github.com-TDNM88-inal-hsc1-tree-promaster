import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value

  // Public paths that don't require authentication
<<<<<<< HEAD
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
=======
  const publicPaths = ["/login", "/register", "/api/login", "/api/register"]

  // Check if the path is public
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check for authentication token
  const token = request.cookies.get("auth_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  // Redirect to login if no token and trying to access protected routes
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/trade") || pathname.startsWith("/account"))) {
    return NextResponse.redirect(new URL("/login", request.url))
>>>>>>> 45475aa807b74683eec393af01d071e54b7296cd
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
