// // next.js allows us to build our entire backend server within the api folder. no need for node/express server

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {

    try {
      // declare params
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1NmupjGiRNSwDDoZSS3ViHpl' }
        ],
        shipping_address_collection: {
          allowed_countries: ['US'],
        },
        line_items: req.body.map((item) => {
          const img = item.images[0].asset._ref;

          if (item.variants) {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.nameShort + ' - ' + item.selectedVariantName,
                  images: [img],
                },
                unit_amount: Math.round(item.price * 100),
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            }
          } else {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.nameShort,
                  images: [img],
                },
                unit_amount: Math.round(item.price * 100),
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity,
            }
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      console.log("Stripe Error:", err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}