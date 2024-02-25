'use client'

import ComponentResolver from '../../component-resolver'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'

type Props = {
  items: any
  node: any
  props: any
}

const BlockEmbed = ({ node, items, props }: Props) => {
  const entry = node?.data?.target

  const entryId = entry?.sys?.id

  return (
    <div className='  '>
      {/* {JSON.stringify(entry?.sys)} */}
      <ComponentResolver id={props?.id} key={entryId} field={entry} />
    </div>
  )
}

export default BlockEmbed
