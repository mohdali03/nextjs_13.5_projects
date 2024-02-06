import Link from 'next/link'
import React from 'react'
import {Badge } from '@/components/ui/badge'
interface Props{
    id: number | string,
    name: string,
    totalQuestion?: number,
    showCount?: boolean
}

const RenderTag = ({id, name, totalQuestion, showCount}: Props) => {
  
  return (
    <Link href={`/tags/${id}`} className='flex justify-between gap-2'>
        <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">{name}</Badge>
        {showCount && (
            <p className='text-dark500_light700 small-medium'>{totalQuestion }</p>
        )}
    </Link>
  )
}

export default RenderTag