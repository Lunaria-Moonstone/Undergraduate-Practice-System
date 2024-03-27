import { executeQuery } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
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
      SELECT st.practice_document_model FROM \`student_teacher_map\` st
      WHERE student_id=? LIMIT 1
      `,
      values: [user.role_id]
    });
    let base_results = (results as { ok: boolean, results: { practice_document_model: string }[] })
    if (base_results.results.length === 0) {
      return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '暂未绑定导师或导师未上传模板' }, null, 2)], {
        type: 'application/json',
      }))
    } else {
      const blob = fetch(`data:application/octet-stream;base64,${base_results.results[0].practice_document_model}`).then(res => res.blob());
      response.setHeader('Content-Type', 'application/pdf');
      response.setHeader(
        'Content-Disposition',
        'attachment; filename="downloaded.pdf"'
      );
      return blob.then(blob => {
        response.send(blob);
      });
    }
  } catch (err: unknown) {
    results = err;
    return new NextResponse(new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    }))
  }
}