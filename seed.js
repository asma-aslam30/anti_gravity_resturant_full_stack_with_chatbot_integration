import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Menu from './src/models/Menu.js';
import extendedMenuItems from './extendedMenuData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Menu.deleteMany({});
    console.log('🗑️ Cleared existing menu items');

    // Insert new data
    await Menu.insertMany(extendedMenuItems);
    console.log(`🌱 Seeded ${extendedMenuItems.length} menu  items`);

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
