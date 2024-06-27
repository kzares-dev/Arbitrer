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
) {

    return await prisma.directLink.findMany({
        where: {
            userId: userId
        },
        take,
        skip,
        select: {
            id: true,
            originalLink: true,
            shortenLink: true,
            createdAt: true,
            totalViewCount: true,
        },
    })

}

export async function updateViewCount(linkId: string, date: string) {

    const viewCount = await prisma.directLink.findFirst({
        where: {
            id: linkId,
        },
    });

    const tempCount = JSON.parse(JSON.stringify(viewCount!.viewCount));

    const existingIndex = tempCount.findIndex((item: { date: Date, count: number }) => item.date.toString() === date);

    if (existingIndex !== -1) {
        tempCount[existingIndex].count++;
    } else {
        tempCount.push({ date, count: 1 });
    }

    await prisma.directLink.update({
        where: {
            id: linkId
        },
        data: {
            viewCount: tempCount,
            totalViewCount: {
                increment: 1,
            }
        }
    })





}