import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { user, password } = await request.json(); 
    
    const { data: userData, error: supabaseError } = await supabase
      .from('usersweb')
      .select('*')
      .eq('WEB_USU', user)
      .single();
    
    if (supabaseError || !userData || password !== userData.WEB_CLAVE) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const response = NextResponse.json({
      message: 'Login exitoso',
      user: {
        WEB_CED: userData.WEB_CED,
        WEB_NOMBRES: userData.WEB_NOMBRES,
        WEB_APELLIDOS: userData.WEB_APELLIDOS,
        id: userData.WEB_ID,
        nombre_completo: `${userData.WEB_NOMBRES} ${userData.WEB_APELLIDOS}`,
        usuario: userData.WEB_USU,
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
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}