"use server";

import { cookies } from "next/headers";
import prisma from "../prisma";
import { validateEmail, validatePassword } from "../utils";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { redirect } from "next/navigation";


async function createUser(prevState: any, formData: FormData) {
    const rawFormData = {
        email: formData.get('email')?.toString(), // ? If the data is not stringify manually for some reasons ts trows an error 
        password: formData.get('password')?.toString(),
        username: formData.get('username')?.toString(),
    }

    //TODO validate the data x
    if (!rawFormData.email || !validateEmail(rawFormData.email)) {
        return {
            message: "Invalid Email",
            status: "failed",
        }
    };
    if (!rawFormData.password) {
        return {
            message: "Invalid Password",
            status: "failed",
        }
    };

    // hash password
    const hash = bcrypt.hashSync(rawFormData.password, 8);

    //create user in db 
    let user;
    try {
        user = await prisma.user.create({
            data: {
                email: rawFormData.email,
                password: hash,
                username: rawFormData.username,
            }
        })
    } catch {
        return {
            message: "Unable to connect to database",
            status: "failed",
        }
    }


    // set the authorization jwt
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        .setExpirationTime("72h")
        .setSubject(user.id.toString())
        .sign(secret)

    cookies().set("Authorization", jwt);
    redirect("/dashboard");
    return {
        message: "User created succesfully",
        status: "success"
    }
}


async function logUser(prevState: any, formData: FormData) {

    // parse the form data
    const rawFormData = {
        email: formData.get('email')?.toString(), // ? If the data is not stringify manually for some reasons ts trows an error 
        password: formData.get('password')?.toString(),
    }

    // validate the data
    if (!rawFormData.email || !validateEmail(rawFormData.email)) {
        return {
            message: "Invalid Email",
            status: "failed",
        }
    };
    if (!rawFormData.password) {
        return {
            message: "Invalid Password",
            status: "failed",
        }
    };

    // find the user in the prisma database 
    let user;
    try {
        user = await prisma.user.findFirst({
            where: {
                email: rawFormData.email,
            }
        });
    } catch {
        return {
            message: "Unable to connect to database",
            status: "failed",
        }
    }

    // exit if the user is not found
    if (!user) {
        return {
            message: "User not Found",
            status: "failed",
        }
    }

    // compare password
    const isCorrectPassword = bcrypt.compareSync(rawFormData.password, user.password);

    if (!isCorrectPassword) {
        return {
            message: "Password incorrect",
            status: "failed",
        }
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
    redirect("/dashboard")
    return {
        message: "Login succesfull",
        status: "success"
    }

}

export {
    createUser,
    logUser,
}


