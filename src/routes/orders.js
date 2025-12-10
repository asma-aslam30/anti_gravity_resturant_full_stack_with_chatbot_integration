import express from 'express';
import Order from '../models/Order.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST create new order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    
    // Emit real-time event
    const io = req.app.get('io');
    io.emit('newOrder', newOrder);
    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
});

// GET all orders (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update order status (Admin only)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error updating status', error: error.message });
  }
});

// DELETE order (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
