"use server";
import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma';
import { validateUrl } from '../utils';
import { DirectLink } from '@prisma/client';

export async function createDirectLink(prevState: any, formData: FormData,) {

    const uuid = uuidv4();

    const data = {
        id: uuid,
        userId: prevState.userId,
        originalLink: formData.get('link')!.toString(),
        shortenLink: uuid,
    }
    if (!validateUrl(data.originalLink)) {
        return {
            ...prevState,
            status: "failed",
            message: "Invalid link format"
        }
    }
    let directLink;
    try {
        directLink = await prisma.directLink.create({
            data: data,
        })
    }
    catch {
        return {
            ...prevState,
            status: "failed",
            message: "Error shortening link"
        }
    }
    // return success 
    return {
        ...prevState,
        status: "success",
        shortenLink: directLink.shortenLink,
        message: "Link shortened succesfully"
    }

}

export async function getDirectLinksCount(userId: string): Promise<number> {
    const count = await prisma.directLink.count({
      where: {
        userId: userId,
      },
    });
    return count;
  }

export async function getUserLinks(
    userId: string,
    take: number,
    skip: number
): Promise<DirectLink[]> {

    return await prisma.directLink.findMany({
        where: {
            userId: userId
        },
        take,
        skip,
    })

}