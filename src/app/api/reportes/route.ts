import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1', // Es más estable que 'localhost' en Node.js
      user: 'root',
      password: '', 
      database: 'electronic_mantilla_reports' // Nombre real según tu captura
    });

    // 1. Ejecutamos la consulta
    const [rows]: any = await connection.execute('SELECT * FROM reportes ORDER BY REP_FECHA DESC');
    await connection.end();

    // 2. Procesamos los datos para el visualizador de PDF
    const reportesProcesados = rows.map((row: any) => {
      let pdfUrl = null;

      // Si hay un BLOB en REP_DOC, lo convertimos a un String Base64
      if (row.REP_DOC && Buffer.isBuffer(row.REP_DOC)) {
        const base64 = row.REP_DOC.toString('base64');
        pdfUrl = `data:application/pdf;base64,${base64}`;
      }

      return {
        ...row,
        REP_DOC: pdfUrl // Ahora el frontend puede usar esto en un <iframe> o <embed>
      };
    });

    // 3. Devolvemos el Array (esto evita el error .filter is not a function)
    return NextResponse.json(reportesProcesados);

  } catch (error: any) {
    console.error("Error en la API de reportes:", error.message);
    
    // Si hay error, devolvemos un objeto con el mensaje para que el frontend lo muestre
    return NextResponse.json(
      { error: 'No se pudo conectar a la base de datos: ' + error.message }, 
      { status: 500 }
    );
  }
}