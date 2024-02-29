import { executeQuery } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('job');

export async function GET() {
  let results: unknown;

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  // return await router.GET('*',);
  try {
    results = await executeQuery({
      query: `
      SELECT c.name AS company_name, j.* FROM \`job\` j 
      LEFT JOIN \`company\` c ON c.id=j.company_id
      WHERE j.id NOT IN (
        SELECT job_id FROM \`job_audit\` WHERE student_id=?
      )
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
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' })]));

  let { resume } = JSON.parse(await ((await new NextResponse(request.body).blob()).text()));

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
      INSERT INTO \`job_audit\` (
        id, student_id, company_id, job_id, 
        progress, feedback, \`resume\`
      ) 
      SELECT 
        ? AS id, 
        ? AS student_id, 
        j.company_id AS company_id, 
        j.id AS job_id,
        '未读' AS progress,
        '暂无回复' AS feedback,
        ? AS \`resume\`
      FROM \`job\` j
      WHERE j.id=? LIMIT 1;
      `,
      values: [nanoid(), user.role_id, resume, id]
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