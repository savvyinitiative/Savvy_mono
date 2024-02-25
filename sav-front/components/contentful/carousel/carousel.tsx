import React from 'react'
import AnimatedCarousel, {
  IAnimatedCarousel
} from '@/components/animated-carousel/animated-carousel'
import { extractCtfImageUrl } from '@/helpers/contentful-helpers'
import SwipeCarousel from '@/components/swipe-carousel/swipe-carousel'

const Carousel = (entry: any) => {
  const { title, content } = entry?.fields
  const entryId = entry?.sys?.id

  const testimonials: IAnimatedCarousel['items'] = content?.map((data: any) => {
    return {
      quote: data?.fields?.message,
      title: data?.fields?.name,
      image: {
        alt: data?.fields?.title,
        url: `https:${extractCtfImageUrl(
          data?.fields?.image
        )}?w=500&f=face&fit=thumb`
      }
    }
  })
  return (
    <div>
      {/* {JSON.stringify(testimonials)} */}
      {/* <SwipeCarousel items={testimonials} direction='right' speed='slow' /> */}

      <div className='h-[40rem] py-2 flex flex-col antialiased bg-secondary  items-center justify-center relative overflow-hidden'>
        <AnimatedCarousel items={testimonials} direction='right' speed='slow' />
      </div>
    </div>
  )
}

export default Carousel
