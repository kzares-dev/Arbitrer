import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
    const cookie = cookies().get("Authorization");

    // If there is no cookie, redirect to the login page
    if (!cookie) {
        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL("/auth/sign-in", request.url));
        }
        return; // Continue with the current request if it's not a dashboard route
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;

    // Validate the JWT token
    try {
        const { payload } = await jose.jwtVerify(jwt, secret, {});

        // If the token is valid, redirect to the dashboard page
        if (request.nextUrl.pathname.startsWith('/auth') || request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        // Continue with the current request if it's not a login route
        return; 
    } catch (err) {
        // If the token is invalid, redirect to the login page
        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL("/auth/sign-in", request.url));
        }
        return; // Continue with the current request if it's not a dashboard route
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
