import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import LocalSearch from '@/components/shared/search/LocalSearch'
import { Button } from '@/components/ui/button'
import { UserFilters } from '@/constant/filters'
import { GetAllUser } from '@/lib/actions/user.action'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const result = await GetAllUser({})

  return (
    <>
      <div className="">

        <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="h1-bold  text-dark100_light900">All Users</h1>


        </div>
        <div className="mt-12 flex w-full justify-between gap-4 sm:flex-row sm:items-center">
          <LocalSearch
            iconPosition='left'
            route='/community'
            imgSrc='/assets/icons/search.svg'
            placeholder="Search Questions..."
            otherClasses='flex-1' />

          <Filter
            filter={UserFilters}
            otherClasses='min-h-[56px] sm:min-w-[170px]'
          />
        </div>
        <section className="mt-12 flex flex-wrap gap-4">
          {result.users.length > 0 ? (
            result.users.map(
              (user) => (
                <UserCard key={user._id} user={user} />
              )
            )
          )

            : (
              <div className='paragraph-regular text-dark200_light800 max-auto max-w-4xl text-center'>
                <p>No user Yet </p>
                <Link href='/sign-up' ></Link>
              </div>
            )}
        </section>
      </div>
    </>

  )
}

export default page