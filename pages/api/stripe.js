// // next.js allows us to build our entire backend server within the api folder. no need for node/express server

import Stripe from 'stripe';
import { urlFor } from '../../lib/client.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const product = await stripe.products.retrieve('prod_PlSQQGAr2ak29z');

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
          const imgUrl = urlFor(item.images[0].asset._ref).url();

          if (item.variants) {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: item.nameShort + ' - ' + item.selectedVariantName,
                  images: [imgUrl],
                  metadata: {
                    productId: "prod_PlSQQGAr2ak29z"
                  }
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
                  name: item.nameShort + ' - ' + item.selectedVariantName,
                  images: [imgUrl],
                  metadata: {
                    productId: "prod_PlSQQGAr2ak29z"
                  }
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
        allow_promotion_codes: true,
        client_reference_id: "prod_PlSQQGAr2ak29z",
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