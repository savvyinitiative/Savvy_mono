import ReusableForm, { ITemplate } from '@/components/forms/reusable-form'
import Actionbutton from '@/components/primitives/action-button'
import { priceFormatter } from '@/utils/general'
import { loadStripe } from '@stripe/stripe-js'
import type {
  ICountry,
  ICountryData,
  ILanguage,
  TContinentCode,
  TCountryCode,
  TLanguageCode
} from 'countries-list'
import countries2to3 from 'countries-list/minimal/countries.2to3.min.json'
import countries3to2 from 'countries-list/minimal/countries.3to2.min.json'
// Main data and utils
import { continents, countries, languages } from 'countries-list'
// Utils
import {
  getCountryCode,
  getCountryData,
  getCountryDataList,
  getEmojiFlag
} from 'countries-list'

const ENABLE_FEATURE = true

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)
const formTemplate: ITemplate = {
  title: 'Choose s donation amount',
  fields: [
    {
      label: 'Name',
      type: 'group',
      name: 'nameGroup',
      content: [
        {
          label: 'First Name',
          type: 'text',
          name: 'firstName',
          validationProps: {
            required: 'First Name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Only letters are allowed'
            },
            minLength: {
              value: 2,
              message: 'Must be at least 2 characters long'
            }
          }
        },
        {
          label: 'Last Name',
          type: 'text',
          name: 'lastName',
          validationProps: {
            required: 'Last Name is required'
          }
        }
      ]
    },
    {
      label: 'Email Address',
      type: 'email',
      name: 'email',
      validationProps: {
        required: 'Email is required'
      }
    },
    {
      label: 'Street Address',
      type: 'text',
      name: 'streetAddress',
      validationProps: {
        required: 'Address is required'
      }
    },
    {
      label: 'City',
      type: 'text',
      name: 'city',
      validationProps: {
        required: 'City is required'
      }
    },
    {
      label: 'State  and Zip code',
      type: 'group',
      name: 'stateZipGroup',
      content: [
        {
          label: 'State',
          type: 'text',
          name: 'state',
          validationProps: {
            required: 'State is required'
          }
        },
        {
          label: 'Zip Code',
          type: 'text',
          name: 'zipCode',
          validationProps: {
            required: 'Zip Code is required'
          }
        }
      ]
    },
    {
      label: 'Country',
      type: 'select',
      optionName: 'name',
      optionIdName: 'iso2',
      options: getCountryDataList(),
      name: 'country',
      validationProps: {
        required: 'Country is required',
        minLength: {
          value: 2,
          message: 'Must be at least 2 character country code'
        },
        maxLength: {
          value: 2,
          message: '2 character country code e.g US'
        }
      }
    }

    // { label: 'Include Image', type: 'checkbox', name: 'include_image' },
    // {
    //   label: 'Image Link',
    //   type: 'url',
    //   name: 'image_link',
    //   dynamic: { field: 'include_image', value: true }
    // }
  ]
}
interface IProps {
  onFormSubmit: (data: string) => void
  donationAmount: string
  donationFrequency: string
}
const DonorInfo = ({
  onFormSubmit,
  donationAmount,
  donationFrequency
}: IProps) => {
  const price = 50000

  const donationSummaryMsg = `Confirm your ${
    donationFrequency === 'monthly' ? 'monthly' : ''
  }  ${priceFormatter(parseInt(donationAmount), 'USD')} donation`
  const appearance = {
    theme: 'stripe'
  }

  return (
    <div className='w-full '>
      {/* {JSON.stringify(getCountryDataList())} */}

      <div className='flex flex-col bg-accent text-white p-2 md:p-10  h-full shadow-md  '>
        <div className=''>
          <p className='font-bold text-lg text-white'>Your information</p>
          {!ENABLE_FEATURE ? (
            <div className='py-4'>
              <p className='text-xl text-error'>
                Thank you for your generosity and interest in supporting Savvy
                Initiative. At the moment, our donation feature is undergoing
                improvements and is temporarily unavailable. We apologize for
                any inconvenience this may cause. Please check back later, and
                we appreciate your patience and understanding. If you have any
                questions or would like further assistance, feel free to contact
                us. Thank you for being a valued supporter of Savvy Initiative!
              </p>
            </div>
          ) : (
            <div className='w-full'>
              <ReusableForm
                template={formTemplate}
                watchFields={['firstName', 'email']}
                validate={validate}
                onFormSubmit={onFormSubmit}
                submitLabel={'Pay'}
              >
                <div className=''>
                  <p className='text-lg my-2 font-bold'>{donationSummaryMsg}</p>
                  <Actionbutton label='Pay' style='Secondary' type='submit' />
                </div>
              </ReusableForm>
            </div>
          )}
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
export default DonorInfo
