import { executeQuery } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import uuid from 'node-uuid';
import { PDFDocument } from "pdf-lib";

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
      SELECT ah.base64code as practice_document_model FROM \`student_teacher_map\` st
      LEFT JOIN \`teacher\` t ON t.id=st.teacher_id
      LEFT JOIN \`annex_history\` ah ON t.practice_document_model IS NOT NULL AND ah.id=t.practice_document_model
      WHERE st.student_id=? OR st.teacher_id=? LIMIT 1
      `,
      values: [user.role_id, user.role_id]
    });
    // console.log(results)
    let base_results = (results as { ok: boolean, results: { practice_document_model: string }[] })
    if (base_results.results.length === 0 || base_results.results[0].practice_document_model === null) {
      return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '暂未绑定导师或导师未上传模板' }, null, 2)], {
        type: 'application/json',
      }))
    } else {
      // const blob = fetch(`data:application/octet-stream;base64,${base_results.results[0].practice_document_model}`).then(res => res.blob());
      // response.setHeader('Content-Type', 'application/pdf');
      // response.setHeader(
      //   'Content-Disposition',
      //   'attachment; filename="downloaded.pdf"'
      // );
      // console.log(base_results.results[0].practice_document_model)
      // return response.end(Buffer.from(base_results.results[0].practice_document_model, 'binary'));
      let target = Buffer.from(base_results.results[0].practice_document_model, "base64");

      // 将base64字符串转换为pdf图像并生成二进制文件流
      const pdfBytes = await fetch(`data:application/pdf;base64,${base_results.results[0].practice_document_model}`).then(res => res.arrayBuffer());

      // console.log("data:application/pdf;base64," + Buffer.from(base_results.results[0].practice_document_model).toString());
      return new NextResponse(pdfBytes, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="downloaded.pdf"'
        }
      })
    }
  } catch (err: unknown) {
    console.log('error', err)
    results = err;
    return new NextResponse(new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    }))
  }
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  let results: unknown;
  
  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  let body = JSON.parse(await ((await new NextResponse(request.body).blob()).text()));
  let { base64code } = body;

  try {
    let id = uuid.v4()
    results = await executeQuery({
      query: `
      INSERT INTO annex_history (id, base64code, type) 
      VALUE (?, ?, 'practice-document');
      `,
      values: [id, base64code]
    });
    console.log(1, results)
    results = await executeQuery({
      query: `
      UPDATE teacher t SET t.practice_document_model=? 
      WHERE id=?;
      `,
      values: [id, user.role_id]
    });
    console.log(2, results)
  } catch (err: unknown) {
    results = err;
  } finally {
    return new NextResponse(new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    }));
  }
}