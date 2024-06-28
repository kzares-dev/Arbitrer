"use client";
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
import { Line } from 'react-chartjs-2';

// Manual register is mandatory, the react-chart-2 package has no implementation for it
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



function RenderChart({ dates, values }: { dates: number[], values: number[] }) {
   
    const sum = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return (
        <div className="flex items-center section">
            <Line data={{
                labels: dates,
                datasets: [
                    {
                        label: "Visits",
                        data: values,
                        fill: true,
                        backgroundColor: "#000",
                        borderColor: "#000"
                    },
                    
                ]
            }} />
        </div>
    )
}

export default RenderChart
