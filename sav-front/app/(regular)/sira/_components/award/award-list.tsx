import React from 'react'
import Link from 'next/link'

interface IAwardsMini {
  award_name: string
  slug: string
  status: 'active' | 'disabled' | 'retired'
}
interface IProps {
  awards: IAwardsMini[]
  category: string
  categoryName: string
  categoryFriendlyName: string
}

const AwardPreview = ({
  award,
  category
}: {
  award: IAwardsMini
  category: string
}) => {
  return (
    <Link className='w-60 h-60 ' href={`/sira/${category}/${award?.slug}`}>
      <div className='w-full h-full transition-ease bg-accent hover:bg-accent-800 shadow-md flex items-center group p-2 rounded-md'>
        <span className='m-auto'>{award?.award_name}</span>
      </div>
    </Link>
  )
}
const AwardList = ({
  awards,
  category,
  categoryName,
  categoryFriendlyName
}: IProps) => {
  return (
    <div>
      <h2 className='uppercase'>{categoryFriendlyName}</h2>
      <span className=''>{categoryName}</span>
      <p className='text-2xl'>Choose an Award</p>
      <p className='py-2'>Vote a Savvy African</p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
        {awards?.map(award => {
          return (
            <AwardPreview
              category={category}
              key={`key-${award?.award_name}`}
              award={award}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AwardList
