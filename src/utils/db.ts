import mysql from 'serverless-mysql';
import { isNumberObject } from 'util/types';

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }
});

export async function executeQuery({ query, values }: { query: string, values: Array<any>}) {
  let results = {};
  try {
    const exec_res = await db.query(query, values);
    await db.end(); 
    results = { ok: true, results: exec_res };
  } catch (error: unknown) {
    results = { ok: false, error: error };
  }
  return results;
}

export async function select({ 
  field, table, where, order, group, limit 
}: {
  field: '*' | Array<string>, table: string, 
  where?: { [key: string]: number | string }, 
  order?: { [key: string]: { desc?: boolean } }, 
  group?: Array<string>,
  limit?: number
}) {
  let results = {}
  let sql = sqlFactory({
    field,
    table,
    where,
    order,
    group,
    limit,
    method: 'select',
  });
  try {
    const exec_res = await db.query(sql, []);
    await db.end();
    results = { ok: true, results: exec_res };
  } catch (error: unknown) {
    results = { ok: false, error: error };
  }
  return results;
}

export async function insert({
  field, table, insert_value
}: {
  field: Array<string>,
  table: string, 
  insert_value: Array<Array<string | number>>
}) {
  let results = {};
  let sql = sqlFactory({
    field,
    table,
    insert_value,
    method: 'insert',
  });
  try {
    const exec_res = await db.query(sql, []);
    await db.end();
    results = { ok: true, results: exec_res };
  } catch (error: unknown) {
    results = { ok: false, error: error };
  }
  return results;
}

function sqlFactory({
  method, field, table, where, insert_value, update_value, order, group, limit
}: {
  method: 'select' | 'insert' | 'delete' | 'update',
  field: '*' | Array<string>,
  table: string,
  insert_value?: Array<Array<string | number>>,
  update_value?: { [key: string]: number | string },
  where?: { [key: string]: number | string },
  order?: { [key: string]: { desc?: boolean } }, 
  group?: Array<string>,
  limit?: number
}): string {
  let sql = '';
  if (method === 'insert' && insert_value === undefined) {
    throw new Error('insert value should not be empty'); // 插入时插入值不能为空
  }
  if (method === 'update' && ( update_value === undefined || field === '*' )) {
    throw new Error(update_value === undefined ? 'insert value should not be empty' : 'field should not be \'*\''); // 更新时更新键与值不能为空
  }
  switch (method) {
    case 'select':
      sql = `
      SELECT 
        ${ field === '*' ? field : field.join(',') }
      FROM 
        \`${ table }\`
      WHERE
        1 = 1 
        ${ !where ? '' : ' AND ' + Object.keys(where).map(x => {
          return x + '=' + (typeof where[x] === 'number' ? where[x] : '\'' + where[x] + '\'');
        }).join(' AND ') }
      
        ${ !order ? '' : 'ORDER BY ' + Object.keys(order).map(x => {
          return ' ' + x + (order[x]['desc'] ? ' DESC ' : ' ');
        }) }
        ${ !group ? '' : 'GROUP BY ' + group.join(' ')}
        ${ !limit ? '' : 'LIMIT ' + limit }
      `;
      break;
    case 'delete':
      sql = `
      DELETE FROM
        ${table}
      WHERE 
        1 = 1
        ${ !where ? '' : ' AND ' + Object.keys(where).map(x => {
          return x + '=' + (typeof where[x] === 'number' ? where[x] : '\'' + where + '\'');
        }).join(' AND ') }
      `;
      break;
    case 'insert':
      sql = `
      INSERT INTO 
        ${table} ${ field === '*' ? '' : '(' + field.join(',') + ')' } 
      ${ insert_value && insert_value.length > 1 ? 'VALUES' : 'VALUE' }
        ${ insert_value ? insert_value.map(x => {
            return '(' + x.map(x => typeof x === 'number' ? x : '\'' + x + '\'').join(',') + ')'
          }).join(',') : ''
        }
      `;
      break;
    case 'update':
      sql = `
      UPDATE FROM
        ${table}
      SET 
        ${ field === '*' || update_value === undefined ? '' : field.map(x => x + '=' + ( typeof update_value[x] === 'number' ? update_value[x] : '\'' + update_value[x] + '\'')).join(',') }
      WHERE
        1 = 1
        ${ !where ? '' : ' AND ' + Object.keys(where).map(x => {
          return x + '=' + (typeof where[x] === 'number' ? where[x] : '\'' + where + '\'');
        }).join(' AND ') }
      `;
      break;
  }
  return sql;
}

function sqlFactorySafty({
  method, field, table, where, insert_values_num, update_values_num, order, group, limit
}: {
  method: 'insert' | 'select' | 'delete' | 'update',
  field: '*' | Array<string>,
  table: string,
  insert_values_num?: number,
  update_values_num?: number,
  where?: Array<string>,
  order?: { [key: string]: { desc?: boolean } }, 
  group?: Array<string>,
  limit?: number
}): string {
  let sql = '';
  if (method === 'insert' && insert_values_num === undefined) {
    throw new Error('insert value should not be empty'); // 插入时插入值不能为空
  }
  if (method === 'update' && ( update_values_num === undefined || field === '*' )) {
    throw new Error(update_values_num === undefined ? 'insert value should not be empty' : 'field should not be \'*\''); // 更新时更新键与值不能为空
  }
  switch (method) {
    case 'select':
      sql = `
      SELECT 
        ${ field === '*' ? field : field.join(',') }
      FROM 
        \`${ table }\`
      WHERE
        1 = 1 
        ${ !where ? '' : ' AND ' + Object.keys(where).map(x => {
          return x + '=?';
        }).join(' AND ') }
      
        ${ !order ? '' : 'ORDER BY ' + Object.keys(order).map(x => {
          return ' ' + x + (order[x]['desc'] ? ' DESC ' : ' ');
        }) }
        ${ !group ? '' : 'GROUP BY ' + group.join(' ')}
        ${ !limit ? '' : 'LIMIT ' + limit }
      `;
      break;
    case 'delete':
      sql = `
      DELETE FROM
        ${table}
      WHERE 
        1 = 1
        ${ !where ? '' : ' AND ' + Object.keys(where).map(x => {
          return x + '=?';
        }).join(' AND ') }
      `;
      break;
    case 'insert':
      sql = `
      INSERT INTO 
        ${table} ${ field === '*' ? '' : '(' + field.join(',') + ')' } 
      ${ insert_values_num !== undefined && insert_values_num > 1 ? 'VALUES' : 'VALUE' }
        ${ insert_values_num ? new Array<string>(insert_values_num).map(x => {
            return ' ?'
          }).join(',') : ''
        }
      `;
      break;
    case 'update':
      sql = `
      UPDATE FROM
        ${table}
      SET 
        ${ field === '*' || update_values_num === undefined ? '' : field.map(x => x + '=?').join(',') }
      WHERE
        1 = 1
        ${ !where ? '' : ' AND ' + Object.keys(where).map(x => {
          return x + '=?';
        }).join(' AND ') }
      `;
      break;
  }
  return sql;
}