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
    
    // Obtener estructura de la tabla users
    const [tableStructure] = await connection.execute('DESCRIBE users');
    
    // Obtener datos existentes
    const [existingUsers] = await connection.execute('SELECT id, email, user, created_at FROM users LIMIT 5');
    
    await connection.end();
    
    return NextResponse.json({ 
      success: true,
      tableStructure,
      existingUsers
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}