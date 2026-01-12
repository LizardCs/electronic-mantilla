import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { user, password } = await request.json(); 
    
    if (!user || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const { data: userData, error: supabaseError } = await supabase
      .from('usersweb')
      .select('*')
      .eq('WEB_USU', user)
      .single();
    
    if (supabaseError || !userData) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      );
    }

    if (password !== userData.WEB_CLAVE) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
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

    response.cookies.set('isAuthenticated', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
    
  } catch (error: any) {
    console.error('💥 Error crítico en login API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}