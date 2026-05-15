// app/api/editarservicio/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; 

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      SERV_NUM, 
      SERV_DESCRIPCION, 
      SERV_IMG_ENV,
      SERV_OBS, 
      SERV_REQUIERE_FACT,
      SERV_CED_CLI, 
      SERV_NOM_CLI, 
      SERV_TEL_CLI, 
      SERV_CIUDAD,
      SERV_DIR, 
      SERV_CORREO_CLI,
      SERV_TEC_ASIG_ID 
    } = body;

    if (!SERV_NUM) {
      return NextResponse.json({ error: "Número de servicio no proporcionado" }, { status: 400 });
    }

    let cliId = null;
    const { data: clienteData, error: errSearch } = await supabase
      .from('CLIENTES')
      .select('CLI_ID')
      .eq('CLI_TELEFONO', String(SERV_TEL_CLI).trim())
      .maybeSingle();

    if (clienteData) {
      cliId = clienteData.CLI_ID;
      await supabase
        .from('CLIENTES')
        .update({
          "CLI_NOMBRES": String(SERV_NOM_CLI || "").trim(),
          "CLI_CEDULA": SERV_CED_CLI || null,
          "CLI_CORREO": SERV_CORREO_CLI || "",
          "CLI_CIUDAD": String(SERV_CIUDAD || "").trim(),
          "CLI_DIRECCION": String(SERV_DIR || "").trim()
        })
        .eq('CLI_ID', cliId);
    }

    const updateData: any = {
      "SERV_DESCRIPCION": SERV_DESCRIPCION,
      "SERV_IMG_ENV": SERV_IMG_ENV || null,
      "SERV_OBS": SERV_OBS || "",
      "SERV_REQUIERE_FACT": SERV_REQUIERE_FACT || false,
      "SERV_CLI_ID": cliId
    };

    if (SERV_TEC_ASIG_ID !== undefined) {
      updateData["SERV_TEC_ASIG_ID"] = SERV_TEC_ASIG_ID === "" ? null : SERV_TEC_ASIG_ID;
    }

    const { data, error } = await supabase
      .from('SERVICIOSTECNICOS')
      .update(updateData)
      .eq('SERV_NUM', SERV_NUM) 
      .select();

    if (error) {
      console.error("❌ Error al editar servicio:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Servicio y cliente actualizados correctamente", 
      data: data[0] 
    }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error interno /api/editar:", error.message);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}