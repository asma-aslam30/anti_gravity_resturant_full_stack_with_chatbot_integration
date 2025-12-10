import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  phone: String,
  address: String,
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Preparing', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  paymentMethod: { type: String, default: 'COD' },
  paymentStatus: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
