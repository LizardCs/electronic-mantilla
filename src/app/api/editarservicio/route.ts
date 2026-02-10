// app/api/editarservicio/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; 

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      SERV_NUM, SERV_DESCRIPCION, SERV_IMG_ENV,
      SERV_CED_REC, SERV_NOM_REC,
      SERV_NOM_CLI, SERV_TEL_CLI, SERV_CIUDAD,
      SERV_DIR, SERV_OBS, SERV_REQUIERE_FACT,
      SERV_CED_CLI,       // <-- AÑADIDO: Cédula
      SERV_CORREO_CLI     // <-- AÑADIDO: Correo
    } = body;

    if (!SERV_NUM) {
      return NextResponse.json({ error: "Número de servicio no proporcionado" }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('serviciostecnicos')
      .update({
        "SERV_DESCRIPCION": SERV_DESCRIPCION,
        "SERV_IMG_ENV": SERV_IMG_ENV || null,
        "SERV_CED_REC": SERV_CED_REC ? String(SERV_CED_REC).trim() : null,
        "SERV_NOM_REC": SERV_NOM_REC || null,
        "SERV_NOM_CLI": String(SERV_NOM_CLI).trim(),
        "SERV_TEL_CLI": String(SERV_TEL_CLI).trim(),
        "SERV_CED_CLI": SERV_CED_CLI ? String(SERV_CED_CLI).trim() : "",       // <-- AÑADIDO
        "SERV_CORREO_CLI": SERV_CORREO_CLI ? String(SERV_CORREO_CLI).trim() : "", // <-- AÑADIDO
        "SERV_CIUDAD": String(SERV_CIUDAD).trim(),
        "SERV_DIR": String(SERV_DIR).trim(),
        "SERV_OBS": SERV_OBS || "",
        "SERV_REQUIERE_FACT": SERV_REQUIERE_FACT
      })
      .eq('SERV_NUM', SERV_NUM) // IMPORTANTE: Actualiza donde el ID coincida
      .select();

    if (error) {
      console.error("❌ Error al editar servicio:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Servicio actualizado", data: data[0] }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error interno /api/editar:", error.message);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}