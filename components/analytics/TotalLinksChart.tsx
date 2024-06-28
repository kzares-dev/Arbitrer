"use server"
import { cookies } from "next/headers";
import { getGlobalVisits } from "@/lib/actions/directLink.action";
import RenderChart from "./RenderChart";
import { generateMonthDates,generateObjectWithValues } from "@/lib/utils";

export default async function TotalLinksChart() {
    const userId = cookies().get('userId')

    const globalVisits = await getGlobalVisits(userId!.value);
    const dates = Object.keys(globalVisits);
    const values = Object.values(globalVisits); 

    const monthDates = generateMonthDates(2024, 7)

     const result = generateObjectWithValues(monthDates, globalVisits)
     console.log(result)

    return (
        <RenderChart dates={dates} values={values} />
    );
}
