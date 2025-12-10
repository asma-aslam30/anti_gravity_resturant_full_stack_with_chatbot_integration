/**
 * Email Service for NeoBite Restaurant
 * Handles sending emails via Backend API (Gmail SMTP)
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Send order confirmation email
 * @param {Object} orderData - Order details
 * @returns {Promise} - API response
 */
export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    // Check if API URL is configured
    if (!API_URL) {
      console.warn('API URL not configured. Skipping email send.');
      return { success: false, message: 'Email service not configured' };
    }

    console.log('📧 Sending order confirmation email...');

    // Send POST request to backend API
    const response = await fetch(`${API_URL}/api/send-order-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderData }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    console.log('✅ Order confirmation email sent successfully:', data);
    return { success: true, message: 'Order confirmation email sent', data };

  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to send email',
      error 
    };
  }
};

/**
 * Send booking confirmation email
 * @param {Object} bookingData - Booking details
 * @returns {Promise} - API response
 */
export const sendBookingConfirmationEmail = async (bookingData) => {
  try {
    // Check if API URL is configured
    if (!API_URL) {
      console.warn('API URL not configured. Skipping email send.');
      return { success: false, message: 'Email service not configured' };
    }

    console.log('📧 Sending booking confirmation email...');

    // Send POST request to backend API
    const response = await fetch(`${API_URL}/api/send-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingData }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    console.log('✅ Booking confirmation email sent successfully:', data);
    return { success: true, message: 'Booking confirmation email sent', data };

  } catch (error) {
    console.error('❌ Failed to send booking confirmation email:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to send email',
      error 
    };
  }
};

/**
 * Check if email service is configured
 * @returns {boolean}
 */
export const isEmailServiceConfigured = () => {
  return !!API_URL;
};

/**
 * Test email service connection
 * @returns {Promise} - Health check response
 */
export const testEmailService = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('❌ Email service health check failed:', error);
    return { success: false, error: error.message };
  }
};
