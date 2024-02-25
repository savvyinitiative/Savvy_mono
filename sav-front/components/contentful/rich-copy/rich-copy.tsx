import React, { useEffect, useState, useCallback } from 'react'
import generateOptions from '@/components/contentful/common/richtext/richtext-options'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const RichCopy = (props: any) => {
  const { title, richBody } = props?.fields

  return (
    <div className='component-spacing'>
      <article className='text prose-xl component-mt'>
        {documentToReactComponents(richBody, generateOptions())}
      </article>
    </div>
  )
}

export default RichCopy
