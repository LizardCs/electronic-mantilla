import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = { host: '127.0.0.1', user: 'root', password: '', database: 'electronic_mantilla_reports' };

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows]: any = await connection.execute('SELECT * FROM serviciostecnicos');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}