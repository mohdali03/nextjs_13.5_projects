// import GlobalSearch from "@/components/shared/search/GlobalSearch";
import HomeFilter from "@/components/home/HomeFilter";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";
import QuesitonCards from '@/components/cards/QuestionCards'
import { HomePageFilters } from '@/constant/filters'
import Link from "next/link";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
;


export default async function Home({ searchParams }: SearchParamsProps) {

    const result = await getQuestions({
        searchQuery: searchParams.q,
        filter: searchParams.filter,

    })




    return (
        <div>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                <p className="h1-bold  text-dark100_light900">All Questions</p>
                <Link href="/ask-question" className="flex justify-end max-sm:w-full">
                    <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900">
                        Ask a Question
                    </Button>
                </Link>

            </div>
            <div className="mt-12 flex w-full justify-between gap-4 sm:flex-row sm:items-center">
                <LocalSearch
                    iconPosition='left'
                    route='/'
                    imgSrc='/assets/icons/search.svg'
                    placeholder="Search Questions..."
                    otherClasses='flex-1' />

                <Filter
                    filter={HomePageFilters}
                    otherClasses='min-h-[56px] sm:min-w-[170px]'
                    containerClasses='hidden max-md:flex' />
            </div>
            <HomeFilter />
            <div className="mt-10 flex w-full flex-col gap-6">
                {result.questions.length > 0 ?
                    result.questions.map((question) => (

                        <QuesitonCards
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
                        title="There's are no question to show"
                        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                        link="/addQuestion"
                        linktitle="Ask a Question" />}
                {/* {result.questions} */}
            </div>
            <div className="mt-10">

                <Pagination
                    pageNumber={searchParams?.page ? + searchParams.page : 1}
                    isNext={false} />
            </div>
        </div>
    )
}