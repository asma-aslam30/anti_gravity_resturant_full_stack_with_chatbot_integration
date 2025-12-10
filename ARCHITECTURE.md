# 🏗️ Email Architecture: Before vs After

## Before (EmailJS)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Frontend (React)                               │
│  ┌────────────────────────────────────────┐    │
│  │  emailService.js                        │    │
│  │  • Uses @emailjs/browser                │    │
│  │  • Sends directly to EmailJS API        │────┼──→ EmailJS Service
│  │  • Requires EmailJS account            │    │      ↓
│  └────────────────────────────────────────┘    │   Sends Email
│                                                 │
└─────────────────────────────────────────────────┘
```

**Limitations:**
- ❌ Tied to EmailJS service
- ❌ Monthly limits on free plan
- ❌ Limited email customization
- ❌ No control over email infrastructure

---

## After (Gmail SMTP)

```
┌─────────────────────────────────────────────────┐
│  Frontend (React) - Port 5173                   │
│  ┌────────────────────────────────────────┐    │
│  │  emailService.js                        │    │
│  │  • Calls backend API                    │    │
│  │  • fetch() to /api/send-order-email     │    │
│  │  • fetch() to /api/send-booking-email   │    │
│  └────────────────────────────────────────┘    │
└───────────────────┬─────────────────────────────┘
                    │ HTTP POST
                    ↓
┌─────────────────────────────────────────────────┐
│  Backend (Node.js/Express) - Port 3001          │
│  ┌────────────────────────────────────────┐    │
│  │  server.js                              │    │
│  │  • Express API endpoints                │    │
│  │  • POST /api/send-order-email           │    │
│  │  • POST /api/send-booking-email         │    │
│  │  • Nodemailer with Gmail SMTP           │────┼──→ Gmail SMTP
│  └────────────────────────────────────────┘    │    (smtp.gmail.com:587)
│                                                 │      ↓
│  Environment Variables:                         │   Your Gmail Account
│  • GMAIL_USER                                   │      ↓
│  • GMAIL_APP_PASSWORD                           │   Sends Email
│  • PORT=3001                                    │
└─────────────────────────────────────────────────┘
```

**Benefits:**
- ✅ Uses your own Gmail account
- ✅ 500 emails/day free (Gmail)
- ✅ Full HTML email customization
- ✅ Complete control over templates
- ✅ No external service fees
- ✅ Professional email branding

---

## Email Flow

### Order Confirmation Email Flow

```
User Places Order
       ↓
Frontend: Cart.jsx
       ↓
Calls: sendOrderConfirmationEmail(orderData)
       ↓
emailService.js → fetch POST to /api/send-order-email
       ↓
Backend: server.js receives request
       ↓
Creates HTML email template with:
  • Order details
  • Items list
  • Total price
  • Customer info
       ↓
Nodemailer sends via Gmail SMTP
       ↓
Email delivered to customer inbox ✅
```

### Booking Confirmation Email Flow

```
User Submits Booking
       ↓
Frontend: Booking Component
       ↓
Calls: sendBookingConfirmationEmail(bookingData)
       ↓
emailService.js → fetch POST to /api/send-booking-email
       ↓
Backend: server.js receives request
       ↓
Creates HTML email template with:
  • Reservation details
  • Date/Time
  • Number of guests
  • Special requests
       ↓
Nodemailer sends via Gmail SMTP
       ↓
Email delivered to customer inbox ✅
```

---

## File Structure

```
d:\antigravity code\
│
├── 📄 server.js                    [NEW] Backend email server
├── 📄 .env                         [UPDATED] Gmail SMTP config
├── 📄 .env.example                 [UPDATED] Template
├── 📄 package.json                 [UPDATED] Added dependencies
│
├── 📁 src/
│   ├── 📄 emailService.js          [UPDATED] Now calls backend API
│   └── ... (other frontend files)
│
└── 📁 Documentation/
    ├── 📄 GMAIL_SMTP_SETUP.md      [NEW] Full setup guide
    ├── 📄 QUICKSTART_GMAIL.md      [NEW] Quick start
    └── 📄 ARCHITECTURE.md          [NEW] This file
```

---

## Running the Application

### Development (Two Terminals Required)

**Terminal 1: Backend Server**
```bash
npm run server
```
Output: `✅ Email server running on http://localhost:3001`

**Terminal 2: Frontend**
```bash
npm run dev
```
Output: `Local: http://localhost:5173/`

### Production Deployment

1. **Frontend**: Deploy to Vercel, Netlify, etc.
2. **Backend**: Deploy to Heroku, Railway, AWS EC2, etc.
3. **Update `.env`**:
   ```bash
   VITE_API_URL=https://your-backend-domain.com
   ```

---

## API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "message": "Email server is running"
}
```

### Send Order Email
```
POST /api/send-order-email
Content-Type: application/json

{
  "orderData": {
    "email": "customer@example.com",
    "customerName": "John Doe",
    "orderNumber": "ORD-12345",
    "items": [...],
    "total": 45.50,
    "phone": "555-1234",
    "address": "123 Main St"
  }
}
```

### Send Booking Email
```
POST /api/send-booking-email
Content-Type: application/json

{
  "bookingData": {
    "name": "John Doe",
    "email": "customer@example.com",
    "phone": "555-1234",
    "date": "2025-12-15",
    "time": "19:00",
    "guests": 4,
    "specialRequests": "Window seat preferred"
  }
}
```

---

## Security Considerations

### ✅ Good Practices
- Environment variables for sensitive data
- `.env` in `.gitignore`
- App passwords instead of real passwords
- CORS enabled only for your domain
- HTTPS in production

### ❌ Never Do This
- Commit `.env` to Git
- Use real Gmail password
- Expose credentials in frontend
- Allow public API access without rate limiting

---

## Scalability

| Volume | Solution |
|--------|----------|
| < 500/day | Gmail SMTP (Current setup) ✅ |
| 500-10K/day | Google Workspace or SendGrid |
| 10K-100K/day | AWS SES or Mailgun |
| > 100K/day | Dedicated email infrastructure |

---

## Next Steps

1. ✅ Install dependencies (`npm install`)
2. ⏳ Configure Gmail App Password
3. ⏳ Update `.env` file
4. ⏳ Start backend server
5. ⏳ Start frontend
6. ⏳ Test email sending
7. ⏳ Deploy to production

---

**Happy emailing! 📧**
