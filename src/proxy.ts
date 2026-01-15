import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/reportes')) {
    if (!isAuthenticated) {
      //console.log('🚫 Acceso denegado a reportes. Redirigiendo a Login...');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/reportes', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/reportes/:path*', '/login'],
};