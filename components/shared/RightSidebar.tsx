import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import RenderTag from './RenderTag'
import { getHotQuestion } from '@/lib/actions/question.action'
import { getAllTags, gethotTag } from '@/lib/actions/tag.actions'

const RightSidebar = async () => {
    // const hotQuestions = [
    //     {
    //         _id: 1,
    //         title:
    //             "What is the best way to learn is good programming?"
    //     },
    //     {
    //         _id: 2,
    //         title:
    //             "What is the best way to learn programming?"
    //     },
    //     {
    //         _id: 3,
    //         title:
    //             "What is the best way to learn programming?",
    //     }
    // ]

    const hotQuestions = await getHotQuestion();
    const popularTag = await gethotTag();

    console.log(popularTag);
    return (
        <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col  overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden ">
            <div><h1 className='h3-bold text-dark200_light900'>Top Questions</h1>
                <div className='mt-7 flex w-full flex-col gap-[30px]'>

                    {hotQuestions?.map((question) => (
                        <Link
                            href={`/question/${question._id}`}
                            key={question._id}
                            className='flex cursor-pointer items-center justify-between gap-3'
                        >
                            <p className="body-medium text-dark500_light700">{question.title}</p>
                            <Image
                                src="/assets/icons/chevron-right.svg"
                                alt="chevron right"
                                width={20}
                                height={20}
                                className="invert-colors"

                            />

                        </Link>
                    ))}
                </div>

            </div>
            <div className='mt-12 flex w-full flex-col gap-[30px]'>
                <h3 className='h3-bold text-dark200_light900'>
                    Popular Tags
                </h3>
                <div className="mt-7 flex flex-col gap-4">
                    {popularTag?.map((tag)=>(
                        <RenderTag 
                        key={tag.id}
                        id={tag.id}
                        name={tag.name}
                        totalQuestion={tag.questionCount}
                        showCount
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RightSidebar