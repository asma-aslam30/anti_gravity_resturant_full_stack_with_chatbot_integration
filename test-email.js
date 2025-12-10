/**
 * Test script to verify Gmail SMTP configuration
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('\n🔍 Testing Gmail SMTP Configuration...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('---------------------');
console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '****' + process.env.GMAIL_APP_PASSWORD.slice(-4) : 'NOT SET');
console.log('');

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.error('❌ ERROR: Gmail credentials not configured!');
  console.error('Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env file');
  process.exit(1);
}

// Create transporter
console.log('📧 Creating email transporter...');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify connection
console.log('🔗 Verifying SMTP connection...');
transporter.verify(function (error, success) {
  if (error) {
    console.error('\n❌ SMTP Verification FAILED!');
    console.error('Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Check your Gmail App Password is correct (16 characters, no spaces)');
    console.error('2. Make sure 2-Factor Authentication is enabled on your Gmail');
    console.error('3. Verify the app password was generated correctly');
    console.error('4. Check your internet connection');
    process.exit(1);
  } else {
    console.log('✅ SMTP Connection Verified Successfully!');
    console.log('\n📨 Sending test email...');

    // Send test email
    const mailOptions = {
      from: `"NeoBite Restaurant Test" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Send to yourself for testing
      subject: '✅ Gmail SMTP Test - NeoBite Restaurant',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🍽️ NeoBite Restaurant</h1>
                <h2>Gmail SMTP Test Email</h2>
              </div>
              <div class="content">
                <div class="success">
                  <h3>✅ Success!</h3>
                  <p>Your Gmail SMTP configuration is working correctly!</p>
                </div>
                <p><strong>Test Details:</strong></p>
                <ul>
                  <li>Gmail Account: ${process.env.GMAIL_USER}</li>
                  <li>SMTP Server: smtp.gmail.com</li>
                  <li>Port: 587</li>
                  <li>Test Time: ${new Date().toLocaleString()}</li>
                </ul>
                <p>You can now send order and booking confirmation emails to your customers! 🚀</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('\n❌ Test Email FAILED!');
        console.error('Error:', error.message);
        process.exit(1);
      } else {
        console.log('\n✅ Test Email Sent Successfully!');
        console.log('Message ID:', info.messageId);
        console.log('\n📬 Check your inbox:', process.env.GMAIL_USER);
        console.log('\n🎉 Gmail SMTP is working perfectly!');
        console.log('You can now receive order and booking confirmation emails.');
        process.exit(0);
      }
    });
  }
});
