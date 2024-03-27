import { executeQuery } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory(
  '',
  async (teacher_id: string) => {
    let results: unknown;
    let sql = `
    SELECT st.* FROM student_teacher_map stm
    LEFT JOIN student st ON stm.student_id=st.id
    WHERE stm.teacher_id=?
    `;
    try {
      const exec_res = await executeQuery({
        query: sql,
        values: [teacher_id]
      });
      results = exec_res;
    } catch (error: unknown) {
      results = { ok: false, error };
    } finally {
      const blob = new Blob([JSON.stringify(results, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200,
      });
    }
  },
  async (id: string, teacher_id: string, student_id: string) => {
    let results: unknown;
    let sql = `
      INSERT INTO student_teacher_map 
      VALUE (?, ?, ?)
    `;
    try {
      const exec_res = await executeQuery({
        query: sql,
        values: [id, student_id, teacher_id]
      });
      results = exec_res;
    } catch (error: unknown) {
      results = { ok: false, error };
    } finally {
      const blob = new Blob([JSON.stringify(results, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200,
      });
    }
  },
  async (id: string) => {
    let results: unknown;
    let sql = `
      DELETE FROM student_teacher_map WHERE id=?
    `;
    try {
      const exec_res = await executeQuery({
        query: sql,
        values: [id]
      });
      results = exec_res;
    } catch (error: unknown) {
      results = { ok: false, error };
    } finally {
      const blob = new Blob([JSON.stringify(results, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200,
      });
    }
  },
);

export async function GET(request: NextRequest) {

  let results: unknown;
  let query = request.nextUrl.searchParams;

  let original_info_from_cookie = cookies().get('user');
  let user: { role_id: string };
  if (!original_info_from_cookie)
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '未登录' }, null, 2)], {
      type: 'application/json',
    }));
  user = JSON.parse(original_info_from_cookie.value);

  try {
    if (query.has('keyword')) {
      let keyword = query.get('keyword');
      results = await executeQuery({
        query: `
        SELECT st.* FROM student_teacher_map stm
        LEFT JOIN student st ON stm.student_id=st.id
        WHERE stm.teacher_id=? AND st.name LIKE ?
        `,
        values: [user.role_id, `%${keyword}%`]
      });
    } else {
      results = await executeQuery({
        query: `
        SELECT st.* FROM student_teacher_map stm
        LEFT JOIN student st ON stm.student_id=st.id
        WHERE stm.teacher_id=?
        `,
        values: [user.role_id]
      });
    }
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

export async function POST(request: NextRequest) {
  let request_body = await (new Response(request.body)).blob();
  let id = nanoid();
  let { student_id, teacher_id } = JSON.parse((await request_body.text()));
  // @ts-ignore
  return await router.POST(id, teacher_id, student_id);
}

export async function DELETE(request: NextRequest) {
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' })]));
  // @ts-ignore
  return await router.DELETE(id);
}

export async function PATCH(request: NextRequest) {
  let results: unknown;

  let request_body = await (new Response(request.body)).blob();
  let { id, rate } = JSON.parse((await request_body.text()));
  if (!id || !rate) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '参数错漏' }, null, 2)], {
      type: 'application/json',
    }));
  }

  try {
    results = await executeQuery({
      query: `
      UPDATE \`student\` SET score=? WHERE id=?
      `,
      values: [rate, id]
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