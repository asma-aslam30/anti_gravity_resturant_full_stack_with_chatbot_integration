/**
 * Express Backend Server for NeoBite Restaurant
 * Handles email sending via Gmail SMTP using Nodemailer
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.js';
import menuRoutes from './src/routes/menu.js';
import orderRoutes from './src/routes/orders.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Make io available in routes
app.set('io', io);

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Create nodemailer transporter with Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Send order confirmation email
app.post('/api/send-order-email', async (req, res) => {
  try {
    console.log('\n📧 Received order email request...');
    const { orderData } = req.body;

    if (!orderData) {
      console.error('❌ No order data provided');
      return res.status(400).json({ 
        success: false, 
        message: 'Order data is required' 
      });
    }

    console.log('📦 Order details:', {
      email: orderData.email || orderData.customerEmail,
      orderId: orderData.orderId || orderData.orderNumber,
      total: orderData.total
    });

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ Gmail credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured on server',
      });
    }

    console.log('✅ Gmail credentials configured');
    
    // Normalize order data
    const email = orderData.email || orderData.customerEmail;
    const customerName = orderData.name || orderData.customerName || 'Valued Customer';
    const orderNumber = orderData.orderNumber || orderData.orderId || 'N/A';
    const phone = orderData.phone || 'N/A';
    const address = orderData.address || '';
    
    // Parse total - handle both string "$12.99" and number formats
    let totalAmount = 0;
    if (typeof orderData.total === 'string') {
      const cleanedString = orderData.total.replace(/[$,]/g, '');
      totalAmount = parseFloat(cleanedString) || 0;
    } else if (typeof orderData.total === 'number') {
      totalAmount = orderData.total;
    }
    
    console.log('📧 Sending email to:', email);
    console.log('💰 Total amount:', totalAmount);

    const transporter = createTransporter();

    // Format order items
    const orderItemsHTML = orderData.items
      .map((item) => {
        let itemPrice;
        if (typeof item.price === 'string') {
          itemPrice = parseFloat(item.price.replace('$', '').replace(',', ''));
        } else {
          itemPrice = item.price;
        }
        const lineTotal = itemPrice * item.quantity;
        
        return `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${lineTotal.toFixed(2)}</td>
        </tr>`;
      })
      .join('');

    // Email HTML template
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; }
    .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    table { width: 100%; border-collapse: collapse; }
    .total { font-size: 20px; font-weight: bold; color: #667eea; text-align: right; padding: 15px 0; }
   .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍽️ NeoBite Restaurant</h1>
      <h2>Order Confirmation</h2>
    </div>
    <div class="content">
      <p>Dear ${customerName},</p>
      <p>Thank you for your order! We're excited to prepare your delicious meal.</p>
      <div class="order-details">
        <h3>Order Details</h3>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${address ? `<p><strong>Delivery Address:</strong> ${address}</p>` : ''}
        <h3 style="margin-top: 20px;">Items Ordered:</h3>
        <table>
          <thead>
            <tr style="background: #f0f0f0;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: center;">Quantity</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>${orderItemsHTML}</tbody>
        </table>
        <div class="total">Total: $${totalAmount.toFixed(2)}</div>
      </div>
      <p>Your order will be ready soon. We'll notify you when it's on the way!</p>
      <p>If you have any questions, feel free to contact us.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} NeoBite Restaurant. All rights reserved.</p>
      <p>📧 Email: ${process.env.GMAIL_USER} | 📞 Phone: (555) 123-4567</p>
    </div>
  </div>
</body>
</html>`;

    const mailOptions = {
      from: `"NeoBite Restaurant" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Order Confirmation - Order #${orderNumber}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Order email sent! Message ID:', info.messageId);
    
    res.json({
      success: true,
      message: 'Order confirmation email sent successfully',
      messageId: info.messageId,
    });

  } catch (error) {
    console.error('❌ Error sending order email:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send order confirmation email',
      error: error.message,
    });
  }
});

// Send booking confirmation email
app.post('/api/send-booking-email', async (req, res) => {
  try {
    console.log('\n📧 Received booking email request...');
    const { bookingData } = req.body;

    if (!bookingData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Booking data is required' 
      });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ Gmail credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured on server',
      });
    }

    console.log('📧 Sending booking email to:', bookingData.email);
    const transporter = createTransporter();

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; }
    .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; color: #667eea; }
    .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🍽️ NeoBite Restaurant</h1>
      <h2>Table Booking Confirmation</h2>
    </div>
    <div class="content">
      <p>Dear ${bookingData.name || 'Valued Customer'},</p>
      <p>Your table reservation has been confirmed! We look forward to serving you.</p>
      <div class="booking-details">
        <h3>Reservation Details</h3>
        <div class="detail-row"><span class="detail-label">Name:</span> ${bookingData.name}</div>
        <div class="detail-row"><span class="detail-label">Email:</span> ${bookingData.email}</div>
        <div class="detail-row"><span class="detail-label">Phone:</span> ${bookingData.phone}</div>
        <div class="detail-row"><span class="detail-label">Date:</span> ${bookingData.date}</div>
        <div class="detail-row"><span class="detail-label">Time:</span> ${bookingData.time}</div>
        <div class="detail-row"><span class="detail-label">Guests:</span> ${bookingData.guests}</div>
        ${bookingData.specialRequests ? `<div class="detail-row"><span class="detail-label">Special Requests:</span> ${bookingData.specialRequests}</div>` : ''}
      </div>
      <p><strong>Important:</strong> Please arrive 10 minutes before your reservation time.</p>
      <p>If you need to modify or cancel your reservation, please contact us at least 24 hours in advance.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} NeoBite Restaurant. All rights reserved.</p>
      <p>📧 Email: ${process.env.GMAIL_USER} | 📞 Phone: (555) 123-4567</p>
    </div>
  </div>
</body>
</html>`;

    const mailOptions = {
      from: `"NeoBite Restaurant" <${process.env.GMAIL_USER}>`,
      to: bookingData.email,
      subject: `Table Reservation Confirmed - ${bookingData.date} at ${bookingData.time}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking email sent! Message ID:', info.messageId);
    
    res.json({
      success: true,
      message: 'Booking confirmation email sent successfully',
      messageId: info.messageId,
    });

  } catch (error) {
    console.error('❌ Error sending booking email:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send booking confirmation email',
      error: error.message,
    });
  }
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Gmail SMTP configured: ${process.env.GMAIL_USER ? 'Yes' : 'No'}`);
});
