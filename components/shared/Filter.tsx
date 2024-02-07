"use client"
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
import { useSearchParams, useRouter } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';
// import {  } from 'next/router';

interface FiltersProps {
    filter: {
        name: string;
        value: string;
    }[],
    otherClasses?: string;
    containerClasses?: string;
}

const Filter = ({ filter, otherClasses, containerClasses }: FiltersProps) => {
    const router = useRouter();
    
    const searchParams = useSearchParams();

    const paramsFilter = searchParams.get("filter");




    const handleUpdateParams = (value : string) => {

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'filter',
            value
        })
        router.push(newUrl, { scroll: false });
    }







    return (
        <div className={`relative ${containerClasses}`} >
            <Select
                onValueChange={handleUpdateParams}
                defaultValue={paramsFilter || undefined}>
                <SelectTrigger className={`${otherClasses} body-regular light-border background-light900_dark300 text-dark500_light700 border px-5 py-2.5`}>
                    <div className="line-clamp-1 flex-1 text-left">
                        <SelectValue placeholder="Select a Filter" />
                    </div>
                </SelectTrigger>
                <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
                    <SelectGroup>
                        {filter.map((item) => (
                            <SelectItem key={item.value} value={item.value} className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400">
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div >
    )
}

export default Filter