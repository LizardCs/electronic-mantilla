import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function POST(request: NextRequest) {
  try {
    const { user, password } = await request.json(); // ✅ Cambiado a 'user'
    
    // Validaciones básicas
    if (!user || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);
    
    // Buscar usuario por nombre de usuario (campo 'user')
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE user = ?', // ✅ Buscar por 'user' no por 'email'
      [user]
    );
    
    const userArray = users as any[];
    
    if (userArray.length === 0) {
      await connection.end();
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      );
    }
    
    const userData = userArray[0];
    
    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, userData.password);
    
    if (!isValidPassword) {
      await connection.end();
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }
    
    await connection.end();
    
    return NextResponse.json({
      message: 'Login exitoso',
      user: {
        id: userData.id,
        user: userData.user, // ✅ Incluir el nombre de usuario
        email: userData.email,
        created_at: userData.created_at
      }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}