

export async function GET(request: Request) {
  return new Response(new Blob(), {
    status: 200,
    headers: { 'Set-Cookie': `token=hi`}
  });
}