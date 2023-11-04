"use client"

import { HomePageFilters } from '@/constant/filters'
import React from 'react'
import { Button } from '../ui/button'



const HomeFilter = () => {
    const active = 'newest'
    return (
        <div className="mt-10 hidden flex-wrap gap-3 md:flex ">
            {HomePageFilters.map((item) => (
                <Button key={item.value} onClick={()=>{}}
                className={`body-regular rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value ? 'bg-primary-100 text-primary-500' : 'bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400' }`}>
                    {item.name}
                </Button>
            ))}
        </div>
    )
}

export default HomeFilter