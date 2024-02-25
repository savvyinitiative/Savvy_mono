'use client'
import { componentMap } from '@/components/contentful/common/mapping'
import React, { useRef } from 'react'

// eslint-disable-next-line react/display-name
const ComponentResolver = React.forwardRef((props: any, ref) => {
  const { inline = false, field } = props
  // const entryId : string = componentProps?.sys?.id
  // const contentType = componentProps?.sys?.contentType?.sys?.id
  const entryId = field?.sys?.id
  const contentType = field?.sys?.contentType?.sys?.id

  const Component = componentMap[contentType]
  if (!Component) {
    return null
  }

  return (
    <div className=''>
      <Component {...field} {...props} className={props.className} />
      {/* <span className='flex items-center'>
        <span className='h-px flex-1 bg-black'></span>
        <span className='shrink-0 px-6'>SAVVY INITIATIVE</span>
        <span className='h-px flex-1 bg-black'></span>
      </span> */}
    </div>
  )
})

export default ComponentResolver
