import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest, res: NextResponse) {
  let user = cookies().get('user');
  if (!user) return NextResponse.redirect(new URL('/authorized/signin', req.url));
  return;
}

export const config = {
  matcher: [
    '/dashboard/(.*)',
    '/result/(.*)'
  ],
}