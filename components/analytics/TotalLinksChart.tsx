"use server"
import { cookies } from "next/headers";
import { getGlobalVisits } from "@/lib/actions/directLink.action";
import RenderChart from "./RenderChart";
import { generateMonthDates, generateObjectWithValues } from "@/lib/utils";

export default async function TotalLinksChart() {
    const userId = cookies().get('userId')

    const globalVisits = await getGlobalVisits(userId!.value);

    return (
        <RenderChart data={globalVisits} />
    );
}
