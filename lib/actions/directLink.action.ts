"use server";
import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma';
import { isValidUrl } from '../utils';

export async function createDirectLink(prevState: any, formData: FormData,) {

    const uuid = uuidv4();

    const data = {
        id: uuid,
        userId: prevState.userId,
        originalLink: formData.get('link')!.toString(),
        shortenLink: uuid,
    }
    if (!isValidUrl(data.originalLink)) {
        return {
            ...prevState,
            status: "failed",
            message: "Invalid link format"
        }
    }
    try {
        const directLink = await prisma.directLink.create({
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
        message: "Link shortened succesfully"
    }

}

export async function getUserLinks() {
    
}