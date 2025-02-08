import {Skeleton} from "@/components/ui/skeleton";

type Props = {
    type?: "list" | "block"
}

export const Loader = ({type}: Props) => {

    switch (type) {
        case "list":
            return (
                <div className={"mt-8 flex flex-col gap-y-4"}>
                    <div className={"flex flex-col gap-y-4"}>
                        <Skeleton className={"w-1/2 h-4 bg-muted-foreground"}/>
                        <Skeleton className={"w-full h-4 bg-muted-foreground"}/>
                    </div>
                    <div className={"flex flex-col gap-y-4"}>
                        <Skeleton className={"w-1/2 h-4 bg-muted-foreground"}/>
                        <Skeleton className={"w-full h-4 bg-muted-foreground"}/>
                    </div>
                    <div className={"flex flex-col gap-y-4"}>
                        <Skeleton className={"w-1/2 h-4 bg-muted-foreground"}/>
                        <Skeleton className={"w-full h-4 bg-muted-foreground"}/>
                    </div>
                </div>
            )
        case "block":
            return (
                <div>
                    <Skeleton className={"w-1/2 h-48 bg-muted-foreground"}/>
                </div>
            )
        default:
            return <Skeleton className={"w-12 h-4 bg-muted-foreground"}/>
    }
}