import {toast} from "sonner";

export const useToast = (status: boolean, type: "add" | "delete" | "fetch" | "edit", name: string) => {
    const statusMessage = status ? "Successfully" : "Failed to"
    let typeMessage = ""

    switch (type) {
        case "add":
            if (status) {
                typeMessage = "added"
            } else {
                typeMessage = "add"
            }
            break
        case "delete":
            typeMessage = "deleted"
            break
        case "fetch":
            typeMessage = "fetch"
            break
        case "edit":
            typeMessage = "edit"
    }

    return toast(`${statusMessage} ${typeMessage}`, {
        description: `${statusMessage} ${typeMessage}: ${name}`,
    })
}