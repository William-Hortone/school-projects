// const express = require("express");
// const Stripe = require("stripe");
// const { Order } = require("../models/Order");

// require("dotenv").config();

// const stripe = Stripe(process.env.STRIPE_KEY);

// const router = express.Router();

// router.post("/create-checkout-session", async (req, res) => {
//   const customer = await stripe.customers.create({
//     metadata: {
//       userId: req.body.userId,
//       cart: JSON.stringify(req.body.cartItems),
//     },
//   });

//   const line_items = req.body.cartItems.map((item) => {
//     npm install --save stripe
//     return {
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//           images: [item.image],
//           description: item.desc,
//           metadata: {
//             id: item.id,
//           },
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.cartQuantity,
//     };
//   });

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     shipping_address_collection: {
//       allowed_countries: ["US", "CA", "KE"],
//     },
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           type: "fixed_amount",
//           fixed_amount: {
//             amount: 0,
//             currency: "usd",
//           },
//           display_name: "Free shipping",
//           // Delivers between 5-7 business days
//           delivery_estimate: {
//             minimum: {
//               unit: "business_day",
//               value: 5,
//             },
//             maximum: {
//               unit: "business_day",
//               value: 7,
//             },
//           },
//         },
//       },
//       {
//         shipping_rate_data: {
//           type: "fixed_amount",
//           fixed_amount: {
//             amount: 1500,
//             currency: "usd",
//           },
//           display_name: "Next day air",
//           // Delivers in exactly 1 business day
//           delivery_estimate: {
//             minimum: {
//               unit: "business_day",
//               value: 1,
//             },
//             maximum: {
//               unit: "business_day",
//               value: 1,
//             },
//           },
//         },
//       },
//     ],
//     phone_number_collection: {
//       enabled: true,
//     },
//     line_items,
//     mode: "payment",
//     customer: customer.id,
//     success_url: `${process.env.CLIENT_URL}/checkout-success`,
//     cancel_url: `${process.env.CLIENT_URL}/cart`,
//   });

//   // res.redirect(303, session.url);
//   res.send({ url: session.url });
// });

// // Create order function

// const createOrder = async (customer, data) => {
//   const Items = JSON.parse(customer.metadata.cart);

//   const products = Items.map((item) => {
//     return {
//       productId: item.id,
//       quantity: item.cartQuantity,
//     };
//   });

//   const newOrder = new Order({
//     userId: customer.metadata.userId,
//     customerId: data.customer,
//     paymentIntentId: data.payment_intent,
//     products,
//     subtotal: data.amount_subtotal,
//     total: data.amount_total,
//     shipping: data.customer_details,
//     payment_status: data.payment_status,
//   });

//   try {
//     const savedOrder = await newOrder.save();
//     console.log("Processed Order:", savedOrder);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Stripe webhoook

// router.post(
//   "/webhook",
//   express.json({ type: "application/json" }),
//   async (req, res) => {
//     let data;
//     let eventType;

//     // Check if webhook signing is configured.
//     let webhookSecret;
//     //webhookSecret = process.env.STRIPE_WEB_HOOK;

//     if (webhookSecret) {
//       // Retrieve the event by verifying the signature using the raw body and secret.
//       let event;
//       let signature = req.headers["stripe-signature"];

//       try {
//         event = stripe.webhooks.constructEvent(
//           req.body,
//           signature,
//           webhookSecret
//         );
//       } catch (err) {
//         console.log(`⚠️  Webhook signature verification failed:  ${err}`);
//         return res.sendStatus(400);
//       }
//       // Extract the object from the event.
//       data = event.data.object;
//       eventType = event.type;
//     } else {
//       // Webhook signing is recommended, but if the secret is not configured in `config.js`,
//       // retrieve the event data directly from the request body.
//       data = req.body.data.object;
//       eventType = req.body.type;
//     }

//     // Handle the checkout.session.completed event
//     if (eventType === "checkout.session.completed") {
//       stripe.customers
//         .retrieve(data.customer)
//         .then(async (customer) => {
//           try {
//             // CREATE ORDER
//             createOrder(customer, data);
//           } catch (err) {
//             console.log(typeof createOrder);
//             console.log(err);
//           }
//         })
//         .catch((err) => console.log(err.message));
//     }

//     res.status(200).end();
//   }
// );

// module.exports = router;

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

// !newwww
// const express = require("express");
// const Stripe = require("stripe");

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// require("dotenv").config();
// const router = express.Router();

// const app = express();
// app.use(express.static("public"));

// const YOUR_DOMAIN = "http://localhost:3000";

// router.post("/stripe/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}/success`,
//     cancel_url: `${process.env.CLIENT_URL}/cancel`,
//   });

//   res.json({ sessionId: session.id });
// });
// //  catch (error) {
// //   console.error(error.message);
// //   res.status(500).json({ error: "Internal Server Error" });
// // // }
// //   // res.send({ url: session.url });
// // });
// module.exports = router;

// // app.listen(4242, () => console.log('Running on port 4242'));

const express = require("express");

const Stripe = require("stripe");

require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors());

router.post("/stripe/create-checkout-session", async (req, res) => {
  const { bill, userId } = req.body;

  const line_items = bill.selectedProduct.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item,
        },
        unit_amount: 2000,
      },
      quantity: 1,
    };
  });

  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,

      // const line_items = bill.map(item =>{
      //   return{

      //       price_data: {
      //         currency: "usd",
      //         product_data: {
      //           name: "Medicine",
      //         },
      //         unit_amount: 2000,
      //     },
      //     quantity: 2,

      // }
      // }),
      // line_items: [
      //   {
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: bill.selectedProduct,
      //       },
      //       unit_amount: 2000,
      //     },
      //     quantity: 2,
      //   },
      // {
      //   price_data: {
      //     currency: "usd",
      //     product_data: {
      //       name: "Doliprane",
      //     },
      //     unit_amount: 1000,
      //   },
      //   quantity: 3,
      // },
      // ],
      mode: "payment",
      success_url: "http://127.0.0.1:5173/success",
      cancel_url: "http://127.0.0.1:5173/adminDashboard/ouTPBill",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
