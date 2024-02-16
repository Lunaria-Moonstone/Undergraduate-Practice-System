import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('job');

export async function GET() {
  return await router.GET('*', { company_id: '8qdq3MN5Lw0id1PU_yct3' },)
}

export async function POST(request: NextRequest) {
  let request_body = await (new Response(request.body)).blob();
  let id = nanoid();
  let company_id = "8qdq3MN5Lw0id1PU_yct3";
  let { name, salary, descript } = JSON.parse((await request_body.text()));
  return await router.POST({ id, company_id, name, salary, descript });
}

export async function DELETE(request: NextRequest) {
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' })]));
  return await router.DELETE({ id });
}

export async function PUT(request: NextRequest) {
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty'})]));
  let change_msg = JSON.parse(await ((await new NextResponse(request.body).blob()).text()));
  for (let change_msg_key of Object.keys(change_msg)) {
    if ( !change_msg[change_msg_key] ) {
      delete change_msg[change_msg_key];
    }
  }
  return await router.PUT(change_msg, { id });
}