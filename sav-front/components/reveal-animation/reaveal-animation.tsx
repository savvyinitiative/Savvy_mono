import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface IProps {
  children: JSX.Element
  width?: 'fit-content' | '100%'
}
const RevealAnimation = ({ children, width = '100%' }: IProps) => {
  const ref = useRef(null)
  const isInview = useInView(ref, { once: true })

  const mainControls = useAnimation()
  const slideControls = useAnimation()

  useEffect(() => {
    if (isInview) {
      mainControls.start('visible')
      slideControls.start('visible')
    }

    return () => {}
  }, [isInview])

  return (
    <div ref={ref} style={{ position: 'relative', width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial='hidden'
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
        className=''
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' }
        }}
        initial='hidden'
        animate={slideControls}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        className=' absolute top-2 bottom-2 left-0 right-0 z-20 bg-primary'
      ></motion.div>
    </div>
  )
}

export default RevealAnimation
