"use server"
import { cookies } from "next/headers";
import { getGlobalVisits } from "@/lib/actions/directLink.action";
import RenderChart from "./RenderChart";
import { generateMonthDates, generateObjectWithValues } from "@/lib/utils";

export default async function TotalLinksChart() {
    const userId = cookies().get('userId')

    const globalVisits = await getGlobalVisits(userId!.value);
    const monthDates = generateMonthDates(2024, 7)

    const monthData = generateObjectWithValues(monthDates, globalVisits)
    const values = Object.values(monthData);
    const dates = Object.keys(monthData).map(date => parseInt(date.split('-')[2]));

    return (
        <RenderChart dates={dates} values={values} />
    );
}
