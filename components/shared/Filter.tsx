import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface FiltersProps {
    filter: {
        name: string;
        value: string;
    }[],
    otherClasses?: string;
    containerClasses?: string;
}

const Filter = ({ filter, otherClasses, containerClasses }: FiltersProps) => {
    return (
        <div className={`relative ${containerClasses}`}>
            <Select>
                <SelectTrigger className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}>
                    <div className="line-clamp-1 flex-1 text-left">
                        <SelectValue placeholder="Select a Filter" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {filter.map((items)=>(
                        <SelectItem key={items.name} value={items.value}>
                            {items.name}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Filter