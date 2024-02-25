import React from 'react'
import Actionbutton from '@/components/primitives/action-button'

import { cva, VariantProps } from 'class-variance-authority'

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
  },
  defaultVariants: {
    design: 'Primary',
    size: 'Medium'
  }
})

const bannerImageVariants = cva('', {
  variants: {
    imageAlignment: {
      'Align Left': 'lg:order-first',
      'Align Right': 'lg:order-last'
    },
    size: {
      Small: 'h-full min-h-[200px] lg:h-[250px] w-full ',
      Medium: 'h-full min-h-[250px] lg:h-[400px] w-full ',
      Large: 'h-full min-h-[300px] lg:h-[500px] w-full'
    }
  },
  defaultVariants: {
    imageAlignment: 'Align Left'
  }
})

interface IImage {
  alt: string
  url: string
}
interface IAction {
  href: string
  label: string
  style: string
}
export interface IRegularHeroProps2 {
  title: string
  body: string
  image: IImage
  actions?: IAction[]
}

interface IRegularHeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title: string
  body: string
  image: IImage
  actions?: IAction[]
  hasImageBorder?: boolean
}

const RegularHero = ({
  title,
  body,
  image,
  actions,
  design,
  size,
  imageAlignment,
  hasImageBorder = false
}: IRegularHeroProps) => {
  return (
    <section
      className={bannerVariants({
        size,
        design,
        imageAlignment,
        className: 'w-full overflow-hidden'
      })}
    >
      <div className=' component-spacing px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8 h-full'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 m-auto  h-full'>
          <div
            className={bannerImageVariants({
              imageAlignment,
              size,

              className:
                'relative overflow-hidden rounded-lg lg:h-full  h-full '
            })}
          >
            <img
              alt={image?.alt}
              src={image?.url}
              className={`absolute inset-0 h-full w-full object-cover ${
                hasImageBorder &&
                'border-4 border-primary rounded-md overflow-hidden shadow-md'
              }  `}
            />
          </div>

          <div className='lg:py-24x  m-auto'>
            <h2 className='text-3xl font-bold sm:text-4xl uppercase'>
              {title}
            </h2>

            <p className='mt-4 '>{body}</p>

            <div className='flex flex-col lg:flex-row lg:space-x-2 '>
              {Array.isArray(actions) &&
                actions?.map((cta, ctx) => {
                  return (
                    <div className='w-fullx' key={`key-${ctx}-${cta.label}`}>
                      <Actionbutton
                        key={`key-${ctx}-${cta.label}`}
                        href={cta.href}
                        label={cta.label}
                        style={cta.style as any}
                        action='regular_link'
                      />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegularHero
