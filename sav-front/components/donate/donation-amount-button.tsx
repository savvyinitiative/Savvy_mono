import React from 'react'

interface IDonationAmountButton {
  amount: string
  SelecteddonationAmount: any
  onAmountChange: any
}
const DonationAmountButton = ({
  amount,
  SelecteddonationAmount,
  onAmountChange
}: IDonationAmountButton) => {
  const isSelected = SelecteddonationAmount == amount
  return (
    <button
      onClick={() => onAmountChange(amount)}
      className={`${
        isSelected ? 'bg-black text-white' : 'bg-white text-black'
      }  flex  space-x-10  px-5 py-4 border-2 border-solid border-white  `}
    >
      <div
        className={`stroke-[7px] flex w-8 h-8 md:w-10 md:h-10  shrink-0  flex-col my-auto ${
          isSelected ? 'border-4 border-white' : 'bg-slate-200 border-2'
        }   rounded-[50%]`}
      />

      <span className='heading2'>${amount}</span>
    </button>
  )
}

export default DonationAmountButton
