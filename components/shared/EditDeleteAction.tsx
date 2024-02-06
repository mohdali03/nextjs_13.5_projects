
"use client";
import { DeleteAnswer } from '@/lib/actions/answer.action'
import { DeleteQuestion } from '@/lib/actions/question.action'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
interface props {
    type: string,
    itemId: string,
}
const EditDeleteAction = ({ type, itemId }: props) => {

    const pathname = usePathname()
    

    const router = useRouter()
    const handleDelete = async () => {


        if (type === 'Question') {
            await DeleteQuestion({
                questionId: JSON.parse(itemId),
                path: pathname
            })
        } else if (type === "Answer") {
            await DeleteAnswer({
                answerId: JSON.parse(itemId),
                path: pathname
            })

        }
    }
    const handleEdit = async () => {
        router.push(`/question/edit/${JSON.parse(itemId)}`)
    }

    return (
        <div className="flex item-center justify-end gap-3 max-sm:w-full">
            {type === 'Question' && (
                <Image
                    src={'/assets/icons/edit.svg'}
                    alt='Edit'
                    className='object-contain cursor-pointer'
                    width={14}
                    height={14}
                    onClick={handleEdit} />
            )}

            <Image
                src={'/assets/icons/trash.svg'}
                alt='Edit'
                className='object-contain cursor-pointer'
                width={14}
                height={14}
                onClick={handleDelete} />


        </div>
    )
}

export default EditDeleteAction