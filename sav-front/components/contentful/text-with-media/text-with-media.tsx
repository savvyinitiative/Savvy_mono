import React from 'react'
import { ContentfulLivePreview } from '@contentful/live-preview'
import TextWithMediaPicker from './text-with-media-picker'

const LOCALE = 'en_US'

const TextWithMedia = (entry: any) => {
  const { title, body, media, imageAlignment, action } = entry?.fields
  const entryId = entry?.sys?.id

  return (
    <div className='component-spacing component-pyx py-8  '>
      <TextWithMediaPicker
        title={title}
        body={body}
        media={media}
        imageAlignment={imageAlignment}
        cta={action}
      />
    </div>
  )
}

export default TextWithMedia
