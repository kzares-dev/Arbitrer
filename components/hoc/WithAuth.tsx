
import { cookies } from "next/headers";
import * as jose from "jose";
import { redirect } from "next/navigation";

export async function WithAuth(Component: any) {
    const cookie = cookies().get("Authorization");
    if (!cookie) {
        return redirect("auth/sign-in")
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;

    const { payload } = await jose.jwtVerify(jwt, secret, {})

    return <Component userId={payload} />
}