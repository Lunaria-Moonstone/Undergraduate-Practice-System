import { selectSafty, updateSafty } from "@/utils/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let original_info_from_cookie = cookies().get('user');
  let user: { role: number, role_id: string };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  /**
   * 找用户数据
   */
  let role_map: { [key: number]: string } = {
    1: 'student', 2: 'teacher', 3: 'company'
  };
  let user_info: { ok: boolean, results: Array<{ id: string, grade: string }> } = (await selectSafty({ field: [ 'id' ], table: role_map[user.role], where: {id: user.role_id}, limit: 1 })) as { ok: boolean, results: Array<{ id: string, grade: string }> };
  if (!user_info || !user_info.ok || user_info.results.length === 0) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未找到用户信息' }, null, 2)], {
      type: 'application/json',
    }));
  }
  return new NextResponse(new Blob([JSON.stringify({ ok: true, results: user_info.results[0] }, null, 2)], {
    type: 'application/json',
  }));
}

export async function PUT(request: NextRequest ) {
  let results: unknown;

  let param = request.body;
  let request_body = await (new Response(param)).blob();
  let data = JSON.parse(await request_body.text());

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);
  
  try {
    results = await updateSafty({ field: { ...data }, table: 'teacher', where: { id: user.role_id } });
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