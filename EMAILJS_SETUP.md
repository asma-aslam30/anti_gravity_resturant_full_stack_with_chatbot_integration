# 📧 EmailJS Setup Guide

## Quick Setup (15 minutes)

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. Go to **Email Services** in dashboard
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended) or your preferred email provider
4. Follow the connection wizard
5. **Copy the Service ID** (e.g., `service_abcd1234`)

### Step 3: Create Email Templates

#### Template 1: Order Confirmation

1. Go to **Email Templates**
2. Click **"Create New Template"**
3. Template Name: `Order Confirmation`
4. **Copy this Template ID** (e.g., `template_xyz789`)

**Email Subject:**
```
NeoBite Order Confirmation - Order #{{order_id}}
```

**Email Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
  <div style="background: linear-gradient(135deg, #ff00ff, #00ffff); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">⚡ NeoBite Restaurant</h1>
  </div>
  
  <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #333;">Hello {{to_name}}! 👋</h2>
    <p style="font-size: 16px; color: #666;">Thank you for your order! We're preparing your delicious meal.</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #ff00ff; margin-top: 0;">Order Details</h3>
      <p><strong>Order ID:</strong> #{{order_id}}</p>
      <p><strong>Date:</strong> {{order_date}}</p>
      <p><strong>Total:</strong> {{order_total}}</p>
      <p><strong>Payment:</strong> {{payment_method}}</p>
    </div>
    
    <h3 style="color: #00ffff;">Your Items:</h3>
    {{{order_items_html}}}
    
    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>📍 Delivery Address:</strong></p>
      <p style="margin: 5px 0;">{{delivery_address}}</p>
      <p style="margin: 0;"><strong>📞 Phone:</strong> {{phone}}</p>
    </div>
    
    <p style="color: #666; font-size: 14px;">Questions? Contact us at (555) 123-4567</p>
    <p style="color: #999; font-size: 12px; margin-top: 30px;">© 2024 NeoBite Restaurant. All rights reserved.</p>
  </div>
</div>
```

5. Click **Save**

#### Template 2: Booking Confirmation

1. Click **"Create New Template"** again
2. Template Name: `Table Booking Confirmation`
3. **Copy this Template ID** (e.g., `template_abc456`)

**Email Subject:**
```
NeoBite Table Reservation Confirmed - {{booking_date}}
```

**Email Body:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
  <div style="background: linear-gradient(135deg, #ff00ff, #00ffff); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">⚡ NeoBite Restaurant</h1>
  </div>
  
  <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #333;">Hello {{to_name}}! 🎉</h2>
    <p style="font-size: 16px; color: #666;">Your table reservation is confirmed!</p>
    
    <div style="background: #e8f5e9; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00ffff;">
      <h3 style="color: #00ffff; margin-top: 0;">Reservation Details</h3>
      <p style="font-size: 18px;"><strong>📅 Date:</strong> {{booking_date}}</p>
      <p style="font-size: 18px;"><strong>🕐 Time:</strong> {{booking_time}}</p>
      <p style="font-size: 18px;"><strong>👥 Guests:</strong> {{num_guests}} people</p>
      <p><strong>📞 Contact:</strong> {{phone}}</p>
    </div>
    
    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>💬 Special Requests:</strong></p>
      <p style="margin: 5px 0;">{{special_requests}}</p>
    </div>
    
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0;"><strong>📍 Location:</strong></p>
      <p style="margin: 5px 0;">{{restaurant_address}}</p>
      <p style="margin: 0;"><strong>☎️ Restaurant Phone:</strong> {{restaurant_phone}}</p>
    </div>
    
    <p style="color: #666;">We look forward to serving you! Please arrive 5 minutes early.</p>
    <p style="color: #999; font-size: 12px; margin-top: 30px;">© 2024 NeoBite Restaurant. All rights reserved.</p>
  </div>
</div>
```

4. Click **Save**

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find **Public Key**
3. **Copy the Public Key** (e.g., `abcdefghij1234567`)

### Step 5: Configure Environment Variables

1. In your project, copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` and add your credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_abcd1234
   VITE_EMAILJS_TEMPLATE_ORDER=template_xyz789
   VITE_EMAILJS_TEMPLATE_BOOKING=template_abc456
   VITE_EMAILJS_PUBLIC_KEY=abcdefghij1234567
   ```

3. **Restart the dev server:**
   ```bash
   npm run dev
   ```

### Step 6: Test

1. **Test Order Email:**
   - Add items to cart
   - Complete checkout with your email
   - Check your inbox for confirmation

2. **Test Booking Email:**
   - Fill booking form
   - Submit reservation
   - Check your inbox for confirmation

## Troubleshooting

**Emails not sending?**
- Check browser console for errors
- Verify all IDs match exactly
- Ensure dev server was restarted
- Disable ad blockers
- Check EmailJS dashboard for quota

**Template variables not showing?**
- Make sure variable names match exactly: `{{to_name}}`, `{{order_id}}`, etc.
- For HTML content, use triple braces: `{{{order_items_html}}}`

## Email Limits

- **Free tier**: 200 emails/month
- **Upgrade**: $7/month for 1,000 emails

---

**Need help?** Check the EmailJS documentation or reach out!
