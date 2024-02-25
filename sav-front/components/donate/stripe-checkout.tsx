import React, { useEffect, useState, useRef } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useWindowScroll } from '@uidotdev/usehooks'
import Actionbutton from '@/components/primitives/action-button'

const RETURN_URL = `${process.env.NEXT_PUBLIC_APP_URL}/donate/success`

const paymentElementOptions: any = {
  layout: 'tabs'
}

const StripeCheckout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [{ x, y }, scrollTo] = useWindowScroll()
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!stripe) return

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )
    const retrievePaymentIntent = async () => {
      if (!stripe) return

      const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
      )

      if (!clientSecret) return

      try {
        const { paymentIntent }: any = await stripe.retrievePaymentIntent(
          clientSecret
        )

        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!')
            break
          case 'processing':
            setMessage('Your payment is processing.')
            break
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.')
            break
          default:
            setMessage('Something went wrong.')
            break
        }
      } catch (error) {
        setMessage('Error retrieving payment intent.')
      }
    }

    retrievePaymentIntent()
  }, [stripe])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsLoading(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: RETURN_URL
        }
      })

      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error?.message || '')
      } else {
        setMessage('An unexpected error occurred.')
      }
    } catch (error) {}

    setIsLoading(false)
  }

  return (
    <div
      ref={containerRef}
      className='flex flex-col bg-accent text-white p-2 md:p-10  h-full shadow-md  '
    >
      <form id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' options={paymentElementOptions} />

        <button
          className='btnz btnz-secondary mt-8'
          disabled={isLoading || !stripe || !elements}
          id='submit'
        >
          <span id='button-text'>
            {isLoading ? (
              <div className='spinner' id='spinner'>
                Processing...
              </div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </div>
  )
}

export default StripeCheckout
