import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'electronic_mantilla_reports',
};

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows]: any = await connection.execute(
      `SELECT 
        s.SERV_ID as id, 
        s.SERV_NUM as numero_servicio, 
        s.SERV_FECH_ASIG as fecha_inicio,
        s.SERV_EST as estado, 
        s.SERV_DESCRIPCION as descripcion_trabajo,
        r.REP_NOM_USU as tecnico_nombre, 
        r.REP_TIPO as descripcion_tecnico, 
        r.REP_FECHA as fecha_fin,
        r.REP_DOC as archivo_blob
      FROM serviciostecnicos s
      LEFT JOIN reportes r ON s.SERV_ID = r.REP_ID
      ORDER BY s.SERV_FECH_ASIG DESC`
    );

    // Procesamos los datos para convertir el BLOB a Base64
    const serviciosProcesados = rows.map((row: any) => {
      let pdfBase64 = null;

      if (row.archivo_blob && Buffer.isBuffer(row.archivo_blob)) {
        const base64 = row.archivo_blob.toString('base64');
        pdfBase64 = `data:application/pdf;base64,${base64}`;
      }

      return {
        ...row,
        documento_pdf: pdfBase64 // Esta URL se usará en el iframe
      };
    });

    return NextResponse.json(serviciosProcesados);
  } catch (error: any) {
    console.error("Error en la API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}