import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_TOKEN ?? process.env.STRIPE_TOKEN ?? '',
  {
    // https://github.com/stripe/stripe-node#configuration
    // apiVersion: '2022-11-15',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: 'Savvy Initiative',
      version: '0.1.0'
    }
  }
);