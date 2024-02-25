import { BannerPicker } from './BannerPicker'
import MetaText, { IMetaText } from './MetaText'
// import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ContentfulLivePreview } from '@contentful/live-preview'
import RegularHero from '@/components/regular-hero/regular-hero'
import {
  extractLinkFromTarget,
  extractCtfImageUrl
} from '@/helpers/contentful-helpers'

const LOCALE = 'en_US'

export interface IHeroBannerFields {
  headline: string
  body?: string
  size: 'Small' | 'Medium' | 'Large'
  design: 'Primary' | 'Secondary' | 'Accent'
  imageAlignment: 'Align Left' | 'Align Right'
  image?: any
}

const HeroBanner = (entry: any) => {
  const {
    headline,
    body,
    size,
    design,
    image,
    actions,
    imageAlignment,
    hasImageBorder = false
  } = entry?.fields
  const entryId = entry?.sys?.id
  const textBoxProps: IMetaText = {
    headline,
    body,
    entryId: entry?.sys?.id
  }
  return (
    <div className=''>
      <RegularHero
        title={headline}
        body={body}
        design={design}
        size={size}
        imageAlignment={imageAlignment}
        image={{ alt: headline, url: image?.fields?.file?.url || '' }}
        hasImageBorder={hasImageBorder}
        actions={
          Array.isArray(actions)
            ? actions?.map(action => {
                const { label, style, target, openInNewTab } = action?.fields
                return { label, style, href: extractLinkFromTarget(target) }
              })
            : undefined
        }
      />
      {/* <BannerPicker
        size={size}
        design={design}
        imageAlignment={imageAlignment}
        meta={<MetaText entry={textBoxProps} actions={actions} />}
        image={
          <div
            {...ContentfulLivePreview.getProps({
              entryId,
              fieldId: 'image',
              locale: LOCALE
            })}
            className='h-full flex items-center '
          >
            <img
              className={` object-contain w-full h-fullx ${
                hasImageBorder
                  ? 'border-4 border-primary rounded-md overflow-hidden shadow-md'
                  : ''
              } `}
              src={image?.fields?.file?.url || ''}
            />
          </div>
        }
      /> */}
    </div>
  )
}

export default HeroBanner
