import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // 1. CAMBIO: DESCRIBE la tabla correcta 'usersweb'
    const [tableStructure] = await connection.execute('DESCRIBE usersweb');
    
    // 2. CAMBIO: SELECT con los nombres de columnas reales de tu tabla
    // Usamos WEB_ID, WEB_USU, etc.
    const [existingUsers] = await connection.execute(
      'SELECT WEB_ID, WEB_USU, WEB_NOMBRES, WEB_FEC_CREADO FROM usersweb LIMIT 5'
    );
    
    return NextResponse.json({ 
      success: true,
      tableStructure,
      existingUsers
    });
    
  } catch (error: any) {
    console.error('Error en GET:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        tip: "Asegúrate de que la tabla se llame 'usersweb' y no 'users'" 
      },
      { status: 500 }
    );
  } finally {
    if (connection) await connection.end();
  }
}