import Stripe from 'stripe'

const DEFAULT_CURRENCY = 'USD'

export default {
  id: 'savvy-stripe',
  handler: async (router, { env, services, getSchema }) => {
    const { MailService, ItemsService, action } = services
    const schema = await getSchema()
    const stripe = new Stripe(env.STRIPE_TOKEN)
    const collection = 'page'
    const itemsService = new ItemsService(collection, { schema })

    // Create payment subscription and return client secret
    router.post('/v1/pay-subscription', async (req, res) => {
      // res.json(req.body)
      const amount = req.body?.amount
      const receipt_email = req.body?.receipt_email
      const currency = req.body?.currency || DEFAULT_CURRENCY
      const customer_data = req.body?.customer_data

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

        if (!amount) throw error

        // const paymentIntent = await stripe.paymentIntents.create({
        //   amount: amount,
        //   currency: currency,
        //   receipt_email,
        //   customer: customer?.id,
        //   automatic_payment_methods: {
        //     enabled: true
        //   }
        // })

        const subscription = await stripe.subscriptions.create({
          customer: customer?.id,
          currency: currency,
          items: [
            {
              price_data: {
                product :"prod_P8o3XDToXWHGq5",
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

        res.send({
          subscriptionId: subscription.id,
          clientSecret: subscription.latest_invoice.payment_intent.client_secret
        })
      } catch (error) {
        throw error
      }
    })

    // Create payment intent for Stripe element
    router.post('/v1/pay-intent', async (req, res) => {
      // res.json(req.body)
      const amount = req.body?.amount
      const receipt_email = req.body?.receipt_email
      const currency = req.body?.currency || DEFAULT_CURRENCY
      const customer_data = req.body?.customer_data

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

      if (!amount) throw error

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        receipt_email,
        customer: customer?.id,
        automatic_payment_methods: {
          enabled: true
        }
      })

      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })

    router.get('/', async (req, res) => {
      const data = await itemsService.readOne('welcome')

      try {
        // res.send('Hello, World!')\
        // Create a PaymentIntent with the order amount and currency

        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1400,
          currency: 'eur',
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          automatic_payment_methods: {
            enabled: true
          }
        })

        res.send({
          clientSecret: paymentIntent.client_secret
        })
        // res.json(data)
      } catch (error) {
        throw error
      }
    })

    router.patch('/', async (req, res) => {
      const data = await itemsService.updateOne('welcome', {
        title: 'An updated title'
      })

      res.json(data)
    })

    router.delete('/', async (req, res) => {
      await itemsService.deleteOne('welcome')

      res.json()
    })

    router.post('/', async (req, res) => {
      const data = await itemsService.createOne({
        title: 'Hello world!',
        body: 'This is our first article'
      })

      if (collection !== 'customers') return

      // stripe.customers
      // 	.create({
      // 		name: `${payload.first_name} ${payload.last_name}`,
      // 		email: payload.email_address,
      // 	})
      // 	.then((customer) => {
      // 		const customers = new ItemsService(collection, { schema: schema });
      // 		customers.updateByQuery({ filter: { id: key } }, { stripe_id: customer.id }, { emitEvents: false });
      // 	})
      // 	.catch((error) => {
      // 		mailService.send({
      // 			to: 'sharedmailbox@directus.io',
      // 			from: 'noreply@directus.io',
      // 			subject: `An error has occurred with Stripe API`,
      // 			text: `The following error occurred for ${payload.first_name} ${payload.last_name} when attempting to create an account in Stripe.\r\n\r\n${error}\r\n\r\nPlease investigate.\r\n\r\nID: ${key}\r\nEmail: ${payload.email_address}`,
      // 		});
      // 	});

      res.json(data)
    })

    router.get('/', async (req, res) => {
      // action('items.create', async ({ key, collection, payload }, { schema }) => {

      // });

      res.send('Hello, World!')
    })
  }
}

// export default async (router, { env, services, getSchema }) => {
//   const { MailService, ItemsService, action } = services
//   const schema = await getSchema()
//   const stripe = new Stripe(env.STRIPE_TOKEN)
//   const collection = 'collection_name'
//   const itemsService = new ItemsService(collection, { schema })

// }

// export default ({ action }, { env, services }) => {
// 	const { MailService, ItemsService } = services;

// 	action('items.create', async ({ key, collection, payload }, { schema }) => {
// 		if (collection !== 'customers') return;
// 		const stripe = new Stripe(env.STRIPE_TOKEN);

// 		stripe.customers
// 			.create({
// 				name: `${payload.first_name} ${payload.last_name}`,
// 				email: payload.email_address,
// 			})
// 			.then((customer) => {
// 				const customers = new ItemsService(collection, { schema: schema });
// 				customers.updateByQuery({ filter: { id: key } }, { stripe_id: customer.id }, { emitEvents: false });
// 			})
// 			.catch((error) => {
// 				mailService.send({
// 					to: 'sharedmailbox@directus.io',
// 					from: 'noreply@directus.io',
// 					subject: `An error has occurred with Stripe API`,
// 					text: `The following error occurred for ${payload.first_name} ${payload.last_name} when attempting to create an account in Stripe.\r\n\r\n${error}\r\n\r\nPlease investigate.\r\n\r\nID: ${key}\r\nEmail: ${payload.email_address}`,
// 				});
// 			});
// 	});
// };
