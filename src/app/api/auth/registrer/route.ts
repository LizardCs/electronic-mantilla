import { connectDB } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const connection = await connectDB();
    
    // Verificar si el usuario ya existe
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if ((existingUsers as any[]).length > 0) {
      await connection.end();
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      );
    }
    
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Insertar nuevo usuario (created_at se auto-genera)
    const [result] = await connection.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    
    await connection.end();
    
    return NextResponse.json({
      message: 'Usuario registrado exitosamente',
      userId: (result as any).insertId
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}