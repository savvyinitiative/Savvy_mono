import React from 'react'

interface IProps {
  label: string
  type: string
}

const TextInput = ({ label, type, ...rest }: IProps) => {
  if (type === 'checkbox') {
    return (
      <div className='flex space-x-1 items-center'>
        <label htmlFor='' className='px-1 uppercase'>
          {label}
        </label>
        <input
          type={type}
          className={` rounded-2xl bg-white text-black h-8x  px-3 outline-primary-50/40 w-8 h-8`}
          {...rest}
        />
      </div>
    )
  }
  return (
    <div className='flex flex-col space-y-1'>
      <label htmlFor='' className='px-1 uppercase'>
        {label}
      </label>
      <input
        type={type}
        className={` rounded-2xl bg-white text-black h-8  px-3 outline-primary-50/40`}
        {...rest}
      />
    </div>
  )
}

export default TextInput
