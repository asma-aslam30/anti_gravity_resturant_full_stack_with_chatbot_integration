import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Clock, CheckCircle, RefreshCw, Eye, Trash2, Printer, X } from 'lucide-react';
import { getOrders, updateOrderStatus, getDashboardStats, deleteOrder } from '../utils/storageUtils';
import './Admin.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, pendingOrders: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadData = () => {
    setLoading(true);
    const data = getOrders();
    const dashboardStats = getDashboardStats();
    setOrders(data);
    setStats(dashboardStats);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('ordersUpdated', loadData);
    return () => window.removeEventListener('ordersUpdated', loadData);
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadData();
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(orderId);
      loadData();
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="action-btn" onClick={loadData}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p>{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>Pending Orders</h3>
            <p>{stats.pendingOrders}</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-section">
        <h2>Recent Orders</h2>
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="order-id">{order.orderId}</td>
                    <td>
                      <div>{order.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{order.customerEmail}</div>
                    </td>
                    <td>
                      {order.items.length} items
                    </td>
                    <td>{order.total}</td>
                    <td>{new Date(order.timestamp).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="action-btn btn-view"
                          onClick={() => setSelectedOrder(order)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {order.status === 'Pending' && (
                          <button 
                            className="action-btn"
                            onClick={() => handleStatusUpdate(order.orderId, 'Preparing')}
                            title="Start Preparing"
                          >
                            <Clock size={16} />
                          </button>
                        )}
                        {order.status === 'Preparing' && (
                          <button 
                            className="action-btn"
                            onClick={() => handleStatusUpdate(order.orderId, 'Delivered')}
                            title="Mark Delivered"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        
                        <button 
                          className="action-btn btn-delete"
                          onClick={() => handleDelete(order.orderId)}
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order #{selectedOrder.orderId}</h2>
              <button className="close-modal" onClick={() => setSelectedOrder(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="order-details-grid">
                <div className="detail-section">
                  <h3>Customer Information</h3>
                  <div className="detail-row">
                    <span>Name:</span>
                    <strong>{selectedOrder.customerName}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Email:</span>
                    <strong>{selectedOrder.customerEmail}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Address:</span>
                    <strong>{selectedOrder.address}</strong>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Order Items</h3>
                  <div className="item-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <span>{item.quantity}x {item.name}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                    <div className="total-row">
                      <span>Total</span>
                      <span>{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Payment & Status</h3>
                  <div className="detail-row">
                    <span>Method:</span>
                    <strong>{selectedOrder.paymentMethod}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Status:</span>
                    <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Date:</span>
                    <strong>{new Date(selectedOrder.timestamp).toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="action-btn" onClick={handlePrint}>
                <Printer size={16} /> Print Invoice
              </button>
              {selectedOrder.status === 'Pending' && (
                <button 
                  className="action-btn" 
                  style={{ background: 'var(--primary)', color: 'white' }}
                  onClick={() => handleStatusUpdate(selectedOrder.orderId, 'Preparing')}
                >
                  Start Preparing
                </button>
              )}
              {selectedOrder.status === 'Preparing' && (
                <button 
                  className="action-btn" 
                  style={{ background: '#00ff00', color: 'black' }}
                  onClick={() => handleStatusUpdate(selectedOrder.orderId, 'Delivered')}
                >
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
