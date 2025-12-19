import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function POST(request: NextRequest) {
  let connection;
  try {
    const body = await request.json();
    
    // 1. Extraemos los campos exactos de tu nueva tabla
    const { cedula, nombres, apellidos, usuario, password, celular } = body;

    console.log('📝 Intento de registro para:', { usuario, cedula });

    // 2. Validaciones básicas
    if (!cedula || !nombres || !apellidos || !usuario || !password) {
      return NextResponse.json(
        { error: 'Cédula, nombres, apellidos, usuario y contraseña son obligatorios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Establecer conexión
    connection = await mysql.createConnection(dbConfig);

    // 3. Verificar si la cédula o el usuario ya existen en 'usersweb'
    const [existingUsers] = await connection.execute(
      'SELECT WEB_ID FROM usersweb WHERE WEB_CED = ? OR WEB_USU = ?',
      [cedula, usuario]
    );

    if ((existingUsers as any[]).length > 0) {
      return NextResponse.json(
        { error: 'La cédula o el nombre de usuario ya están registrados' },
        { status: 400 }
      );
    }

    // 4. Hashear la contraseña para seguridad
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Insertar en la tabla 'usersweb' usando tus nombres de columna
    const [result] = await connection.execute(
      `INSERT INTO usersweb (
        WEB_CED, 
        WEB_NOMBRES, 
        WEB_APELLIDOS, 
        WEB_USU, 
        WEB_CLAVE, 
        WEB_CELU
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [cedula, nombres, apellidos, usuario, hashedPassword, celular || null]
    );

    const newId = (result as any).insertId;

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      userId: newId
    });

  } catch (error: any) {
    console.error('💥 Error en registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor: ' + (error.sqlMessage || error.message) },
      { status: 500 }
    );
  } finally {
    // Cerramos la conexión para liberar recursos
    if (connection) await connection.end();
  }
}