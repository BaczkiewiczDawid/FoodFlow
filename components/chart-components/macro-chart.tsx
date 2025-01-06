import {ChartData} from "@/app/types/chart-data";
import {Chart} from "@/components/chart-components/chart";

type Props = {
    data: ChartData
    name: string
}

export const MacroChart = ({data, name}: Props) => {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <p>{name}</p>
            <Chart className={"py-2 items-center flex justify-center"} data={data}/>
            <p className={"text-center text-sm"}>{data.datasets[0].data[0]} of {data.datasets[0].data[1]}</p>
        </div>
    )
}