# 🔑 WHERE TO ADD API KEYS - VISUAL GUIDE

## 📁 File Location: `d:\antigravity code\.env`

This file is already open in your editor! 👆

---

## 🎯 What To Do:

### Current State:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_PASTE_YOUR_KEY_HERE
VITE_PAYPAL_CLIENT_ID=PASTE_YOUR_CLIENT_ID_HERE
```

### After Getting Keys:
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51ABCDEfghij123456789
VITE_PAYPAL_CLIENT_ID=AZaBC123xyz456DEF789ghiJKL
```

---

## 💳 STRIPE - Get Publishable Key

### Step-by-Step:

1. **Open Browser** → Go to: https://stripe.com

2. **Sign Up** 
   - Click "Start now" or "Sign up"
   - Enter email, create password
   - Verify your email

3. **Go to API Keys**
   - After login → https://dashboard.stripe.com/test/apikeys
   - You'll see a page titled "API keys"

4. **Find "Publishable key"**
   - You'll see two sections:
     - ✅ **Publishable key** (safe for frontend)
     - ❌ Secret key (never use this in frontend!)
   
5. **Copy the Publishable Key**
   - Click "Reveal test key" if hidden
   - Copy the key (starts with `pk_test_`)
   - Example: `pk_test_51QR2sjP9876abc123def456...`

6. **Paste in `.env` File**
   - Open: `d:\antigravity code\.env`
   - Find line: `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_PASTE_YOUR_KEY_HERE`
   - Replace `pk_test_PASTE_YOUR_KEY_HERE` with your actual key
   - Save the file! ✅

### Visual Example:
```bash
# BEFORE:
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_PASTE_YOUR_KEY_HERE

# AFTER (with your real key):
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51QR2sjP9876abc123def456ghi789jkl
```

---

## 💰 PAYPAL - Get Client ID

### Step-by-Step:

1. **Open Browser** → Go to: https://developer.paypal.com

2. **Sign Up/Login**
   - Use your PayPal account (or create one)
   - Click "Log In" in top right

3. **Go to My Apps & Credentials**
   - After login → Click "Dashboard"
   - Click "My Apps & Credentials" in left menu
   - Make sure you're in **"Sandbox"** tab (not Live)

4. **Create an App**
   - Scroll down to "REST API apps"
   - Click "Create App" button
   - App Name: Enter "NeoBite Restaurant"
   - Click "Create App"

5. **Copy Client ID**
   - You'll see app details page
   - Under "Sandbox" section, you'll see:
     - **Client ID** ← This is what you need!
     - Secret (don't need this)
   - Copy the Client ID
   - Example: `AZaBC123xyz456DEF789ghiJKL012mnoPQR`

6. **Paste in `.env` File**
   - Open: `d:\antigravity code\.env`
   - Find line: `VITE_PAYPAL_CLIENT_ID=PASTE_YOUR_CLIENT_ID_HERE`
   - Replace `PASTE_YOUR_CLIENT_ID_HERE` with your actual Client ID
   - Save the file! ✅

### Visual Example:
```bash
# BEFORE:
VITE_PAYPAL_CLIENT_ID=PASTE_YOUR_CLIENT_ID_HERE

# AFTER (with your real Client ID):
VITE_PAYPAL_CLIENT_ID=AZaBC123xyz456DEF789ghiJKL012mnoPQR
```

---

## ✅ FINAL `.env` FILE SHOULD LOOK LIKE:

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
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51QR2sjP9876abc123def456ghi789jkl

# =============================================
# PayPal Configuration
# =============================================
VITE_PAYPAL_CLIENT_ID=AZaBC123xyz456DEF789ghiJKL012mnoPQR

# Note: Never commit this file to version control!
```

---

## 🔄 AFTER ADDING KEYS:

**You MUST restart the frontend** for the changes to take effect:

### In your terminal running `npm run dev`:
1. Press **Ctrl+C** to stop it
2. Run **`npm run dev`** again
3. Wait for it to start

You'll see:
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

## 🧪 HOW TO TEST:

### Test Stripe:
1. Go to http://localhost:5173
2. Add items to cart
3. Click "Checkout"
4. Select **"Credit/Debit Card"**
5. Enter test card: `4242 4242 4242 4242`
6. Expiry: `12/25`
7. CVC: `123`
8. ZIP: `12345`
9. Click "Pay Now"
10. ✅ Check your email!

### Test PayPal:
1. Add items to cart
2. Click "Checkout"
3. Select **"PayPal"**
4. Click PayPal button
5. Use sandbox test account to login
6. Complete payment
7. ✅ Check your email!

---

## 📞 GET SANDBOX TEST ACCOUNTS (PayPal):

After creating your PayPal app:
1. Go to: https://developer.paypal.com/dashboard/accounts
2. You'll see test accounts (Personal & Business)
3. Click on "Personal" account
4. Click "View/Edit Account"
5. You'll see email and password
6. Use these to test PayPal checkout!

---

## ⚠️ IMPORTANT NOTES:

### ✅ DO:
- Use **Publishable Key** for Stripe (starts with `pk_test_`)
- Use **Sandbox Client ID** for PayPal
- Save the `.env` file after pasting keys
- Restart frontend after changes

### ❌ DON'T:
- Don't use Stripe **Secret Key** (starts with `sk_test_`)
- Don't add quotes around the keys
- Don't add spaces
- Don't commit `.env` to Git

---

## 🎯 QUICK LINKS:

- **Stripe Dashboard**: https://dashboard.stripe.com/test/apikeys
- **PayPal Dashboard**: https://developer.paypal.com/dashboard
- **PayPal Test Accounts**: https://developer.paypal.com/dashboard/accounts
- **Stripe Test Cards**: https://stripe.com/docs/testing#cards

---

## 📸 VISUAL CHECKLIST:

```
[✅] Stripe account created
[✅] Stripe publishable key copied
[✅] Stripe key pasted in .env file
[✅] PayPal developer account created
[✅] PayPal app created
[✅] PayPal client ID copied
[✅] PayPal client ID pasted in .env file
[✅] .env file saved
[✅] Frontend restarted
[✅] Tested Stripe payment
[✅] Tested PayPal payment
[✅] Received email confirmations
```

---

## 🎉 YOU'RE DONE!

Once you add both keys and restart the frontend, your restaurant app will support:

💵 Cash on Delivery
💳 Credit/Debit Cards (Visa, Mastercard, Amex, etc.)
💰 PayPal

All with email confirmations! 📧

---

**Need help?** The `.env` file is already updated with placeholders and instructions. Just follow the steps above to get your keys! 🚀
