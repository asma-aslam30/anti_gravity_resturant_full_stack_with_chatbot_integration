import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Clock, CheckCircle, RefreshCw, Eye, Trash2, Printer, X, Menu as MenuIcon, Plus, Edit } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'menu'
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, pendingOrders: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // For menu edit modal
  const [isAddingItem, setIsAddingItem] = useState(false); // For menu add modal

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const token = localStorage.getItem('token');

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch Orders
      const ordersRes = await fetch(`${apiUrl}/api/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
        
        // Calculate stats
        const totalRev = ordersData.reduce((sum, order) => {
           // Parse total string "$12.99" -> 12.99
           const val = parseFloat(order.total.replace(/[^0-9.-]+/g,""));
           return sum + (isNaN(val) ? 0 : val);
        }, 0);
        
        setStats({
          totalRevenue: totalRev,
          totalOrders: ordersData.length,
          pendingOrders: ordersData.filter(o => o.status === 'Pending').length
        });
      }

      // Fetch Menu
      const menuRes = await fetch(`${apiUrl}/api/menu`);
      if (menuRes.ok) {
        setMenuItems(await menuRes.json());
      }

    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Connect to Socket.io
    import('socket.io-client').then(({ io }) => {
      const socket = io(apiUrl);
      
      socket.on('connect', () => {
        console.log('Connected to socket server');
      });

      socket.on('newOrder', (newOrder) => {
        console.log('New order received:', newOrder);
        // Play notification sound if desired
        // const audio = new Audio('/notification.mp3');
        // audio.play().catch(e => console.log('Audio play failed', e));
        
        setOrders(prevOrders => [newOrder, ...prevOrders]);
        setStats(prevStats => ({
          ...prevStats,
          totalOrders: prevStats.totalOrders + 1,
          pendingOrders: prevStats.pendingOrders + 1,
          totalRevenue: prevStats.totalRevenue + parseFloat(newOrder.total.replace(/[^0-9.-]+/g,"") || 0)
        }));
      });

      return () => {
        socket.disconnect();
      };
    });

    // Fallback polling every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await fetch(`${apiUrl}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      loadData();
      if (selectedOrder && selectedOrder.orderId === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await fetch(`${apiUrl}/api/orders/${orderId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        loadData();
        setSelectedOrder(null);
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleDeleteMenu = async (id) => {
    if (window.confirm('Delete this menu item?')) {
      try {
        await fetch(`${apiUrl}/api/menu/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        loadData();
      } catch (error) {
        console.error('Error deleting menu item:', error);
      }
    }
  };

  const handleSaveMenu = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const itemData = Object.fromEntries(formData.entries());
    
    // Convert comma-separated strings to arrays
    itemData.ingredients = itemData.ingredients.split(',').map(i => i.trim());
    itemData.allergens = itemData.allergens.split(',').map(i => i.trim());
    
    try {
      const url = editingItem ? `${apiUrl}/api/menu/${editingItem.id}` : `${apiUrl}/api/menu`;
      const method = editingItem ? 'PUT' : 'POST';
      
      // For new items, generate a random ID if not provided (backend schema requires unique ID)
      if (!editingItem) {
        itemData.id = Math.floor(Math.random() * 10000);
      }

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });
      
      setEditingItem(null);
      setIsAddingItem(false);
      loadData();
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
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
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={18} /> Orders
            </button>
            <button 
              className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              <MenuIcon size={18} /> Menu
            </button>
          </div>
        </div>
        <button className="action-btn" onClick={loadData}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {activeTab === 'orders' ? (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><DollarSign size={24} /></div>
              <div className="stat-info">
                <h3>Total Revenue</h3>
                <p>{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><ShoppingBag size={24} /></div>
              <div className="stat-info">
                <h3>Total Orders</h3>
                <p>{stats.totalOrders}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Clock size={24} /></div>
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
                    <tr><td colSpan="7" className="text-center">No orders found</td></tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.orderId}>
                        <td className="order-id">{order.orderId}</td>
                        <td>
                          <div>{order.customerName}</div>
                          <div className="text-sm text-gray">{order.customerEmail}</div>
                        </td>
                        <td>{order.items.length} items</td>
                        <td>{order.total}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn btn-view" onClick={() => setSelectedOrder(order)}>
                              <Eye size={16} />
                            </button>
                            {order.status === 'Pending' && (
                              <button className="action-btn" onClick={() => handleStatusUpdate(order.orderId, 'Preparing')}>
                                <Clock size={16} />
                              </button>
                            )}
                            {order.status === 'Preparing' && (
                              <button className="action-btn" onClick={() => handleStatusUpdate(order.orderId, 'Delivered')}>
                                <CheckCircle size={16} />
                              </button>
                            )}
                            <button className="action-btn btn-delete" onClick={() => handleDeleteOrder(order.orderId)}>
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
        </>
      ) : (
        /* Menu Management Tab */
        <div className="menu-section">
          <div className="section-header-row">
            <h2>Menu Items</h2>
            <button className="btn-primary" onClick={() => setIsAddingItem(true)}>
              <Plus size={16} /> Add New Item
            </button>
          </div>
          <div className="menu-grid-admin">
            {menuItems.map(item => (
              <div key={item._id} className="menu-card-admin">
                <img src={item.image} alt={item.name} />
                <div className="menu-card-content">
                  <h3>{item.name}</h3>
                  <p className="price">{item.price}</p>
                  <div className="menu-actions">
                    <button onClick={() => setEditingItem(item)}><Edit size={16} /></button>
                    <button onClick={() => handleDeleteMenu(item.id)} className="text-red"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order #{selectedOrder.orderId}</h2>
              <button className="close-modal" onClick={() => setSelectedOrder(null)}><X size={24} /></button>
            </div>
            <div className="modal-body">
              <div className="order-details-grid">
                <div className="detail-section">
                  <h3>Customer</h3>
                  <p><strong>{selectedOrder.customerName}</strong></p>
                  <p>{selectedOrder.customerEmail}</p>
                  <p>{selectedOrder.address}</p>
                </div>
                <div className="detail-section">
                  <h3>Items</h3>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="item-row">
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
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Menu Modal */}
      {(isAddingItem || editingItem) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
              <button className="close-modal" onClick={() => { setIsAddingItem(false); setEditingItem(null); }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveMenu} className="menu-form">
              <div className="form-group">
                <label>Name</label>
                <input name="name" defaultValue={editingItem?.name} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" defaultValue={editingItem?.category || 'Starters'}>
                  <option>Starters</option>
                  <option>Mains</option>
                  <option>Desserts</option>
                  <option>Drinks</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input name="price" defaultValue={editingItem?.price} placeholder="$10" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="desc" defaultValue={editingItem?.desc} required />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="image" defaultValue={editingItem?.image} placeholder="https://..." required />
              </div>
              <div className="form-group">
                <label>Ingredients (comma separated)</label>
                <input name="ingredients" defaultValue={editingItem?.ingredients?.join(', ')} />
              </div>
              <div className="form-group">
                <label>Allergens (comma separated)</label>
                <input name="allergens" defaultValue={editingItem?.allergens?.join(', ')} />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
