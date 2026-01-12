import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// CAMBIO: La función ahora debe llamarse "proxy"
export function proxy(request: NextRequest) {
  // 1. Extraemos el VALOR de la cookie
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const { pathname } = request.nextUrl;

  // 2. Lógica de protección para /reportes
  if (pathname.startsWith('/reportes')) {
    if (!isAuthenticated) {
      console.log('🚫 Acceso denegado a reportes. Redirigiendo a Login...');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Lógica para evitar el login si ya está autenticado
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/reportes', request.url));
  }

  return NextResponse.next();
}

// Mantenemos la configuración del matcher igual
export const config = {
  matcher: ['/reportes/:path*', '/login'],
};