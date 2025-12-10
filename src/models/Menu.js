import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: [String],
  allergens: [String],
  chefNote: String,
  preparation: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Menu', menuSchema);
