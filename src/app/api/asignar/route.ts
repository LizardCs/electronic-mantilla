// app/api/asignar/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      SERV_NUM,
      SERV_DESCRIPCION,
      SERV_IMG_ENV,
      SERV_EST,
      SERV_OBS,
      SERV_REQUIERE_FACT,
      SERV_NOM_CLI,
      SERV_TEL_CLI,
      SERV_CED_CLI,
      SERV_CORREO_CLI,
      SERV_CIUDAD,
      SERV_DIR,
      SERV_WEB_ID,
      SERV_TEC_ASIG_ID
    } = body;

    if (!SERV_NUM || !SERV_NOM_CLI || !SERV_TEL_CLI || !SERV_DESCRIPCION) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    let cliId = null;
    const { data: clienteExistente } = await supabase
      .from('CLIENTES')
      .select('CLI_ID')
      .eq('CLI_TELEFONO', String(SERV_TEL_CLI).trim())
      .maybeSingle();

    if (clienteExistente) {
      cliId = clienteExistente.CLI_ID;
    } else {
      const { data: nuevoCliente, error: errCliente } = await supabase
        .from('CLIENTES')
        .insert([{
          "CLI_CEDULA": SERV_CED_CLI || null,
          "CLI_NOMBRES": String(SERV_NOM_CLI).trim(),
          "CLI_TELEFONO": String(SERV_TEL_CLI).trim(),
          "CLI_CORREO": SERV_CORREO_CLI || "",
          "CLI_DIRECCION": SERV_DIR || "",
          "CLI_CIUDAD": SERV_CIUDAD || ""
        }])
        .select('CLI_ID')
        .single();

      if (errCliente) throw new Error("Error al registrar cliente: " + errCliente.message);
      cliId = nuevoCliente.CLI_ID;
    }

    const { data, error } = await supabase
      .from('SERVICIOSTECNICOS')
      .insert([
        {
          "SERV_NUM": String(SERV_NUM).trim(),
          "SERV_DESCRIPCION": SERV_DESCRIPCION,
          "SERV_FECH_ASIG": new Date().toISOString(),
          "SERV_WEB_ID": SERV_WEB_ID || null,
          "SERV_TEC_ASIG_ID": SERV_TEC_ASIG_ID || null, 
          "SERV_CLI_ID": cliId,               
          "SERV_IMG_ENV": SERV_IMG_ENV || null,
          "SERV_EST": SERV_EST || 0,
          "SERV_OBS": SERV_OBS || "",
          "SERV_REQUIERE_FACT": SERV_REQUIERE_FACT ?? false
        }
      ])
      .select();

    if (error) {
      console.error("❌ Error al insertar servicio:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Servicio creado y asignado correctamente", 
      data: data[0] 
    }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Error en la API asignar:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}