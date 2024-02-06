import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface ProfileLinkProps {
    imgUrl: string,
    href?: string,
    title: string
}
const ProfileLink = async ({ imgUrl, href, title }: ProfileLinkProps) => {
    return (
        <>
            <Image
                src={imgUrl}
                alt='icon'
                width={22}
                height={22}
            />
            {href ? (
                <Link
                    href={href}
                    target='_blank'
                    className='paragraph-medium text-blue-500'
                >{title}</Link>
            ):(
                <p className='paragraph-medium  text-dark400_light700' >{title}</p>
            )}
        </>
    )
}

export default ProfileLink  