import React from 'react'
import generateOptions from '../common/richtext/richtext-options'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ComponentResolver from '../common/component-resolver'

const RichtextBlock = (props: any) => {
  const { body, media, bottomCopy } = props?.fields
  return (
    <div className='relative w-full component-spacing '>
      <article className='prose-xlxx prose-lgx text'>
        {documentToReactComponents(body, generateOptions())}
      </article>
      <div className='w-full '>
        {media && (
          <div className='flex flex-col items-center  '>
            <div className='lg:w-[50%] w-full'>
              <ComponentResolver field={media} />
            </div>
          </div>
        )}
      </div>

      {bottomCopy && (
        <article className='prose-xlxx prose-lgx text'>
          {documentToReactComponents(bottomCopy, generateOptions())}
        </article>
      )}
    </div>
  )
}

export default RichtextBlock
