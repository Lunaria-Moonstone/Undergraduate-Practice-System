import { RouterFactory } from "@/utils/factory";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory("user");

export async function POST(request: NextRequest) {
  let blob = await new Response(request.body).blob();
  let { name, password }: { name: string, password: string } = JSON.parse(await blob.text());

  if (!name || name.length === 0) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'name should not be empty' })]));
  if (!password || password.length === 0) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'password should not be empty' })]));

  return router.GET(['name', 'role', 'foreign_id'], { name: name, password: password });
}