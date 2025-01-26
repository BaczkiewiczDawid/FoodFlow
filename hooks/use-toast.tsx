import {toast} from "sonner";

export const useToast = (status: boolean, type: "add" | "delete" | "fetch", name: string) => {
    const statusMessage = status ? "Successfully" : "Failed to"
    let typeMessage = ""

    switch(type) {
        case "add":
            typeMessage = "added"
            break
        case "delete":
            typeMessage = "deleted"
            break
        case "fetch":
            typeMessage = "fetch"
    }

    return toast(`${statusMessage} ${typeMessage}`, {
        description: `${statusMessage} ${typeMessage}: ${name}`,
    })
}