import React from 'react'
import ReusableForm from '@/components/forms/reusable-form'
import { ITemplate } from '@/components/forms/reusable-form'
import FrequencyButton from './frequency-button'
import DonationAmountButton from './donation-amount-button'

// Sample template for the reusable form
const formTemplate: ITemplate = {
  title: 'Choose s donation amount',
  fields: [
    {
      label: 'First Name',
      type: 'text',
      name: 'firstName',
      validationProps: {
        required: 'First Name is required'
      }
    },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Include Image', type: 'checkbox', name: 'include_image' },
    {
      label: 'Image Link',
      type: 'url',
      name: 'image_link',
      dynamic: { field: 'include_image', value: true }
    }
  ]
}
interface IProps {
  setDonationAmount: any
  donationAmount: any
  donationFrequency: any
  setDonationFrequency: any
  onNextStep: any
}

export interface IFrequencyConfig {
  id: string
  label: string
}
const fixedDontaionAmounts = [50, 100, 250]
const frequency_config: IFrequencyConfig[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'one_time', label: 'One Time' }
]

const ChooseAmount = ({
  setDonationAmount,
  donationAmount,
  donationFrequency,
  setDonationFrequency,
  onNextStep
}: IProps) => {
  const handleAmountChange = (data: string) => {
    setDonationAmount(data)
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value)
  }
  return (
    <div>
      <div className='flex flex-col bg-accent p-2 md:p-4 h-full shadow-md max-w-full '>
        <div className='w-full max-w-full'>
          <p className='parag text-white'>
            Choose the amount that matches your generosity and help us make a
            difference! Every donation counts toward our cause.
          </p>
          <div className='flex flex-col '>
            <div className=' flex flex-col p-2 w-full mt-2 max-w-full'>
              {Array.isArray(fixedDontaionAmounts) &&
                fixedDontaionAmounts?.map((amount, amx) => {
                  return (
                    <DonationAmountButton
                      key={`key-${amx}-amount-${amount}`}
                      SelecteddonationAmount={donationAmount}
                      amount={amount.toString()}
                      onAmountChange={handleAmountChange}
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <div className='mt-4 '>
          <p className='font-bold text-xl text-white'>
            Choose a donation frequency
          </p>
          <div className='flex flex-col max-w-full'>
            <div className='flex flex-col p-2 w-full mt-2  overflow-hidden '>
              <div className='flex w-full'>
                {frequency_config?.map((frq, frqx) => {
                  return (
                    <FrequencyButton
                      key={`key-${frqx}-${frq?.id}`}
                      config={frq}
                      donationFrequency={donationFrequency}
                      setDonationFrequency={setDonationFrequency}
                    />
                  )
                })}
              </div>

              <div className='flex h-full w-full justify-items-center  '></div>
            </div>
          </div>
        </div>

        <div className='mt-4 '>
          <p className='font-bold text-xl text-white'>Enter a custom amount</p>
          <div className='flex flex-col max-w-full'>
            <div className='flex flex-col p-2 w-full mt-2 h-20 overflow-hidden'>
              <div className='flex h-full w-full justify-items-center '>
                <div className='bg-white text-black w-[60%] flex items-center px-2 md:px-6'>
                  <div className='md:text-xl flex max-w-full'>
                    <span className=''>$</span>
                    <input
                      onChange={handleCustomAmountChange}
                      className='ml-1 md:text-xl outline-none w-[90%] '
                      type='number'
                      // defaultValue={parseInt(donationAmount)}
                      value={parseInt(donationAmount)}
                    />
                  </div>
                </div>
                <div
                  onClick={onNextStep}
                  className='bg-black cursor-pointer hover:bg-black/60 text-white w-[40%] md:text-lg flex items-center text-center rounded-r-xl'
                >
                  <p className='w-full'>Donate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function validate (watchvalues: any, { errors, setError, clearErrors }: any) {
  if (watchvalues['firstName'] === 'Admin') {
    if (!errors?.['firstName']) {
      setError('firstName', {
        type: 'manual',
        message: 'You cannot use admin as name'
      })
    }
  } else {
    clearErrors('firstName')
    // if (errors?.['firstName'] && errors?.['firstName']['type'] === 'manual') {
    //   clearErrors('firstName')
    // }
  }
}
export default ChooseAmount
