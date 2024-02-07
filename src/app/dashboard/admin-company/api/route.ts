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
  let param = request.body;

  let request_body = await (await new Response(param)).blob();
  let { name, phone, mail } = JSON.parse(await request_body.text()); // fetch company name, phone and mail message
  

  return new Response('success!', {
    status: 200,
    headers: { 'Set-Cookie': 'token=hi' }
  })
}

export async function DELETE(request: Request) {

}

export async function PUT(request: Request) {

}