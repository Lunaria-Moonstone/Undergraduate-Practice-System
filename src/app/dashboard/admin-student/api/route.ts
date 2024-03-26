import { executeQuery, insertSafty, selectSafty } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
import uuid from 'node-uuid';

import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('student');

export async function GET(request: NextRequest) {
  // return await router.GET('*', );
  let results: unknown;
  let query = request.nextUrl.searchParams;
  try {
    if (query.has('keyword')) {
      let keyword = query.get('keyword');
      results = await executeQuery({
        query: `
        SELECT * FROM student WHERE name LIKE ? OR number LIKE ?
        `,
        values: ['%' + keyword + '%', '%' + keyword + '%']
      });
    } else {
      results = await executeQuery({
        query: `
        SELECT * FROM student
        `,
        values: []
      });
    }
  } catch (error) {
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

export async function POST(request: NextRequest) {
  let results: unknown;
  let request_body = await (new Response(request.body)).blob();
  let id = uuid.v4();
  let { name, number, grade, phone, mail } = JSON.parse((await request_body.text()));
  let proof = JSON.stringify([], null, 2);
  let vitae = JSON.stringify([], null, 2);
  let is_practice = 0;
  let has_proof = 0;
  let has_vitae = 0;

  // return await router.POST({ id, name, number, grade, phone, mail, proof, vitae, is_practice, has_proof, has_vitae });
  try {
    let sub_results = await insertSafty({ field: { id, name, number, grade, phone, mail, proof, vitae, is_practice, has_proof, has_vitae }, table: 'student', insert_values_num: 11 })
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