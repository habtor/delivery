import { Router } from "express";
import Stripe from "stripe";

const router = Router();

router.post("/", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { deliveryId, deliveryPrice } = req.body;
  const price = Math.round(deliveryPrice * 100);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Delivery Price",
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.BASE_CLIENT_URL}/delivery-details/${deliveryId}`,
    cancel_url: `${process.env.BASE_CLIENT_URL}`,
  });
  res.json(session);
});

export default router;
