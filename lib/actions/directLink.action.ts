"use server";
import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma';

export async function createDirectLink(prevState: any, formData: FormData,) {

    const uuid = uuidv4()

    const data = {
        id: uuid,
        userId: prevState.userId,
        link: formData.get('link')?.toString(),
        shortenLink: uuid,
    }
    // save in database 
    try {
        const directLink = await prisma.directLink.create({
            data: data
        })
    }
    catch {
        // trow some error 
    }
    // return success 

}