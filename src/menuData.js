import sushiImg from './assets/sushi.png';
import burgerImg from './assets/burger.png';
import noodlesImg from './assets/noodles.png';

export const menuCategories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

export const menuItems = [
    // Starters
    {
        id: 101,
        category: "Starters",
        name: "Binary Bites",
        price: "$16",
        desc: "Crispy tempura shrimp and vegetables, arranged in a data-stream pattern, served with a sweet chili firewall dip.",
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&q=80",
        ingredients: ["Shrimp", "Zucchini", "Sweet Potato", "Tempura Batter", "Sweet Chili Sauce"],
        allergens: ["Shellfish", "Gluten"],
        chefNote: "Our signature starter features premium tiger shrimp in a light, crispy coating. Best enjoyed hot!",
        preparation: "Fresh tiger shrimp are butterflied and deveined, then coated in our house-made tempura batter (ice-cold sparkling water, rice flour, and cornstarch for extra crispiness). Vegetables are julienned and flash-fried at 350°F for exactly 2 minutes until golden. The sweet chili sauce is made from scratch with Thai chilies, rice vinegar, and palm sugar, reduced to a perfect glaze consistency."
    },
    {
        id: 102,
        category: "Starters",
        name: "Quantum Calamari",
        price: "$18",
        desc: "Flash-fried squid rings dusted with electric pepper, served with a side of aioli that glows under UV light.",
        image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80",
        ingredients: ["Squid", "Flour", "Electric Pepper", "Garlic Aioli", "Lemon"],
        allergens: ["Seafood", "Gluten", "Eggs"],
        chefNote: "Tender calamari with a unique spice blend. The aioli contains edible luminescent algae extract!",
        preparation: "Fresh squid is cleaned, scored in a crosshatch pattern, and cut into rings. Rings are tenderized in buttermilk for 30 minutes, then dredged in seasoned flour mixed with our electric pepper blend (cayenne, white pepper, and szechuan peppercorns). Deep-fried at 375°F for 90 seconds until crispy. The UV-reactive aioli is made with roasted garlic, egg yolks, lemon juice, and a touch of edible luminescent algae extract."
    },
    {
        id: 103,
        category: "Starters",
        name: "Cyber Spring Rolls",
        price: "$14",
        desc: "Translucent rice paper rolls filled with neon-vegetables and vermicelli, served with a peanut dipping sauce.",
        image: "https://images.unsplash.com/photo-1544510802-38666fdb595c?w=800&q=80",
        ingredients: ["Rice Paper", "Vermicelli", "Carrots", "Cucumber", "Mint", "Peanut Sauce"],
        allergens: ["Peanuts", "Gluten"],
        chefNote: "Fresh and light, perfect for starting your meal. 100% vegan option available!",
        preparation: "Rice vermicelli noodles are cooked al dente and cooled. Fresh vegetables (carrots, cucumber, purple cabbage) are julienned into thin matchsticks. Rice paper is briefly soaked in warm water until pliable, then filled with noodles, vegetables, fresh mint, and cilantro. Rolled tightly and cut diagonally. The peanut sauce is made from roasted peanuts, hoisin, lime juice, and a hint of sriracha, blended until smooth."
    },
    {
        id: 104,
        category: "Starters",
        name: "Holographic Hummus",
        price: "$12",
        desc: "Creamy chickpea blend topped with iridescent olive oil and served with warm, pillowy pita bread.",
        image: "https://images.unsplash.com/photo-1577906096429-f736f9f3596a?w=800&q=80",
        ingredients: ["Chickpeas", "Tahini", "Lemon", "Garlic", "Olive Oil", "Pita Bread"],
        allergens: ["Sesame", "Gluten"],
        chefNote: "Made fresh daily with imported tahini. The olive oil shimmer is from natural butterfly pea flower!",
        preparation: "Dried chickpeas are soaked overnight and cooked until ultra-tender (about 90 minutes). While still warm, they're blended with premium tahini, fresh lemon juice, roasted garlic, and ice-cold water until silky smooth. The hummus is whipped for extra creaminess. Topped with olive oil infused with butterfly pea flower for an iridescent shimmer. Served with fresh pita bread baked in our stone oven."
    },
    {
        id: 105,
        category: "Starters",
        name: "Meteor Meatballs",
        price: "$15",
        desc: "Spicy lamb meatballs glazed in a dark matter pomegranate reduction, garnished with sesame seeds.",
        image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
        ingredients: ["Lamb", "Pomegranate", "Cumin", "Coriander", "Sesame Seeds"],
        allergens: ["Sesame"],
        chefNote: "Grass-fed lamb with Middle Eastern spices. The pomegranate glaze adds a perfect sweet-tart balance!",
        preparation: "Ground grass-fed lamb is mixed with minced onions, fresh parsley, cumin, coriander, cinnamon, and breadcrumbs. Formed into golf ball-sized spheres and seared in a hot pan until caramelized. Finished in the oven at 400°F for 12 minutes. The pomegranate reduction is made by simmering fresh pomegranate juice with honey, balsamic vinegar, and a touch of harissa until thick and glossy. Meatballs are glazed and garnished with toasted sesame seeds."
    },
    {
        id: 106,
        category: "Starters",
        name: "Neon Dragon Roll",
        price: "$17",
        desc: "Spicy tuna and avocado wrapped in sushi rice and nori, topped with sriracha mayo and flying fish roe.",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80",
        ingredients: ["Sushi Rice", "Tuna", "Avocado", "Nori", "Sriracha Mayo", "Tobiko"],
        allergens: ["Fish", "Eggs", "Soy"],
        chefNote: "Our most popular roll! The flying fish roe adds a satisfying pop with every bite.",
        preparation: "Sushi-grade tuna is diced and mixed with sriracha, sesame oil, and scallions. Sushi rice (seasoned with rice vinegar, sugar, and salt) is spread on nori sheets. Spicy tuna and sliced avocado are placed in the center, then rolled tightly using a bamboo mat. The roll is sliced into 8 pieces, topped with sriracha mayo drizzle and colorful tobiko (flying fish roe). Served with pickled ginger, wasabi, and soy sauce."
    },
    {
        id: 107,
        category: "Starters",
        name: "Photon Pork Dumplings",
        price: "$13",
        desc: "Steamed dumplings filled with ginger-infused pork and cabbage, served with black vinegar dipping sauce.",
        image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80",
        ingredients: ["Pork", "Cabbage", "Ginger", "Dumpling Wrappers", "Black Vinegar", "Soy Sauce"],
        allergens: ["Gluten", "Soy"],
        chefNote: "Hand-folded dumplings with 18 pleats each. A labor of love!",
        preparation: "Ground pork is mixed with finely chopped napa cabbage (salted and squeezed dry), fresh ginger, garlic, soy sauce, sesame oil, and white pepper. The filling is wrapped in thin dumpling wrappers with 18 pleats for authenticity. Dumplings are steamed in bamboo baskets for 8 minutes until the wrappers are translucent. Served with a dipping sauce of Chinese black vinegar, soy sauce, julienned ginger, and chili oil."
    },
    {
        id: 108,
        category: "Starters",
        name: "Cosmic Bruschetta",
        price: "$11",
        desc: "Toasted sourdough topped with heirloom tomatoes, fresh basil, and aged balsamic reduction.",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
        ingredients: ["Sourdough Bread", "Heirloom Tomatoes", "Fresh Basil", "Garlic", "Balsamic Vinegar", "Olive Oil"],
        allergens: ["Gluten"],
        chefNote: "Simple yet elegant. We use heirloom tomatoes at peak ripeness for maximum flavor!",
        preparation: "Artisan sourdough is sliced thick and brushed with extra virgin olive oil. Toasted on a grill until charred grill marks appear. Each slice is rubbed with fresh garlic cloves while still hot. Heirloom tomatoes (a mix of colors) are diced and tossed with fresh basil, sea salt, and olive oil. Spooned generously onto the bread and finished with a drizzle of 25-year aged balsamic reduction."
    },

    // Mains
    {
        id: 201,
        category: "Mains",
        name: "Cyber Sushi Platter",
        price: "$24",
        desc: "Premium grade sashimi with neon-infused rice, served with a side of holographic wasabi and quantum soy reduction.",
        image: sushiImg,
        ingredients: ["Tuna", "Salmon", "Yellowtail", "Sushi Rice", "Nori", "Wasabi", "Soy Sauce"],
        allergens: ["Fish", "Soy", "Gluten"],
        chefNote: "Featuring daily-caught fish from sustainable sources. Our rice is infused with natural food-safe luminescence!",
        preparation: "Sushi-grade fish (tuna, salmon, yellowtail) is hand-selected daily and sliced using the traditional sashimi technique at a 45-degree angle for optimal texture. Sushi rice is cooked with kombu (kelp), then seasoned with a mixture of rice vinegar, sugar, and salt. The rice is infused with natural bioluminescent ingredients for a subtle glow. Nigiri is hand-formed with precision, and maki rolls are cut with a wet, sharp knife. Served with freshly grated wasabi and soy sauce reduced with mirin."
    },
    {
        id: 202,
        category: "Mains",
        name: "Quantum Burger",
        price: "$18",
        desc: "Wagyu beef patty topped with zero-gravity melted cheese, plasma sauce, and crispy onion rings on a charcoal brioche bun.",
        image: burgerImg,
        ingredients: ["Wagyu Beef", "Aged Cheddar", "Brioche Bun", "Onion Rings", "Special Sauce", "Lettuce", "Tomato"],
        allergens: ["Gluten", "Dairy", "Eggs"],
        chefNote: "Our signature burger uses premium Wagyu beef. The charcoal bun is activated for detox benefits!",
        preparation: "Premium Wagyu beef (80/20 blend) is ground fresh daily and formed into 8oz patties, seasoned simply with salt and pepper. Seared on a flat-top grill at high heat for a perfect crust, cooked to medium. Aged cheddar is melted on top during the last minute. The charcoal brioche bun (made with activated charcoal) is toasted with butter. Assembled with crisp lettuce, heirloom tomato, house-made plasma sauce (mayo, ketchup, pickles, spices), and topped with crispy beer-battered onion rings."
    },
    {
        id: 203,
        category: "Mains",
        name: "Nebula Noodles",
        price: "$22",
        desc: "Hand-pulled ramen in a rich, void-black truffle broth, topped with bioluminescent mushrooms and soft-boiled solar egg.",
        image: noodlesImg,
        ingredients: ["Hand-Pulled Noodles", "Truffle Oil", "Shiitake Mushrooms", "Soft-Boiled Egg", "Scallions", "Nori"],
        allergens: ["Gluten", "Eggs", "Soy"],
        chefNote: "24-hour broth infused with black garlic and truffle. The mushrooms are specially cultivated to glow!",
        preparation: "The broth is made by simmering pork bones, chicken carcasses, and aromatics for 24 hours until rich and creamy. Black garlic and truffle oil are added for depth. Noodles are hand-pulled fresh to order, creating the perfect chewy texture. Shiitake mushrooms are sautéed in truffle butter. Eggs are soft-boiled for exactly 6.5 minutes, then marinated in soy sauce and mirin. The bowl is assembled with hot broth, noodles, mushrooms, halved egg, scallions, and nori sheets."
    },
    {
        id: 204,
        category: "Mains",
        name: "Plasma Pizza",
        price: "$20",
        desc: "Wood-fired thin crust topped with radioactive mozzarella, solar tomatoes, and a drizzle of basil-infused gamma oil.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
        ingredients: ["Pizza Dough", "Mozzarella", "San Marzano Tomatoes", "Fresh Basil", "Olive Oil"],
        allergens: ["Gluten", "Dairy"],
        chefNote: "Wood-fired at 900°F for the perfect char. Our dough is fermented for 72 hours for maximum flavor!",
        preparation: "Pizza dough is made with Italian 00 flour, water, salt, and a tiny amount of yeast, then cold-fermented for 72 hours for complex flavor and perfect texture. Hand-stretched to 12 inches, topped with crushed San Marzano tomatoes (seasoned with salt and oregano), fresh mozzarella torn into pieces, and fresh basil leaves. Baked in a wood-fired oven at 900°F for 90 seconds until the crust is charred and bubbly. Finished with a drizzle of basil-infused olive oil."
    },
    {
        id: 205,
        category: "Mains",
        name: "Galactic Steak",
        price: "$35",
        desc: "Dry-aged ribeye seared to perfection, served with a side of asteroid potatoes and chimichurri nebula sauce.",
        image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?w=800&q=80",
        ingredients: ["Dry-Aged Ribeye", "Fingerling Potatoes", "Chimichurri", "Garlic", "Rosemary"],
        allergens: [],
        chefNote: "28-day dry-aged USDA Prime ribeye. Cooked to your preference with our house chimichurri!",
        preparation: "USDA Prime ribeye is dry-aged in our temperature-controlled aging room for 28 days, developing intense flavor and tenderness. The steak is brought to room temperature, seasoned generously with coarse salt and cracked black pepper. Seared in a cast-iron skillet with butter, garlic, and rosemary, basted continuously. Rested for 10 minutes before slicing. Fingerling potatoes are roasted with olive oil, garlic, and herbs until crispy. Chimichurri is made fresh with parsley, cilantro, garlic, red wine vinegar, and olive oil."
    },
    {
        id: 206,
        category: "Mains",
        name: "Void Risotto",
        price: "$26",
        desc: "Squid ink risotto with seared scallops, finished with a dusting of edible gold stars.",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
        ingredients: ["Arborio Rice", "Squid Ink", "Scallops", "White Wine", "Parmesan", "Edible Gold"],
        allergens: ["Seafood", "Dairy", "Alcohol"],
        chefNote: "Creamy risotto with a dramatic black color. Scallops are seared to golden perfection!",
        preparation: "Arborio rice is toasted in butter and shallots until translucent, then deglazed with white wine. Hot seafood stock is added one ladle at a time, stirring constantly for 18-20 minutes. Squid ink is stirred in near the end for a dramatic black color. Finished with butter and Parmigiano-Reggiano for creaminess. Dry-packed scallops are patted dry, seasoned, and seared in a screaming hot pan for 90 seconds per side until golden crust forms. Served atop the risotto with edible gold leaf."
    },
    {
        id: 207,
        category: "Mains",
        name: "Solar Salmon",
        price: "$28",
        desc: "Pan-seared salmon fillet with a citrus glaze, served on a bed of quinoa and roasted cosmic vegetables.",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?w=800&q=80",
        ingredients: ["Atlantic Salmon", "Quinoa", "Asparagus", "Bell Peppers", "Citrus Glaze"],
        allergens: ["Fish"],
        chefNote: "Wild-caught salmon with omega-3 benefits. Perfectly paired with protein-rich quinoa!",
        preparation: "Wild-caught Atlantic salmon fillet is patted dry and seasoned with salt and pepper. Seared skin-side down in a hot pan with olive oil for 4 minutes until crispy, then flipped for 2 minutes. The citrus glaze is made by reducing orange juice, lemon juice, honey, and ginger until syrupy. Quinoa is cooked in vegetable stock and fluffed. Asparagus and bell peppers are roasted at 425°F with olive oil and garlic until caramelized. The salmon is brushed with glaze and served over quinoa with vegetables."
    },
    {
        id: 208,
        category: "Mains",
        name: "Cosmic Curry",
        price: "$21",
        desc: "Aromatic Thai green curry with chicken, bamboo shoots, and Thai basil in coconut milk, served with jasmine rice.",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
        ingredients: ["Chicken", "Green Curry Paste", "Coconut Milk", "Bamboo Shoots", "Thai Basil", "Jasmine Rice"],
        allergens: ["Fish Sauce"],
        chefNote: "Made with house-made curry paste and fresh Thai basil. Adjust spice level to your preference!",
        preparation: "Green curry paste is made fresh by grinding green chilies, lemongrass, galangal, shallots, garlic, and shrimp paste in a mortar and pestle. The paste is fried in coconut cream until fragrant, then coconut milk is added. Chicken thighs are cut into bite-sized pieces and simmered in the curry with bamboo shoots, Thai eggplant, and palm sugar. Fish sauce adds umami depth. Fresh Thai basil is stirred in at the end. Served with steamed jasmine rice."
    },
    {
        id: 209,
        category: "Mains",
        name: "Astro Tacos",
        price: "$19",
        desc: "Three soft corn tortillas filled with adobo-marinated pork, pineapple salsa, and cilantro-lime crema.",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
        ingredients: ["Pork Shoulder", "Adobo Sauce", "Corn Tortillas", "Pineapple", "Cilantro", "Lime"],
        allergens: [],
        chefNote: "Inspired by tacos al pastor. The pork is marinated overnight for maximum flavor!",
        preparation: "Pork shoulder is marinated overnight in adobo sauce (dried chilies, pineapple juice, vinegar, garlic, cumin, oregano). Slow-roasted at 325°F for 3 hours until tender and caramelized. Shredded and crisped on a griddle. Corn tortillas are warmed on a comal. Pineapple salsa is made with diced fresh pineapple, red onion, jalapeño, cilantro, and lime juice. Cilantro-lime crema is Mexican crema mixed with fresh cilantro and lime zest. Tacos are assembled and garnished with diced onion and cilantro."
    },
    {
        id: 210,
        category: "Mains",
        name: "Meteor Mushroom Pasta",
        price: "$23",
        desc: "Fettuccine tossed with wild mushrooms, truffle cream sauce, and shaved Parmesan.",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
        ingredients: ["Fettuccine", "Wild Mushrooms", "Heavy Cream", "Truffle Oil", "Parmesan", "Thyme"],
        allergens: ["Gluten", "Dairy", "Eggs"],
        chefNote: "A vegetarian favorite! We use a mix of shiitake, oyster, and porcini mushrooms.",
        preparation: "Fresh fettuccine is cooked in salted boiling water until al dente. A mix of wild mushrooms (shiitake, oyster, porcini) are sautéed in butter with garlic and fresh thyme until golden and caramelized. Heavy cream is added and reduced until thick. Truffle oil is stirred in for earthy aroma. The pasta is tossed in the sauce with reserved pasta water for perfect consistency. Plated and topped with shaved Parmigiano-Reggiano and fresh thyme leaves."
    },

    // Desserts
    {
        id: 301,
        category: "Desserts",
        name: "Galactic Gelato",
        price: "$12",
        desc: "House-made artisan gelato with stardust sprinkles and a meteor crunch topping. A sweet ending to your interstellar journey.",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
        ingredients: ["Milk", "Cream", "Sugar", "Vanilla Bean", "Edible Glitter", "Honeycomb"],
        allergens: ["Dairy"],
        chefNote: "Made fresh daily in small batches. The meteor crunch is caramelized honeycomb!",
        preparation: "Whole milk and heavy cream are heated with vanilla bean pods (scraped for maximum flavor). Egg yolks and sugar are whisked until pale, then tempered with the hot cream mixture. Cooked gently until it coats the back of a spoon (180°F). Chilled overnight, then churned in a gelato machine at a slower speed than ice cream for a denser, creamier texture. Served with edible glitter and house-made honeycomb (sugar, honey, and baking soda caramelized until golden and airy)."
    },
    {
        id: 302,
        category: "Mains",
        name: "Nano Banana Split",
        price: "$14",
        desc: "Caramelized nano-bananas served with three scoops of molecular ice cream, hot fudge, and a cherry on top.",
        image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80",
        ingredients: ["Bananas", "Ice Cream", "Chocolate Fudge", "Whipped Cream", "Cherries", "Nuts"],
        allergens: ["Dairy", "Nuts"],
        chefNote: "A classic dessert reimagined! The bananas are caramelized with brown sugar and rum.",
        preparation: "Ripe bananas are halved lengthwise and caramelized in a pan with butter, brown sugar, and a splash of dark rum until golden and bubbling. Three scoops of house-made ice cream (vanilla, chocolate, strawberry) are placed between the banana halves. Hot fudge sauce is made by melting dark chocolate with heavy cream and butter. Topped with fresh whipped cream, toasted nuts, and a maraschino cherry. Served immediately while the bananas are still warm."
    },
    {
        id: 303,
        category: "Desserts",
        name: "Dark Matter Brownie",
        price: "$10",
        desc: "Rich, dense chocolate brownie served warm with a scoop of vanilla bean ice cream and raspberry coulis.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?w=800&q=80",
        ingredients: ["Dark Chocolate", "Butter", "Eggs", "Flour", "Vanilla Ice Cream", "Raspberries"],
        allergens: ["Gluten", "Dairy", "Eggs"],
        chefNote: "Made with 70% Belgian dark chocolate. Best enjoyed warm with melting ice cream!",
        preparation: "Belgian dark chocolate (70% cacao) and butter are melted together until smooth. Eggs and sugar are whisked until thick and ribbony. The chocolate mixture is folded in, followed by flour and a pinch of salt. Baked at 350°F for 25 minutes until the edges are set but the center is still fudgy. Served warm with a scoop of vanilla bean ice cream. Raspberry coulis is made by simmering fresh raspberries with sugar and lemon juice, then strained for a smooth sauce."
    },
    {
        id: 304,
        category: "Desserts",
        name: "Cheesecake Nebula",
        price: "$13",
        desc: "Swirled blueberry and lemon cheesecake with a graham cracker crust, garnished with edible flowers.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
        ingredients: ["Cream Cheese", "Blueberries", "Lemon", "Graham Crackers", "Sugar", "Edible Flowers"],
        allergens: ["Dairy", "Gluten", "Eggs"],
        chefNote: "New York-style cheesecake with a fruity twist. The swirl pattern is unique to each slice!",
        preparation: "Graham crackers are crushed and mixed with melted butter, pressed into a springform pan. Cream cheese is beaten until fluffy with sugar, then eggs are added one at a time. Half the batter is flavored with lemon zest and juice. Blueberries are simmered with sugar until jammy. Both batters are swirled together in the crust with the blueberry compote. Baked in a water bath at 325°F for 60 minutes, then cooled slowly. Chilled overnight and garnished with edible flowers."
    },
    {
        id: 305,
        category: "Desserts",
        name: "Quantum Tiramisu",
        price: "$11",
        desc: "Classic Italian dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa dust.",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
        ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Eggs", "Cocoa Powder", "Marsala Wine"],
        allergens: ["Gluten", "Dairy", "Eggs", "Alcohol"],
        chefNote: "Made the traditional way with raw eggs and Marsala wine. A coffee lover's dream!",
        preparation: "Strong espresso is brewed and mixed with Marsala wine, cooled to room temperature. Egg yolks and sugar are whisked over a double boiler until thick and pale. Mascarpone cheese is folded in gently. Egg whites are whipped to stiff peaks and folded into the mascarpone mixture. Ladyfinger cookies are quickly dipped in the espresso mixture and layered in a dish. Mascarpone cream is spread between layers. Chilled for at least 4 hours. Dusted generously with cocoa powder before serving."
    },
    {
        id: 306,
        category: "Desserts",
        name: "Stardust Panna Cotta",
        price: "$12",
        desc: "Silky vanilla panna cotta topped with berry compote and edible gold leaf.",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
        ingredients: ["Heavy Cream", "Vanilla Bean", "Gelatin", "Mixed Berries", "Sugar", "Gold Leaf"],
        allergens: ["Dairy"],
        chefNote: "An elegant Italian dessert that melts in your mouth. The berry compote adds a tart contrast!",
        preparation: "Heavy cream, sugar, and vanilla bean (pod and seeds) are heated until steaming. Gelatin sheets are bloomed in cold water, then dissolved in the hot cream. Strained and poured into molds, chilled for at least 4 hours until set. Mixed berries (strawberries, blueberries, raspberries) are simmered with sugar and lemon juice until jammy. The panna cotta is unmolded onto plates, topped with berry compote, and garnished with edible gold leaf for a luxurious finish."
    },

    // Drinks
    {
        id: 401,
        category: "Drinks",
        name: "Neon Nectar",
        price: "$10",
        desc: "A glowing cocktail mix of gin, tonic, and blue curacao, served with a slice of electric lemon.",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?w=800&q=80",
        ingredients: ["Gin", "Tonic Water", "Blue Curacao", "Lemon", "Edible Glitter"],
        allergens: ["Alcohol"],
        chefNote: "Our signature cocktail! The glow comes from quinine in tonic water under UV light.",
        preparation: "Premium gin is poured over ice in a highball glass. Blue curaçao is added for color and orange flavor. Topped with tonic water (the quinine makes it glow under UV light). Garnished with a lemon wheel and a sprinkle of edible glitter. Stirred gently and served immediately. The drink glows brilliantly under our UV bar lights for a stunning visual effect."
    },
    {
        id: 402,
        category: "Drinks",
        name: "Cyber Punk IPA",
        price: "$8",
        desc: "Local craft brew with notes of citrus and pine, served in a frosted glass.",
        image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=800&q=80",
        ingredients: ["Hops", "Malt", "Yeast", "Water"],
        allergens: ["Gluten", "Alcohol"],
        chefNote: "Brewed locally with Cascade and Centennial hops. Perfectly balanced at 6.5% ABV!",
        preparation: "This IPA is brewed by our local partner brewery using a blend of Cascade and Centennial hops for citrus and pine notes. Pale malt provides the backbone, while crystal malt adds a touch of sweetness. Dry-hopped for maximum aroma. Fermented at controlled temperatures for clean flavor. Served in a frosted glass at 38°F for optimal refreshment. The beer pours golden with a thick white head and releases aromas of grapefruit and pine."
    },
    {
        id: 403,
        category: "Drinks",
        name: "Plasma Punch",
        price: "$9",
        desc: "Non-alcoholic blend of tropical juices, grenadine, and soda water, served over crushed ice.",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
        ingredients: ["Pineapple Juice", "Orange Juice", "Grenadine", "Soda Water", "Fresh Fruit"],
        allergens: [],
        chefNote: "A family-friendly favorite! Refreshing and vibrant with natural fruit flavors.",
        preparation: "Fresh pineapple juice and orange juice are mixed in equal parts. Grenadine syrup is added for sweetness and a beautiful gradient effect. Poured over crushed ice in a tall glass. Topped with soda water for fizz. Garnished with fresh fruit skewers (pineapple, orange, cherry) and a colorful paper umbrella. Served with a reusable straw. The layers create a stunning sunset effect before stirring."
    },
    {
        id: 404,
        category: "Drinks",
        name: "Void Coffee",
        price: "$6",
        desc: "Double espresso shot with activated charcoal and steamed oat milk.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
        ingredients: ["Espresso", "Activated Charcoal", "Oat Milk"],
        allergens: [],
        chefNote: "Our darkest brew! Activated charcoal adds detox benefits and a striking black color.",
        preparation: "Double espresso is pulled using our premium arabica beans (medium-dark roast). Food-grade activated charcoal powder is mixed with a small amount of hot water to create a paste. The charcoal paste is added to the espresso, creating an intensely black color. Oat milk is steamed to 150°F until microfoam forms. Poured into the espresso creating latte art (though it appears as white on black). The activated charcoal is flavorless but adds detoxifying properties and a dramatic appearance."
    },
    {
        id: 405,
        category: "Drinks",
        name: "Cosmic Mojito",
        price: "$11",
        desc: "White rum muddled with fresh mint, lime, and sugar, topped with soda water and edible flowers.",
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
        ingredients: ["White Rum", "Fresh Mint", "Lime", "Sugar", "Soda Water", "Edible Flowers"],
        allergens: ["Alcohol"],
        chefNote: "A refreshing Cuban classic with our cosmic twist. The edible flowers add elegance!",
        preparation: "Fresh mint leaves and lime wedges are muddled with sugar in a highball glass to release oils and juice. White rum is added and stirred. The glass is filled with crushed ice. Topped with soda water and stirred gently. Garnished with a mint sprig, lime wheel, and edible flowers for a beautiful presentation. Served with a straw for sipping through the aromatic mint."
    },
    {
        id: 406,
        category: "Drinks",
        name: "Nebula Smoothie",
        price: "$8",
        desc: "Blended acai, banana, blueberries, and almond milk, topped with granola and fresh berries.",
        image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80",
        ingredients: ["Acai", "Banana", "Blueberries", "Almond Milk", "Granola", "Fresh Berries"],
        allergens: ["Nuts"],
        chefNote: "Packed with antioxidants and nutrients. A healthy and delicious choice!",
        preparation: "Frozen acai puree, banana, blueberries, and almond milk are blended until smooth and thick. The mixture should have a soft-serve consistency. Poured into a bowl and smoothed on top. Garnished with house-made granola (oats, honey, nuts), fresh berries (strawberries, blueberries, raspberries), sliced banana, and a drizzle of honey. Served immediately with a spoon. The deep purple color comes from the antioxidant-rich acai and blueberries."
    },
    {
        id: 407,
        category: "Drinks",
        name: "Galaxy Hot Chocolate",
        price: "$7",
        desc: "Rich dark chocolate melted into steamed milk, topped with whipped cream and star-shaped marshmallows.",
        image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800&q=80",
        ingredients: ["Dark Chocolate", "Milk", "Whipped Cream", "Marshmallows", "Cocoa Powder"],
        allergens: ["Dairy"],
        chefNote: "Made with real Belgian chocolate, not powder. Pure indulgence in a cup!",
        preparation: "Belgian dark chocolate is finely chopped and placed in a mug. Whole milk is steamed to 160°F until hot and frothy. The hot milk is poured over the chocolate and whisked until completely melted and smooth. Topped with fresh whipped cream (heavy cream whipped with vanilla and sugar). Garnished with star-shaped marshmallows and a dusting of cocoa powder. Served with a cinnamon stick for stirring. The perfect cozy drink for chocolate lovers."
    }
];
