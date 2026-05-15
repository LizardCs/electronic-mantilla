import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { user, password } = await request.json(); 
    
    const { data: userData, error: supabaseError } = await supabase
      .from('USERSWEB') 
      .select('*')
      .eq('WEB_USU', user)
      .single();
    
    if (supabaseError || !userData || password !== userData.WEB_CLAVE) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const userPayload = {
      WEB_CED: userData.WEB_CED,
      WEB_NOMBRES: userData.WEB_NOMBRES,
      WEB_APELLIDOS: userData.WEB_APELLIDOS,
      id: userData.WEB_ID,
      nombre_completo: `${userData.WEB_NOMBRES} ${userData.WEB_APELLIDOS}`,
      usuario: userData.WEB_USU,
    };

    const response = NextResponse.json({
      message: 'Login exitoso',
      user: userPayload
    });

    const cookieOptions = {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24,
    };

    response.cookies.set('isAuthenticated', 'true', {
      ...cookieOptions,
      httpOnly: true,
    });

    response.cookies.set('userSession', JSON.stringify(userPayload), {
      ...cookieOptions,
      httpOnly: false,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}