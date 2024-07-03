"use server";
import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma';
import { getFormattedDate, validateUrl } from '../utils';

export async function createYoutubeDirectLink(prevState: any, formData: FormData,) {

    const uuid = uuidv4();
    if (!formData.get("title")) {
        return {
            ...prevState,
            status: "failed",
            message: "Data is not valid"
        }
    }

    const data = {
        id: uuid,
        userId: prevState.userId,
        originalLink: formData.get('link')!.toString(),
        shortenLink: uuid,
        image: formData.get("image")!.toString(),
        title: formData.get("title")!.toString(),
        description: formData.get("description")!.toString(),
        postDescription: formData.get("postDescription")!.toString(),

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
    catch (e: any) {
        console.log(e);
        return {
            ...prevState,
            status: "failed",
            message: "Error shortening link"
        }
    }

    return {
        ...prevState,
        status: "success",
        shortenLink: directLink.shortenLink,
        message: "Link shortened succesfully"
    }

}

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
    catch (e: any) {
        console.log(e.message)
        return {
            ...prevState,
            status: "failed",
            message: "Error shortening link"
        }
    }
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
            title: "",
            description: "",
            image: "",
        },
    });
    return count;
}

export async function getYoutubeLinksCount(userId: string): Promise<number> {
    const count = await prisma.directLink.count({
        where: {
            userId: userId,
            NOT: {
                title: "",
                description: "",
                image: "",
            }
        },
    });
    return count;
}


export async function getUserDirectLinks(
    userId: string,
    take: number,
    skip: number
) {

    return await prisma.directLink.findMany({
        where: {
            userId: userId,
            title: "",
            description: "",
            image: "",
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

export async function getUserYoutubeLinks(
    userId: string,
    take: number,
    skip: number
) {

    return await prisma.directLink.findMany({
        where: {
            userId: userId,
            NOT: {
                title: "",
                description: "",
                image: "",
            }
        },
        take,
        skip,
        select: {
            id: true,
            originalLink: true,
            shortenLink: true,
            createdAt: true,
            totalViewCount: true,
            title: true,
            description: true,
            image: true,
            postDescription: true,
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


export async function getLinkMetadata(id: string, update: boolean) {
    const directLink = await prisma.directLink.findUnique({
        where: {
            id
        }
    })

    if (update) await updateViewCount(id, getFormattedDate());

    return directLink
}


type DataItem = { date: string; count: number };

export async function getGlobalVisits(userId: string) {
    const viewCount = await prisma.directLink.findMany({
        where: {
            userId: userId
        },
        select: {
            viewCount: true,
        },
    });
    // parse the data into readable object
    const data = JSON.parse(JSON.stringify(viewCount));
    const combinedData: { [date: string]: number } = {};

    // Iterate over the main array and sub-arrays
    for (const { viewCount } of data) {
        for (const item of viewCount) {
            // If the date already exists, add the current count to the accumulated count
            if (combinedData[item.date]) {
                combinedData[item.date] += item.count;
            } else {
                // Otherwise, add the date and its count as a new entry
                combinedData[item.date] = item.count;
            }
        }
    }
    return combinedData;
}