import React, { useRef } from 'react'

interface IProps {
  label: string
  type: string
  options: any[]
  onChange?: any
  optionName: string
  optionIdName: string
}

const SelectInput = React.forwardRef<HTMLInputElement, IProps>(
  ({ label, type, options, onChange, optionName, optionIdName, ...rest }) => {
    const internalRef = React.useRef<HTMLSelectElement>(null)

    return (
      <div className='flex flex-col space-x-1 cursor-pointer '>
        <label htmlFor='' className='px-1 uppercase '>
          {label}
        </label>
        <select
          ref={internalRef}
          {...rest}
          onChange={onChange}
          className='block appearance-nonex border hover:border-primary-500  pr-8  shadow leading-tight focus:outline-none focus:shadow-outline rounded-2xl bg-white text-black px-3 outline-primary-50/40 w-full h-12'
        >
          {options?.map((option, cx) => {
            const displayedName = option?.[optionName]
            return (
              <option
                key={`key-${displayedName}-${cx}`}
                value={option?.[optionIdName]}
              >
                {displayedName}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
)

SelectInput.displayName = 'SelectInput'
export default SelectInput
