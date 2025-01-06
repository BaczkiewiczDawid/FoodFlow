"use client";

import {Button} from "@/components/ui/button";
import moment from "moment/moment";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {useCalendarStore} from "@/app/context/calendar";

type Props = {
    date: string
};

export const DateSelector = ({date}: Props) => {
    const selectedDate = useCalendarStore((state: any) => state.selectedDate);
    const setSelectedDate = useCalendarStore((state: any) => state.setSelectedDate);

    const setDate = (currentDate: string, direction: "forward" | "backward") => {
        const updatedDate = direction === "forward"
            ? moment(currentDate, "YYYY-DD-MM").add(1, "d").format("YYYY-DD-MM")
            : moment(currentDate, "YYYY-DD-MM").subtract(1, "d").format("YYYY-DD-MM");
        setSelectedDate(updatedDate);
    };

    const dateString = moment(selectedDate, "YYYY-DD-MM").format("DD MMMM, YYYY");

    return (
        <div className={"flex items-center gap-x-4"}>
            <Button
                variant={"outline"}
                className={"w-6 h-6"}
                onClick={() => setDate(selectedDate, "backward")}
            >
                <ChevronLeftIcon className={"h-4 w-4"}/>
            </Button>
            <h1 className={"font-bold text-xl"}>{dateString}</h1>
            <Button
                variant={"outline"}
                className={"w-6 h-6"}
                onClick={() => setDate(selectedDate, "forward")}
            >
                <ChevronRightIcon className={"h-4 w-4"}/>
            </Button>
        </div>
    );
};
