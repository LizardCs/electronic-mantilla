import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Probar consulta simple
    const [rows] = await connection.execute('SELECT 1 + 1 as result');
    
    await connection.end();
    
    return NextResponse.json({ 
      success: true,
      message: 'Conexión exitosa a la base de datos',
      result: rows
    });
    
  } catch (error: any) {
    console.error('Error de conexión:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Error de conexión a la base de datos',
        details: error.message
      },
      { status: 500 }
    );
  }
}