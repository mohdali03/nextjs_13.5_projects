"use client"

import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';


interface Props {
    pageNumber: number;
    isNext: boolean;
}
const pagination = ({ pageNumber, isNext }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const handleClick = (direction: string) => {
        const nextPage = direction === "prev" ? pageNumber - 1 : pageNumber + 1;


        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "page",
            value: nextPage.toString(),

        })

        router.push(newUrl);


    }

    if(!isNext && pageNumber === 1) return null; 
    return (
        <div className='flex w-full items-center justify-center gap-2'>
            <Button
                disabled={pageNumber === 1}
                onClick={() => handleClick('prev')}
                className='light-border-2 btn flex min-h-[36px] items-center cursor-pointer justify-center gap-2 border' >
                <p className="body-medium text-dark200_light800">Prev</p>
            </Button>
            <div
                className=' bg-primary-500 flex items-center justify-center  py-2.5 px-3.5 rounded-md ' >
                <p className='body-semibold text-light-900'>{pageNumber}</p>
            </div>
            <Button
                disabled={!isNext}
                onClick={() => handleClick('next')}

                className='light-border-2 btn flex min-h-[36px] items-center cursor-pointer justify-center gap-2 border' >
                <p className="body-medium text-dark200_light800">Next</p>
            </Button>
        </div>
    )
}

export default pagination   