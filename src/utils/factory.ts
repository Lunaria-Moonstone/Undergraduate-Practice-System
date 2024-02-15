import { NextRequest, NextResponse } from "next/server";
import { dropSafty, insertSafty, selectSafty, updateSafty } from "./db";

export class RouterFactory {
  TABLE: string = 'company';
  GET: (field: Array<string> | '*', where?: { [key: string]: string | number }, order?: { [key: string]: { desc?: boolean } },) => Promise<NextResponse> = async (field = '*', where = {}, order = {}) => {
    let result: unknown;
    try {
      result = await selectSafty({ field, table: this.TABLE, where, order })
    } catch (error: unknown) {
      result = error;
    } finally {
      const blob = new Blob([JSON.stringify(result, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200,
      });
    }
  };
  POST: (field: { [key: string]: string | number }) => Promise<NextResponse> = async (field = {}) => {
    let results: unknown;
    try {
      results = await insertSafty({ field, table: this.TABLE, insert_values_num: Object.keys(field).length })
    } catch (error: unknown) {
      results = error;
    } finally {
      const blob = new Blob([JSON.stringify(results, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200,
      });
    }
  };
  DELETE: (where?: { [key: string]: string | number }) => Promise<NextResponse> = async (where = {}) => {
    let results: unknown;
    if (where['id'] === undefined) {
      const blob = new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' }, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200,
      });
    }
    try {
      results = await dropSafty({ table: this.TABLE, where });
    } catch (error: unknown) {
      results = error;
    } finally {
      const blob = new Blob([JSON.stringify(results, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200,
      });
    }
  };
  PUT: (field: { [key: string]: string | number }, where: { [key: string]: string | number }) => Promise<NextResponse> = async (field = {}, where = {}) => {
    let results: unknown;
    if (where['id'] === undefined) {
      const blob = new Blob([JSON.stringify({ ok: false, error: 'id should not be empty' }, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200
      });
    }
    try {
      results = await updateSafty({
        field,
        table: this.TABLE,
        where
      });
    } catch (error: unknown) {
      results = error;
    } finally {
      const blob = new Blob([JSON.stringify(results, null, 2)], {
        type: 'application/json',
      });
      return new NextResponse(blob, {
        status: 200,
      });
    }
  };

  constructor(
    table: string,
    GET?: (...other_params: any) => Promise<NextResponse>,
    POST?: (...other_params: any) => Promise<NextResponse>,
    DELECT?: (...other_params: any) => Promise<NextResponse>,
    PUT?: (...other_params: any) => Promise<NextResponse>,
  ) {
    this.TABLE = table;
    if (GET) this.GET = GET;
    if (POST) this.POST = POST;
    if (DELECT) this.DELETE = DELECT;
    if (PUT) this.PUT = PUT;
  }
}