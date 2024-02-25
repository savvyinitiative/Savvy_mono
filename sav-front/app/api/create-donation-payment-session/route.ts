import { stripe } from '@/utils/stripe'
import { cookies, headers } from 'next/headers'

const DEFAULT_CURRENCY = 'USD'
const DEFAULT_DONATION_PRODUCT = process.env.DEFAULT_DONATION_PRODUCT || ""

export async function POST (req: Request) {
  if (req.method === 'POST') {
    // 1. Destructure the values from the request body
    const {
      amount,
      frequency = 'one_time',
      quantity = 1,
      receipt_email,
      currency,
      customer_data = {}
    } = await req.json()

    try {
      // check if customer exists
      const customers = await stripe.customers.list({
        limit: 1,
        email: customer_data?.email
      })
      let customer = customers?.data?.[0]

      // create customer if not existing
      if (!customer) {
        customer = await stripe.customers.create({
          email: customer_data?.email,
          description: `Paid from website`,
          name: `${customer_data?.firstName} ${customer_data?.lastName}`,
          // phone : ,
          address: {
            city: customer_data?.city,
            country: customer_data?.country || '',
            line1: customer_data?.streetAddress || '',
            postal_code: customer_data?.zipCode || '',
            state: customer_data?.state || ''
          }
        })
      }

      //   check what type of payment frequency
      if (frequency === 'one_time') {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: currency,
          receipt_email,
          customer: customer?.id,
          automatic_payment_methods: {
            enabled: true
          }
        })

        return new Response(
          JSON.stringify({ clientSecret: paymentIntent.client_secret }),
          {
            status: 200
          }
        )
      }

      if (frequency === 'monthly') {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: currency,
          receipt_email,
          customer: customer?.id,
          automatic_payment_methods: {
            enabled: true
          }
        })

        const subscription : any = await stripe.subscriptions.create({
          customer: customer?.id,
          currency: currency,
          items: [
            {
              price_data: {
                product: DEFAULT_DONATION_PRODUCT,
                currency: currency,
                unit_amount: amount,
                recurring: {
                  interval: 'month'
                }
              }
            }
          ],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent']
        })

        return new Response(
          JSON.stringify({
            subscriptionId: subscription.id,
            clientSecret:
              subscription?.latest_invoice?.payment_intent?.client_secret 
          }),
          {
            status: 200
          }
        )
      }

      return new Response(JSON.stringify({msg: "something went wrong"}), { status: 500 })
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify(error), { status: 500 })
    }
  }
}
