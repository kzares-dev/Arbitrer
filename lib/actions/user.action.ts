"use server";

import { cookies } from "next/headers";
import prisma from "../prisma";
import { UserType } from "../types";
import { validateEmail, validatePassword } from "../utils";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { redirect } from "next/navigation";


async function createUser(formData: FormData) {
    const rawFormData = {
        email: formData.get('email')?.toString(), // ? If the data is not stringify manually for some reasons ts trows an error 
        password: formData.get('password')?.toString(),
        username: formData.get('username')?.toString(),
    }

    //TODO validate the data 
    if (!rawFormData.email) return;
    if (!rawFormData.password) return;

    // hash password
    const hash = bcrypt.hashSync(rawFormData.password, 8);

    //create user in db 
    const user = await prisma.user.create({
        data: {
            email: rawFormData.email,
            password: hash,
        }
    })


    // set the authorization jwt
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        .setExpirationTime("72h")
        .setSubject(user.id.toString())
        .sign(secret)

    cookies().set("Authorization", jwt);

    // redirect 
    return redirect("/dashboard");
}


async function logUser(formData: FormData) {

    // parse the form data
    const rawFormData = {
        email: formData.get('email')?.toString(), // ? If the data is not stringify manually for some reasons ts trows an error 
        password: formData.get('password')?.toString(),
    }

    // validate the data
    if (!rawFormData.email) return;
    if (!rawFormData.password) return;

    // find the user in the prisma database 
    const user = await prisma.user.findFirst({
        where: {
            email: rawFormData.email,
        }
    });
    // exit if the user is not found
    if (!user) {
        console.log("user not found")
        return
    }

    // compare password
    const isCorrectPassword = bcrypt.compareSync(rawFormData.password, user.password);

    if (!isCorrectPassword) {
        console.log("password incorrect")
        return
    }

    // create jwt token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        .setExpirationTime("72h")
        .setSubject(user.id.toString())
        .sign(secret)

    cookies().set("Authorization", jwt);
    return redirect("/dashboard");

}

export {
    createUser,
    logUser,
}


