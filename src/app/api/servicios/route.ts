import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: servicios, error } = await supabase
      .from('serviciostecnicos')
      .select('SERV_ID, SERV_NUM, SERV_DESCRIPCION, SERV_FECH_ASIG, SERV_FECH_FIN, SERV_CED_ENV, SERV_NOM_ENV, SERV_CED_REC, SERV_NOM_REC, SERV_EST')
      .order('SERV_ID', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(servicios);

  } catch (error: any) {
    console.error("❌ Error en API Servicios:", error.message);
    return NextResponse.json(
      { error: "Error al obtener servicios: " + error.message }, 
      { status: 500 }
    );
  }
}