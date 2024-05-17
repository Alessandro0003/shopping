import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY ?? 'default_secret_key';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-04-10",
  appInfo: {
    name: 'Shop',
  }
});