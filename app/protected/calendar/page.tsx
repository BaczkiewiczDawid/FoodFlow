import {NewMeal} from "@/components/new-meal";

export default async function Page() {

    return (
        <div>
            <NewMeal />
            <h1 className={"font-bold text-xl"}>31 December, 2024</h1>
            <div className={"flex flex-col gap-y-4 mt-8 lg:w-2/3 xl:w-1/3"}>
                <div className={"bg-muted p-4 rounded-md"}>
                    <div className={"flex flex-col"}>
                        <p>Breakfast</p>
                        <div className={"flex justify-between font-light text-sm"}>
                            <p>532 Kcal</p>
                            <p>12 B</p>
                            <p>7.2 T</p>
                            <p>53 W</p>
                        </div>
                    </div>
                </div>
                <div className={"bg-muted p-4 rounded-md"}>
                    <div className={"flex flex-col"}>
                        <p>Lunch</p>
                        <div className={"flex justify-between font-light text-sm"}>
                            <p>532 Kcal</p>
                            <p>12 B</p>
                            <p>7.2 T</p>
                            <p>53 W</p>
                        </div>
                    </div>
                </div>
                <div className={"bg-muted p-4 rounded-md"}>
                    <div className={"flex flex-col"}>
                        <p>Dinner</p>
                        <div className={"flex justify-between font-light text-sm"}>
                            <p>532 Kcal</p>
                            <p>12 B</p>
                            <p>7.2 T</p>
                            <p>53 W</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}