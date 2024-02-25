import React from 'react'
import { ButtonPicker } from '@/components/contentful/base-button/ButtonPicker'

interface IProps {
  style: 'Primary' | 'Secondary' | 'Accent' | 'Error' | 'Success' | 'Inverted'
  label: string
  type?: string
  onClick?: any
  disable?: boolean
  action?: string
  href?: string
}
const Actionbutton = ({
  style,
  label,
  action = 'dynamic_action',
  href,
  ...rest
}: IProps) => {
  return (
    <div>
      <ButtonPicker
        variant={style}
        name={label}
        // action={'dynamic_action'}
        action={action}
        href={href}
        {...rest}
      />
    </div>
  )
}

export default Actionbutton
