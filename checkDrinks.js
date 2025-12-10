// Quick script to check Drinks category in database
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const menuSchema = new mongoose.Schema({
  id: Number,
  category: String,
  name: String,
  price: String,
  desc: String,
  image: String,
  ingredients: [String],
  allergens: [String],
  rating: String
});

const MenuItem = mongoose.model('MenuItem', menuSchema);

async function checkDrinks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
    
    const drinks = await MenuItem.find({ category: 'Drinks' }).limit(5);
    
    console.log('First 5 Drinks in Database:');
    console.log('==========================\n');
    
    drinks.forEach((drink, index) => {
      console.log(`${index + 1}. ${drink.name}`);
      console.log(`   Image: ${drink.image}`);
      console.log(`   Description: ${drink.desc}`);
      console.log('');
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDrinks();
