/**
 * Email Service for NeoBite Restaurant
 * Handles sending emails via EmailJS
 */

import emailjs from '@emailjs/browser';
import { emailTemplates } from './emailTemplates';

// Initialize EmailJS with public key from environment
const initializeEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  if (!publicKey) {
    console.warn('EmailJS public key not found in environment variables');
    return false;
  }
  
  emailjs.init(publicKey);
  return true;
};

/**
 * Send order confirmation email
 * @param {Object} orderData - Order details
 * @returns {Promise} - EmailJS response
 */
export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    // Check if EmailJS is configured
    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || 
        !import.meta.env.VITE_EMAILJS_TEMPLATE_ORDER ||
        !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Skipping email send.');
      return { success: false, message: 'Email service not configured' };
    }

    // Initialize EmailJS
    if (!initializeEmailJS()) {
      return { success: false, message: 'Failed to initialize email service' };
    }

    // Prepare email template data
    const templateParams = emailTemplates.orderConfirmation(orderData);

    // Send email
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ORDER,
      templateParams
    );

    console.log('✅ Order confirmation email sent successfully:', response);
    return { success: true, message: 'Order confirmation email sent', response };

  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    return { 
      success: false, 
      message: error.text || 'Failed to send email',
      error 
    };
  }
};

/**
 * Send booking confirmation email
 * @param {Object} bookingData - Booking details
 * @returns {Promise} - EmailJS response
 */
export const sendBookingConfirmationEmail = async (bookingData) => {
  try {
    // Check if EmailJS is configured
    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || 
        !import.meta.env.VITE_EMAILJS_TEMPLATE_BOOKING ||
        !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Skipping email send.');
      return { success: false, message: 'Email service not configured' };
    }

    // Initialize EmailJS
    if (!initializeEmailJS()) {
      return { success: false, message: 'Failed to initialize email service' };
    }

    // Prepare email template data
    const templateParams = emailTemplates.bookingConfirmation(bookingData);

    // Send email
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_BOOKING,
      templateParams
    );

    console.log('✅ Booking confirmation email sent successfully:', response);
    return { success: true, message: 'Booking confirmation email sent', response };

  } catch (error) {
    console.error('❌ Failed to send booking confirmation email:', error);
    return { 
      success: false, 
      message: error.text || 'Failed to send email',
      error 
    };
  }
};

/**
 * Check if email service is configured
 * @returns {boolean}
 */
export const isEmailServiceConfigured = () => {
  return !!(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY &&
    (import.meta.env.VITE_EMAILJS_TEMPLATE_ORDER || 
     import.meta.env.VITE_EMAILJS_TEMPLATE_BOOKING)
  );
};
