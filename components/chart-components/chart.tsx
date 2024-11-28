"use client"

import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {ChartData} from "@/app/types/chart-data";
import {cn} from "@/utils/cn";

ChartJS.register(ArcElement, Tooltip, Legend);


type Props = {
    data: ChartData
    className: string
}

export const Chart = ({data, className}: Props) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        cutout: "70%",
    };

    return (
        <div className={cn("w-full", className)}>
            <Doughnut data={data} options={options}/>
        </div>
    )
}