import { RouterFactory } from "@/utils/factory";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { selectSafty } from "@/utils/db";


export async function POST(request: NextRequest) {
  let blob = await new Response(request.body).blob();
  let { name, password }: { name: string, password: string } = JSON.parse(await blob.text());

  if (!name || name.length === 0) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'name should not be empty' })]));
  if (!password || password.length === 0) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'password should not be empty' })]));

  let result: unknown;
  try {
    result = (await selectSafty({ field: ['name', 'role'], table: 'user', where: { name, password }, limit: 1 }));
    console.log((result as { ok: boolean, results: Array<any> })['results'].length);
    if ((result as { ok: boolean, results: Array<any> })['results'].length === 0 || !(result as { ok: boolean, results: Array<any> })['ok']) {
    } else {
      let role = Buffer.from((result as { ok: boolean, results: Array<any> })['results'][0]['role'])[0];
      cookies().set({
        name: 'user',
        value: JSON.stringify({ name, role }),
        maxAge: 60 * 60 * 24 * 7,
      });
      console.log('cookies user: ', cookies().get('user')?.value)
    }
  } catch (err: unknown) {
    console.log(err);
    result = err;
  } finally {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: 'application/json',
    });
    return new NextResponse(blob, {
      status: 200,
    });
  }
}