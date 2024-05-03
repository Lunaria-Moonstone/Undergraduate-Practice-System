import { executeQuery } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('student_practice_experience');

export async function GET() {
  let results: unknown;

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  // return await router.GET('*', { student_id: user.role_id });
  try {
    results = await executeQuery({
      query: `
        SELECT c.name as company_name, s.* FROM \`student_practice_experience\` s 
        LEFT JOIN \`company\` c ON s.company_id=c.id
        WHERE s.student_id=?
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
  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  let request_body = await (new Response(request.body)).blob();
  let id = nanoid();
  let { company_id, start, end, checked } = JSON.parse((await request_body.text()));
  let student_id = user.role_id;
  return await router.POST({ id, company_id, student_id, start, end, is_ok: checked ? 1 : 0 })
}

export async function DELETE(request: NextRequest) {
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' })]));
  return await router.DELETE({ id });
}

export async function PATCH(request: NextRequest) {
  let results

  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' })]));
  // return await router.DELETE({ student_id: id })
  
  try {
    results = await executeQuery({
      query: `
      DELETE FROM student_practice_experience WHERE student_id=?
      `,
      values: [ id ]
    })
  } catch (err: unknown) {
    results = err;
  }
  return new NextResponse(new Blob([JSON.stringify(results, null, 2)], {
    type: 'application/json',
  }));
}
// export async function PUT(request: NextRequest) {
//   let query = request.nextUrl.searchParams;
//   let id = query.get('id');
//   if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty'})]));
//   let change_msg = JSON.parse(await ((await new NextResponse(request.body).blob()).text()));
//   for (let change_msg_key of Object.keys(change_msg)) {
//     if ( !change_msg[change_msg_key] ) {
//       delete change_msg[change_msg_key];
//     }
//   }
//   return await router.PUT(change_msg, { id });
// }