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

export default async function executeQuery({ query, values }: { query: string, values: Array<any>}) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results; 
  } catch (error: unknown) {
    return { error }
  }
}