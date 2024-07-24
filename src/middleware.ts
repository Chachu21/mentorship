import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface ParsedData {
  isLogin?: boolean;
  role?: string;
}

const allowedRoles: { [key: string]: string[] } = {
  "/admin": ["admin"],
  "/mentordashboard": ["mentor"],
  "/menteedashboard": ["mentee"],
};

export default function middleware(request: NextRequest) {
  // Get cookie data
  const cookiesInstance = cookies(); // Create cookies instance
  const verify = cookiesInstance.get("data"); // Get the "data" cookie

  // Parse the cookie value if it exists
  let parsedData: ParsedData = {};
  if (verify) {
    try {
      parsedData = JSON.parse(verify.value);
    } catch (error) {
      console.error("Failed to parse cookie data:", error);
    }
  }

  // Extract role and login status
  const role = parsedData.role ?? ""; // Default to empty string if role is missing
  const isLogin = parsedData.isLogin ?? false; // Default to false if isLogin is missing

  // Extract the base path (first part of the path)
  const pathname = request.nextUrl.pathname;
  const basePath = `/${pathname.split("/")[1]}`;
  // Check if user is logged in and has the appropriate role
  if (isLogin && allowedRoles[basePath]?.includes(role)) {
    return NextResponse.next(); // Allow access
  } else {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to login page
  }
}

// Matches all requests to the specified paths
export const config = {
  matcher: [
    "/admin/:path*",
    "/mentordashboard/:path*",
    "/menteedashboard/:path*",
  ],
};
