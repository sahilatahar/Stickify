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

    // Add logging for token retrieval
    console.log('Token:', token);

    if (!token) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Decode the token to get user role and ID
    const userRole = token.role;
    const userId = token.id;

    // Allow CRUD operations for admin role
    if (userRole === 'admin') {
      return NextResponse.next();
    }

    if (userRole === 'user') {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();

      // If user is requesting for own data it will send not other users
      if (id !== userId) {
        return new NextResponse('Forbidden', { status: 403 });
      }

      return NextResponse.next();
    }

    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}
