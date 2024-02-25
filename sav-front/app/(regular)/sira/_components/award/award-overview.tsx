import React from 'react'
import Link from 'next/link'

interface IAwardsMini {
  award_name: string
  slug: string
  status: 'active' | 'disabled' | 'retired'
  nominations: any[]
}
interface IProps {
  award: IAwardsMini
  content: any
  categoryName?: string
  categoryFriendlyName?: string
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

const CardDemo = () => {
  return (
    <div className='w-full max-w-sm bg-white border border-secondary-200 rounded-lg shadow '>
      <a href='#'>
        <img
          className='p-8 rounded-t-lg'
          src='https://images.ctfassets.net/ocgec2v7knct/6rhMTLyylgOYQeRILuzztj/84f5d8310e18b0e2a6f3825d9269b66e/beautiful-african-female-feeling-grateful.jpg'
          alt='product image'
        />
      </a>
      <div className='px-5 pb-5'>
        <a href='#'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
            this is the title of the card. contains..
          </h5>
        </a>

        <div className='flex items-center justify-between'>
          <span className='text-3xl font-bold text-gray-900 dark:text-white'>
            a by line
          </span>
          <a
            href='#'
            className='text-white bg-accent hover:bg-accent-800 focus:ring-4 focus:outline-none focus:ring-bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center '
          >
            Button
          </a>
        </div>
      </div>
    </div>
  )
}

const CardDemo2 = ({ nomination }: { nomination: any }) => {
  return (
    <a
      href='#'
      className='flex flex-col items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow md:flex-row md:max-w-xl hover:bg-gray-100 '
    >
      <img
        className='object-cover w-full rounded-t-lg h-96x h-[300px] md:h-autox md:w-48 md:rounded-none md:rounded-s-lgx bg-accent-400 p-1'
        src='https://images.ctfassets.net/ocgec2v7knct/6rhMTLyylgOYQeRILuzztj/84f5d8310e18b0e2a6f3825d9269b66e/beautiful-african-female-feeling-grateful.jpg'
        alt=''
      />
      <div className='flex flex-col  justify-between p-4 leading-normal h-[300px]'>
        <div className='h-[30%]'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
            {nomination?.nominee_name}
          </h5>
        </div>
        <div className='h-[50%] overflow-hiddenx  line'>
          <p className='mb-3 font-normal text-gray-700 line-clamp-4  '>
            {nomination?.summary}
          </p>
        </div>

        <div className='h-[20%] '>
          <div className='bg-accent p-2 max-w-fit rounded-md shadow-md'>
            VOTE
          </div>
        </div>
      </div>
    </a>
  )
}
const AwardOverview = ({
  award,
  content,
  categoryName,
  categoryFriendlyName
}: IProps) => {
  return (
    <div className='component-spacing relative py-10'>
      <pre className=''>{JSON.stringify(content, null, 2)}</pre>

      <p className=''>Nominees</p>

      <p className=''>Nominee Summary</p>
      <p className=''>Nominee static content</p>
      <p className=''>Vote action</p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
        {award?.nominations?.map(nomination => {
          return (
            <CardDemo2
              nomination={nomination}
              key={`key-${nomination?.slug}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AwardOverview
