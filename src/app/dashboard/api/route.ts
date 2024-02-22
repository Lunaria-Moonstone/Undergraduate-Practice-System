import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let original_info_from_cookie = cookies().get('user');
  // console.log(original_info_from_cookie);
  if (!original_info_from_cookie) return new NextResponse(new Blob([JSON.stringify({ name: null, role: -1 }, null, 2)], {
    type: 'application/json'
  }));
  let user = JSON.parse(original_info_from_cookie.value);
  return new NextResponse(new Blob([JSON.stringify({ name: user['name'], role: user['role']}, null, 2)], {
    type: 'application/json'
  }));
}