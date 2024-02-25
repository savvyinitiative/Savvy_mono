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

const tmediaVariants2 = cva('', {
  variants: {
    // design: {
    //   Primary: 'w-full lg:w-[50%] '
    // },
    imageAlignment: {
      'Align Left': 'order-first md:mr-20',
      'Align Right': 'order-first md:ml-10 md:order-last'
    }
  }
})

const tmediaVariants = cva('', {
  variants: {
    imageAlignment: {
      'Align Left': 'lg:order-first',
      'Align Right': 'lg:order-last'
    }
  }
})

interface TmediaPickerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tmediaVariants> {
  //   image?: ReactNode
  title: string
  imageAlignment: 'Align Left' | 'Align Right'
  media: any
  body?: string
  cta?: any
}

const TextWithMediaPicker: FC<TmediaPickerProps> = ({
  className,
  title,
  body,
  media,
  imageAlignment,
  cta,
  ...rest
}) => {
  const tmediaClasses2 = classNames(
    tmediaVariants({ imageAlignment }),
    className,
    'w-full h-full flex flex-col md:flex-row justify-items-center md:w-[50%]  '
  )
  const tmediaClasses = classNames(
    tmediaVariants({ imageAlignment }),
    className,
    'relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full '
  )
  const entryId = media?.sys?.id
  const mediaType: 'youtubeVideoWrapper' | 'imageWrapper' =
    media?.sys?.contentType?.sys?.id
  const videoPreviewImage = extractCtfImageUrl(media?.fields?.videoPreviewImage)

  return (
    <section>
      <div className='group gen-spacing  '>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 '>
          <div
            {...ContentfulLivePreview.getProps({
              entryId,
              fieldId: 'image',
              locale: LOCALE
            })}
            className={tmediaClasses}
          >
            {mediaType === 'imageWrapper' && (
              <img
                alt={media?.fields?.altText}
                src={extractCtfImageUrl(media?.fields?.image)}
                className='absolute inset-0 h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out'
              />
            )}

            {mediaType === 'youtubeVideoWrapper' && (
              <div
                style={{
                  backgroundImage: `url(${
                    videoPreviewImage || DEFAULT_VID_PREVIEW
                  })`,
                  backgroundSize: 'cover'
                }}
                className=' bg-no-repeatx h-full w-full  relative bg-primary py-4 rounded-[20px] flex items-center justify-items-center justify-center'
              >
                <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-primary bg-fixed opacity-50 rounded-[20px] '></div>
                <div className=''>
                  <YoutubeVideo
                    videoId={extractYoutubeVideoId(media?.fields?.youtubeUrl)}
                    title={title}
                  />
                </div>
              </div>

              // <div className='aspect-w-16 aspect-h-9'>
              //   <iframe
              //     src='https://www.youtube.com/embed/r9jwGansp1E'
              //     frameBorder='0'
              //     width='640'
              //     height='360'
              //     allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              //     allowFullScreen
              //   ></iframe>
              // </div>
            )}
          </div>

          <div className='lg:py-24'>
            <div className='text-center md:text-left'>
              <RevealAnimation>
                <h2 className='heading2 '>{title}</h2>
              </RevealAnimation>
            </div>

            <p className='parag-light'>{body}</p>

            {cta && (
              <div className='md:inline-block mx-autox '>
                <BaseButton key={`key-${cta?.sys?.id}`} entry={cta} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )

  return (
    <div className='flex flex-col items-center space-y-8 md:space-y-0 md:flex-row  md:max-h-[600px] h-full '>
      <div className='md:w-[50%] prose-xl flex flex-col space-y-8 mt-4 mb:mt-0'>
        <div className='w-full h-full'>
          <RevealAnimation>
            <div className='heading2'>{title}</div>
          </RevealAnimation>
        </div>

        <div className=''>
          <RevealAnimation>
            <div className=' '>
              <div className='parag-light'>{body}</div>

              {cta && (
                <div className=''>
                  <BaseButton key={`key-${cta?.sys?.id}`} entry={cta} />
                </div>
              )}
            </div>
          </RevealAnimation>
        </div>
      </div>
      <div className={tmediaClasses}>
        {mediaType === 'youtubeVideoWrapper' ? (
          <div
            style={{
              backgroundImage: `url(${
                videoPreviewImage || DEFAULT_VID_PREVIEW
              })`,
              backgroundSize: 'cover'
            }}
            className=' w-full h-full relative bg-primary py-4 rounded-[20px] flex items-center justify-items-center justify-center'
          >
            <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-primary bg-fixed opacity-50 rounded-[20px] '></div>
            <div className=''>
              <MediaSelector media={media} title={title} />
            </div>
          </div>
        ) : (
          <div className='relative  flex items-center object-contain h-[500px] '>
            <div
              {...ContentfulLivePreview.getProps({
                entryId,
                fieldId: 'image',
                locale: LOCALE
              })}
              className='relative h-full h-[500px]'
            >
              <MediaWrapper entry={media} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TextWithMediaPicker
