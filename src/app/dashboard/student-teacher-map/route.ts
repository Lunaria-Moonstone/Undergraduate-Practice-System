import { executeQuery } from "@/utils/db";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let results: unknown;

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  try {
    results = await executeQuery({
      query: `
      SELECT t.* FROM \`student_teacher_map\` st
      LEFT JOIN \`teacher\` t ON t.id=st.teacher_id
      WHERE student_id=? LIMIT 1
      `,
      values: [user.role_id]
    });
  } catch (err: unknown) {
    results = err;
  } finally {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    return new NextResponse(blob, {
      status: 200,
    });
  }
}
export async function POST(request: NextRequest) {
  let results: unknown;

  let { id } = JSON.parse(await ((await new NextResponse(request.body).blob()).text()));

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  try {
    results = await executeQuery({
      query: `
      INSERT INTO \`student_teacher_map\`(id, student_id, teacher_id)
      VALUE(?, ?, ?)
      `,
      values: [nanoid(), user.role_id, id]
    });
  } catch (err: unknown) {
    results = err;
  } finally {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    return new NextResponse(blob, {
      status: 200,
    });
  }
}