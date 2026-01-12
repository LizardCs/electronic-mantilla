import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {

    const { data: schemaSample, error: schemaError } = await supabase
      .from('usersweb')
      .select('*')
      .limit(1);

    if (schemaError) throw schemaError;

    const { data: existingUsers, error: dataError } = await supabase
      .from('usersweb')
      .select('WEB_ID, WEB_USU, WEB_NOMBRES, WEB_FEC_CREADO')
      .limit(5);

    if (dataError) throw dataError;

    return NextResponse.json({ 
      success: true,
      tableStructure: schemaSample.length > 0 ? Object.keys(schemaSample[0]) : [],
      existingUsers
    });
    
  } catch (error: any) {
    console.error('❌ Error en Inspección Supabase:', error.message);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        tip: "Verifica que la tabla se llame 'usersweb' en el Dashboard de Supabase." 
      },
      { status: 500 }
    );
  }
}