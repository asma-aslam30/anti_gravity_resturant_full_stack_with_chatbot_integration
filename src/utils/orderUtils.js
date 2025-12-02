/**
 * Order Management Utilities
 * Helper functions for order processing, tracking, and status management
 */

/**
 * Generates a unique order ID
 * Format: NB-YYYYMMDD-XXXX (e.g., NB-20231128-A1B2)
 * @returns {String} Unique Order ID
 */
export const generateOrderId = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NB-${dateStr}-${randomSuffix}`;
};

/**
 * Calculates estimated delivery time based on current time
 * Adds 30-45 minutes to current time
 * @returns {String} Formatted delivery time range
 */
export const calculateDeliveryTime = () => {
  const now = new Date();
  const minTime = new Date(now.getTime() + 30 * 60000); // +30 mins
  const maxTime = new Date(now.getTime() + 45 * 60000); // +45 mins
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return `${formatTime(minTime)} - ${formatTime(maxTime)}`;
};

/**
 * Formats currency amount
 * @param {Number} amount - Amount to format
 * @returns {String} Formatted currency string (e.g., "$25.00")
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

/**
 * Validates order details before submission
 * @param {Object} order - Order details
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateOrder = (order) => {
  const errors = {};
  
  if (!order.items || order.items.length === 0) {
    errors.items = 'Cart is empty';
  }
  
  if (!order.total || order.total <= 0) {
    errors.total = 'Invalid order total';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
