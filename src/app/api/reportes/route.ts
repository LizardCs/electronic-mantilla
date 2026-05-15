import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: reportes, error } = await supabase
      .from('REPORTES')
      .select(`
        *,
        USERSMOVIL (NOM_MOV, MOV_APE),
        REPORTE_REPUESTOS (
          REPUESTOS (REP_NOMBRE)
        )
      `)
      .order('REP_FECHA', { ascending: false });

    if (error) throw error;

    const procesados = reportes.map((r: any) => {
      let pdfFinal = null;
      
      if (r.REP_DOC) {
        pdfFinal = r.REP_DOC.startsWith('data:') 
          ? r.REP_DOC 
          : `data:application/pdf;base64,${r.REP_DOC}`;
      }

      // Mapeamos los repuestos para que el frontend reciba un arreglo de textos simple
      const repuestosUsados = r.REPORTE_REPUESTOS 
        ? r.REPORTE_REPUESTOS.map((rr: any) => rr.REPUESTOS?.REP_NOMBRE).filter(Boolean)
        : [];

      return {
        ...r,
        REP_DOC: pdfFinal,
        repuestos_lista: repuestosUsados
      };
    });

    return NextResponse.json(procesados);

  } catch (error: any) {
    console.error("❌ Error en API de Reportes:", error.message);
    return NextResponse.json(
      { error: "No se pudieron obtener los reportes: " + error.message }, 
      { status: 500 }
    );
  }
}