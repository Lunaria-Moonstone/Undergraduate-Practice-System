import { selectSafty, updateSafty } from "@/utils/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let original_info_from_cookie = cookies().get('user');
  let user: { name: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);
  return new NextResponse(new Blob([JSON.stringify({ ok: true, results: { name: user.name } }, null, 2)], {
    type: 'application/json',
  }));
}

export async function PUT(request: NextRequest) {
  let results: unknown;

  let param = request.body;
  let request_body = await (new Response(param)).blob();
  let { password, new_password } = JSON.parse(await request_body.text());

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);
  
  try {
    let check: { ok: boolean, results: Array<any> } = await selectSafty({ field: ['*'], table: 'user', where: { foreign_id: user.role_id, password: password } }) as { ok: boolean, results: Array<any> } ;
    if (!check.ok || (check.ok && check.results.length === 0)) {
      throw new Error();
    }
    results = await updateSafty({ field: { password: new_password }, table: 'user', where: { foreign_id: user.role_id, password: password } });
  } catch (error: unknown) {
    results = error;
  } finally {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    return new Response(blob, {
      status: 200,
      headers: { 'Set-Cookie': 'token=hi' }
    });
  }
}