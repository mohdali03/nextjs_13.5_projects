"use client"

import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { formatAndDivideNumber } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import React from 'react'

interface Props {
    type: string,
    itemId: string,
    userId: string,
    upvotes: number,
    hasupVoted: boolean,
    downvotes: number,
    hasdownVoted: boolean,
    hasSaved?: boolean,
}
const Votes = ({
    type,
    itemId,
    userId,
    upvotes,
    hasupVoted,
    downvotes,
    hasdownVoted,
    hasSaved
}: Props) => {
    const pathname = usePathname();
    // const router = useRouter();

    const handleSaved = () => {

    }
    // const handleVote = async (action: string) => {
    //     if (!userId) {
    //         return;
    //     }
    //     // if(action === 'upvote'){
    //     //     if(type === "Question"){
    //     //         await upvoteQuestion({
    //     //             questionId: JSON.parse(itemId),
    //     //             userId: JSON.parse(userId),
    //     //             hasupVoted,
    //     //             hasdownVoted,
    //     //             path : pathname,

    //     //         })
    //     //         console.log({hasupVoted, hasdownVoted});

    //     //     }
    //     //     else if (type === "Answer"){
    //     //         // await upvoteAnswer({
    //     //         //     questionId: JSON.parse(itemId),
    //     //         //     userId: JSON.parse(userId),
    //     //         //     hasupVoted,
    //     //         //     hasdownVoted,
    //     //         //     path : pathname,

    //     //         // })
    //     //     }


    //     // }   
    //     if (action === 'upvote') {
    //         try {
    //             if (type === "Question") {
    //                 await upvoteQuestion({
    //                     questionId: JSON.parse(itemId),
    //                     userId: JSON.parse(userId),
    //                     hasupVoted,
    //                     hasdownVoted,
    //                     path: pathname
    //                 });
    //             }
    //             // Add else-if for other types if needed
    //         } catch (error) {
    //             console.error("Error upvoting:", error);
    //         }
    //     }

    //     //     if(action === 'downvote'){
    //     //         console.log({hasupVoted, hasdownVoted});
    //     //         if(type === "Question"){
    //     //             await downvoteQuestion({
    //     //                 questionId: JSON.parse(itemId),
    //     //                 userId: JSON.parse(userId),
    //     //                 hasupVoted,
    //     //                 hasdownVoted,
    //     //                 path : pathname,

    //     //             })

    //     //         }
    //     //         else if (type === "Answer"){
    //     //             // await downVoteAnswer({
    //     //             //     questionId: JSON.parse(itemId),
    //     //             //     userId: JSON.parse(userId),
    //     //             //     hasupVoted,
    //     //             //     hasdownVoted,
    //     //             //     path : pathname,

    //     //             // })
    //     //         }

    //     //     }   
    //     // }
    //     if (action === 'downvote') {
    //         try {
    //             if (type === "Question") {
    //                 await downvoteQuestion({
    //                     questionId: JSON.parse(itemId),
    //                     userId: JSON.parse(userId),
    //                     hasupVoted,
    //                     hasdownVoted,
    //                     path: pathname
    //                 });
    //             }
    //             // Add else-if for other types if needed
    //         } catch (error) {
    //             console.error("Error downvoting:", error);
    //         }
    //     }
    // };

    const handleVote = async (action: string) => {
        if (!userId) {
            return;            // toast({
            //     title: 'Please log in',
            //     description: 'You must be logged in to perform this action',
            // })
        }

        if (action === 'upvote') {
            if (type === 'Question') {
                await upvoteQuestion({
                    questionId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path: pathname,
                })
            } else if (type === 'Answer') {
                await upvoteAnswer({
                    answerId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path: pathname,
                })
            }

            // return toast({
            //     title: `Upvote ${!hasupVoted ? 'Successful' : 'Removed'}`,
            //     variant: !hasupVoted ? 'default' : 'destructive'
            // })
        }

        if (action === 'downvote') {
            if (type === 'Question') {
                await downvoteQuestion({
                    questionId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path: pathname,
                })
            } else if (type === 'Answer') {
                await downvoteAnswer({
                    answerId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasupVoted,
                    hasdownVoted,
                    path: pathname,
                })
            }

           

        }
    }
    return (
        <div className="flex gap-5">
            <div className="flex-center gap-2.5">
                <div className="flex-center gap-1.5">
                    <Image
                        src={hasupVoted
                            ? '/assets/icons/upvoted.svg'
                            : '/assets/icons/upvote.svg'
                        }
                        width={18}
                        height={18}
                        alt="upvote"
                        className="cursor-pointer"
                        onClick={() => handleVote('upvote')}
                    />

                    <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                        <p className="subtle-medium text-dark400_light900">
                            {formatAndDivideNumber(upvotes)}
                        </p>
                    </div>
                </div>

                <div className="flex-center gap-1.5">
                    <Image
                        src={hasdownVoted
                            ? '/assets/icons/downvoted.svg'
                            : '/assets/icons/downvote.svg'
                        }
                        width={18}
                        height={18}
                        alt="downvote"
                        className="cursor-pointer"
                        onClick={() => handleVote('downvote')}
                    />

                    <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                        <p className="subtle-medium text-dark400_light900">
                            {formatAndDivideNumber(downvotes)}
                        </p>
                    </div>
                </div>
            </div>
           { type === "Question" && (<Image
                src={hasSaved ? '/assets/icone/star-filled.svg' : '/assets/icons/star-red.svg'}
                alt='star'
                width={18}
                height={18}
                className='cursor-pointer'
                onClick={handleSaved}

            /> )}
        </div>
    )
}

export default Votes    