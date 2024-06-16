import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
    // look up for the cookie
    const cookie = cookies().get("Authorization");
    if(!cookie) {
        return NextResponse.redirect(new URL("/auth/sign-up", request.url));
    }

    // validate it
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;

    try {
        const { payload } = await jose.jwtVerify(jwt, secret, {});
        console.log(payload)
    } catch(err) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url))
    }

}

export const config = {
    matcher: "/dashboard/:path"
}