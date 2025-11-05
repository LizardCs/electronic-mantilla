// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, user } = body;

    console.log('📝 Datos recibidos para registro:', { email, user });

    // Validaciones básicas
    if (!email || !password || !user) {
      console.log('❌ Faltan campos requeridos');
      return NextResponse.json(
        { error: 'Email, usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('❌ Contraseña muy corta');
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);

    try {
      // Verificar si el usuario ya existe
      console.log('🔍 Verificando si usuario existe...');
      const [existingUsers] = await connection.execute(
        'SELECT id, email, user FROM users WHERE email = ? OR user = ?',
        [email, user]
      );

      const usersArray = existingUsers as any[];
      console.log('📊 Usuarios existentes encontrados:', usersArray);

      if (usersArray.length > 0) {
        const existingUser = usersArray[0];
        console.log('❌ Usuario ya existe:', existingUser);
        return NextResponse.json(
          { error: 'El email o usuario ya está registrado' },
          { status: 400 }
        );
      }

      // Hash de la contraseña
      console.log('🔐 Hasheando contraseña...');
      const hashedPassword = await bcrypt.hash(password, 12);

      // Insertar nuevo usuario
      console.log('💾 Insertando nuevo usuario...');
      const [result] = await connection.execute(
        'INSERT INTO users (email, user, password) VALUES (?, ?, ?)',
        [email, user, hashedPassword]
      );

      const userId = (result as any).insertId;
      console.log('✅ Usuario registrado exitosamente. ID:', userId);

      return NextResponse.json({
        message: 'Usuario registrado exitosamente',
        userId: userId
      });

    } finally {
      await connection.end();
    }

  } catch (error: any) {
    console.error('💥 Error completo en registro:', error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor: ' + error.message },
      { status: 500 }
    );
  }
}