'use client'
import React, { useEffect, useState, useRef } from 'react'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import ReusableForm from '@/components/forms/reusable-form'
import { ITemplate } from '@/components/forms/reusable-form'
import ChooseAmount from './choose-amount'
import DonorInfo from './donor-info'
import { useWindowScroll } from '@uidotdev/usehooks'
import StripeCheckout from './stripe-checkout'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

const DONATE_PAYMENT_URL = 'api/create-donation-payment-session'

const steps: string[] = ['choose-amount', 'donor-info', 'checkout']
enum DonationFrequency {
  Monthly = 'monthly',
  'One Time' = 'one_time'
}
interface ContainerRefType {
  current: HTMLElement | null
  scrollTo: (options?: ScrollToOptions) => void
}

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

const BG_IMAGE =
  'https://images.ctfassets.net/ocgec2v7knct/2jBMAGCHIPXDx5WcQ3DPln/7f346c15ed420dcf9e13552eefcdef1b/pexels-cottonbro-studio-6590920.jpg'

const DonateForm = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [{ x, y }, scrollTo] = useWindowScroll()
  const [currentStep, setCurrentStep] = useState<string>(steps[0])
  const [clientSecret, setClientSecret] = useState<string>('')
  const [donationAmount, setDonationAmount] = useState<string>('50')
  const [donationFrequency, setDonationFrequency] = useState<DonationFrequency>(
    DonationFrequency.Monthly
  )

  const onNextStep = () => {
    try {
      scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    } catch (error) {}
    setCurrentStep(steps[1])
  }

  const appearance = {
    theme: 'stripe'
  }
  const options: any = {
    clientSecret,
    appearance,
    loader: 'auto'
  }

  const processOneTimePayment = (data: any) => {
    // make API call to backend to get client secret via /savvy-stripe/pay-intent
    const paymentIntentPayload = {
      amount: parseFloat(donationAmount) * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      },
      receipt_email: data?.email,
      customer_data: data
    }

    fetch(`${DONATE_PAYMENT_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentIntentPayload)
    })
      .then(response => {
        if (!response.ok) {
          alert('An error occured')
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        // set client secret
        const returnedClientSecret = data?.clientSecret
        if (returnedClientSecret) {
          setClientSecret(returnedClientSecret)
          try {
            scrollTo({ left: 0, top: 0, behavior: 'smooth' })
          } catch (error) {}
          setCurrentStep(steps[2])
        }

        // go to next step
      })
      .catch(error => {
        console.error('Fetch error:', error.message)
      })
  }

  const processSubscriptionPayment = (data: any) => {
    // make API call to backend to get client secret via /savvy-stripe/pay-intent
    const paymentIntentPayload = {
      frequency: 'monthly',
      amount: parseFloat(donationAmount) * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      },
      receipt_email: data?.email,
      customer_data: data
    }

    fetch(`${DONATE_PAYMENT_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentIntentPayload)
    })
      .then(response => {
        if (!response.ok) {
          alert('An error occured')
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        // set client secret
        const returnedClientSecret = data?.clientSecret
        if (returnedClientSecret) {
          setClientSecret(returnedClientSecret)
          try {
            scrollTo({ left: 0, top: 0, behavior: 'smooth' })
          } catch (error) {}
          setCurrentStep(steps[2])
        }

        // go to next step
      })
      .catch(error => {
        console.error('Fetch error:', error.message)
      })
  }

  const onFormSubmit = (data: any) => {
    // alert(JSON.stringify(data))
    if (donationFrequency === 'monthly') {
      processSubscriptionPayment(data)
    }
    if (donationFrequency === 'one_time') {
      processOneTimePayment(data)
    }
  }

  return (
    <div ref={containerRef} className=''>
      <div
        // style={{
        //   backgroundImage: `url(${BG_IMAGE})`
        // }}
        className='flex items-center justify-center  bg-cover bg-center bg-no-repeat  p-2 md:p-10 h-full relative overflow-hidden '
      >
        <img
          loading='lazy'
          srcSet={BG_IMAGE}
          className='absolute z-[-1] h-full w-full object-cover object-center inset-0'
        />
        <div className='hidden md:block md:w-[60%]'></div>
        <div className='md:w-[50%]'>
          {currentStep === steps[0] && (
            <ChooseAmount
              setDonationAmount={setDonationAmount}
              donationAmount={donationAmount}
              donationFrequency={donationFrequency}
              setDonationFrequency={setDonationFrequency}
              onNextStep={onNextStep}
            />
          )}
          {currentStep === steps[1] && (
            <DonorInfo
              onFormSubmit={onFormSubmit}
              donationAmount={donationAmount}
              donationFrequency={donationFrequency}
            />
          )}

          {currentStep === steps[2] && (
            <>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <StripeCheckout />
                </Elements>
              )}
            </>
          )}
        </div>
      </div>
      <div className='flex flex-col h-full'></div>
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

export default DonateForm
