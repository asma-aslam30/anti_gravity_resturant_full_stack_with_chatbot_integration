/**
 * Local Storage Utilities for Order Management
 * Simulates a database using browser's local storage
 */

const ORDERS_STORAGE_KEY = 'neobite_orders';

/**
 * Save a new order to local storage
 * @param {Object} order - The order object to save
 */
export const saveOrder = (order) => {
  try {
    const existingOrders = getOrders();
    const newOrder = {
      ...order,
      status: 'Pending', // Default status
      createdAt: new Date().toISOString(),
      timestamp: Date.now()
    };
    
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    
    // Trigger a custom event so the dashboard updates immediately if open
    window.dispatchEvent(new Event('ordersUpdated'));
    
    return newOrder;
  } catch (error) {
    console.error('Error saving order:', error);
    return null;
  }
};

/**
 * Retrieve all orders from local storage
 * @returns {Array} Array of order objects
 */
export const getOrders = () => {
  try {
    const orders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

/**
 * Update the status of a specific order
 * @param {String} orderId - ID of the order to update
 * @param {String} newStatus - New status (Pending, Preparing, Delivered, Cancelled)
 */
export const updateOrderStatus = (orderId, newStatus) => {
  try {
    const orders = getOrders();
    const updatedOrders = orders.map(order => 
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );
    
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};

/**
 * Calculate dashboard statistics
 * @returns {Object} Stats object { totalRevenue, totalOrders, pendingOrders }
 */
export const getDashboardStats = () => {
  const orders = getOrders();
  
  const totalRevenue = orders.reduce((sum, order) => {
    // Parse currency string "$12.50" -> 12.50
    const amount = parseFloat(order.total.replace(/[^0-9.-]+/g, ""));
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return {
    totalRevenue,
    totalOrders: orders.length,
    pendingOrders
  };
};

/**
 * Delete an order from local storage
 * @param {String} orderId - ID of the order to delete
 */
export const deleteOrder = (orderId) => {
  try {
    const orders = getOrders();
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('ordersUpdated'));
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
};
