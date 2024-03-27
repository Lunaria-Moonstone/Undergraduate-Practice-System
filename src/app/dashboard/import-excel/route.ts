import { executeQuery } from "@/utils/db";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { utils, write, read } from "xlsx";
import uuid from "node-uuid";

export async function GET(request: NextRequest, response: NextApiResponse) {
  // let request_body = await (new Response(request.body)).blob();
  if (!request.nextUrl.searchParams.has("fields")) 
    return new Response("请提供要导入的字段", {status: 400});
  let fields = JSON.parse((request.nextUrl.searchParams.get("fields") as string));
  const work_book = utils.book_new();
  let work_sheet = utils.aoa_to_sheet([fields])
  utils.book_append_sheet(work_book, work_sheet, "Sheet1");
  const excelData = write(work_book, {type: "buffer", bookType: "xlsx"})
  
  // const blob = new Blob(excelData, {
  //   type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  // })
  // response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  return new NextResponse(excelData, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
  })
}

// 接收xlsx文件并解析
export async function POST(request: NextRequest) {
  
  // 接收xlsx文件并解析
  // let request_body = await (new Response(request.body)).blob();
  // let work_book = read(await request_body.arrayBuffer(), {type: "buffer"});
  // let work_sheet = work_book.Sheets[work_book.SheetNames[0]];
  
  // let data = utils.sheet_to_json(work_sheet, {header: 1});
  let query = request.headers;
  if (!query.has("role")) return new NextResponse("请提供要导入的表名", {status: 400});

  try {
    let formData = await request.formData();
    let file = formData.get("file") as File;
    let work_book = read(await file.arrayBuffer(), {type: "buffer"});
    let work_sheet = work_book.Sheets[work_book.SheetNames[0]];
    let data = utils.sheet_to_json(work_sheet, {header: 1});

    if (data.length <= 1) return new NextResponse("请提供数据", {status: 400});

    if (query.get('role') === 'student') {
      (data[0] as Array<string>).push('proof', 'vitae');
    } else if (query.get('role') === 'teacher') {
      // ...
    }
    let id_list = [];
    let sql =  "INSERT INTO `" + query.get('role') + "` ( `id`, " + (data.shift() as Array<string>).map(x => "`" + x + "`").join(", ") + ") VALUES ";
    let values = [];
    for (let i = 0; i < data.length; i++) {
      let id = uuid.v4();
      (data[i] as Array<string>).unshift(id);
      if (query.get('role') === 'student') (data[i] as Array<string>).push('[]', '[]');
      sql += "(" + [...(data[i] as Array<string>)].map(x => "?").join(", ") + "),";
      // let subsql = '';
      // 正确的数组拼接办法
      // [...(data[i] as Array<string>)].forEach(x => {
      //   if (x === undefined)
      //     console.log('fuck u');
      //   subsql += '?,'
      // })
      // subsql.slice(0, -1);
      // console.log(subsql)
      // console.log(sql)
      values.push(...(data[i] as Array<string>));
      id_list.push(id);
    }
    sql = sql.slice(0, -1);

    let results = (await executeQuery({
      query: sql,
      values: values,
    })) as { ok: boolean, results: any };
    
    if (!results.ok) {
      console.log(results)
      return new NextResponse("后台错误", {status: 400});
    }

    let role = query.get('role') as string === 'student' ? 1 : 2;

    let sql2nd = "INSERT INTO `user` (`id`, `role`, `name`, `password`, `foreign_id`) VALUES ";
    let values2nd = [];
    for (let i = 0; i < id_list.length; i++) {
      let id = uuid.v4();
      sql2nd += "( ?, ?, ?, ?, ? ),";
      values2nd.push(id, role, (data[i] as Array<string>)[2], "123456", id_list[i]);
    }
    sql2nd = sql2nd.slice(0, -1);

    results = (await executeQuery({
      query: sql2nd,
      values: values2nd,
    })) as { ok: boolean, results: any };

    if (!results.ok) {
      console.log(results)
      return new NextResponse("后台错误", {status: 400});
    }
    
    return new NextResponse("导入成功", {status: 200});
  } catch (error) {
    console.log(error)
    return new NextResponse("后台错误", {status: 400});
  }
}