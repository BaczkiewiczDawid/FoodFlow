import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {firstLetterToUpperCase} from "@/helpers/first-letter-to-upper-case";
import {Command, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";
import {useState} from "react";

type Props = {
    data: {
        value: string | number,
        displayValue: string
    }[]
    defaultValue: string
    onSelect: (value: string) => void
}

export const Combobox = ({data, defaultValue, onSelect}: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    aria-expanded={isOpen}
                    role={"combobox"}
                    className={"px-4 py-2 rounded-md w-full text-left justify-start"}>{firstLetterToUpperCase(defaultValue)}</Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {data.map((el) => (
                                <CommandItem
                                    key={el.value}
                                    value={String(el.value)}
                                    onSelect={(currentValue) => {
                                        onSelect(currentValue)
                                        setIsOpen(false)
                                    }}
                                    className={"cursor-pointer"}
                                >
                                    {el.displayValue}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}