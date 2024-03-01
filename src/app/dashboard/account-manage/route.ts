import { executeQuery } from "@/utils/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let results: unknown;
  let param = request.body;

  let request_body = await (new Response(param)).blob();
  let { role, role_id, name } = JSON.parse(await request_body.text());
  console.log(typeof role)
  if ([0, 1, 2, 3].findIndex(x => role === x) === -1) {
    return new NextResponse(new Blob([JSON.stringify({ ok: false, error: '角色类型不存在'})]));
  }

  let id = nanoid();

  try {
    results = await executeQuery({
      query: `
        INSERT INTO \`user\`(\`id\`, \`name\`, \`password\`, \`role\`, \`foreign_id\`)
        VALUE(?, ?, ?, ?, ?)
      `,
      values: [id, name, '123456', Number(role), role_id]
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

export async function DELETE(request: NextRequest) {
  let results: unknown;
  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty'})]));

  try {
    results = await executeQuery({
      query: `
        DELETE FROM \`user\`
        WHERE id=?
      `,
      values: [id]
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