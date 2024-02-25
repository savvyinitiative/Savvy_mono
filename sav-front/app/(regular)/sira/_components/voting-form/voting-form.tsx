'use client'

import React, { useState, useEffect, useRef } from 'react'
import CategoryVoting from './category-voting/category-voting'
import Actionbutton from '@/components/primitives/action-button'
import {
  motion,
  useTransform,
  useScroll,
  useInView,
  AnimatePresence,
  useAnimation
} from 'framer-motion'

interface IProps {
  awardCategories: any
}
const VotingForm = ({ awardCategories }: IProps) => {
  const ref = useRef(null)
  const isInview = useInView(ref, { once: true })
  const mainControls = useAnimation()
  const slideControls = useAnimation()
  const [categoryIndex, setCategoryIndex] = useState<any>(0)
  const [activeCategory, setActiveCategory] = useState(
    awardCategories?.[categoryIndex]
  )
  const totalCount = awardCategories?.length

  const handleAnimation = () => {
    mainControls.start('leave')

    setTimeout(() => {
      mainControls.start('hidden')
      mainControls.start('visible')
    }, 500)
  }
  const handleNextCategory = () => {
    // const totalCount = awardCategories?.length

    if (categoryIndex < totalCount - 1) {
      handleAnimation()
      setCategoryIndex((prev: any) => prev + 1)
      setActiveCategory(awardCategories?.[categoryIndex + 1])
    }
  }

  const handlePreviousCategory = () => {
    if (categoryIndex > 0) {
      handleAnimation()
      setCategoryIndex((prev: any) => prev - 1)
      setActiveCategory(awardCategories?.[categoryIndex - 1])
    }
  }

  const categoryTitle = `${activeCategory?.official_name} (${activeCategory?.friendly_name})`

  if (!awardCategories) {
    return <></>
  }
  return (
    <AnimatePresence>
      <div className='p-2 flex flex-col space-y-2 component-spacing relative'>
        <p className=''>Vote by categories</p>

        <p className='uppercase text-2xl'>{categoryTitle}</p>
        <motion.div
          variants={{
            leave: { opacity: 0, y: 900, x: 0 },
            hidden: { opacity: 0, y: -300 },
            visible: { opacity: 1, y: 0, x: 0 }
          }}
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className='h-[500px]x h-80'
        >
          <CategoryVoting category={activeCategory} />
        </motion.div>

        <div className=' w-full'>
          <div className='relative'>
            <div className='relative flex items-center justify-between w-full'>
              <Actionbutton
                label='Previous'
                onClick={handlePreviousCategory}
                style='Inverted'
              />
              <span className='bg-secondary text-white rounded-md px-2'>
                {categoryIndex + 1}/{totalCount}
              </span>
              <Actionbutton
                label='Next'
                onClick={handleNextCategory}
                style='Secondary'
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default VotingForm
