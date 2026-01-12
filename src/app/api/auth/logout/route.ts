import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Sesión cerrada' });
  response.cookies.delete('isAuthenticated');
  response.cookies.set('isAuthenticated', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}