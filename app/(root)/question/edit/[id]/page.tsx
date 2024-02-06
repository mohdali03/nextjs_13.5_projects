import Question from '@/components/forms/Question'
import { getQuestionsbyId } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { ParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'
import { CopySlash } from 'lucide-react'
import React from 'react'

const page = async ({ params }: ParamsProps) => {

  const { userId } = auth()
  if (!userId) return null; 
  const mongoUser = await getUserById({ userId })
  const result = await getQuestionsbyId({ questionId: params.id })
  // console.log(mongoUser);

  console.log(result)
  return (
    <>
      <h1 className='h1-bold text-dark-100_light900 '>Edit Question</h1>

      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser.id}
          questionDetails={JSON.stringify(result)} />
      </div>
    </>
  )
}

export default page