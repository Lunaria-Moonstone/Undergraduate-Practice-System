import { executeQuery } from "@/utils/db";
import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const router = new RouterFactory(
  '', 
  async (teacher_id: string) => {
    let results: unknown;
    let sql = `
    SELECT st.*, stm.id as id FROM student_teacher_map stm
    INNER JOIN student st ON stm.student_id=st.id
    WHERE stm.teacher_id=?
    `;
    try {
      const exec_res = await executeQuery({
        query: sql,
        values: [ teacher_id ]
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
        values: [ id, student_id, teacher_id ]
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
        values: [ id ]
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

export async function GET() {
  return await router.GET(
    // @ts-ignore
    '79yJMFZdPG3xmFX3UkYSQ', 
  );
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
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty'})]));
  // @ts-ignore
  return await router.DELETE(id);
}