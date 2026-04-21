import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { amount } = await req.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // If keys are missing, return a simulated order for testing purposes
      console.warn("Razorpay keys missing, returning simulated order.");
      return NextResponse.json({
        id: "order_simulated_" + Date.now(),
        amount: amount,
        currency: "INR",
        simulated: true
      });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
