import React from 'react'
import { ContentfulLivePreview } from '@contentful/live-preview'
import SplitWithContentPicker from './split-with-content-picker'

const LOCALE = 'en_US'

const SplitWithContent = (entry: any) => {
  const { title, body, design, content, contentAlignment, action } =
    entry?.fields
  const entryId = entry?.sys?.id

  return (
    <div className=''>
      <div className=' component-spacing component-py '>
        <SplitWithContentPicker
          title={title}
          body={body}
          content={content}
          contentAlignment={contentAlignment}
          cta={action}
          design={design}
        />
      </div>
    </div>
  )
}

export default SplitWithContent
