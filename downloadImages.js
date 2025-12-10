// Image Downloader Script - Downloads food images from Foodish API
// Run with: node downloadImages.js

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'public', 'assets', 'menu');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Food categories mapping to Foodish API endpoints
const foodCategories = {
  burger: 30,
  pizza: 20,
  dessert: 20,
  pasta: 15,
  rice: 10,
  biryani: 5,
  samosa: 5,
  dosa: 5,
  butter_chicken: 5,
  idly: 5
};

// Function to download image from URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

// Function to fetch random food image from Foodish API
const fetchFoodImage = async (category) => {
  return new Promise((resolve, reject) => {
    const url = `https://foodish-api.com/api/images/${category}`;
    https.get(url, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.image);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

// Main download function
const downloadAllImages = async () => {
  console.log('🍔 Starting food image download...\n');
  let imageIndex = 1;
  const imageMap = {};

  for (const [category, count] of Object.entries(foodCategories)) {
    console.log(`📥 Downloading ${count} ${category} images...`);
    
    for (let i = 0; i < count; i++) {
      try {
        // Fetch image URL from API
        const imageUrl = await fetchFoodImage(category);
        
        // Create filename
        const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
        const filename = `food-${imageIndex}${ext}`;
        const filepath = path.join(assetsDir, filename);
        
        // Download image
        await downloadImage(imageUrl, filepath);
        
        // Store mapping
        imageMap[imageIndex] = `/assets/menu/${filename}`;
        
        console.log(`  ✅ Downloaded: ${filename}`);
        imageIndex++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.log(`  ❌ Failed to download ${category} image: ${error.message}`);
      }
    }
  }

  // Save image mapping to JSON file
  const mappingPath = path.join(__dirname, 'imageMapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(imageMap, null, 2));
  
  console.log(`\n✅ Downloaded ${imageIndex - 1} images successfully!`);
  console.log(`📝 Image mapping saved to: imageMapping.json`);
};

// Run the download
downloadAllImages().catch(console.error);
