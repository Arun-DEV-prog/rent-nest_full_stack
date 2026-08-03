import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Safely decodes JWT payload string without external dependencies
 */
function decodeJwt(token: string): { role?: string; exp?: number } | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Route protection proxy function for Admin, Landlord, and Tenant routes
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin-dashboard");
  const isLandlordRoute = pathname.startsWith("/landlord-dashboard");
  const isTenantRoute = pathname.startsWith("/tenant-dashboard");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // If path is neither a protected dashboard route nor an auth route, pass through
  if (!isAdminRoute && !isLandlordRoute && !isTenantRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;
  const payload = token ? decodeJwt(token) : null;
  const isTokenValid = Boolean(
    payload && (!payload.exp || payload.exp * 1000 > Date.now())
  );

  // 1. Handle Auth Routes (/login, /register) when already logged in
  if (isAuthRoute) {
    if (isTokenValid && payload) {
      if (payload.role === "admin") {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      }
      if (payload.role === "landlord") {
        return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
      }
      if (payload.role === "tenant") {
        return NextResponse.redirect(new URL("/tenant-dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Unauthenticated access to protected routes
  if (!token || !isTokenValid) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);
    if (token) {
      response.cookies.delete("accessToken");
    }
    return response;
  }

  const role = payload?.role;

  // 3. Protect Admin Routes
  if (isAdminRoute && role !== "admin") {
    if (role === "landlord") {
      return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
    }
    if (role === "tenant") {
      return NextResponse.redirect(new URL("/tenant-dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 4. Protect Landlord Routes
  if (isLandlordRoute && role !== "landlord") {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === "tenant") {
      return NextResponse.redirect(new URL("/tenant-dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 5. Protect Tenant Routes
  if (isTenantRoute && role !== "tenant") {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (role === "landlord") {
      return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/landlord-dashboard/:path*",
    "/tenant-dashboard/:path*",
    "/login",
    "/register",
  ],
};

