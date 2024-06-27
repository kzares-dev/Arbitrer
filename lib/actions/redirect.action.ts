"use server"

import prisma from "../prisma"
import { getFormattedDate } from "../utils"
import { updateViewCount } from "./directLink.action"

export const getRedirect = async (id: string) => {

    const directLink = await prisma.directLink.findUnique({
        where: {
            id
        }
    })

    // When an user enter the page the viewCount of that link is increased
   
    await updateViewCount(id, getFormattedDate());

    return directLink
}