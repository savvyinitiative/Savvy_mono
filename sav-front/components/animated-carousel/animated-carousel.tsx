'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

interface IImage {
  alt: string
  url: string
}

export interface IAnimatedCarousel {
  items: {
    quote: string
    image: IImage
    title: string
  }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}

const AnimatedCarousel = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className
}: IAnimatedCarousel) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])
  const [start, setStart] = useState(false)
  function addAnimation () {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        )
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        )
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '50s')
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '60s')
      } else {
        containerRef.current.style.setProperty('--animation-duration', '120s')
      }
    }
  }
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller h-full flex items-center justify-items-center relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full  shrink-0 gap-4 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <li
            className='w-[300px] h-full md:w-[350px]x max-w-full relative rounded-2xlx rounded-md borderx border-b-0 flex-shrink-0 shadow-md shadow-accent-700 px-8x py-6x md:w-[450px] overflow-hidden'
            // style={{
            //   background:
            //     'linear-gradient(180deg, var(--slate-800), var(--slate-900)'
            // }}
            key={`key-${item.title}-${idx}`}
          >
            <SimpleCard
              title={item?.title}
              quote={item.quote}
              image={item?.image}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const SimpleCard = ({
  title,
  quote,
  image
}: {
  title: string
  quote: string
  image: IImage
}) => {
  return (
    <article className='h-full min-h-[300px]x  rounded-md  p-4'>
      <div className='flex flex-col items-center justify-items-center gap-4 '>
        <img
          alt={image?.alt}
          src={image?.url}
          className=' w-40 h-40 rounded-full object-cover'
        />

        <div>
          <h3 className='text-lg font-medium text-white'>{title}</h3>
        </div>
      </div>
      <div className='mt-4 space-y-2 h-[300px] py-1'>
        <blockquote>
          <span className=' relative parag-light text-white h-full'>
            {quote}
          </span>
        </blockquote>
      </div>
    </article>
  )
}

export default AnimatedCarousel
