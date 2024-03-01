import { executeQuery } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let results: unknown;

  let query = request.nextUrl.searchParams;
  let id = query.get('id');
  if (id === null) return new NextResponse(new Blob([JSON.stringify({ ok: false, error: 'id should not be empty'})]));  

  try {
    results = await executeQuery({
      query: `
      SELECT base64code FROM \`annex_history\`
      WHERE id=?
      `,
      values: [id]
    });
  } catch (error) {
    results = error;
  } finally {
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: 'application/json',
    });
    return new NextResponse(blob, {
      status: 200,
    });
  }
}