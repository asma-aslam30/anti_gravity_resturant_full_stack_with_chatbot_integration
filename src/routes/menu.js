import express from 'express';
import Menu from '../models/Menu.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST new menu item (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
});

// PUT update menu item (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedItem = await Menu.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
});

// DELETE menu item (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedItem = await Menu.findOneAndDelete({ id: req.params.id });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
