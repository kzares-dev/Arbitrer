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



function RenderChart({ dates, values }: { dates: string[], values: string[] }) {
    return (
        <div className="flex items-center section">
            <Line data={{
                labels: dates,
                datasets: [
                    {
                        label: "First dataset",
                        data: values,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)"
                    },
                    
                ]
            }} />
        </div>
    )
}

export default RenderChart
