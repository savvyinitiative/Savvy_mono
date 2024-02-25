'use client'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import classNames from 'classnames'
import YoutubeVideo from '@/components/primitives/youtube-video'
import {
  extractYoutubeVideoId,
  extractCtfImageUrl
} from '@/helpers/contentful-helpers'
import { ContentfulLivePreview } from '@contentful/live-preview'
import MediaWrapper from '@/components/contentful/media-wrapper'
import BaseButton from '@/components/contentful/base-button/base-button'
import RevealAnimation from '@/components/reveal-animation/reaveal-animation'
import Link from 'next/link'
import { resolveTarget } from '@/components/nav/nav-resolver'
import { extractLinkFromTarget } from '@/helpers/contentful-helpers'

const LOCALE = 'en_US'

const DEFAULT_VID_PREVIEW =
  'https://images.ctfassets.net/ocgec2v7knct/6vjRYOtOAzBsYdw1RoqZrk/9e061b5156b641c6e8160115b59da243/pexels-cottonbro-studio-8382617.jpg'

import Image from 'next/image'

const MediaSelector = ({ media, title }: { media: any; title: string }) => {
  const mediaType: 'youtubeVideoWrapper' | 'imageWrapper' =
    media?.sys?.contentType?.sys?.id

  if (mediaType === 'youtubeVideoWrapper') {
    return (
      <YoutubeVideo
        videoId={extractYoutubeVideoId(media?.fields?.youtubeUrl)}
        title={title}
      />
    )
  }

  return <>! {JSON.stringify(media?.sys?.contentType?.sys?.id)}</>
}
const PLAY_SVG =
  'https://images.ctfassets.net/ocgec2v7knct/48cI5IJVn9WRiZPTgfvyTf/cae5e207196d1a9591b345199c33189a/sav.svg'

const tmediaVariants = cva('', {
  variants: {
    // design: {
    //   Primary: 'w-full lg:w-[50%] '
    // },
    contentAlignment: {
      'Align Left': 'order-first md:mr-20',
      'Align Right': 'order-first md:ml-10 md:order-last'
    }
  }
})

interface TmediaPickerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tmediaVariants> {
  //   image?: ReactNode
  title: string
  contentAlignment: 'Align Left' | 'Align Right'
  content: any
  body?: string
  cta?: any
  design: any
}

const LinkElement = ({ link }: { link: any }) => {
  const href = extractLinkFromTarget(link?.fields?.target)
  return (
    <>
      <Link href={href}>
        <div className='block py-2 rounded-xl border border-accent-300 p-4 shadow-sm hover:border-accent-400 hover:ring-1 hover:ring-accent-400 focus:outline-none focus:ring h-60 overflow-hidden'>
          <div className='flex w-full  items-center'>
            <div className=' h-14 w-14 m-auto'>
              <img
                className={` object-contain w-full  `}
                src={extractCtfImageUrl(link?.fields?.icon)}
              />
            </div>
          </div>

          <h4 className='mt-2 font-bold text-center'>{link?.fields?.label}</h4>

          <p className=' sm:mt-1 sm:blockx sm:text-sm sm:text-secondary-600 line-clamp-4 text-center '>
            {link?.fields?.description}
          </p>
        </div>
      </Link>
    </>
  )
}

const SplitWithContentPicker: FC<TmediaPickerProps> = ({
  className,
  title,
  body,
  content,
  contentAlignment,
  cta,
  design,
  ...rest
}) => {
  const tmediaClasses = classNames(
    tmediaVariants({ contentAlignment }),
    className,
    'w-full h-full flex flex-col md:flex-row justify-items-center md:w-[50%]  '
  )
  const entryId = content?.sys?.id
  const mediaType: 'youtubeVideoWrapper' | 'imageWrapper' =
    content?.sys?.contentType?.sys?.id
  const videoPreviewImage = extractCtfImageUrl(
    content?.fields?.videoPreviewImage
  )

  return (
    <section>
      <div className='gen-spacing  '>
        <div className='grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16'>
          <div className='mx-auto max-w-lg text-center lg:mx-0x '>
            <h2 className='heading2'>{title}</h2>

            <p className='parag'>{body}</p>
            {cta && (
              <div className=' inline-block '>
                <BaseButton key={`key-${cta?.sys?.id}`} entry={cta} />
              </div>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4 sm:grid-cols-2'>
            {Array.isArray(content) &&
              content?.map((item, itx) => {
                return (
                  <LinkElement
                    key={`key-${itx}-${item?.sys?.id}`}
                    link={item}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SplitWithContentPicker
