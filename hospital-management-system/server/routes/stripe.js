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
