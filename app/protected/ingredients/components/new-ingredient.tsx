"use client"

import {Button} from "../../../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../components/ui/dialog"
import {Input} from "../../../../components/ui/input"
import {Label} from "../../../../components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../../../../components/ui/select";
import {useState} from "react";
import {useApi} from "@/helpers/useApi";
import {useToast} from "@/hooks/use-toast";
import {Toaster} from "../../../../components/ui/sonner";

export const NewIngredient = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [type, setType] = useState<string>("grammage");
    const [isLoading, setLoading] = useState<boolean>(false)

    const email = "baczkiewicz.dawid22@gmail.com"

    const addNewIngredient = async () => {
        if (!name || !quantity || !type) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetchData();

            useToast(response.status, "add", "ingredient");

            setIsOpen(false);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        return useApi("/api/ingredients/new-ingredient", {
            name,
            quantity,
            type,
            email
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className={"mt-4 ml-4"} asChild>
                <Button variant="outline">Add ingredient</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add ingredient</DialogTitle>
                    <DialogDescription>
                        Add a new ingredient to Your list.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder={"Chicken..."}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                            Quantity
                        </Label>
                        <div className="flex items-center gap-2 col-span-3">
                            <Input
                                id="quantity"
                                placeholder="42..."
                                type={"number"}
                                className="flex-grow"
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                            <Select defaultValue={"piece"} onValueChange={(e) => setType(e)}>
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem className="cursor-pointer" value={"grammage"}>
                                            Grammage
                                        </SelectItem>
                                        <SelectItem className="cursor-pointer" value={"piece"}>
                                            Piece
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={addNewIngredient} type="button">Save changes</Button>
                </DialogFooter>
            </DialogContent>
            <Toaster />
        </Dialog>
    )
}