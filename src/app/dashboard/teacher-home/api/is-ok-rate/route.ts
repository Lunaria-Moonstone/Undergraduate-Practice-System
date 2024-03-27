import { executeQuery } from "@/utils/db";
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
      SELECT (SUM(CASE WHEN s.is_ok = 1 THEN 1 ELSE 0 END) / COUNT(*)) AS ratio 
      FROM student_practice_experience s 
      LEFT JOIN student_teacher_map stm ON s.student_id = stm.student_id
      WHERE stm.teacher_id = ?;
      `,
      values: [user.role_id]
    });
  } catch (err) {
    results = err;
  } finally {
    return new NextResponse(new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    }));
  }
}