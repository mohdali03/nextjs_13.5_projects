import { getUserAnswer } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react'
import AnswerCard from '../cards/AnswerCards';


interface Props extends SearchParamsProps {
    userId: string;
    clerkId?: string | null;
}
export const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {

    const result = await getUserAnswer({
        userId,
        page: 1,
    })


    return (
        <>

            {result.answers.map((answer) => (

                <AnswerCard
                    key={answer._id}
                    _id={answer._id}
                    clerkId={clerkId}
                    question={answer.question}
                    author={answer.author}
                    upvotes={answer.upvotes}
                    createdAt={answer.createdAt}
                />
            ))}
        </>
    )
}
