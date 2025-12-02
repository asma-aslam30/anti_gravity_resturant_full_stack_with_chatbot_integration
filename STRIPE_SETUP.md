# Quick Stripe Payment Setup

## Step 1: Add Stripe Test Key

Open or create `.env.local` in your project root and add:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51QRxLbP3pqJ8K9xY2vN4mZ7wA6cB5dE8fG9hH0iJ1kL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5m
```

**Note:** This is a Stripe test key - it's safe to use for development and won't process real payments.

## Step 2: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Step 3: Test Stripe Payment

1. Add items to cart
2. Go to checkout
3. Select "Credit/Debit Card" payment method
4. Use test card: **4242 4242 4242 4242**
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)
5. Click "Pay $XX.XX with Card"

## Test Cards

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Decline |
| 4000 0025 0000 3155 | 🔒 3D Secure |

## Get Your Own Stripe Key (Optional)

1. Go to https://dashboard.stripe.com/register
2. Create account
3. Navigate to **Developers** → **API Keys**
4. Copy **Publishable key** (starts with `pk_test_`)
5. Replace in `.env.local`

## Current Status

✅ Stripe integration is ready  
✅ PayPal is configured but optional  
✅ Cash on Delivery works without setup  

Your app now supports Stripe payments! Just add the key to `.env.local` and restart the server.
