import dynamic from 'next/dynamic'
import SampleComponent from '../sample-component/sample-component'

export const componentMap: any = {

  textWithMedia: dynamic(() =>
    import('@/components/contentful/text-with-media/index').then(
      module => module
    )
  ),
  splitContent: dynamic(() =>
  import('@/components/contentful/split-with-content/index').then(
    module => module
  )
),
carousel: dynamic(() =>
import('@/components/contentful/carousel/index').then(
  module => module
)
),


  
  module: dynamic(() =>
    import('@/components/contentful/sample-component/sample-component').then(
      module => module
    )
  ),

  richBody: dynamic(() =>
    import('@/components/contentful/rich-copy/index').then(module => module)
  ),
  
  awardNominationList: dynamic(() =>
    import('@/components/contentful/award-nomination-list/index').then(module => module)
  ),
  mediaWrapper: dynamic(() =>
    import('@/components/contentful/image-wrapper/index').then(module => module)
  ),
  imageWrapper: dynamic(() =>
    import('@/components/contentful/image-wrapper/index').then(module => module)
  ),
  heroBanner: dynamic(() =>
    import('@/components/contentful/herobanner/index').then(module => module)
  )
}
