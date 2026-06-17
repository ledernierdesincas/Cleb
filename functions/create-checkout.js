const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'cad',
        product_data: { name: 'Mode Premium' },
        unit_amount: 499,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://CLEB01.netlify.app/?paye=true',
    cancel_url: 'https://CLEB01.netlify.app/',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};
