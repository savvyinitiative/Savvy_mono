'use client'
import React from 'react'
import Link from 'next/link'

interface IProps {
  awardCategories: any[]
}

const CategoryPreview = ({ category }: { category: any }) => {
  const displayedName = `${category?.official_name}(${category?.friendly_name})`
  return (
    <Link className='h-52 w-72 ' href={`/sira/${category?.friendly_name}`}>
      <div className='w-full h-full transition-ease bg-accent hover:bg-accent-800 shadow-md flex items-center group p-2 rounded-md'>
        {/* <span className='m-auto uppercase'>{displayedName}</span> */}
        <span className='m-auto uppercase'>
          {category?.official_name}(<b>{category?.friendly_name}</b>)
        </span>
      </div>
    </Link>
  )
}

const CategoryList = ({ awardCategories }: IProps) => {
  return (
    <div className='p-2 flex flex-col space-y-2 component-spacing relative py-10'>
      <h2 className=''>Award Categories</h2>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-3 '>
        {awardCategories?.map(category => {
          return (
            <CategoryPreview
              category={category}
              key={`key-${category?.friendly_name}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CategoryList
