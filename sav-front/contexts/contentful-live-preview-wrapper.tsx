'use client'
import '@contentful/live-preview/style.css'

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const ContentfulLivePreviewWrapper = ({ children }: Props) => {
  return (
    <ContentfulLivePreviewProvider
      locale='en-US'
      enableLiveUpdates={true}
      enableInspectorMode={true}
      debugMode={true}
    >
      {children}
    </ContentfulLivePreviewProvider>
  )
}

export default ContentfulLivePreviewWrapper
