/**
 * Email Templates for NeoBite Restaurant
 * Contains HTML templates for various email notifications
 */

export const emailTemplates = {
  /**
   * Generates the order confirmation email template
   * @param {Object} order - The order details object
   * @returns {Object} - Template parameters for EmailJS
   */
  orderConfirmation: (order) => {
    return {
      to_name: order.customerName,
      to_email: order.customerEmail,
      order_id: order.orderId,
      order_date: order.date,
      order_total: order.total,
      payment_method: order.paymentMethod,
      delivery_address: `${order.address}, ${order.city} ${order.zipCode}`,
      phone: order.phone,
      order_items_html: generateItemsHtml(order.items),
      // Plain text fallback
      message_text: `Thank you for your order #${order.orderId}. Total: ${order.total}. We're preparing your delicious meal!`
    };
  },

  /**
   * Generates the table booking confirmation email template
   * @param {Object} booking - The booking details object
   * @returns {Object} - Template parameters for EmailJS
   */
  bookingConfirmation: (booking) => {
    return {
      to_name: booking.name,
      to_email: booking.email,
      booking_date: booking.date,
      booking_time: booking.time,
      num_guests: booking.guests,
      phone: booking.phone,
      special_requests: booking.requests || 'None',
      restaurant_address: '123 Culinary Avenue, Foodie City',
      restaurant_phone: '(555) 123-4567',
      message_text: `Your table for ${booking.guests} people is confirmed for ${booking.date} at ${booking.time}. We look forward to serving you!`
    };
  },

  /**
   * Generates the order delivery notification template
   * @param {Object} order - The order details object
   * @returns {Object} - Template parameters for EmailJS
   */
  orderDelivered: (order) => {
    return {
      to_name: order.customerName,
      to_email: order.customerEmail,
      order_id: order.orderId,
      delivery_time: new Date().toLocaleTimeString(),
      message_text: `Your order #${order.orderId} has been delivered! Enjoy your meal from NeoBite.`
    };
  }
};

/**
 * Helper to generate HTML list of items
 * @param {Array} items - Array of cart items
 * @returns {String} - HTML string for items table
 */
const generateItemsHtml = (items) => {
  const rows = items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center; color: #333;">×${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; color: #333; font-weight: 600;">${item.price}</td>
    </tr>
  `).join('');

  return `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: white;">
      <thead>
        <tr style="background: linear-gradient(135deg, #ff00ff, #00ffff); color: white;">
          <th style="padding: 12px; text-align: left;">Item</th>
          <th style="padding: 12px; text-align: center;">Qty</th>
          <th style="padding: 12px; text-align: right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};
