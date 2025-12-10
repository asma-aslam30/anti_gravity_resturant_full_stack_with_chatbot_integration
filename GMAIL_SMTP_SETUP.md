# 📧 Gmail SMTP Setup Guide for NeoBite Restaurant

This guide will help you configure Gmail SMTP for sending emails from your restaurant application.

## 🔐 Prerequisites

1. **Gmail Account**: You need a Gmail account
2. **2-Factor Authentication**: Must be enabled on your Gmail account
3. **App Password**: Required for secure SMTP access

---

## 📝 Step-by-Step Setup

### Step 1: Enable 2-Factor Authentication

1. Go to your [Google Account Security Settings](https://myaccount.google.com/security)
2. Under "Signing in to Google", click on **2-Step Verification**
3. Follow the prompts to enable 2-Factor Authentication
4. Verify your phone number and complete the setup

### Step 2: Generate App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - If you don't see this option, make sure 2-Factor Authentication is enabled
2. You may need to sign in again
3. In the "Select app" dropdown, choose **Mail**
4. In the "Select device" dropdown, choose **Other (Custom name)**
5. Enter a name like "NeoBite Restaurant App"
6. Click **Generate**
7. **Important**: Copy the 16-character password (it looks like: `xxxx xxxx xxxx xxxx`)
   - You won't be able to see this password again
   - Remove spaces when pasting into .env file

### Step 3: Configure Environment Variables

1. Open the `.env` file in your project root
2. Update the following variables:

```bash
# Replace with your actual Gmail address
GMAIL_USER=your-email@gmail.com

# Replace with the 16-character app password (no spaces)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Backend server port (default is 3001)
PORT=3001

# Frontend API URL (default for local development)
VITE_API_URL=http://localhost:3001
```

3. Save the file

### Step 4: Install Dependencies

Run the following command to install the required backend packages:

```bash
npm install
```

This will install:
- **express**: Web server framework
- **nodemailer**: Email sending library
- **cors**: Cross-Origin Resource Sharing support
- **dotenv**: Environment variable management

### Step 5: Start the Backend Server

Open a **new terminal** and run:

```bash
npm run server
```

You should see:
```
✅ Email server running on http://localhost:3001
📧 Gmail SMTP configured: Yes
```

### Step 6: Start the Frontend

In a **separate terminal**, run:

```bash
npm run dev
```

---

## 🧪 Testing Email Functionality

### Test 1: Health Check

Open your browser and go to:
```
http://localhost:3001/api/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Email server is running"
}
```

### Test 2: Send Test Order Email

1. Go to your restaurant app
2. Add items to cart
3. Complete an order with your email address
4. Check your inbox for the order confirmation email

### Test 3: Send Test Booking Email

1. Go to the booking section
2. Fill out the booking form with your email
3. Submit the booking
4. Check your inbox for the booking confirmation email

---

## 🔧 Troubleshooting

### Issue: "Gmail credentials not configured"

**Solution**: 
- Make sure your `.env` file has `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- Restart the backend server after updating `.env`

### Issue: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution**:
- Double-check your Gmail address
- Make sure you're using the **App Password**, not your regular Gmail password
- Ensure there are no spaces in the app password
- Regenerate a new app password if needed

### Issue: "Connection timeout"

**Solution**:
- Check your internet connection
- Verify that your firewall isn't blocking port 587
- Some networks block SMTP ports - try a different network

### Issue: "CORS error in browser console"

**Solution**:
- Make sure the backend server is running on port 3001
- Verify `VITE_API_URL` in `.env` matches the backend URL
- Restart both frontend and backend servers

### Issue: "Emails not being received"

**Solution**:
- Check your spam/junk folder
- Verify the recipient email address is correct
- Check the backend server console for error messages
- Test with a different email address

---

## 🚀 Production Deployment

When deploying to production:

### 1. Update Environment Variables

```bash
# Production backend URL (replace with your actual domain)
VITE_API_URL=https://api.yourrestaurant.com

# Same Gmail credentials
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Production port (or use default 3001)
PORT=3001
```

### 2. Security Considerations

- **Never commit `.env` file** to version control
- Use environment variables in your hosting platform (Heroku, Vercel, AWS, etc.)
- Consider using Gmail's daily sending limit:
  - Free Gmail: 500 emails/day
  - Google Workspace: 2,000 emails/day
- For high volume, consider professional email services (SendGrid, AWS SES, etc.)

### 3. HTTPS Required

- Use HTTPS for your frontend and backend in production
- Update CORS settings in `server.js` to allow only your production domain

---

## 📚 Additional Resources

- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [Google App Passwords](https://support.google.com/accounts/answer/185833)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail Sending Limits](https://support.google.com/a/answer/166852)

---

## 🆘 Need Help?

If you encounter issues:

1. Check the backend server console for error messages
2. Check the browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure both frontend and backend servers are running
5. Review the troubleshooting section above

---

## ✅ Quick Checklist

- [ ] 2-Factor Authentication enabled on Gmail
- [ ] App Password generated
- [ ] `.env` file configured with `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- [ ] Dependencies installed (`npm install`)
- [ ] Backend server running (`npm run server`)
- [ ] Frontend running (`npm run dev`)
- [ ] Health check successful (`http://localhost:3001/api/health`)
- [ ] Test email sent and received

---

**🎉 You're all set!** Your restaurant app is now configured to send beautiful confirmation emails via Gmail SMTP.
