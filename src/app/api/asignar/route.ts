// app/api/asignar/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      SERV_NUM,
      SERV_DESCRIPCION,
      SERV_CED_ENV,
      SERV_NOM_ENV,
      SERV_IMG_ENV,
      SERV_CED_REC,
      SERV_NOM_REC,
      SERV_EST,
      SERV_NOM_CLI,
      SERV_TEL_CLI,
      SERV_CIUDAD,
      SERV_DIR,
      SERV_OBS,
      SERV_REQUIERE_FACT
    } = body;

    if (!SERV_NUM || !SERV_NOM_CLI || !SERV_DESCRIPCION || SERV_REQUIERE_FACT === null) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from('serviciostecnicos')
      .insert([
        {
          "SERV_NUM": String(SERV_NUM).trim(),
          "SERV_DESCRIPCION": SERV_DESCRIPCION,
          "SERV_FECH_ASIG": new Date().toISOString(),
          "SERV_CED_ENV": String(SERV_CED_ENV).trim(),
          "SERV_NOM_ENV": SERV_NOM_ENV,
          "SERV_IMG_ENV": SERV_IMG_ENV || null,
          "SERV_CED_REC": SERV_CED_REC ? String(SERV_CED_REC).trim() : null,
          "SERV_NOM_REC": SERV_NOM_REC || null,
          "SERV_EST": SERV_EST || 0,
          "SERV_NOM_CLI": String(SERV_NOM_CLI).trim(),
          "SERV_TEL_CLI": String(SERV_TEL_CLI).trim(),
          "SERV_CIUDAD": String(SERV_CIUDAD).trim(),
          "SERV_DIR": String(SERV_DIR).trim(),
          "SERV_OBS": SERV_OBS || "",
          "SERV_REQUIERE_FACT": SERV_REQUIERE_FACT
        }
      ])
      .select();

    if (error) {
      console.error("Error al asignar servicio:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Servicio asignado correctamente", data: data[0] },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error en la API asignar:", error.message);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}