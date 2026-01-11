import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { user, password } = await request.json(); 
    
    // 1. Validación de campos vacíos
    if (!user || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // 2. Consulta a Supabase (Tabla usersweb)
    // Buscamos por la columna WEB_USU y traemos toda la fila
    const { data: userData, error: supabaseError } = await supabase
      .from('usersweb')
      .select('*')
      .eq('WEB_USU', user)
      .single();
    
    // Si hay error en Supabase o el usuario no existe
    if (supabaseError || !userData) {
      console.log('🔍 Usuario no encontrado:', user);
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 401 }
      );
    }

    // 3. Verificación de contraseña (TEXTO PLANO)
    // Comparamos el password enviado con el valor de la columna WEB_CLAVE
    if (password !== userData.WEB_CLAVE) {
      console.log('🚫 Contraseña incorrecta para:', user);
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // 4. Respuesta exitosa con mapeo de datos
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
    console.error('💥 Error crítico en login API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor. Revisa la consola.' },
      { status: 500 }
    );
  }
}