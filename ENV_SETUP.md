# Environment Variables Setup Guide

## Overview
This guide explains how to set up your Stripe and PayPal API credentials securely using environment variables.

---

## Files Created

1. **`.env.example`** - Template file (safe to commit to git)
2. **`.env.local`** - Your actual credentials (ignored by git)

---

## Setup Steps

### 1. Get Your API Keys

#### Stripe
1. Go to https://dashboard.stripe.com/register
2. Create an account or login
3. Navigate to **Developers** → **API Keys**
4. Copy your **Publishable key** (starts with `pk_test_` for test mode)

#### PayPal
1. Go to https://developer.paypal.com/dashboard
2. Create an account or login
3. Go to **My Apps & Credentials**
4. Create a new app or select existing
5. Copy your **Client ID** from the app details

### 2. Add Keys to .env.local

Open the `.env.local` file in your project root and replace the placeholder values:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_key_here
VITE_PAYPAL_CLIENT_ID=your_actual_paypal_client_id_here
```

### 3. Restart Dev Server

After adding your keys, restart the development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Important Notes

### Security
- ✅ `.env.local` is already in `.gitignore` - your keys won't be committed
- ✅ Never commit real API keys to version control
- ✅ Use test/sandbox keys for development
- ✅ Use live keys only in production

### Vite Environment Variables
- Must start with `VITE_` to be exposed to the client
- Access with `import.meta.env.VITE_YOUR_VAR_NAME`
- Changes require dev server restart

### Test vs Live Keys

**Stripe:**
- Test: `pk_test_...` (for development)
- Live: `pk_live_...` (for production)

**PayPal:**
- Sandbox: Use sandbox app credentials
- Live: Use live app credentials

---

## Testing

### Stripe Test Cards
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- Expiry: Any future date
- CVC: Any 3 digits

### PayPal Sandbox
- Use sandbox buyer/seller accounts
- Create at https://developer.paypal.com/dashboard/accounts

---

## Production Deployment

### For Production (.env.production)

Create a `.env.production` file with live keys:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_key
VITE_PAYPAL_CLIENT_ID=your_live_paypal_client_id
```

### Deployment Platforms

**Vercel/Netlify:**
- Add environment variables in dashboard
- Set `VITE_STRIPE_PUBLISHABLE_KEY` and `VITE_PAYPAL_CLIENT_ID`

**Other Platforms:**
- Check platform documentation for environment variable setup
- Ensure variables are prefixed with `VITE_`

---

## Troubleshooting

### Keys Not Working?
1. Check if dev server was restarted
2. Verify keys are correct (no extra spaces)
3. Check console for errors
4. Ensure keys start with correct prefix

### Stripe Not Loading?
- Check publishable key (not secret key!)
- Verify key starts with `pk_test_` or `pk_live_`
- Check browser console for errors

### PayPal Not Loading?
- Verify client ID is correct
- Check if sandbox mode is enabled
- Look for errors in browser console

---

## Current Configuration

Your app is now configured to read from environment variables:

**Stripe:** `import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY`  
**PayPal:** `import.meta.env.VITE_PAYPAL_CLIENT_ID`

Add your actual keys to `.env.local` and restart the server to start testing payments!
