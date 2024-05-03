import { executeQuery } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let result
  try {
    result = await executeQuery({
      query: `
    SELECT (SUM(CASE WHEN s.is_ok = 1 THEN 1 ELSE 0 END) / COUNT(*)) AS ratio 
    FROM student_practice_experience s 
    `,
      values: []
    })
  } catch (err) {
    
  }
  return new NextResponse(new Blob([JSON.stringify(result, null, 2)], {
    type: 'application/json',
  }));
}