import React from 'react'
import { resolveTarget } from '../nav/nav-resolver'
import Link from 'next/link'
interface IFooterGroup {
  title: string
  linkElements?: any
}
const FooterGroup = ({ title, linkElements }: IFooterGroup) => {
  return (
    <div className='flex flex-col space-y-8 w-full text-inherit '>
      <div className=' text-black text-lg font-bold  leading-7 uppercase text-inherit '>
        {title}
      </div>

      <ul className='space-y-4 '>
        {linkElements?.map((item: any, itx: number) => {
          const linkType = item?.__typename
          const linkIcon = item?.linkIcon?.url
          if (linkType === 'ExternalLink') {
            return null
          }
          return (
            <li
              key={`key-${itx}-${item?.slug}`}
              className='text-black text-[15px] font-medium  leading-tight text-inherit'
            >
              <Link href={resolveTarget(item)}>
                <div className=''>{item?.title}</div>
              </Link>
            </li>
          )
        })}

        <li className='flex flex-wrap space-x-2'>
          {linkElements?.map((item: any, itx: number) => {
            const linkType = item?.__typename
            const linkIcon = item?.linkIcon?.url
            if (linkType === 'ExternalLink' && linkIcon) {
              return (
                <div key={`key-${itx}-${item?.slug}`} className='flex'>
                  <Link target='_blank' href={item?.link}>
                    <img
                      alt={`Link to ${item?.title}`}
                      className='w-8 h-8'
                      src={linkIcon}
                    />
                  </Link>
                </div>
              )
            }
            return null
          })}
        </li>
      </ul>
    </div>
  )
}

export default FooterGroup
