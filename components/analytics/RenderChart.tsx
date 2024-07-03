"use client";
import { generateMonthDates, generateObjectWithValues, getMonthNames, getPastYears } from '@/lib/utils';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosArrowDown } from "react-icons/io";

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

// hard coded static data
const monthNames = getMonthNames();
const pastYears = getPastYears();

const today = new Date();

function RenderChart({ data }: { data: ViewData[] }) {

    // TODO: implement the filter functionality
    const [dateFormat, setDateFormat] = useState("Month");
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());

    const [dates, setDates] = useState<any[]>([])
    const [values, setValues] = useState<number[]>([])
    const [sumOfValues, setSumOfValues] = useState(0);

    // this effect tracks the selectedDate format to update the data
    useEffect(() => {
        if (dateFormat === "Month") getDataPerMonth();
        if (dateFormat === "Decade") getDataPerDecade();
        if (dateFormat === "Year") getDataPerYear();

    }, [dateFormat, selectedMonth, selectedYear])

    const getDataPerYear = () => {
        const valuePerMonth: number[] = [];

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        const filteredMonthNames = selectedYear === currentYear ? monthNames.slice(0, currentMonth + 1) : monthNames;

        filteredMonthNames.map((currentMonth, idx) => {
            const monthCount = data.reduce((sum, item) => {
                const year = parseInt(item.date.split("-")[0]);
                const month = parseInt(item.date.split("-")[1]);
                if (year === selectedYear && idx === month - 1) {
                    sum += item.count;
                }
                return sum;
            }, 0);

            valuePerMonth.push(monthCount);
        });

        const allZeroValues = valuePerMonth.every(value => value === 0);

        if (allZeroValues) {
            setDates([]);
            setValues([]);
            return;
        }

        setDates(filteredMonthNames);
        setValues(valuePerMonth);
    };

    const getDataPerDecade = () => {
        const years = pastYears;
        const valuePerYears: number[] = [];

        years.map(currentYear => {
            const yearCount = data.reduce((sum, item) => {
                const year = parseInt(item.date.split('-')[0]);
                if (year === currentYear) {
                    sum += item.count;
                }
                return sum;
            }, 0);

            valuePerYears.push(yearCount);
        });
        const allZeroValues = valuePerYears.every(value => value === 0);
        if (allZeroValues) {
            setDates([]);
            setValues([]);
            return;
        }

        setDates(years);
        setValues(valuePerYears);
    };


    const getDataPerMonth = () => {
        let limit = 0;
        if (today.getFullYear() === selectedYear && today.getMonth() + 1 === selectedMonth) {
            limit = today.getDay();
        }
        const monthDates = generateMonthDates(selectedYear, selectedMonth, limit);
        const monthData = generateObjectWithValues(monthDates, data);

        const dates = monthData.map(item => item.date);
        const daysOfMonth = dates.map(date => {
            const day = parseInt(date.split('-')[2], 10);
            return day;
        });

        const counts = monthData.map(item => item.count);

        // Comprueba si todos los elementos en counts son 0
        const allZeroCounts = counts.every(count => count === 0);

        if (today.getMonth() + 1 < selectedMonth || (today.getFullYear() < selectedYear && today.getMonth() + 1 === selectedMonth) || allZeroCounts) {
            setDates([]);
            setValues([]);
            return;
        }

        setDates(daysOfMonth);
        setValues(counts);
    };

    // sum the values data
    useEffect(() => {
        let total = 0;
        if (values.length === 0) {
            setSumOfValues(0);
            return;
        }
        for (const value of values) {
            total += value;
        }

        setSumOfValues(total)
    }, [values])

    return (
        <div className="flex items-center section mt-5">
            <h1 className='flex gap-2 text-[30px] w-full font-sans font-normal w-full flex items-center justify-center'>
                Performance by:
            </h1>

            <div className="min-h-[100px] p-4 my-2 w-full rounded-md flex flex-col items-center justify-between md:flex-row gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className={`flex-1 py-4 border-[2px] border-gray-200 rounded px-2 text-lg font-sans font-thin flex flex-row items-center gap-2  ${dateFormat === "Month" ? "border-[2px] border-neutral-400" : "opacity-60"} `} >
                        <IoIosArrowDown />
                        Month:
                        <span className='text-gray-400'> {monthNames[selectedMonth - 1]} </span>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent className='bg-white-200 shadow border px-2'>
                        <DropdownMenuLabel className='border-b text-[18px]'>Select Month</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {monthNames.map((month: string, idx: number) => {
                            return (
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelectedMonth(idx + 1);
                                        setDateFormat("Month");
                                    }}
                                    className='cursor-pointer'
                                    key={month}>
                                    {month}
                                </DropdownMenuItem>

                            )
                        })}
                    </DropdownMenuContent>

                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger className={`flex-1 py-4 border-[2px] border-gray-200 rounded px-2 text-lg font-sans font-thin flex flex-row items-center gap-2 ${dateFormat === "Year" ? "border-[2px] border-neutral-400" : "opacity-60"} `} >
                        <IoIosArrowDown />
                        Year:
                        <span className='text-gray-400'> {selectedYear} </span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className='bg-white-200 shadow border px-2'>
                        <DropdownMenuLabel className='border-b text-[18px]'>Select Year</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {pastYears.map((year: number, idx: number) => {
                            return (
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelectedYear(year);
                                        setDateFormat("Year");
                                    }}
                                    className='cursor-pointer'
                                    key={year}>
                                    {year}
                                </DropdownMenuItem>

                            )
                        })}
                    </DropdownMenuContent>

                </DropdownMenu>
                <div onClick={() => setDateFormat("Decade")} className={`flex-1 py-4 border-[2px] border-gray-200 rounded px-2 text-lg font-sans font-thin cursor-pointer flex flex-row items-center gap-2 ${dateFormat === "Decade" ? "border-[2px] border-neutral-400" : "opacity-60"} `} >
                    Decade
                </div>

            </div>

            <div className="min-h-10 -mb-6 w-full bg-white-200 py-3 rounded px-2 border z-[2] text-[25px] items-center flex font-thin font-sans">
                
                {sumOfValues === 0? "No visits are registered" : dateFormat + " visits :" + sumOfValues}
            </div>

            <div className="min-h-[400px] w-full">
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
        </div>
    )
}

export default RenderChart
