import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { pass } = await request.json();

  if (pass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", process.env.ADMIN_PASSWORD!, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return res;
}
