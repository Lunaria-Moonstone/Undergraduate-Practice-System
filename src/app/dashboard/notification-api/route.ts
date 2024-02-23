import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(new Blob([JSON.stringify({ ok: true }, null, 2),], {
    type: 'application/json',
  }));
}