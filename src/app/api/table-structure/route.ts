import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {

    const { data: tableStructure, error: structureError } = await supabase
      .rpc('get_table_structure', { table_name_input: 'usersweb' }); 
      
    const { data: columns, error: colError } = await supabase
      .from('usersweb')
      .select('*')
      .limit(0); 

    const { data: existingUsers, error: dataError } = await supabase
      .from('usersweb')
      .select('WEB_ID, WEB_USU, WEB_FEC_CREADO')
      .limit(5);

    if (colError || dataError) throw colError || dataError;

    return NextResponse.json({ 
      success: true,
      mensaje: "Inspección de tabla usersweb realizada",
      columnas: columns ? Object.keys(columns) : [],
      existingUsers
    });
    
  } catch (error: any) {
    console.error('❌ Error en inspección:', error.message);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}