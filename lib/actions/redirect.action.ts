"use server"

import prisma from "../prisma"

export const getRedirect = async (id: string) => {

    const directLink = await prisma.directLink.findUnique({
        where: {
            id
        }
    })

    return directLink
}