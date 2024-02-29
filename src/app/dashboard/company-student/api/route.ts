import { executeQuery } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('job_audit')

export async function GET(request: NextRequest) {
  let results: unknown;

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  // return await router.GET('*', { company_id: user.role_id });
  try {
    results = await executeQuery({
      query: `
      SELECT s.name, j.name, a.base64code as resume, ja.* FROM job_audit ja 
      LEFT JOIN student s ON ja.student_id=s.id
      LEFT JOIN job j ON ja.job_id=j.id
      LEFT JOIN annex_history a ON ja.resume=a.id 
      WHERE ja.company_id=?
      `,
      values: [user.role_id]
    });
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

// export async function POST() {

// }

// export async function PUT() {

// }

export async function PATCH(request:NextRequest) {
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

// export async function DELETE() {

// }