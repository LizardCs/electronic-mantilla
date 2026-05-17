// app/api/servicios/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: servicios, error } = await supabase
      .from('SERVICIOSTECNICOS')
      .select(`
        *,
        CLIENTES (CLI_NOMBRES, CLI_TELEFONO, CLI_CORREO, CLI_CIUDAD, CLI_DIRECCION),
        USERSMOVIL (NOM_MOV, MOV_APE)
      `)
      .order('SERV_ID', { ascending: false });

    if (error) throw error;
    
    return NextResponse.json(servicios);

  } catch (error: any) {
    console.error("❌ Error en API Servicios (GET):", error.message);
    return NextResponse.json(
      { error: "Error al obtener servicios: " + error.message }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "Faltan parámetros (id)" }, { status: 400 });
    }

    const { error: errorServicio } = await supabase
      .from('SERVICIOSTECNICOS')
      .delete()
      .eq('SERV_ID', id);

    if (errorServicio) {
      console.error("❌ Error borrando servicio:", errorServicio.message);
      throw new Error("No se pudo eliminar el servicio técnico.");
    }

    return NextResponse.json({ message: "Servicio y reporte eliminados correctamente" });

  } catch (error: any) {
    console.error("❌ Error en API Servicios (DELETE):", error.message);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}