import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('notification');

export async function GET(request: NextRequest) {
  // let role_id = request.nextUrl.searchParams.get('id');
  // let role = request.nextUrl.searchParams.get('role');
  let cookies_msg = cookies().get('user');
  if (!cookies_msg) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, }, null, 2)], {
      type: 'application/json',
    }));
  }
  let { role_id, role } = JSON.parse(cookies_msg.value);
  if (!role_id || !role) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, }, null, 2)], {
      type: 'application/json',
    }));
  }

  return await router.GET('*', { role_id, role });
}

export async function POST(request: NextRequest) {
  let request_body = await (new Response(request.body)).blob();
  let id = nanoid();
  let { title, simple_descript, descript, role_id } = JSON.parse((await request_body.text()));

  return await router.POST({ id, title, simple_descript, descript, role_id });
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
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' })]));
  let change_msg = JSON.parse(await ((await new NextResponse(request.body).blob()).text()));
  for (let change_msg_key of Object.keys(change_msg)) {
    if (!change_msg[change_msg_key]) {
      delete change_msg[change_msg_key];
    }
  }
  return await router.PUT(change_msg, { id });
}