import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

// Configuración de la base de datos
// Se recomienda usar '127.0.0.1' en lugar de 'localhost' para evitar errores de conexión en Node.js
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'electronic_mantilla_reports',
};

export async function POST(request: NextRequest) {
  let connection;
  try {
    const { user, password } = await request.json(); 
    
    if (!user || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Establecer conexión
    connection = await mysql.createConnection(dbConfig);
    
    // 1. Corregido: Buscar en la tabla 'usersweb' usando la columna 'WEB_USU'
    const [rows] = await connection.execute(
      'SELECT * FROM usersweb WHERE WEB_USU = ?', 
      [user]
    );
    
    const userArray = rows as any[];
    
    if (userArray.length === 0) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      );
    }
    
    const userData = userArray[0];
    
    // 2. Verificar contraseña contra la columna 'WEB_CLAVE'
    // Recuerda que la clave debe estar hasheada con bcrypt en la base de datos
    const isValidPassword = await bcrypt.compare(password, userData.WEB_CLAVE);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }
    
    // 3. Respuesta exitosa con los campos correctos de tu tabla
    return NextResponse.json({
      message: 'Login exitoso',
      user: {
        id: userData.WEB_ID,
        cedula: userData.WEB_CED,
        nombre_completo: `${userData.WEB_NOMBRES} ${userData.WEB_APELLIDOS}`,
        usuario: userData.WEB_USU,
        celular: userData.WEB_CELU,
        fecha_registro: userData.WEB_FEC_CREADO
      }
    });
    
  } catch (error: any) {
    console.error('Error detallado en login:', error);
    
    // Manejo específico de error de conexión
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'No se pudo conectar a la base de datos. Verifica que MySQL esté encendido.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  } finally {
    // Es vital cerrar la conexión para no agotar los recursos del sistema
    if (connection) await connection.end();
  }
}