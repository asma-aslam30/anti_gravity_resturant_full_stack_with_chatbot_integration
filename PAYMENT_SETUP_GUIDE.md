# 💳 Payment Integration Setup Guide

Your NeoBite Restaurant app already has **Stripe** (Credit/Debit Cards) and **PayPal** integrated! You just need to add the API keys.

---

## 🎯 Payment Methods Available:

1. ✅ **Cash on Delivery (COD)** - Already working!
2. 💳 **Credit/Debit Cards** - Via Stripe (needs setup)
3. 💰 **PayPal** - Via PayPal SDK (needs setup)

---

## 🔐 Step 1: Stripe Setup (Credit/Debit Cards)

### A. Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" or "Sign up"
3. Create your account (free)
4. Complete email verification

### B. Get API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key**: Starts with `pk_test_...`
   - **Secret key**: Starts with `sk_test_...` (keep this secret!)

3. Copy the **Publishable key** (it's safe for frontend)

### C. Add to `.env` File

Open `d:\antigravity code\.env` and add:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

**Example:**
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51ABCDEfghijKLMNOpqrsTUV123456
```

### D. Test Cards

Stripe provides test cards for testing:

| Card Number | Description |
|------------|-------------|
| `4242 4242 4242 4242` | Visa - Success |
| `4000 0025 0000 3155` | Visa - Requires 3D Secure |
| `5555 5555 5555 4444` | Mastercard - Success |

- **Expiry**: Any future date (e.g., `12/25`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

---

## 💰 Step 2: PayPal Setup

### A. Create PayPal Developer Account

1. Go to https://developer.paypal.com
2. Log in with your PayPal account (or create one)
3. Go to **Dashboard** → **My Apps & Credentials**

### B. Create an App

1. Click "Create App"
2. App Name: `NeoBite Restaurant`
3. Select **Sandbox** (for testing)
4. Click "Create App"

### C. Get Client ID

1. You'll see your app details
2. Copy the **Client ID** under "Sandbox"
3. It looks like: `ABCD1234xyz...`

### D. Add to `.env` File

Open `d:\antigravity code\.env` and add:

```bash
# PayPal Configuration
VITE_PAYPAL_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

**Example:**
```bash
VITE_PAYPAL_CLIENT_ID=AZaBC123xyz456DEF789ghiJKL012mnoPQR
```

### E. Test PayPal Account

PayPal provides test accounts:

1. Go to https://developer.paypal.com/dashboard/accounts
2. You'll see sandbox test accounts:
   - **Personal Account** (buyer) -  for testing purchases
   - **Business Account** (seller) - receives payments

3. Use the Personal Account to test payments:
   - Click on the account → "View/Edit Account"
   - Copy email and password
   - Use these to log in during checkout

---

## 📝 Complete `.env` Configuration

Your final `.env` should look like this:

```bash
# Environment Variables for NeoBite Restaurant

# =============================================
# Gmail SMTP Configuration (Backend)
# =============================================
GMAIL_USER=aslamasma486@gmail.com
GMAIL_APP_PASSWORD=btawdgjodsjqwpmh
PORT=3001

# =============================================
# Frontend Configuration
# =============================================
VITE_API_URL=http://localhost:3001

# =============================================
# Stripe Configuration
# =============================================
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51ABCDEfghijKLMNOpqrsTUV123456

# =============================================
# PayPal Configuration
# =============================================
VITE_PAYPAL_CLIENT_ID=AZaBC123xyz456DEF789ghiJKL012mnoPQR

# Note: Never commit this file to version control!
```

---

## 🚀 Step 3: Restart Frontend

After adding the keys, restart your frontend:

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

---

## 🧪 Step 4: Test Payments

### Test Stripe (Credit/Debit Card):

1. Add items to cart
2. Go to checkout
3. Select **"Credit/Debit Card"** payment method
4. Enter test card: `4242 4242 4242 4242`
5. Expiry: `12/25`, CVC: `123`, ZIP: `12345`
6. Click "Pay Now"
7. ✅ Order should complete & email sent!

### Test PayPal:

1. Add items to cart
2. Go to checkout
3. Select **"PayPal"** payment method
4. PayPal buttons will appear
5. Click "PayPal" button
6. Log in with sandbox test account
7. Complete payment
8. ✅ Order should complete & email sent!

### Test Cash on Delivery:

1. Add items to cart
2. Go to checkout
3. Select **"Cash on Delivery"**
4. Click "Place Order"
5. ✅ Order should complete & email sent!

---

## 🎨 Payment UI Already Built!

Your app already has beautiful payment forms:

**Stripe Form** (`src/StripePaymentForm.jsx`):
- Card number field
- Expiry date field
- CVC field
- ZIP code field
- "Pay Now" button

**PayPal Buttons**:
- Official PayPal buttons
- Secure PayPal checkout
- Sandbox/Production modes

**Payment Selection UI**:
- Radio buttons for each method
- Clear descriptions
- Icons and styling

---

## 🔒 Security Notes

### What's Safe:
- ✅ Stripe **Publishable Key** (starts with `pk_`) - safe for frontend
- ✅ PayPal **Client ID** - safe for frontend
- ✅ These can be in your frontend code

### What's Secret:
- ❌ Stripe **Secret Key** (starts with `sk_`) - NEVER put in frontend!
- ❌ Gmail App Password - only in backend `.env`
- ❌ PayPal Secret - only needed for backend (not required for this setup)

---

## 📊 Payment Flow

```
User adds items to cart
       ↓
User goes to checkout
       ↓
User selects payment method:
  ├─→ Cash on Delivery → Order placed immediately
  ├─→ Credit/Debit Card → Stripe processes → Order placed
  └─→ PayPal → PayPal processes → Order placed
       ↓
Order saved to localStorage
       ↓
📧 Confirmation email sent
       ↓
Success message shown
```

---

## 🐛 Troubleshooting

### Stripe Not Working:

**Problem**: "Stripe has not been correctly initialized"
**Solution**: 
1. Check `VITE_STRIPE_PUBLISHABLE_KEY` in `.env`
2. Restart frontend (`npm run dev`)
3. Open browser console for errors

**Problem**: "Invalid API Key"
**Solution**:
1. Make sure you copied the **Publishable Key** (starts with `pk_test_`)
2. Check for extra spaces in `.env`

### PayPal Not Working:

**Problem**: PayPal buttons not showing
**Solution**:
1. Check `VITE_PAYPAL_CLIENT_ID` in `.env`
2. Restart frontend
3. Check browser console

**Problem**: "Client ID not provided"
**Solution**:
1. Generate Client ID from PayPal Developer Dashboard
2. Make sure it's in `.env` without quotes

### General Issues:

**Always restart the frontend** after changing `.env`:
```bash
# Ctrl+C to stop
npm run dev
```

---

## 💡 Quick Setup Summary

1. **Stripe**: Get publishable key → Add to `.env` → Test with `4242 4242 4242 4242`
2. **PayPal**: Get client ID → Add to `.env` → Test with sandbox account
3. **Restart**: `npm run dev`
4. **Test**: Place orders with each method!

---

## 🌐 Going Live (Production)

### When ready for real payments:

**Stripe**:
1. Activate your Stripe account (provide business details)
2. Switch from Test mode to Live mode in dashboard
3. Get **Live** publishable key (starts with `pk_live_`)
4. Update `.env` with live key

**PayPal**:
1. Switch app from Sandbox to Live in PayPal Dashboard
2. Get **Live** Client ID
3. Update `.env` with live client ID

**Important**: Always test in sandbox/test mode first!

---

## 📚 Additional Resources

- **Stripe Docs**: https://stripe.com/docs
- **Stripe Test Cards**: https://stripe.com/docs/testing
- **PayPal Developer**: https://developer.paypal.com/home
- **PayPal Sandbox**: https://developer.paypal.com/dashboard/accounts

---

## ✅ Checklist

- [ ] Create Stripe account
- [ ] Get Stripe publishable key
- [ ] Add `VITE_STRIPE_PUBLISHABLE_KEY` to `.env`
- [ ] Create PayPal developer account
- [ ] Create PayPal app
- [ ] Get PayPal client ID
- [ ] Add `VITE_PAYPAL_CLIENT_ID` to `.env`
- [ ] Restart frontend (`npm run dev`)
- [ ] Test Stripe payment with test card
- [ ] Test PayPal payment with sandbox account
- [ ] Test COD payment
- [ ] Verify all emails are sent

---

🎉 **You're all set!** Your restaurant app now supports 3 payment methods! Test each one and your customers will receive beautiful confirmation emails for every order.
