import { AnswerFilters } from '@/constant/filters'
import { getAnswer } from '@/lib/actions/answer.action';
import React from 'react'
import Filter from './Filter';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import ParseHTML from './search/ParseHTML';
import Votes from './Votes';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';

interface props {
  questionId: string,
  userId: string,
  totalAnswer?: number,
  Page?: number,
  filter?: number,
}
const AllAnswer = async ({ questionId, userId, totalAnswer, Page, filter }: props) => {

  const result = await getAnswer({ questionId });
  // console.log("totalAnswer : ", totalAnswer);
  const { userId: clerkId } = auth()
  // console.log(result)
 
  return (
    <div className='mt-11'>
      <div className="flex items-center justify-between">
        <h2 className="primary-text-gradient font-bold">

          {totalAnswer} Answers

        </h2>
        <Filter filter={AnswerFilters} />
      </div>

      <div className="">
        {result?.answer.map((answer) => (
          <article key={answer._id} className='light-border border-b py-10'>
            <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
              <Link href={`/profile/${answer.author.clerkId}`} className="flex flex-1 items-start gap-1 sm:items-center">
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>

                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    answered {" "}
                    {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-center">
                <Votes
                  type="Answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasdownVoted={answer.downvotes.includes(userId)}
                />
              </div>

            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}

      </div>

    </div>
  )
}

export default AllAnswer