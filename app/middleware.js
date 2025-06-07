// middleware.js (in root directory)

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Check if user is trying to access admin panel
    if (pathname.startsWith('/adminpanel')) {
      if (!token || token.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    // Check if user is trying to access user panel
    if (pathname.startsWith('/userpanel')) {
      if (!token || token.role !== 'user') {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    // Redirect authenticated users away from auth pages
    if (pathname.startsWith('/auth/') && token) {
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/adminpanel', req.url));
      } else if (token.role === 'user') {
        return NextResponse.redirect(new URL('/userpanel', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Allow access to auth pages for unauthenticated users
        if (pathname.startsWith('/auth/')) {
          return true;
        }
        
        // Require authentication for protected routes
        if (pathname.startsWith('/adminpanel') || pathname.startsWith('/userpanel')) {
          return !!token;
        }
        
        // Allow access to other pages
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/adminpanel/:path*',
    '/userpanel/:path*',
    '/auth/:path*'
  ]
};