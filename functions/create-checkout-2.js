const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'cad',
        product_data: { name: '50 000 boost' },
        unit_amount: 128, // 1,28$
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://cleb01.netlify.app/?achat2=true',
    cancel_url: 'https://cleb01.netlify.app/',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};
