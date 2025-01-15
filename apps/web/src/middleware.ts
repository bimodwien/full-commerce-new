import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const url = request.nextUrl.clone();
  const { pathname } = url;

  const handleInvalidToken = () => {
    console.error('Invalid or expired token');
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('access_token');
    return response;
  };

  if (pathname === '/') {
    if (token) {
      try {
        const decoded = jwtDecode<{ user?: { role?: string } }>(token);
        if (decoded.user?.role === 'admin') {
          url.pathname = '/dashboard';
          return NextResponse.redirect(url);
        }
      } catch (err) {
        const response = NextResponse.next();
        response.cookies.delete('access_token');
        return response;
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    try {
      const decoded = jwtDecode<{ user?: { role?: string } }>(token);
      if (decoded.user?.role !== 'admin') {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    } catch (err) {
      return handleInvalidToken();
    }
  }

  if (pathname.startsWith('/cart') || pathname.startsWith('/favorites')) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    try {
      const decoded = jwtDecode<{ user?: { role?: string } }>(token);
      if (!decoded.user?.role) return handleInvalidToken();

      if (decoded.user?.role === 'admin') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
    } catch (err) {
      return handleInvalidToken();
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/dashboard/:path*', '/cart/:path*', '/favorites/:path*'],
};
