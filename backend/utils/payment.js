// Example: Razorpay integration (can adapt for Stripe/PayPal)
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a payment order
exports.createOrder = async (amount, currency = 'INR') => {
  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt: `receipt_${Date.now()}`
  };
  return await razorpay.orders.create(options);
};

// Verify payment signature
exports.verifyPayment = (orderId, paymentId, signature) => {
  const crypto = require('crypto');
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest('hex');

  return generatedSignature === signature;
};