import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getUserFromRequest } from "./lib/auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/api/auth/login"]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check authentication
  const user = getUserFromRequest(request)

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect root to appropriate dashboard
  if (pathname === "/") {
    if (user.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url))
    } else {
      return NextResponse.redirect(new URL("/trade", request.url))
    }
  }

  // Admin routes
  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/trade", request.url))
  }

  // User routes
  if (pathname.startsWith("/trade") && user.role !== "user") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
