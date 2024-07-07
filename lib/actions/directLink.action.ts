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
    const raw = await prisma.directLink.findMany({
      where: {
        userId: userId,
      },
      select: {
        viewCount: true,
      },
    });

    const count = JSON.parse(JSON.stringify(raw))
  
    // Flatten the viewCount array and group by date
    const combinedData: { [date: string]: number } = {};
    for (const { viewCount } of count) {
      for (const { date, count } of viewCount) {
        if (combinedData[date]) {
          combinedData[date] += count;
        } else {
          combinedData[date] = count;
        }
      }
    }
  
    // Convert the combinedData object into an array of ViewData objects
    const viewDataArray: { date: string; count: number }[] = [];
    for (const date in combinedData) {
      viewDataArray.push({
        date: date,
        count: combinedData[date],
      });
    }
  
    return viewDataArray; 
  }
  