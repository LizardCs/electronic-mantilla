import { connectDB } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const connection = await connectDB();
    
    // Buscar usuario en la tabla users
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    const userArray = users as any[];
    
    if (userArray.length === 0) {
      await connection.end();
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      );
    }
    
    const user = userArray[0];
    
    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    
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
        id: user.id,
        email: user.email,
        created_at: user.created_at
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