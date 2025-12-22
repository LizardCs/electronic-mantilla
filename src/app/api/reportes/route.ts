import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = { 
  host: '127.0.0.1', 
  user: 'root', 
  password: '', 
  database: 'electronic_mantilla_reports' 
};

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows]: any = await connection.execute('SELECT * FROM reportes');
    
    const procesados = rows.map((r: any) => {
      let base64pdf = null;
      
      // Verificamos si existe el documento y si es un Buffer (BLOB de MySQL)
      if (r.REP_DOC && Buffer.isBuffer(r.REP_DOC)) {
        base64pdf = `data:application/pdf;base64,${r.REP_DOC.toString('base64')}`;
      }

      return {
        ...r,
        REP_DOC: base64pdf
      };
    });

    return NextResponse.json(procesados);
  } catch (error: any) {
    console.error("Error API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}