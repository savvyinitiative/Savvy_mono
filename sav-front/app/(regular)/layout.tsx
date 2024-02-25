import GlobalNav from '@/components/nav/global-nav'

import ContentfulLivePreviewWrapper from '@/contexts/contentful-live-preview-wrapper'

export default async function ProtectedLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ContentfulLivePreviewWrapper>
      <div className=''>
        <div className='h-20'>
          <GlobalNav />
        </div>

        <div className=''> {children}</div>
      </div>
    </ContentfulLivePreviewWrapper>
  )
}
