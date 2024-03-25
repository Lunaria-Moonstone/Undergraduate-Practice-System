import { insertSafty } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
// import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import uuid from 'node-uuid';

const router = new RouterFactory('teacher');

export async function GET() {
  return await router.GET('*', );
}

export async function POST(request: NextRequest) {
  let results: unknown;
  let request_body = await (new Response(request.body)).blob();
  // let id = nanoid();
  let id = uuid.v4();
  let { name, number, phone, mail } = JSON.parse((await request_body.text()));
  // return await router.POST({ id, name, number, phone, mail });
  try {
    let sub_results = await insertSafty({ field: {id, name, number, phone, mail }, table: 'teacher', insert_values_num: 5 })
    results = { ...sub_results, id, };
  } catch (error: unknown) {
    results = error;
  } finally {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    return new Response(blob, {
      status: 200,
    });
  }
}

export async function DELETE(request: NextRequest) {
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty'})]));
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