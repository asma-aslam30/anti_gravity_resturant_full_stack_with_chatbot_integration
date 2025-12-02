import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Star, MapPin, Phone, Instagram, Facebook, Twitter, Quote, ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './index.css';
import './App.css';
import './cart.css';

import { menuItems, menuCategories } from './menuData';
import { testimonials, stats } from './testimonialsData';
import StripePaymentForm from './StripePaymentForm';
import { sendOrderConfirmationEmail, sendBookingConfirmationEmail } from './emailService';
import { generateOrderId, calculateDeliveryTime, formatCurrency } from './utils/orderUtils';
import { validateForm } from './utils/validation';
import { saveOrder } from './utils/storageUtils';
import Chatbot from './components/Chatbot';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

// Initialize Stripe with environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'stripe', 'paypal'
  const [processing, setProcessing] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // Check for admin URL parameter on load
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setShowAdmin(true);
    }
  }, []);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    requests: ''
  });
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    // Bank account details for direct transfer
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    routingNumber: ''
  });

  const toggleVideo = () => setShowVideo(!showVideo);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductClick = (item) => {
    setSelectedProduct(item);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleBookingChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setConfirmedBooking({ ...bookingForm });
    setShowBookingConfirm(true);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      requests: ''
    });
    setTimeout(() => setShowBookingConfirm(false), 3000);
  };

  // Cart Functions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setSelectedProduct(null);
    setShowCart(true);
  };

  const updateQuantity = (id, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      });
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCheckoutChange = (e) => {
    setCheckoutForm({
      ...checkoutForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'zipCode'];
    const validation = validateForm(checkoutForm, requiredFields);
    
    if (!validation.isValid) {
      alert(Object.values(validation.errors).join('\n'));
      return;
    }

    if (paymentMethod === 'cod') {
      // Cash on Delivery - immediate order placement
      setProcessing(true);
      
      const orderId = generateOrderId();
      const estimatedDelivery = calculateDeliveryTime();
      const totalAmount = getCartTotal();
      const formattedTotal = formatCurrency(totalAmount);

      const orderDetails = {
        orderId,
        customerEmail: checkoutForm.email,
        customerName: checkoutForm.name,
        total: formattedTotal,
        items: cart,
        address: `${checkoutForm.address}, ${checkoutForm.city} ${checkoutForm.zipCode}`,
        paymentMethod: 'Cash on Delivery',
        date: new Date().toLocaleDateString(),
        estimatedDelivery
      };

      // Save to local storage
      // Save order to localStorage
      saveOrder(orderDetails);

      // Send confirmation email using new email service
      try {
        const emailResult = await sendOrderConfirmationEmail(orderDetails);
        
        if (emailResult.success) {
          console.log('✅ Order confirmation email sent to:', orderDetails.customerEmail);
        } else {
          console.warn('⚠️ Order successful but email failed:', emailResult.message);
          // Still complete the order even if email fails
        }
      } catch (error) {
        console.error('❌ Email sending error:', error);
        // Don't block order completion if email fails
      }
      
      setTimeout(() => {
        setProcessing(false);
        setShowCheckout(false);
        setOrderComplete(true);
        setCart([]);
        setCheckoutForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          zipCode: '',
          accountHolderName: '',
          bankName: '',
          accountNumber: '',
          routingNumber: ''
        });
      }, 1500);
    }
    // Stripe and PayPal are handled by their respective components
  };

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  if (showAdmin) {
    return isAdminAuthenticated ? (
      <AdminDashboard />
    ) : (
      <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
    );
  }

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          NeoBite
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#booking" onClick={() => setIsMenuOpen(false)}>Book Table</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
        <div className="nav-actions">
            <button className="cart-button" onClick={() => setShowCart(true)}>
              <ShoppingCart size={24} />
              {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            </button>
            <button className="btn btn-primary desktop-only" onClick={scrollToBooking}>Book Now</button>
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Star size={16} /> #1 Futuristic Dining Experience
          </div>
          <h1>Taste the <span className="gradient-text">Future</span> of Gastronomy</h1>
          <p>Experience culinary excellence where molecular gastronomy meets cyberpunk aesthetics. A dining journey beyond imagination.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToMenu}>
              View Menu <ChevronRight size={20} />
            </button>
            <button className="btn btn-outline" onClick={toggleVideo}>
              Watch Video
            </button>
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="video-modal" onClick={toggleVideo}>
          <div className="video-container">
            <button className="close-video" onClick={toggleVideo}><X /></button>
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GlrxcuEDyF8?autoplay=1&mute=1"
                title="Restaurant Promo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <div className="section-header">
          <h2>Our <span className="gradient-text">Menu</span></h2>
          <p>Curated selection of molecular masterpieces</p>
        </div>
        
        <div className="category-tabs">
          {menuCategories.map(category => (
            <button 
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card" onClick={() => handleProductClick(item)}>
              <div className="card-image">
                <img src={item.image} alt={item.name} />
                <div className="price-tag">{item.price}</div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <div className="rating">
                    <Star size={14} fill="#ff00ff" stroke="none" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <p>{item.desc}</p>
                <button 
                  className="btn-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  {item.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={closeProductDetail}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeProductDetail}><X /></button>
            <div className="product-modal-content">
              <div className="product-image-large">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="product-details">
                <div className="product-header">
                  <h2>{selectedProduct.name}</h2>
                  <span className="product-price">{selectedProduct.price}</span>
                </div>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(selectedProduct.rating) ? "#ff00ff" : "none"} 
                      stroke={i < Math.floor(selectedProduct.rating) ? "none" : "#666"}
                    />
                  ))}
                  <span>({selectedProduct.reviews} reviews)</span>
                </div>
                <p className="product-description">{selectedProduct.desc}</p>
                
                {/* Preparation Description */}
                <div className="product-preparation">
                  <h3>Preparation</h3>
                  <p>{selectedProduct.preparation}</p>
                </div>

                <div className="product-meta">
                  <div className="meta-item">
                    <span className="label">Category:</span>
                    <span className="value">{selectedProduct.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Time:</span>
                    <span className="value">20-25 mins</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Calories:</span>
                    <span className="value">320 kcal</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-order" onClick={() => addToCart(selectedProduct)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-cart" onClick={() => setShowCart(false)}><X /></button>
            </div>
            
            {cart.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart size={48} />
                <p>Your cart is empty</p>
                <button className="btn btn-primary" onClick={() => setShowCart(false)}>Browse Menu</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                        </div>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <button className="btn btn-primary btn-checkout" onClick={() => { setShowCart(false); setShowCheckout(true); }}>
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="checkout-overlay" onClick={() => setShowCheckout(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-header">
              <h2>Checkout</h2>
              <button className="close-checkout" onClick={() => setShowCheckout(false)}><X /></button>
            </div>
            
            <div className="checkout-content">
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {cart.map(item => (
                    <div key={item.id} className="summary-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                <h3>Delivery Information</h3>
                <div className="form-group">
                  <label htmlFor="checkout-name">Full Name *</label>
                  <input
                    type="text"
                    id="checkout-name"
                    name="name"
                    value={checkoutForm.name}
                    onChange={handleCheckoutChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkout-email">Email *</label>
                    <input
                      type="email"
                      id="checkout-email"
                      name="email"
                      value={checkoutForm.email}
                      onChange={handleCheckoutChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-phone">Phone *</label>
                    <input
                      type="tel"
                      id="checkout-phone"
                      name="phone"
                      value={checkoutForm.phone}
                      onChange={handleCheckoutChange}
                      required
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="checkout-address">Address *</label>
                  <input
                    type="text"
                    id="checkout-address"
                    name="address"
                    value={checkoutForm.address}
                    onChange={handleCheckoutChange}
                    required
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkout-city">City *</label>
                    <input
                      type="text"
                      id="checkout-city"
                      name="city"
                      value={checkoutForm.city}
                      onChange={handleCheckoutChange}
                      required
                      placeholder="Tech City"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-zip">ZIP Code *</label>
                    <input
                      type="text"
                      id="checkout-zip"
                      name="zipCode"
                      value={checkoutForm.zipCode}
                      onChange={handleCheckoutChange}
                      required
                      placeholder="12345"
                    />
                  </div>
                </div>

                <h3>Bank Account Details (Optional)</h3>
                <p className="bank-info-text">For direct bank transfer payments</p>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkout-account-holder">Account Holder Name</label>
                    <input
                      type="text"
                      id="checkout-account-holder"
                      name="accountHolderName"
                      value={checkoutForm.accountHolderName}
                      onChange={handleCheckoutChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-bank-name">Bank Name</label>
                    <input
                      type="text"
                      id="checkout-bank-name"
                      name="bankName"
                      value={checkoutForm.bankName}
                      onChange={handleCheckoutChange}
                      placeholder="Chase Bank"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkout-account-number">Account Number</label>
                    <input
                      type="text"
                      id="checkout-account-number"
                      name="accountNumber"
                      value={checkoutForm.accountNumber}
                      onChange={handleCheckoutChange}
                      placeholder="1234567890"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-routing-number">Routing Number</label>
                    <input
                      type="text"
                      id="checkout-routing-number"
                      name="routingNumber"
                      value={checkoutForm.routingNumber}
                      onChange={handleCheckoutChange}
                      placeholder="021000021"
                    />
                  </div>
                </div>

                <h3><CreditCard size={20} /> Payment Method</h3>
                
                {/* Payment Method Selector */}
                <div className="payment-method-selector">
                  <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-option-content">
                      <strong>Cash on Delivery</strong>
                      <p>Pay when you receive your order</p>
                    </div>
                  </label>

                  <label className={`payment-option ${paymentMethod === 'stripe' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-option-content">
                      <strong>Credit/Debit Card</strong>
                      <p>Pay securely with Stripe</p>
                    </div>
                  </label>

                  <label className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-option-content">
                      <strong>PayPal</strong>
                      <p>Pay with your PayPal account</p>
                    </div>
                  </label>
                </div>

                {/* COD Payment */}
                {paymentMethod === 'cod' && (
                  <div className="payment-info">
                    <p>Payment will be collected on delivery</p>
                    <div className="payment-methods">
                      <span className="payment-badge">Cash</span>
                      <span className="payment-badge">Card</span>
                      <span className="payment-badge">UPI</span>
                    </div>
                    <button type="submit" className="btn btn-primary btn-place-order" disabled={processing}>
                      {processing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                )}

                {/* Stripe Payment */}
                {paymentMethod === 'stripe' && (
                  <Elements stripe={stripePromise}>
                    <StripePaymentForm
                      amount={getCartTotal()}
                      checkoutForm={checkoutForm}
                      onSuccess={async () => {
                        const orderId = generateOrderId();
                        const estimatedDelivery = calculateDeliveryTime();
                        const totalAmount = getCartTotal();
                        const formattedTotal = formatCurrency(totalAmount);

                        const orderDetails = {
                          orderId,
                          customerEmail: checkoutForm.email,
                          customerName: checkoutForm.name,
                          total: formattedTotal,
                          items: cart,
                          address: `${checkoutForm.address}, ${checkoutForm.city} ${checkoutForm.zipCode}`,
                          paymentMethod: 'Credit/Debit Card (Stripe)',
                          date: new Date().toLocaleDateString(),
                          estimatedDelivery
                        };

                        // Save to local storage
                        saveOrder(orderDetails);

                        // Send confirmation email
                        await sendOrderConfirmationEmail(orderDetails);
                        
                        setShowCheckout(false);
                        setOrderComplete(true);
                        setCart([]);
                        setCheckoutForm({
                          name: '',
                          email: '',
                          phone: '',
                          address: '',
                          city: '',
                          zipCode: '',
                          accountHolderName: '',
                          bankName: '',
                          accountNumber: '',
                          routingNumber: ''
                        });
                      }}
                      onError={(error) => {
                        alert(`Payment failed: ${error}`);
                      }}
                    />
                  </Elements>
                )}

                {/* PayPal Payment */}
                {paymentMethod === 'paypal' && (
                  <div className="paypal-wrapper">
                    <PayPalScriptProvider options={{ 
                      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                      currency: "USD"
                    }}>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [{
                              amount: {
                                value: getCartTotal().toFixed(2)
                              }
                            }]
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then(async (details) => {
                            if (process.env.NODE_ENV === 'development') {
                              console.log('Payment successful:', details);
                            }
                            
                            const orderId = generateOrderId();
                            const estimatedDelivery = calculateDeliveryTime();
                            const totalAmount = getCartTotal();
                            const formattedTotal = formatCurrency(totalAmount);

                            const orderDetails = {
                              orderId,
                              customerEmail: checkoutForm.email,
                              customerName: checkoutForm.name,
                              total: formattedTotal,
                              items: cart,
                              address: `${checkoutForm.address}, ${checkoutForm.city} ${checkoutForm.zipCode}`,
                              paymentMethod: 'PayPal',
                              date: new Date().toLocaleDateString(),
                              estimatedDelivery
                            };

                            // Save to local storage
                            saveOrder(orderDetails);

                            // Send confirmation email
                            await sendOrderConfirmationEmail(orderDetails);
                            
                            setShowCheckout(false);
                            setOrderComplete(true);
                            setCart([]);
                            setCheckoutForm({
                              name: '',
                              email: '',
                              phone: '',
                              address: '',
                              city: '',
                              zipCode: '',
                              accountHolderName: '',
                              bankName: '',
                              accountNumber: '',
                              routingNumber: ''
                            });
                          });
                        }}
                        onError={(err) => {
                          console.error('PayPal error:', err);
                          alert('Payment failed. Please try again.');
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Complete Modal */}
      {orderComplete && (
        <div className="order-complete-overlay">
          <div className="order-complete-modal">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order. We've sent a confirmation email to your inbox.</p>
            <button className="btn btn-primary" onClick={() => setOrderComplete(false)}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Booking Section */}
      <section id="booking" className="booking-section">
        <div className="booking-container">
          <div className="booking-info">
            <h2>Book a <span className="gradient-text">Table</span></h2>
            <p>Reserve your spot for an unforgettable dining experience.</p>
            <div className="contact-details">
              <div className="contact-item">
                <Phone className="icon" />
                <span>(555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin className="icon" />
                <span>123 Culinary Avenue, Foodie City</span>
              </div>
            </div>
          </div>
          <form className="booking-form" onSubmit={handleBookingSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={bookingForm.name}
                onChange={handleBookingChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                value={bookingForm.email}
                onChange={handleBookingChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                value={bookingForm.phone}
                onChange={handleBookingChange}
                required 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="date" 
                  name="date" 
                  value={bookingForm.date}
                  onChange={handleBookingChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="time" 
                  name="time" 
                  value={bookingForm.time}
                  onChange={handleBookingChange}
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <select 
                name="guests" 
                value={bookingForm.guests}
                onChange={handleBookingChange}
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5+">5+ People</option>
              </select>
            </div>
            <div className="form-group">
              <textarea 
                name="requests" 
                placeholder="Special Requests" 
                value={bookingForm.requests}
                onChange={handleBookingChange}
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Confirm Reservation</button>
          </form>
        </div>
      </section>

      {/* Booking Confirmation Modal */}
      {showBookingConfirm && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <div className="success-icon">✓</div>
            <h3>Reservation Confirmed!</h3>
            <p>Thank you, {confirmedBooking?.name}!</p>
            <p>Your table for {confirmedBooking?.guests} people has been reserved for {confirmedBooking?.date} at {confirmedBooking?.time}.</p>
            <p className="email-note">A confirmation email has been sent to {confirmedBooking?.email}</p>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section id="about" className="testimonials-section">
        <h2>What Our <span className="gradient-text">Guests Say</span></h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <Quote className="quote-icon" size={32} />
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#ff00ff" stroke="none" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>NeoBite</h3>
            <p>The future of dining is here.</p>
            <div className="social-links">
              <a href="#"><Instagram /></a>
              <a href="#"><Facebook /></a>
              <a href="#"><Twitter /></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#booking">Reservations</a>
            <a href="#about">About Us</a>
            <a href="#admin" onClick={(e) => { e.preventDefault(); setShowAdmin(true); }}>Admin</a>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><MapPin size={16} /> 123 Culinary Avenue</p>
            <p><Phone size={16} /> (555) 123-4567</p>
            <p>info@neobite.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NeoBite Restaurant. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
