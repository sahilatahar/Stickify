import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { method } = req;
  const { pathname } = req.nextUrl;

  // Public access to GET /api/stickers
  if (pathname === '/api/stickers' && method === 'GET') {
    return NextResponse.next();
  } else if (pathname === '/api/user' && method === 'POST') {
    return NextResponse.next();
  }

  // Check if the request path matches any of the CRUD routes
  const crudRoutes = [
    '/api/stickers',
    '/api/stickers/[stickerId]',
    '/api/user',
    '/api/user/[userId]',
  ];

  if (crudRoutes.some((route) => pathname.startsWith(route))) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      // Token is not present or invalid
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Decode the token to get user role and ID
    const userRole = token.role;
    const userId = token.id;

    // Allow CRUD operations for admin role
    if (userRole === 'admin') {
      return NextResponse.next();
    }

    // For users, ensure the correct method and user ID
    if (userRole === 'user') {
      // Allow only GET method for regular users
      if (method !== 'GET') {
        return new NextResponse('Forbidden', { status: 403 });
      }

      // Check if the request URL includes the user's ID for individual resources
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();

      if (id !== userId) {
        return new NextResponse('Forbidden', { status: 403 });
      }

      return NextResponse.next();
    }

    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}
