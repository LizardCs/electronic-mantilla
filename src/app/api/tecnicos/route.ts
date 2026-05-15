// app/api/tecnicos/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: dataMovil, error: errorMovil } = await supabase
      .from('USERSMOVIL')
      .select('MOV_ID, MOV_CED, NOM_MOV, MOV_APE, MOV_USU, MOV_ROL');

    if (errorMovil) {
      console.error("❌ Error de Supabase:", errorMovil.message);
      return NextResponse.json(
        { error: errorMovil.message }, 
        { status: 500 }
      );
    }

    if (!dataMovil || dataMovil.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const usuariosMovil = dataMovil.map(u => ({
      MOV_ID: u.MOV_ID, 
      MOV_CED: u.MOV_CED,
      NOM_MOV: u.NOM_MOV,
      MOV_APE: u.MOV_APE,
      nombre_completo: `${u.NOM_MOV} ${u.MOV_APE}`.trim(),
      rol: u.MOV_ROL
    }));
    
    const tecnicos = usuariosMovil.filter(u => u.rol === 0);

    if (tecnicos.length > 0) {
      return NextResponse.json(tecnicos, { status: 200 });
    } else {
      console.warn("⚠️ No se encontraron usuarios con rol 0. Enviando todos los móviles.");
      return NextResponse.json(usuariosMovil, { status: 200 });
    }

  } catch (error: any) {
    console.error("❌ Error en la API /api/tecnicos:", error.message);
    return NextResponse.json(
      { error: "Error interno del servidor" }, 
      { status: 500 }
    );
  }
}