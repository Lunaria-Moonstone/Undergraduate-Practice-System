import { RouterFactory } from "@/utils/factory";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

const router = new RouterFactory('teacher');

export async function GET() {
  return await router.GET('*', );
}

export async function POST(request: NextRequest) {
  let request_body = await (new Response(request.body)).blob();
  let id = nanoid();
  let { name, number, grade, phone, mail } = JSON.parse((await request_body.text()));
  return await router.POST({ id, name, number, grade, phone, mail });
}

export async function DELETE() {

}

export async function PUT() {

}