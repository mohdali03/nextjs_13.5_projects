import { Button } from '@/components/ui/button'
import { getUserinfo } from '@/lib/actions/user.action'
import { URLProps } from '@/types'
import { SignedIn, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJoinedDate } from '@/lib/utils'
import ProfileLink from '@/components/shared/ProfileLink'
import Stats from "@/components/shared/Stats"
import Questiontab from '@/components/shared/Questiontab'
import { AnswerTab } from '@/components/shared/AnswerTab'

const page = async ({ params, searchParams }: URLProps) => {
    const { userId: clerkId } = auth();
    const userInfo = await getUserinfo({ userId: params.id });
    
    return (
        <>
            <div className="flex flex-col-reverse items-start justify-between sm:flex-row ">

                <div className="flex flex-col items-start gap-4 lg:flex-row">
                    <Image src={userInfo?.user.picture}
                        alt={"UserImg"}
                        width={140}
                        height={140}
                        className='rounded-full object-cover' />

                    <div className="mt-3">
                        <h2 className='h2-bold text-dark100_light900'>{userInfo?.user.name}</h2>
                        <p className='paragraph-regular text-dark100_light900'>@{userInfo?.user.username}</p>

                        <div className="mt-5 flex flex-wrap justify-start  items-center gap-2">
                            {/* <p>{userInfo?.user.location} followers</p>
                            <p>{userInfo?.user.following} following</p> */}

                            {userInfo?.user.PortfolioWebsite && (<p>
                                <ProfileLink
                                    imgUrl="/assets/icons/link.svg"
                                    title={userInfo?.user.PortfolioWebsite}
                                />
                            </p>)}
                            {userInfo?.user.location && (<p>
                                <ProfileLink
                                    imgUrl="/assets/icons/location.svg"
                                    title={userInfo?.user.location}
                                />
                            </p>)}

                            <ProfileLink
                                imgUrl="/assets/icons/calendar.svg"
                                title={getJoinedDate(userInfo?.user.joinedAt)}

                            />

                        </div>

                        {userInfo?.user.bio && (
                            <p className='paragraph-regular text-dark400_light800 mt-8'>
                                {userInfo?.user.bio}
                            </p>
                        )}

                    </div>
                </div>

                <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
                    <SignedIn>
                        {clerkId == userInfo?.user.clerkId && (
                            <Link href='/profile/edit/' >

                                <Button className='paragraph-medium  btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3 '>
                                    Edit Profile
                                </Button>
                            </Link>

                        )}
                    </SignedIn>
                </div>
            </div>

            
            {userInfo && <Stats
                totalQuestions={userInfo.totalQuestion}
                totalAnswers={userInfo.totalAnswer}
            />}
            <div className="mt-10 flex gap-10">
                <Tabs defaultValue="top-post" className="flex-1">
                    <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
                        <TabsTrigger value="top-post" className='tab'>Top Post</TabsTrigger>

                        <TabsTrigger value="answers" className='tab'>Answers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="top-post" className='mt-5 flex w-full flex-col gap-6'>
                    <Questiontab
                            searchParams={searchParams}
                            userId={userInfo?.user._id}
                            clerkId={params.id}
                        /></TabsContent>
                    <TabsContent value="answers" className='mt-5 flex w-full flex-col gap-6'>
                    <AnswerTab
                            searchParams={searchParams}
                            userId={userInfo?.user._id}
                            clerkId={params.id}
                        />
                    </TabsContent>
                </Tabs>
            </div>

        </>
    )
}

export default page