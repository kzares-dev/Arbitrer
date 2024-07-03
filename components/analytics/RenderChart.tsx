"use client";
import { generateMonthDates, generateObjectWithValues } from '@/lib/utils';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// Manual register is mandatory, the react-chart-2 package has no implementation for it
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

interface ViewData {
    date: string;
    count: number;
}

function RenderChart({ data }: { data: ViewData[] }) {

    // TODO: implement the filter functionality
    const [selectedDate, setSelectedDate] = useState("month");
    const [selectedMonth, setSelectedMonth] = useState(7);
    const [selectedYear, setSelectedYear] = useState(2024);

    const [dates, setDates] = useState<number[]>([])
    const [values, setValues] = useState<number[]>([])

    // this effect tracks the selectedDate format to update the data
    useEffect(() => {
        if (selectedDate === "month") {
            getDataPerMonth()
        }

    }, [])

    const getDataPerMonth = () => {
        const today = new Date();
        let limit = 0;
        
        if(today.getFullYear() === selectedYear && today.getMonth() + 1 === selectedMonth) {
            limit = today.getDay();
        }

        console.log(limit)

        const monthDates = generateMonthDates(selectedYear, selectedMonth, limit);
        const monthData = generateObjectWithValues(monthDates, data);

        const dates = monthData.map(item => item.date);
        const daysOfMonth = dates.map(date => {
            const day = parseInt(date.split('-')[2], 10); // Extraer el día del mes
            return day;
        });

        const counts = monthData.map(item => item.count);

        setDates(daysOfMonth);
        setValues(counts);
    }



    return (
        <div className="flex items-center section mt-5">

            <Line data={{
                labels: dates,
                datasets: [
                    {
                        label: "Number of Visits",
                        data: values,
                        backgroundColor: "#222",
                        borderColor: "#222"
                    },

                ]
            }} />
        </div>
    )
}

export default RenderChart
