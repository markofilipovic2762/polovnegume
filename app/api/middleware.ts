import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Protect /admin and /api/admin/*
  if (url.pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token || token !== process.env.ADMIN_PASSWORD) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
