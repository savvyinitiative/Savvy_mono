import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

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

const imgs = [
  '/imgs/nature/1.jpg',
  '/imgs/nature/2.jpg',
  '/imgs/nature/3.jpg',
  '/imgs/nature/4.jpg',
  '/imgs/nature/5.jpg',
  '/imgs/nature/6.jpg',
  '/imgs/nature/7.jpg'
]

const ONE_SECOND = 1000
const AUTO_DELAY = ONE_SECOND * 10
const DRAG_BUFFER = 50

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50
}

const SwipeCarousel = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className
}: IAnimatedCarousel) => {
  const [imgIndex, setImgIndex] = useState(0)

  const dragX = useMotionValue(0)

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get()

      if (x === 0) {
        setImgIndex(pv => {
          if (pv === items.length - 1) {
            return 0
          }
          return pv + 1
        })
      }
    }, AUTO_DELAY)

    return () => clearInterval(intervalRef)
  }, [])

  const onDragEnd = () => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && imgIndex < items.length - 1) {
      setImgIndex(pv => pv + 1)
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex(pv => pv - 1)
    }
  }

  return (
    <div className='relative overflow-hidden bg-neutral-950 py-8'>
      <motion.div
        drag='x'
        dragConstraints={{
          left: 0,
          right: 0
        }}
        style={{
          x: dragX
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className='flex cursor-grab items-center active:cursor-grabbing'
      >
        <Images items={items} imgIndex={imgIndex} />
      </motion.div>

      <Dots items={items} imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
    </div>
  )
}

const Images = ({ imgIndex, items }: { imgIndex: number; items: any }) => {
  return (
    <>
      {items.map((item: any, idx: number) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${item?.image?.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85
            }}
            transition={SPRING_OPTIONS}
            className='aspect-video w-screen shrink-0 rounded-xl bg-neutral-800 object-cover'
          >
            <div className='flex flex-col bg-white text-black p-2 rounded-md w-60 h-20'>
              <p className=''>{item?.title}</p>
            </div>
          </motion.div>
        )
      })}
    </>
  )
}

const Dots = ({
  imgIndex,
  setImgIndex,
  items
}: {
  imgIndex: number
  items: any
  setImgIndex: Dispatch<SetStateAction<number>>
}) => {
  return (
    <div className='mt-4 flex w-full justify-center gap-2'>
      {items.map((_: any, idx: number) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? 'bg-neutral-50' : 'bg-neutral-500'
            }`}
          />
        )
      })}
    </div>
  )
}

const GradientEdges = () => {
  return (
    <>
      <div className='pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0' />
      <div className='pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0' />
    </>
  )
}

export default SwipeCarousel
