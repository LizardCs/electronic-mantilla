// app/api/clientes/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const telefono = searchParams.get('telefono');

    if (!telefono) {
      return NextResponse.json({ error: "Número de teléfono requerido" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('CLIENTES')
      .select('*')
      .eq('CLI_TELEFONO', telefono)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: "Cliente no encontrado" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error en API buscar cliente:", error.message);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}