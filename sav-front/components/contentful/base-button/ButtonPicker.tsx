import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import classNames from 'classnames'
import Link from 'next/link'
import {
  extractLinkFromTarget,
  extractCtfImageUrl
} from '@/helpers/contentful-helpers'

import Image from 'next/image'

const buttonVariants = cva('', {
  variants: {
    variant: {
      Primary: 'btnz btnz-primary ',
      Secondary: 'btnz btnz-secondary ',
      Accent: 'btnz btnz-accent',
      Success: 'btnz btnz-success ',
      Error: 'btnz btnz-error ',
      Inverted: 'btnz btnz-inverted '
    }
  }
})

interface ButtonPickerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  action?: any
  name?: string
  onClick?: any
  href?: any
}
const ButtonPicker: FC<ButtonPickerProps> = ({
  className,
  variant,
  action,
  name,
  href,
  // onClick,
  ...rest
}) => {
  const buttonClasses = classNames(
    buttonVariants({ variant }),
    className,
    'overflow-hidden leading-7 font-medium text-xl '
  )
  const actionContentType = action?.sys?.contentType?.sys?.id

  const mustOpenNewTab = actionContentType === 'externalLink' ? true : false

  if (action === 'dynamic_action') {
    return (
      <button>
        <div {...rest} className={buttonClasses}>
          <div>{name}</div>
        </div>
      </button>
    )
  }

  return (
    <Link target={mustOpenNewTab ? '_blank' : '_self'} href={href}>
      <div className={buttonClasses}>
        <div>{name}</div>
      </div>
    </Link>
  )
}

export { ButtonPicker, buttonVariants }
