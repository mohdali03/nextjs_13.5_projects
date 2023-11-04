import Link from 'next/link';
import React from 'react'
import RenderTag from '../shared/RenderTag';
import Metric from '../shared/Metric';
import { formatAndDivideNumber, getTimestamp } from '@/lib/utils';
interface QuestionProps {
    _id: string;
    title: string;
    tags: {
        _id: string;
        name: string;
    }[];
    author: {
        _id: string;
        name: string;
        picture: string;
        clerkId: string;
    };
    upvotes: number;
    downvotes: number;
    views: number;

    answer: Array<object>;
    createdAt: Date;

}

function formatDate(date: any) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}
const QuestionCards = ({ _id, title, tags, author, upvotes, downvotes, answer, createdAt, views }: QuestionProps) => {
    return (
        <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
            <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                    <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
                        {formatDate(createdAt)}
                    </span>
                    <Link href={`/question/${_id}`}>
                        <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
                            {title}
                        </h3>
                    </Link>
                </div>
                {/* if user signin then users can add edit delete actions  */}
            </div>

            <div className="mt-3.5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <RenderTag key={tag._id} id={tag._id} name={tag.name} />
                ))}
            </div>
            <div className="flex-between mt-6 w-full flex-wrap gap-3">
            <Metric 
            imgUrl={author.picture}
            alt="user"
            value={author.name}
            title={` - asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author._id}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          /> 
                <Metric
                    imgUrl="/assets/icons/like.svg"
                    alt="Upvotes"
                    // value={upvotes}
                    value={formatAndDivideNumber(upvotes)}
                    title=" Votes"
                    textStyles="small-medium text-dark400_light800"
                />
                <Metric
                    imgUrl="/assets/icons/message.svg"
                    alt="message"
                    value={formatAndDivideNumber(answer.length)}
                    title=" Answers"
                    textStyles="small-medium text-dark400_light800"
                />
                <Metric
                    imgUrl="/assets/icons/eye.svg"
                    alt="eye"
                    value={formatAndDivideNumber(views)}
                    title=" Views"
                    textStyles="small-medium text-dark400_light800"
                />
            </div>
        </div>
    )
}

export default QuestionCards