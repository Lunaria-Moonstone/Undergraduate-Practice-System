import { selectSafty } from "@/utils/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);
  let results: { ok: boolean, results: Array<any> } = await selectSafty({ field: ['name', 'number', 'phone', 'mail'], table: 'student', where: { id: user.role_id }, limit: 1 }) as { ok: boolean, results: Array<any> };
  if (!results || !results['ok'] || results['results'].length === 0) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '抓取用户信息失败' }, null, 2)], {
      type: 'application/json',
    }));
  }
  return new NextResponse(new Blob([JSON.stringify(results, null, 2)], {
    type: 'application/json',
  }));
}
