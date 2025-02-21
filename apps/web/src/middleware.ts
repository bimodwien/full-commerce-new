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

  const setNoCacheHeaders = (response: NextResponse) => {
    response.headers.set(
      'Cache-Control',
      'no-cache, no-store, must-revalidate, proxy-revalidate',
    );
    return response;
  };

  if (pathname === '/login' || pathname === '/login/') {
    const response = NextResponse.next();
    setNoCacheHeaders(response);
    if (token) {
      try {
        const decoded = jwtDecode<{ user?: { role?: string } }>(token);
        const role = decoded.user?.role;
        console.log('ini decoded role: ', role);
        if (role === 'admin') {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        if (role === 'user') {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {
        console.error('Error decoding token: ', error);
        return response;
      }
    }
    return response;
  }

  if (pathname === '/' || pathname === '/index') {
    const response = NextResponse.next();
    setNoCacheHeaders(response);
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
    return response;
  }

  if (pathname.startsWith('/dashboard')) {
    const response = NextResponse.next();
    setNoCacheHeaders(response);
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
    return response;
  }

  if (pathname.startsWith('/cart') || pathname.startsWith('/wishlist')) {
    const response = NextResponse.next();
    setNoCacheHeaders(response);
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    try {
      const decoded = jwtDecode<{ user?: { role?: string } }>(token);
      if (!decoded.user?.role) return handleInvalidToken();
      if (decoded.user?.role !== 'user') {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    } catch (err) {
      return handleInvalidToken();
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/',
    '/dashboard/:path*',
    '/cart/:path*',
    '/wishlist/:path*',
  ],
};
