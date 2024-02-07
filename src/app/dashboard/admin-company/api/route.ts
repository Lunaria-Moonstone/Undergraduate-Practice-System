import executeQuery from "@/utils/db";

export async function GET(request: Request) {
  let result: unknown;
  let param = request.body;
  console.log(param);
  try {
   result = await executeQuery({
    query: 'SELECT * FROM `company`',
    values: [],
   });
   console.log(result);
  } catch (error) {
    result = error;
  } finally {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: 'application/json',
    });
    return new Response(blob, {
      status: 200,
      headers: { 'Set-Cookie': `token=hi`}
    });
  }
}

export async function POST(request: Request) {
  let result: unknown;
}