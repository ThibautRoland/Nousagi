
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Check if the request is for a protected page
  const protectedPaths = ['/dashboard']; // Add your protected routes here
  const isProtectedPath = protectedPaths.includes(req.nextUrl.pathname);

  if (isProtectedPath) {
    if (!token) {
      // If there's no token, redirect to the login page
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Continue to the next middleware or the page
  return NextResponse.next();
}