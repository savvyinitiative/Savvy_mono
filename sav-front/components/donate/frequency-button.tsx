import React from 'react'
import { IFrequencyConfig } from './choose-amount'

interface IProps {
  config: IFrequencyConfig
  donationFrequency: any
  setDonationFrequency: any
}
const FrequencyButton = ({
  config,
  donationFrequency,
  setDonationFrequency
}: IProps) => {
  const isSelected = donationFrequency === config?.id

  const onSelect = () => {
    try {
      setDonationFrequency(config?.id)
    } catch (error) {}
  }
  return (
    <button
      onClick={onSelect}
      className={`${
        isSelected ? 'h-full bg-black text-white' : 'bg-white text-black'
      }   px-5 py-4 border-2 border-solid border-white w-full h-full flex items-center justify-items-center max-w-full`}
    >
      <div className='flex items-center w-full  justify-items-center justify-center space-x-4 '>
        <div
          className={`stroke-[7px]x flex w-8 h-8 md:w-8 md:h-8  shrink-0  flex-col my-auto ${
            isSelected ? 'border-4 border-white' : 'bg-slate-200 border-2'
          }   rounded-[50%]`}
        />

        <div className='text-center text-xs md:text-xl font-bold  my-auto  whitespace-nowrap '>
          {config?.label}
        </div>
      </div>
    </button>
  )
}

export default FrequencyButton
