import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: servicios, error } = await supabase
      .from('serviciostecnicos')
      .select('SERV_ID, SERV_NUM, SERV_DESCRIPCION, SERV_FECH_ASIG, SERV_FECH_FIN, SERV_CED_ENV, SERV_NOM_ENV, SERV_CED_REC, SERV_NOM_REC, SERV_EST')
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
    const num = searchParams.get('num');

    if (!id || !num) {
      return NextResponse.json({ error: "Faltan parámetros (id o num)" }, { status: 400 });
    }

    const { error: errorReporte } = await supabase
      .from('reportes')
      .delete()
      .eq('REP_SEV_NUM', num);

    if (errorReporte) {
      console.error("❌ Error borrando reporte:", errorReporte.message);
      throw new Error("No se pudo eliminar el reporte asociado.");
    }

    const { error: errorServicio } = await supabase
      .from('serviciostecnicos')
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