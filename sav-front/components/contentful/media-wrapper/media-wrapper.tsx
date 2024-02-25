import React from 'react'
import { IMediaWrapper } from '@/interfaces/contentful/general'
// import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Image from 'next/image'
import { contentfulImageLoader } from '@/helpers/contentful-helpers'

const MediaWrapper = ({
  entry,
  fit = 'contain'
}: {
  entry: IMediaWrapper
  fit?: 'fill' | 'contain' | 'cover'
}) => {
  // const { altText, media } = entry?.fields;

  const altText = entry?.fields?.altText
  const media = entry?.fields?.image
  const imageFit = fit || 'contain'

  if (!altText) {
    return <></>
  }
  return (
    <div className='group relative h-full w-full flex overflow-hidden '>
      <img
        className='object-cover h-48x h-auto w-full  group-hover:scale-105 transition-transform duration-500 ease-in-out'
        src={media?.fields?.file?.url || ''}
        alt={altText || ''}
      />
    </div>
  )

  return (
    <div className='group flex-shrink-0 relative rounded-xl overflow-hidden w-full h-full max-w-full w-80x xsm:w-96x h-80x flex items-center  mx-auto'>
      <img
        className='group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 start-0 object-cover rounded-xl'
        src={media?.fields?.file?.url || ''}
        alt={altText || ''}
      />
    </div>
  )

  return (
    <div className='relative h-full w-full flex items-center object-contain'>
      <img
        // loader={contentfulImageLoader}
        src={media?.fields?.file?.url || ''}
        alt={altText || ''}
        className='relative max-w-none h-autox w-full h-full object-contain w-full max-w-fullx  '
      />
    </div>
  )

  return (
    <div className='w-full'>
      {/* <AspectRatio.Root
        ratio={16 / 19}
        asChild={true}
        className="group relative w-full overflow-hidden rounded-lg "
      > */}
      <div className='absolute top-0 w-full inset-0 z-10 flex items-center justify-center'>
        <Image
          loader={contentfulImageLoader}
          src={media?.fields?.file?.url || ''}
          alt={altText || ''}
          fill
          sizes='100vw'
          style={{
            objectFit: fit
          }}
          className='h-full w-full mix-blend-overlayx'
        />
      </div>
      {/* </AspectRatio.Root> */}
    </div>
  )
}

export default MediaWrapper
