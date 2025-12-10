# 📧 Quick Start: Gmail SMTP Configuration

## ⚡ Quick Setup (3 Minutes)

### 1️⃣ Get Gmail App Password

1. Go to → https://myaccount.google.com/apppasswords
2. Enable 2-Factor Authentication if not already enabled
3. Create app password for **Mail** → **Other (Custom name)**
4. Name it: "NeoBite Restaurant"
5. **Copy the 16-character password** (remove spaces)

### 2️⃣ Configure `.env` File

Open `d:\antigravity code\.env` and update:

```bash
GMAIL_USER=your-actual-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop  # Your 16-char password (no spaces)
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Start Backend Server

**Terminal 1:**
```bash
npm run server
```

Should see: `✅ Email server running on http://localhost:3001`

### 5️⃣ Start Frontend

**Terminal 2:**
```bash
npm run dev
```

---

## ✅ Test It Works

### Health Check
Open browser: http://localhost:3001/api/health

Should return:
```json
{"status": "ok", "message": "Email server is running"}
```

### Send Test Email
1. Place an order or make a booking in your app
2. Check your email inbox
3. Should receive a beautiful confirmation email! 📨

---

## 🎯 What Changed?

### Before (EmailJS)
- ❌ Client-side only
- ❌ Limited customization
- ❌ Third-party dependency

### After (Gmail SMTP)
- ✅ Your own Gmail account
- ✅ Full email customization
- ✅ Professional HTML templates
- ✅ No external service fees
- ✅ Complete control

---

## 📁 Files Modified

1. **`server.js`** - New backend server with Gmail SMTP
2. **`src/emailService.js`** - Updated to call backend API
3. **`package.json`** - Added backend dependencies
4. **`.env`** - New Gmail configuration
5. **`.env.example`** - Updated template

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid login" | Use **App Password**, not your regular Gmail password |
| "CORS error" | Make sure backend is running on port 3001 |
| "Connection timeout" | Check firewall/network settings |
| No emails received | Check spam folder, verify email address |

---

## 📚 Full Documentation

For detailed setup, troubleshooting, and production deployment:
→ See `GMAIL_SMTP_SETUP.md`

---

## 🚀 Production Notes

- Gmail free limit: **500 emails/day**
- For higher volume, consider: SendGrid, AWS SES, Mailgun
- Always use HTTPS in production
- Store credentials securely (environment variables)

---

**Need more help?** Check `GMAIL_SMTP_SETUP.md` for complete documentation.
