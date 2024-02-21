import QuestionCard from "@/components/cards/QuestionCards";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constant/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from '@clerk/nextjs'


export default async function Home({ searchParams }: SearchParamsProps) {

    const { userId } = auth()

    if (!userId) return null;

    const result = await getSavedQuestions({
        clerkId: userId,
        searchQuery: searchParams.q,
        filter: searchParams.filter,
        page: searchParams.page ? +searchParams.page : 1,
    })
    
    console.log(result.isNext)

    return (
        <div>

            <div className="mt-12 flex w-full justify-between gap-4 sm:flex-row sm:items-center">
                <LocalSearch
                    iconPosition='left'
                    route='/collection'
                    imgSrc='/assets/icons/search.svg'
                    placeholder="Search Questions..."
                    otherClasses='flex-1' />

                <Filter
                    filter={QuestionFilters}
                    otherClasses='min-h-[56px] sm:min-w-[170px]'
                    containerClasses=' max-md:flex' />
            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {result.question.length > 0 ?
                    result.question.map((question: any) => (

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


            </div>
            <div className="mt-10">

                <Pagination
                    pageNumber={searchParams?.page ? + searchParams.page : 1}
                    isNext={result.isNext} />
            </div>
        </div>
    )
}