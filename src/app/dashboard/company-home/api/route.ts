import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('announcement');

export async function GET(request: NextRequest) {
  let id = request.nextUrl.searchParams.get('id');
  let params: { [key: string]: string } = {};
  if (id)
    params[id] = id

  return await router.GET('*', params);
}

export async function POST(request: NextRequest) {
  let request_body = await (new Response(request.body)).blob();
  let id = nanoid();
  let { title, descript } = JSON.parse((await request_body.text()));

  return await router.POST({ id, title, descript });
}

export async function DELETE(request: NextRequest) {
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty'})]));
  return await router.DELETE({ id });
}