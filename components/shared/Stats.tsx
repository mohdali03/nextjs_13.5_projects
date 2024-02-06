import { formatAndDivideNumber } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface Props {
  totalQuestions: number,
  totalAnswers: number
}

interface Statscard {
  imgUrl: string,
  title: string,
  value: number
}
const Statscard = ({ imgUrl, title, value }: Statscard) => {
  return (
    <div className='light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div className="mt-5">
        <p className="paragraph-semibold text-dark200-light900">
          {formatAndDivideNumber(value)}
        </p>
        <p className="body-medium text-dark100_light900">
          {title}
        </p>
      </div>
    </div>
  )
}

const stats = ({ totalQuestions, totalAnswers }: Props) => {
  return (
    <div className='mt-10'>


      <h3 className=' h3-bold text-dark200_light900'>Stats </h3>
      <div className="mt-5 grid gird-cols-1  gap-5 mx:gird-cols-2 md:grid-cols-4">

        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatAndDivideNumber(totalQuestions)}
            </p>
            <p className='body-medium text-dark100_light900'>Questions</p>


          </div>
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {formatAndDivideNumber(totalAnswers)}
            </p>
            <p className='body-medium text-dark100_light900'>Answer</p>


          </div>
        </div>

        <Statscard
          imgUrl='/assets/icons/gold-medal.svg'
          value={0}
          title="gold medal"
        />
        <Statscard
          imgUrl='/assets/icons/silver-medal.svg'
          value={0}
          title="silver medal"
        />
        <Statscard
          imgUrl='/assets/icons/bronze-medal.svg'
          value={0}
          title="bronze medal"
        />
      </div>
    </div>
  )
}

export default stats