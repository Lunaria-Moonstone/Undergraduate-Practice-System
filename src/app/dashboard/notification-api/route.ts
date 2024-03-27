import { executeQuery } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
// import { nanoid } from "nanoid";
import uuid from 'node-uuid';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('notification');

export async function GET(request: NextRequest) {
  let results: unknown;

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

  // console.log(role_id)

  // return await router.GET('*', { role_id, role });
  try {
    results = await executeQuery({
      query: `
      SELECT * FROM notification WHERE role_id = ? OR create_by = ?
      `,
      values: [role_id, role_id],
    });
  } catch (error) {
    results = error;
  } finally {
    return new NextResponse(new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    }));
  }
}

export async function POST(request: NextRequest) {
  let result: unknown;

  let request_body = await (new Response(request.body)).blob();

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  // let id = nanoid();
  let id = uuid.v4();
  let { title, simple_descript, descript } = JSON.parse((await request_body.text()));

  // return await router.POST({ id, title, simple_descript, descript, role_id: null, create_by: user.role_id });
  try {
    result = await executeQuery({
      query: `
      INSERT INTO notification (id, role_id, \`role\`, title, simple_descript, descript, create_by)
      SELECT ? AS id, st.id AS role_id, 1 AS \`role\`, ? AS title, ? AS simple_descript, ? AS descript, ? AS create_by
      FROM student_teacher_map stm
      INNER JOIN student st ON stm.student_id=st.id
      WHERE stm.teacher_id = ?;
      `,
      values: [id, title, simple_descript, descript, user.role_id, user.role_id]
    })
  } catch (error) {
    result = error;
  } finally {
    return new NextResponse(new Blob([JSON.stringify(result, null, 2)], {
      type: 'application/json',
    }));
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