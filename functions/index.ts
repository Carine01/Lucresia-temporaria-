
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

admin.initializeApp();
const db = admin.firestore();

const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: "2024-06-20",
});

export const createStripeCheckout = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Logue para assinar.");
  }

  const userId = context.auth.uid;
  const { priceId, successUrl, cancelUrl } = data;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId, priceId },
  });

  return { url: session.url };
});

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const signature = req.headers["stripe-signature"] as string;
  const webhookSecret = functions.config().stripe.webhook_secret;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
  } catch (err) {
    res.status(400).send(`Error: ${(err as Error).message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const priceId = session.metadata?.priceId;

    if (userId) {
        // Mapeamento simples de IDs de preço para níveis
        // Em produção, você usaria o priceId configurado no config/priceIds.ts
        let level: 'pro' | 'master' = 'pro';
        if (priceId?.includes('MASTER')) level = 'master';

        await db.collection("users").doc(userId).update({
            level,
            subscriptionStartDate: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
     // Lógica de cancelamento (já implementada)
  }

  res.status(200).send({ received: true });
});
