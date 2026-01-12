import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('isAuthenticated'); 
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/reportes')) {
    if (!authCookie) {
      console.log('🚫 Acceso denegado a reportes. Redirigiendo a Login...');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname === '/login' && authCookie) {
    return NextResponse.redirect(new URL('/reportes', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/reportes/:path*', '/login'],
};