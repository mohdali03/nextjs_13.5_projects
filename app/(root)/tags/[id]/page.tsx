import QuestionCard from '@/components/cards/QuestionCards'
import NoResult from '@/components/shared/NoResult'
import LocalSearch from '@/components/shared/search/LocalSearch'
import { IQuestion } from '@/db/question.model'
import { getQuestionByTagId } from '@/lib/actions/tag.actions'
import { URLProps } from '@/types'
import React from 'react'

const page = async ({ params, searchParams }: URLProps) => {

    const result = await getQuestionByTagId({
        tagId: params.id,
        page: 1,
        searchQuery: searchParams.q
    })

    
    return (
        <div>
            <h1 className="h1-bold  text-dark100_light900">{result.tagTitle}</h1>
            <div className="mt-12 w-full">
                <LocalSearch
                    iconPosition='left'
                    route={`/tags/${params.id}`}
                    imgSrc='/assets/icons/search.svg'
                    placeholder="Search Questions..."
                    otherClasses='flex-1' />

            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {/* {result.questions.length > 0 ?
                    result.questions.map((question: IQuestion) => (

                        <QuestionCard
                            key={question._id}
                            _id={question._id}
                            title={question.title}
                            tags={question.tags}
                            author={question.author}
                            upvotes={question.upvotes}
                            views={question.view}
                            answers={question.answers}
                            createdAt={question.createdAt}
                        />
                    )) : <NoResult
                        title="There's are no saved question to show"
                        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                        link="/addQuestion"
                        linktitle="Ask a Question" />}
                {result.questions} */}

                {result.questions.length > 0 ?
                    result.questions.map((question: any) => (
                        <QuestionCard
                            key={question._id}
                            _id={question._id}
                            title={question.title}
                            tags={question.tags}
                            author={question.author}
                            upvotes={question.upvotes}
                            views={question.views}
                            answers={question.answers}
                            createdAt={question.createdAt}
                        />
                    ))
                    : <NoResult
                        title="There’s no tag question saved to show"
                        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                        link="/ask-question"
                        linktitle="Ask a Question"
                    />}
            </div>

        </div>
    )
}

export default page