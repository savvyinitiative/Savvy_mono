import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import classNames from 'classnames'

import Image from 'next/image'

const bannerVariants = cva('', {
  variants: {
    design: {
      Primary: 'bg-primary-500 text-white',
      Secondary: 'bg-secondary-500 text-white',
      Accent: 'bg-accent-500 text-white',
      Neutral: 'bg-background-500 text-secondary'
    },
    imageAlignment: {
      'Align Left': '',
      'Align Right': ''
    },
    size: {
      Small: 'h-full min-h-[350px] lg:h-[350px] w-full ',
      Medium: 'h-full min-h-[300px] lg:h-[500px] w-full ',
      Large: 'h-full min-h-[300px] lg:h-[600px] w-full'
    }
  }
})

const bannerSubVariants = cva('', {
  variants: {
    imageAlignment: {
      'Align Left': '',
      'Align Right': ''
    },
    size: {
      Small: 'h-full min-h-[350px] lg:h-[350px] w-full ',
      Medium: 'h-full min-h-[300px] lg:h-[500px] w-full ',
      Large: 'h-full min-h-[300px] lg:h-[600px] w-full'
    }
  }
})

const imageVariants = cva('', {
  variants: {
    // design: {
    //   Primary: 'w-full lg:w-[50%] '
    // },
    imageAlignment: {
      'Align Left': 'order-first',
      'Align Right': 'order-first md:order-last'
    }
  }
})

const metaVariants = cva('', {
  variants: {
    imageAlignment: {
      'Align Left': 'order-last pl-2',
      'Align Right': ' '
    }
  }
})

const absoluteImageClassesVariants = cva('', {
  variants: {
    imageAlignment: {
      'Align Left': 'left-0',
      'Align Right': 'right-0'
    }
  }
})
interface BannerPickerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  image?: ReactNode
  meta?: ReactNode
}
const BannerPicker: FC<BannerPickerProps> = ({
  className,
  size,
  design,
  image,
  meta,
  imageAlignment,
  ...rest
}) => {
  const bannerClasses = classNames(
    bannerVariants({ size, design }),
    className,
    'w-full flex flex-col md:flex-row  justify-items-center  '
  )

  const bannerSubClasses = classNames(
    bannerSubVariants({ size }),
    className,
    'component-spacing flex flex-col items-center md:flex-row md:space-x-2 py-4 '
  )

  const imageClasses = classNames(
    imageVariants({ imageAlignment }),
    'flex items-start  h-full md:w-[50%] p-2 '
  )
  const metaClasses = classNames(
    metaVariants({ imageAlignment }),
    ' md:p-0x  md:w-[50%] '
  )
  const absoluteImageClasses = classNames(
    absoluteImageClassesVariants({ imageAlignment }),
    'hidden md:block z-10 lg:z-50 bottom-0  w-[60%]x lg:w-[50%] h-full '
  )

  return (
    <div className='relative'>
      <div className={bannerClasses}>
        <div className={bannerSubClasses}>
          <div className={metaClasses}>{meta}</div>
          <div className={imageClasses}>
            <div className='w-full h-full'>{image}</div>
          </div>
        </div>

        {/* <div className='component-spacing flex flex-col md:flex-row z-20'>
          <div className={metaClasses}>{meta}</div>
          <div className='relative md:w-[50%]'></div>
        </div> */}
        {/* <div className={imageClasses}>
          <div className='absolute left-[50%] top-0 md:top-[10%]  lg:top-[20%] right-0 '>
            <TinyGraphic />
          </div>
          <div className={absoluteImageClasses}>
            {image}
          </div>
        </div> */}

        {/* 
        <div className={metaClasses}>{meta}</div>
        <div className='relative w-[50%]  h-full bottom-0 right-0 '>
          <div className=' z-50 w-full h-auto absolute top-10x bottom-0'>
            {image}
          </div>
        </div> */}

        {/* <div className={imageClasses}>{image}</div> */}
      </div>
    </div>
  )
}

export { BannerPicker, bannerVariants }
