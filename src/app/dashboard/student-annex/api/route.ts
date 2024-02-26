import { dropSafty, executeQuery, insertSafty, selectSafty, updateSafty } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory('annex_history');

export async function GET() {
  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  try {
    // let user_practice_documents = 
    let proof = {};
    let vitae = {};
    let user_annexs: { ok: boolean, results: Array<{ proof: Buffer, vitae: Buffer }> } = await selectSafty({ field: ['proof', 'vitae'], table: 'student', where: { id: user.role_id }, limit: 1 }) as { ok: boolean, results: Array<{ proof: Buffer, vitae: Buffer }> };
    // console.log(Buffer.from(user_annexs.results[0].proof).toString());
    let proof_list: string[] = JSON.parse(Buffer.from(user_annexs.results[0].proof).toString());
    let vitae_list: string[] = JSON.parse(Buffer.from(user_annexs.results[0].vitae).toString());
    // console.log(vitae_list)
    if (proof_list.length !== 0)
      proof = await executeQuery({
        query: 'SELECT * FROM `annex_history` WHERE `id` IN (?) AND `type`="practice-document"',
        values: [proof_list],
      });
    else proof = { ok: true, results: [] };
    if (vitae_list.length !== 0)
      vitae = await executeQuery({
        query: 'SELECT * FROM `annex_history` WHERE `id` IN (?) AND `type`="resume"',
        values: [vitae_list]
      });
    else vitae = { ok: true, results: [] };
    // console.log(proof, vitae);
    return new NextResponse(new Blob([JSON.stringify({ ok: true, results: { proof, vitae } }, null, 2)], {
      type: 'application/json',
    }));
  } catch (err: unknown) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '抓取用户信息失败' }, null, 2)], {
      type: 'application/json',
    }));
  }
}

export async function POST(request: NextRequest) {
  // let request_body = await (new Response(request.body)).blob();
  // let id = nanoid();
  // let { type, base64code, } = JSON.parse((await request_body.text()));
  // return await router.POST({ id, type, base64code });
  let query = request.nextUrl.searchParams;
  let annex_type = query.get('type');
  if (!annex_type) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '材料类型不能为空' })]));
  if (annex_type !== 'resume' && annex_type !== 'practice-document') {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '材料类型错误' })]));
  }

  let body = JSON.parse(await ((await new NextResponse(request.body).blob()).text()));
  let { base64code } = body;

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  try {
    let id = nanoid();
    let insert_results = await insertSafty({ table: 'annex_history', field: { id, type: annex_type, base64code: base64code }, insert_values_num: 3 });
    console.log(insert_results);
    let student: { ok: boolean, results: Array<{ proof: Buffer, vitae: Buffer }> } = await selectSafty({ field: ['proof', 'vitae'], table: 'student', where: { id: user.role_id } }) as { ok: boolean, results: Array<{ proof: Buffer, vitae: Buffer }> };
    if (!student || !student['ok'] || student['results'].length === 0) {
      return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未找到用户信息' }, null, 2)], {
        type: 'application/json',
      }));
    }
    let proof_list: string[] = JSON.parse(Buffer.from(student.results[0].proof).toString());
    let vitae_list: string[] = JSON.parse(Buffer.from(student.results[0].vitae).toString());
    if (annex_type === 'resume') {
      vitae_list.push(id);
    } else {
      proof_list.push(id);
    }
    await updateSafty({ field: { proof: JSON.stringify(proof_list), vitae: JSON.stringify(vitae_list) }, table: 'student', where: { id: user.role_id } });
  } catch (err: unknown) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '写入数据库错误' }, null, 2)], {
      type: 'application/json',
    }));
  }
  return new NextResponse(new Blob([JSON.stringify({ ok: true }, null, 2)], {
    type: 'application/json',
  }));
}

export async function DELETE(request: NextRequest) {
  let query = request.nextUrl.searchParams;
  // let annex_type = query.get('type');
  // if (annex_type === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '材料类型不能为空' })]));
  // if (annex_type !== 'resume' && annex_type !== 'practive_document') {
  //   return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '材料类型错误' })]));
  // }

  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '编号不能为空' })]));

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string, };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  try {
    await dropSafty({ table: 'annex_history', where: { id } });
    let student: { ok: boolean, results: Array<{ proof: Buffer, vitae: Buffer }> } = await selectSafty({ field: ['proof', 'vitae'], table: 'student', where: { id: user.role_id } }) as { ok: boolean, results: Array<{ proof: Buffer, vitae: Buffer }> };
    if (!student || !student['ok'] || student['results'].length === 0) {
      return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未找到用户信息' }, null, 2)], {
        type: 'application/json',
      }));
    }
    let proof_list: string[] = JSON.parse(Buffer.from(student.results[0].proof).toString());
    let vitae_list: string[] = JSON.parse(Buffer.from(student.results[0].vitae).toString());
    vitae_list = vitae_list.filter(x => x !== id);
    proof_list = proof_list.filter(x => x !== id);
    await updateSafty({ field: { proof: JSON.stringify(proof_list), vitae: JSON.stringify(vitae_list) }, table: 'student', where: { id: user.role_id } });
  } catch (err: unknown) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '写入数据库错误' }, null, 2)], {
      type: 'application/json',
    }));
  }
  return new NextResponse(new Blob([JSON.stringify({ ok: true }, null, 2)], {
    type: 'application/json',
  }));
}

// export async function PUT(request: NextRequest) {
//   let query = request.nextUrl.searchParams;
//   let id = query.get('id');
//   if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' })]));
//   let change_msg = JSON.parse(await ((await new NextResponse(request.body).blob()).text()));
//   for (let change_msg_key of Object.keys(change_msg)) {
//     if (!change_msg[change_msg_key]) {
//       delete change_msg[change_msg_key];
//     }
//   }
//   return await router.PUT(change_msg, { id });
// }