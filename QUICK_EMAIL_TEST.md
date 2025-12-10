# 🚀 QUICK EMAIL TEST

## ✅ What I Just Fixed:

1. **Removed quotes** from your Gmail credentials in `.env`
   - Was: `GMAIL_USER="aslamasma486@gmail.com"`
   - Now: `GMAIL_USER=aslamasma486@gmail.com`

2. **Removed spaces** from app password
   - Was: `btaw dgjo dsjq wpmh`  
   - Now: `btawdgjodsjqwpmh`

3. **Fixed server.js** to properly handle order/booking data
   - Parses string prices like "$12.99"
   - Normalizes field names (customerEmail vs email)
   - Better logging for debugging

## 🔄 RESTART THE BACKEND SERVER

**IMPORTANT:** You MUST restart the backend server for the `.env` changes to take effect!

### Stop the current server:
Press `Ctrl+C` in the terminal running `npm run server`

### Start it again:
```bash
npm run server  
```

You should see:
```
✅ Email server running on http://localhost:3001
📧 Gmail SMTP configured: Yes
```

## 📧 Testing Steps:

### Test 1: Health Check
Open browser: `http://localhost:3001/api/health`

Should show:
```json
{
  "status": "ok",
  "message": "Email server is running"  
}
```

### Test 2: Place an Order
1. Go to your restaurant app (http://localhost:5173)
2. Add items to cart
3. Checkout with **your email**: `aslamasma486@gmail.com`
4. Choose **Cash on Delivery**
5. Complete the order

### Test 3: Make a Booking
1. Scroll to "Book Table" section
2. Fill form with **your email**: `aslamasma486@gmail.com`
3. Click submit

## 📬 Check Your Email

After completing test 2 or 3, check your inbox:
**aslamasma486@gmail.com**

You should receive beautiful HTML emails! 🎉

## 🐛 Still Not Working?

Watch the backend terminal for logs:
- `📧 Received order email request...`
- `📦 Order details: ...`
- `✅ Gmail credentials configured`
- `📧 Sending email to: ...`
- `✅ Order email sent! Message ID: ...`

If you see errors, share them with me!

## 💡 Pro Tip

Test the email system directly:
```bash
node test-email.js
```

This will send a test email to yourself!
