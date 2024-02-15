import mysql from 'serverless-mysql';

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

export async function drop({
  table, where
}: {
  table: string
  where?: { [key: string]: number | string }
}) {
  let results = {};
  let sql = sqlFactory({
    table,
    where,
    field: '*',
    method: 'delete',
  });
  try {
    const exec_res = await db.query(sql, []);
    await db.end();
    results = { ok: true, results: exec_res };
  } catch (error: unknown) {
    results = { ok: false, error: error};
  }
  return results;
}

export async function selectSafty({
  field, table, where, order, group, limit,
}: {
  field: '*' | Array<string>,
  table: string,
  where?: { [key: string]: string | number },
  order?: { [key: string]: { desc?: boolean }},
  group?: Array<string>,
  limit?: number,
}) {
  let results = {};
  let sql = sqlFactorySafty({
    field,
    table,
    where: where ? Object.keys(where) : undefined,
    order,
    group,
    limit,
    method: 'select',
  });
  try {
    const exec_res = await db.query(sql, Object.values(where ?? []));
    await db.end();
    results = { ok: true, results: exec_res }
  } catch (error:unknown) {
    results = { ok: false, error: error }
  }
  return results;
}

export async function insertSafty({
  field, table, insert_values_num
}: {
  field: { [key: string]: string | number },
  table: string,
  insert_values_num: number
}) {
  let results = {};
  let sql = sqlFactorySafty({
    field: Object.keys(field),
    table, 
    insert_values_num,
    method: 'insert',
  });
  try {
    const exec_res = await db.query(sql, Object.values(field));
    await db.end();
    results = { ok: true, results: exec_res };
  } catch (error: unknown) {
    results = { ok: false, error };
  }
  return results;
}

export async function dropSafty({
  table, where, 
}: {
  table: string,
  where?: { [key: string]: string | number }
}) {
  console.log(Object.keys(where as { [key: string]: string | number }))
  let results = {};
  let sql = sqlFactorySafty({
    table,
    where: where ? Object.keys(where) : [],
    field: '*',
    method: 'delete',
  });
  try {
    const exec_res = await db.query(sql, Object.values(where ?? {}));
    await db.end();
    results = { ok: true, results: exec_res };
  } catch (error) {
    results = { ok: false, error: error };
  }
  return results;
}

export async function update({
  field, table, where,  
}: {
  field: { [key: string]: string | number },
  table: string,
  where?: { [key: string]: string | number },
}) {
  let results = {};
  let sql = sqlFactory({
    table,
    field: Object.keys(field),
    where: where,
    method: 'update',
  });
  try {
    const exec_res = await db.query(sql, []);
    await db.end();
    results = { ok: true, results: exec_res };
  } catch (error: unknown) {
    results = { ok: false, results: error };
  }
  return results;
}

export async function updateSafty({
  field, table, where
}: {
  field: { [key: string]: string | number },
  table: string,
  where?: { [key: string]: string | number },  
}) {
  let results = {};
  let sql = sqlFactorySafty({
    table,
    field: Object.keys(field),
    update_values_num: Object.keys(field).length,
    where : where ? Object.keys(where) : [],
    method: 'update',
  });
  try {
    const exec_res = await db.query(sql, new Array().concat(Object.values(field), where ? Object.values(where) : []));
    await db.end();
    results = { ok: true, results: exec_res };
  } catch (error: unknown) {
    results = { ok: false, error };
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
        ${ !where ? '' : ( Object.keys(where).length !== 0 ? ' AND ': '') + Object.keys(where).map(x => {
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
        ${ !where ? '' : ( Object.keys(where).length !== 0 ? ' AND ' : '' ) + Object.keys(where).map(x => {
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
      UPDATE 
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
  method, field, table, where, insert_values_num, insert_lines, update_values_num, order, group, limit
}: {
  method: 'insert' | 'select' | 'delete' | 'update',
  field: '*' | Array<string>,
  table: string,
  insert_values_num?: number,
  insert_lines?: number,
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
        ${ !where || Object.keys(where).length === 0  ? '' : ' AND ' + where.map(x => {
          return x + '=?';
        }).join(' AND ') }
        ${ !order || Object.keys(order).length === 0 ? '' : 'ORDER BY ' + Object.keys(order).map(x => {
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
        ${ !where ? '' : ( where.length !== 0 ? ' AND ' : '') + where.map(x => {
          return x + '=?';
        }).join(' AND ') }
      `;
      break;
    case 'insert':
      sql = `
      INSERT INTO 
        ${table} ${ field === '*' ? '' : '(' + field.join(',') + ')' } 
      ${ insert_lines !== undefined && insert_lines > 1 ? 'VALUES' : 'VALUE' }
        ${
          insert_lines
          ? (new Array<string>(insert_lines ?? 1)).fill('(' + (new Array<string>(insert_values_num ?? 1)).fill(' ?').join(',') + ')').join(',')
          : '(' + (new Array<string>(insert_values_num ?? 1)).fill(' ?').join(',') + ')'
        }
      `;
      break;
    case 'update':
      sql = `
      UPDATE 
        ${table} 
      SET 
        ${ field === '*' || update_values_num === undefined ? '' : field.map(x => x + '=?').join(',') }
      WHERE
        1 = 1
        ${ !where ? '' : ' AND ' + where.map(x => {
          return x + '=?';
        }).join(' AND ') }
      `;
      break;
  }
  return sql;
}