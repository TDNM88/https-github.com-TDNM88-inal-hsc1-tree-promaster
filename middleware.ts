import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")
  const { pathname } = request.nextUrl

  // Allow access to login page
  if (pathname === "/login") {
    return NextResponse.next()
  }

  // Redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const user = JSON.parse(token.value)

    // Admin can access everything
    if (user.role === "admin") {
      return NextResponse.next()
    }

    // Regular users redirect to trade page
    if (pathname === "/" && user.role === "user") {
      return NextResponse.redirect(new URL("/trade", request.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
