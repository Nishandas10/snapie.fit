'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search,
  CheckCircle2, 
  Clock,
  Filter,
  Heart,
  Info,
  Leaf,
  Star,
  Zap,
  Apple,
  Flame,
  X
} from 'lucide-react';

// Play Store URL constant
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI';

// --- TYPE DEFINITIONS ---
type Snack = {
  id: number;
  name: string;
  description: string;
  gi: string;
  giValue: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  category: 'store-bought' | 'homemade' | 'european' | 'asian' | 'indian' | 'american';
  cuisine: string;
};

// --- SNACK DATA (120 items) ---
const SNACKS_DATA: Snack[] = [
  // Store-Bought (1-20)
  { id: 1, name: "Raw Almonds", description: "A handful of unsalted almonds is a classic low GI snack. Their healthy fats and fiber slow digestion, preventing blood sugar spikes. Ideal for on-the-go energy.", gi: "GI: 0", giValue: 0, calories: 160, protein: 6, carbs: 6, fat: 14, tags: ["nuts", "protein", "portable", "keto"], category: "store-bought", cuisine: "Universal" },
  { id: 2, name: "Greek Yogurt (Plain)", description: "Plain Greek yogurt is protein-packed and versatile. Choose unsweetened varieties to keep it low GI.", gi: "GI: 35-40", giValue: 37, calories: 100, protein: 15, carbs: 5, fat: 3, tags: ["dairy", "protein", "probiotic", "breakfast"], category: "store-bought", cuisine: "Universal" },
  { id: 3, name: "Beef Jerky (Low-Sugar)", description: "Low-carb jerky offers savory satisfaction without carbs. Opt for grass-fed, no-added-sugar brands.", gi: "GI: 0", giValue: 0, calories: 116, protein: 9, carbs: 3, fat: 7, tags: ["protein", "portable", "keto", "savory"], category: "store-bought", cuisine: "American" },
  { id: 4, name: "String Cheese", description: "Mozzarella sticks provide calcium and protein. They're portable and pair well with veggies.", gi: "GI: 0", giValue: 0, calories: 80, protein: 6, carbs: 1, fat: 6, tags: ["dairy", "protein", "portable", "kids"], category: "store-bought", cuisine: "Universal" },
  { id: 5, name: "Edamame Pods", description: "These soybeans are fiber-rich and plant-based. Microwave frozen pods for a quick snack.", gi: "GI: 15", giValue: 15, calories: 188, protein: 18, carbs: 14, fat: 8, tags: ["vegan", "protein", "fiber", "asian"], category: "store-bought", cuisine: "Asian" },
  { id: 6, name: "Cottage Cheese (Low-Fat)", description: "A creamy, high-protein option perfect for any time of day. Buy single-serve cups for convenience.", gi: "GI: 10", giValue: 10, calories: 90, protein: 14, carbs: 5, fat: 2, tags: ["dairy", "protein", "breakfast", "muscle"], category: "store-bought", cuisine: "Universal" },
  { id: 7, name: "Pumpkin Seeds (Roasted)", description: "These seeds offer crunch and magnesium. Grab pre-packaged bags for easy snacking.", gi: "GI: 20", giValue: 20, calories: 151, protein: 9, carbs: 4, fat: 13, tags: ["seeds", "protein", "minerals", "keto"], category: "store-bought", cuisine: "Universal" },
  { id: 8, name: "Hummus (Plain)", description: "Store-bought hummus from chickpeas is dip-ready. Choose low-sodium versions for heart health.", gi: "GI: 6-15", giValue: 10, calories: 50, protein: 2, carbs: 5, fat: 3, tags: ["vegan", "fiber", "dip", "mediterranean"], category: "store-bought", cuisine: "Mediterranean" },
  { id: 9, name: "Canned Tuna (in Water)", description: "Low GI protein source you can eat straight from the can. Great for quick meals.", gi: "GI: 0", giValue: 0, calories: 90, protein: 20, carbs: 0, fat: 1, tags: ["protein", "omega-3", "portable", "keto"], category: "store-bought", cuisine: "Universal" },
  { id: 10, name: "Mixed Nuts (Unsalted)", description: "A blend like almonds and walnuts. Portion-controlled packs prevent overeating.", gi: "GI: 0-20", giValue: 10, calories: 170, protein: 5, carbs: 5, fat: 15, tags: ["nuts", "protein", "portable", "heart"], category: "store-bought", cuisine: "Universal" },
  { id: 11, name: "Hard-Boiled Eggs (Pre-Peeled)", description: "Eggs have no GI as they're carb-free. Buy ready-to-eat for simplicity.", gi: "GI: 0", giValue: 0, calories: 70, protein: 6, carbs: 1, fat: 5, tags: ["protein", "keto", "portable", "breakfast"], category: "store-bought", cuisine: "Universal" },
  { id: 12, name: "Chia Seeds", description: "Mix into yogurt for added fiber and omega-3s. Pre-portioned pouches available.", gi: "GI: 1", giValue: 1, calories: 138, protein: 5, carbs: 12, fat: 9, tags: ["seeds", "fiber", "omega-3", "superfood"], category: "store-bought", cuisine: "Universal" },
  { id: 13, name: "Dark Chocolate (70%+ Cocoa)", description: "Antioxidants abound in quality dark chocolate. Choose bars with minimal sugar.", gi: "GI: 25", giValue: 25, calories: 170, protein: 2, carbs: 13, fat: 12, tags: ["treat", "antioxidants", "mood", "dessert"], category: "store-bought", cuisine: "Universal" },
  { id: 14, name: "Apple (Whole)", description: "Fresh apples are naturally low GI with fiber in the skin. Perfect portable fruit.", gi: "GI: 36", giValue: 36, calories: 95, protein: 0, carbs: 25, fat: 0, tags: ["fruit", "fiber", "portable", "natural"], category: "store-bought", cuisine: "Universal" },
  { id: 15, name: "Berries (Fresh/Frozen)", description: "Strawberries or blueberries are antioxidant-rich. Buy in containers for convenience.", gi: "GI: 25-53", giValue: 40, calories: 50, protein: 1, carbs: 12, fat: 0, tags: ["fruit", "antioxidants", "fiber", "breakfast"], category: "store-bought", cuisine: "Universal" },
  { id: 16, name: "Celery Sticks (Pre-Cut)", description: "Crunchy and hydrating with negligible calories. Perfect vehicle for dips.", gi: "GI: 0", giValue: 0, calories: 15, protein: 1, carbs: 3, fat: 0, tags: ["vegetable", "hydrating", "keto", "dip"], category: "store-bought", cuisine: "Universal" },
  { id: 17, name: "Baby Carrots", description: "Beta-carotene boost in ready-to-eat bags. Sweet and crunchy.", gi: "GI: 35", giValue: 35, calories: 35, protein: 1, carbs: 8, fat: 0, tags: ["vegetable", "fiber", "kids", "portable"], category: "store-bought", cuisine: "Universal" },
  { id: 18, name: "Avocado / Guacamole", description: "Creamy fats stabilize blood sugar. Single-serve guac cups available.", gi: "GI: 15", giValue: 15, calories: 160, protein: 2, carbs: 9, fat: 15, tags: ["healthy-fat", "fiber", "keto", "dip"], category: "store-bought", cuisine: "Universal" },
  { id: 19, name: "Olives (Pitted)", description: "Mediterranean flair with healthy fats. Jarred or pouched for convenience.", gi: "GI: 0", giValue: 0, calories: 25, protein: 0, carbs: 1, fat: 3, tags: ["healthy-fat", "mediterranean", "keto", "savory"], category: "store-bought", cuisine: "Mediterranean" },
  { id: 20, name: "Protein Bar (Low-Sugar)", description: "Choose bars with GI under 55, like those with nuts and seeds. Check labels carefully.", gi: "GI: 30-55", giValue: 40, calories: 200, protein: 15, carbs: 10, fat: 8, tags: ["protein", "portable", "fitness", "meal-replacement"], category: "store-bought", cuisine: "Universal" },
  
  // Homemade (21-40)
  { id: 21, name: "Popcorn Trail Mix", description: "Mix air-popped popcorn with nuts and berries. Homemade ensures no added sugars.", gi: "GI: 55", giValue: 55, calories: 150, protein: 4, carbs: 15, fat: 8, tags: ["whole-grain", "fiber", "movie", "homemade"], category: "homemade", cuisine: "American" },
  { id: 22, name: "Peanut Butter Apple Slices", description: "Slice an apple and top with natural peanut butter. Quick and satisfying.", gi: "GI: 36", giValue: 36, calories: 180, protein: 4, carbs: 20, fat: 8, tags: ["fruit", "protein", "kids", "classic"], category: "homemade", cuisine: "American" },
  { id: 23, name: "Veggies and Hummus Dip", description: "Chop carrots and celery; dip in homemade hummus. Fiber and protein combo.", gi: "GI: 10-20", giValue: 15, calories: 120, protein: 5, carbs: 15, fat: 6, tags: ["vegan", "fiber", "dip", "mediterranean"], category: "homemade", cuisine: "Mediterranean" },
  { id: 24, name: "Turkey Roll-Ups", description: "Wrap turkey slices around cheese and veggies. Low carb, high protein.", gi: "GI: 0", giValue: 0, calories: 120, protein: 12, carbs: 3, fat: 6, tags: ["protein", "keto", "portable", "savory"], category: "homemade", cuisine: "American" },
  { id: 25, name: "Greek Yogurt Parfait", description: "Layer yogurt with berries and a sprinkle of nuts. Beautiful and delicious.", gi: "GI: 35-40", giValue: 37, calories: 200, protein: 15, carbs: 15, fat: 5, tags: ["dairy", "protein", "breakfast", "layered"], category: "homemade", cuisine: "Universal" },
  { id: 26, name: "Roasted Chickpeas", description: "Toss chickpeas with oil and spices; bake at 400°F for 20 min. Crunchy perfection.", gi: "GI: 28", giValue: 28, calories: 140, protein: 7, carbs: 18, fat: 4, tags: ["vegan", "protein", "fiber", "crunchy"], category: "homemade", cuisine: "Mediterranean" },
  { id: 27, name: "Avocado Toast (Whole Grain)", description: "Mash avocado on low GI bread. Add lemon for zest and extra flavor.", gi: "GI: 50", giValue: 50, calories: 200, protein: 4, carbs: 20, fat: 10, tags: ["healthy-fat", "fiber", "breakfast", "trendy"], category: "homemade", cuisine: "Universal" },
  { id: 28, name: "Energy Bites (No-Bake)", description: "Mix oats, nut butter, seeds; roll into balls. Refrigerate for grab-and-go snacks.", gi: "GI: 40", giValue: 40, calories: 150, protein: 5, carbs: 12, fat: 8, tags: ["oats", "protein", "portable", "meal-prep"], category: "homemade", cuisine: "Universal" },
  { id: 29, name: "Chia Pudding", description: "Soak chia seeds in almond milk overnight; top with berries. Creamy and nutritious.", gi: "GI: 1", giValue: 1, calories: 200, protein: 5, carbs: 15, fat: 10, tags: ["seeds", "fiber", "breakfast", "overnight"], category: "homemade", cuisine: "Universal" },
  { id: 30, name: "Hard-Boiled Eggs with Avocado", description: "Mash avocado on eggs. Perfect protein-fat combo for satiety.", gi: "GI: 0", giValue: 0, calories: 220, protein: 13, carbs: 5, fat: 15, tags: ["protein", "keto", "healthy-fat", "filling"], category: "homemade", cuisine: "Universal" },
  { id: 31, name: "Berry Yogurt Bark", description: "Freeze yogurt mixed with berries on a sheet. Break into pieces for a cool treat.", gi: "GI: 30", giValue: 30, calories: 120, protein: 8, carbs: 10, fat: 3, tags: ["dairy", "frozen", "kids", "dessert"], category: "homemade", cuisine: "Universal" },
  { id: 32, name: "Tuna Salad on Cucumber", description: "Mix tuna with yogurt; scoop on cucumber slices. Fresh and light.", gi: "GI: 0", giValue: 0, calories: 120, protein: 15, carbs: 5, fat: 3, tags: ["protein", "omega-3", "keto", "fresh"], category: "homemade", cuisine: "Universal" },
  { id: 33, name: "Roasted Zucchini Skins", description: "Bake zucchini halves stuffed with cheese. Low carb comfort food.", gi: "GI: 15", giValue: 15, calories: 100, protein: 7, carbs: 2, fat: 5, tags: ["vegetable", "keto", "cheese", "baked"], category: "homemade", cuisine: "Universal" },
  { id: 34, name: "Nut Butter Celery Sticks", description: "Fill celery with peanut butter; add raisins sparingly. Classic ants on a log.", gi: "GI: 14", giValue: 14, calories: 100, protein: 4, carbs: 6, fat: 8, tags: ["classic", "kids", "protein", "crunchy"], category: "homemade", cuisine: "American" },
  { id: 35, name: "Cottage Cheese with Berries", description: "Mix low-fat cottage cheese with fresh berries. High protein, low effort.", gi: "GI: 10-40", giValue: 25, calories: 150, protein: 15, carbs: 15, fat: 2, tags: ["dairy", "protein", "fruit", "simple"], category: "homemade", cuisine: "Universal" },
  { id: 36, name: "Seed Crackers", description: "Bake seeds into crackers; top with cheese. Grain-free and crunchy.", gi: "GI: 10", giValue: 10, calories: 150, protein: 5, carbs: 5, fat: 10, tags: ["seeds", "keto", "crunchy", "homemade"], category: "homemade", cuisine: "Universal" },
  { id: 37, name: "Protein Shake", description: "Blend protein powder, spinach, and almond milk. Quick post-workout fuel.", gi: "GI: 15", giValue: 15, calories: 150, protein: 25, carbs: 5, fat: 5, tags: ["protein", "fitness", "quick", "shake"], category: "homemade", cuisine: "Universal" },
  { id: 38, name: "Kale Chips", description: "Bake kale with oil and spices. Crispy, salty, and guilt-free.", gi: "GI: 0", giValue: 0, calories: 100, protein: 3, carbs: 7, fat: 5, tags: ["vegetable", "crunchy", "keto", "baked"], category: "homemade", cuisine: "American" },
  { id: 39, name: "Lentil Salad", description: "Cook lentils with veggies and vinaigrette. Protein-packed and filling.", gi: "GI: 30", giValue: 30, calories: 230, protein: 18, carbs: 30, fat: 5, tags: ["vegan", "protein", "fiber", "meal"], category: "homemade", cuisine: "Mediterranean" },
  { id: 40, name: "Overnight Oats with Nuts", description: "Soak oats in yogurt; add nuts. Use steel-cut for lower GI.", gi: "GI: 50", giValue: 50, calories: 250, protein: 10, carbs: 25, fat: 8, tags: ["oats", "fiber", "breakfast", "meal-prep"], category: "homemade", cuisine: "Universal" },
  
  // European (41-50)
  { id: 41, name: "Olives with Feta Cheese", description: "Mediterranean classic: Kalamata olives + crumbled feta. Simple elegance.", gi: "GI: 0", giValue: 0, calories: 150, protein: 6, carbs: 3, fat: 12, tags: ["mediterranean", "cheese", "keto", "savory"], category: "european", cuisine: "Greek" },
  { id: 42, name: "Cucumber with Tzatziki", description: "Greek-inspired: Greek yogurt + grated cucumber + garlic + dill. Refreshing dip.", gi: "GI: 20", giValue: 20, calories: 100, protein: 6, carbs: 8, fat: 4, tags: ["mediterranean", "probiotic", "dip", "fresh"], category: "european", cuisine: "Greek" },
  { id: 43, name: "Spicy Seed Mix", description: "Roast pumpkin/sunflower seeds with paprika, cumin, sea salt. Addictive crunch.", gi: "GI: 20", giValue: 20, calories: 160, protein: 7, carbs: 5, fat: 12, tags: ["seeds", "spicy", "keto", "crunchy"], category: "european", cuisine: "European" },
  { id: 44, name: "Ricotta with Tomato & Basil", description: "Italian simple: Fresh ricotta topped with cherry tomatoes + basil leaves.", gi: "GI: 20", giValue: 20, calories: 180, protein: 14, carbs: 6, fat: 10, tags: ["italian", "cheese", "fresh", "simple"], category: "european", cuisine: "Italian" },
  { id: 45, name: "Sauerkraut with Egg", description: "Eastern European twist: Fermented sauerkraut + sliced hard-boiled egg. Probiotic boost.", gi: "GI: 0", giValue: 0, calories: 100, protein: 7, carbs: 4, fat: 5, tags: ["probiotic", "protein", "fermented", "gut-health"], category: "european", cuisine: "German" },
  { id: 46, name: "Almond Butter on Crispbread", description: "Scandinavian-style: Low GI crispbread + natural almond butter. Crunchy and satisfying.", gi: "GI: 45", giValue: 45, calories: 180, protein: 5, carbs: 15, fat: 10, tags: ["fiber", "protein", "breakfast", "crunchy"], category: "european", cuisine: "Scandinavian" },
  { id: 47, name: "Pea & Mint Dip", description: "British-inspired: Blend peas + mint + yogurt; dip carrots/celery. Vibrant green.", gi: "GI: 30", giValue: 30, calories: 90, protein: 5, carbs: 12, fat: 2, tags: ["vegan", "fiber", "dip", "fresh"], category: "european", cuisine: "British" },
  { id: 48, name: "Cheese & Pear Slices", description: "French-style pairing: Mild cheese (brie or gouda) + fresh pear. Elegant snack.", gi: "GI: 38", giValue: 38, calories: 160, protein: 7, carbs: 12, fat: 9, tags: ["cheese", "fruit", "elegant", "pairing"], category: "european", cuisine: "French" },
  { id: 49, name: "Five-Spice Seed Mix", description: "European-Asian fusion: Roast seeds with five-spice powder. Aromatic crunch.", gi: "GI: 20", giValue: 20, calories: 155, protein: 6, carbs: 4, fat: 13, tags: ["seeds", "fusion", "spicy", "keto"], category: "european", cuisine: "Fusion" },
  { id: 50, name: "Herbed Cottage Cheese", description: "Continental: Cottage cheese mixed with chives, dill, black pepper. Savory twist.", gi: "GI: 10", giValue: 10, calories: 100, protein: 14, carbs: 5, fat: 3, tags: ["dairy", "protein", "herbs", "savory"], category: "european", cuisine: "European" },
  
  // Asian (51-60)
  { id: 51, name: "Edamame with Ginger", description: "Japanese/Chinese: Steamed edamame pods sprinkled with ginger and sea salt.", gi: "GI: 15", giValue: 15, calories: 190, protein: 18, carbs: 14, fat: 8, tags: ["asian", "vegan", "protein", "appetizer"], category: "asian", cuisine: "Japanese" },
  { id: 52, name: "Seaweed Snacks (Nori)", description: "Korean/Japanese: Plain roasted nori sheets. Crispy, salty, almost zero calories.", gi: "GI: 0", giValue: 0, calories: 20, protein: 2, carbs: 2, fat: 1, tags: ["asian", "keto", "minerals", "crispy"], category: "asian", cuisine: "Japanese" },
  { id: 53, name: "Cucumber Sesame Salad", description: "Asian fresh: Sliced cucumber + sesame oil + rice vinegar + sesame seeds.", gi: "GI: 15", giValue: 15, calories: 80, protein: 2, carbs: 6, fat: 6, tags: ["asian", "fresh", "vegan", "light"], category: "asian", cuisine: "Chinese" },
  { id: 54, name: "Chicken Satay Skewers", description: "Thai-inspired: Grilled chicken with peanut sauce (minimal sugar). Protein-packed.", gi: "GI: 0", giValue: 0, calories: 160, protein: 15, carbs: 5, fat: 8, tags: ["thai", "protein", "grilled", "appetizer"], category: "asian", cuisine: "Thai" },
  { id: 55, name: "Five-Spice Kale Chips", description: "Chinese baked: Kale with five-spice powder. Aromatic and crispy.", gi: "GI: 0", giValue: 0, calories: 100, protein: 3, carbs: 7, fat: 5, tags: ["asian", "keto", "vegetable", "baked"], category: "asian", cuisine: "Chinese" },
  { id: 56, name: "Tofu with Soy-Ginger Dip", description: "East Asian: Baked or raw firm tofu + low-sodium soy + ginger. Plant protein.", gi: "GI: 15", giValue: 15, calories: 80, protein: 10, carbs: 3, fat: 5, tags: ["asian", "vegan", "protein", "dip"], category: "asian", cuisine: "Japanese" },
  { id: 57, name: "Miso Soup with Tofu", description: "Japanese quick: Light miso broth + tofu cubes + wakame seaweed. Warming.", gi: "GI: 20", giValue: 20, calories: 60, protein: 6, carbs: 5, fat: 3, tags: ["asian", "soup", "probiotic", "warming"], category: "asian", cuisine: "Japanese" },
  { id: 58, name: "Sesame Asparagus", description: "Grilled or steamed asparagus tossed in sesame seeds/oil. Elegant side.", gi: "GI: 15", giValue: 15, calories: 80, protein: 4, carbs: 6, fat: 5, tags: ["asian", "vegetable", "simple", "elegant"], category: "asian", cuisine: "Japanese" },
  { id: 59, name: "Spicy Kimchi", description: "Korean fermented cabbage. Probiotic powerhouse, tangy and spicy.", gi: "GI: 0", giValue: 0, calories: 30, protein: 2, carbs: 4, fat: 1, tags: ["korean", "probiotic", "fermented", "spicy"], category: "asian", cuisine: "Korean" },
  { id: 60, name: "Cauliflower Fried Rice Bites", description: "Asian-inspired low-carb: Sautéed cauliflower rice with egg + veggies.", gi: "GI: 15", giValue: 15, calories: 100, protein: 6, carbs: 8, fat: 5, tags: ["asian", "keto", "low-carb", "filling"], category: "asian", cuisine: "Chinese" },
  
  // Indian (61-70)
  { id: 61, name: "Roasted Makhana (Fox Nuts)", description: "Classic Indian: Roast with ghee + turmeric + black pepper. Light and crunchy.", gi: "GI: 25", giValue: 25, calories: 120, protein: 9, carbs: 12, fat: 5, tags: ["indian", "ayurvedic", "light", "crunchy"], category: "indian", cuisine: "Indian" },
  { id: 62, name: "Moong Dal Chilla", description: "Savory pancake: Blend soaked moong dal + spices; pan-fry thin. Protein-rich.", gi: "GI: 35", giValue: 35, calories: 140, protein: 10, carbs: 15, fat: 4, tags: ["indian", "protein", "breakfast", "savory"], category: "indian", cuisine: "Indian" },
  { id: 63, name: "Sprouted Moong Chaat", description: "Tangy salad: Sprouts + tomato + onion + lemon + chaat masala. Fresh and zesty.", gi: "GI: 25", giValue: 25, calories: 100, protein: 8, carbs: 15, fat: 2, tags: ["indian", "vegan", "fresh", "tangy"], category: "indian", cuisine: "Indian" },
  { id: 64, name: "Paneer Tikka Bites", description: "Grilled: Marinate paneer cubes + yogurt + spices; grill. Restaurant favorite.", gi: "GI: 0", giValue: 0, calories: 220, protein: 18, carbs: 4, fat: 15, tags: ["indian", "protein", "grilled", "appetizer"], category: "indian", cuisine: "Indian" },
  { id: 65, name: "Dhokla (Steamed)", description: "Gujarati: Fermented chickpea flour steamed; temper with minimal oil. Fluffy and tangy.", gi: "GI: 35", giValue: 35, calories: 110, protein: 6, carbs: 12, fat: 4, tags: ["indian", "fermented", "steamed", "light"], category: "indian", cuisine: "Indian" },
  { id: 66, name: "Chana Sundal", description: "South Indian stir-fry: Boiled chickpeas + coconut + mustard seeds. Fiber-rich.", gi: "GI: 30", giValue: 30, calories: 130, protein: 7, carbs: 15, fat: 5, tags: ["indian", "vegan", "fiber", "south-indian"], category: "indian", cuisine: "Indian" },
  { id: 67, name: "Masala Roasted Chickpeas", description: "Spiced: Roast chickpeas with Indian spices. Crunchy protein snack.", gi: "GI: 28", giValue: 28, calories: 140, protein: 7, carbs: 18, fat: 4, tags: ["indian", "vegan", "protein", "spicy"], category: "indian", cuisine: "Indian" },
  { id: 68, name: "Dalia Upma Mini", description: "Savory porridge bites: Cook broken wheat with veggies + spices. Filling.", gi: "GI: 45", giValue: 45, calories: 150, protein: 5, carbs: 20, fat: 4, tags: ["indian", "whole-grain", "fiber", "filling"], category: "indian", cuisine: "Indian" },
  { id: 69, name: "Sprouts Bhel", description: "No sev version: Mixed sprouts + veggies + tamarind chutney (low sugar). Tangy.", gi: "GI: 25", giValue: 25, calories: 130, protein: 8, carbs: 18, fat: 3, tags: ["indian", "vegan", "tangy", "street-food"], category: "indian", cuisine: "Indian" },
  { id: 70, name: "Besan Ladoo (Low-Sugar)", description: "Mini version using stevia/less ghee: Roast besan + nuts; shape small. Treat.", gi: "GI: 45", giValue: 45, calories: 140, protein: 5, carbs: 12, fat: 8, tags: ["indian", "dessert", "treat", "festive"], category: "indian", cuisine: "Indian" },
  
  // More European/Mediterranean (71-80)
  { id: 71, name: "Tomato & Mozzarella Skewers", description: "Italian caprese style: Cherry tomatoes + fresh mozzarella balls + basil drizzle.", gi: "GI: 25", giValue: 25, calories: 180, protein: 10, carbs: 6, fat: 12, tags: ["italian", "cheese", "fresh", "elegant"], category: "european", cuisine: "Italian" },
  { id: 72, name: "Baked Zucchini Fries", description: "Mediterranean oven-baked: Slice zucchini, coat lightly in olive oil + herbs, bake.", gi: "GI: 15", giValue: 15, calories: 100, protein: 3, carbs: 8, fat: 6, tags: ["mediterranean", "vegetable", "baked", "healthy"], category: "european", cuisine: "Mediterranean" },
  { id: 73, name: "Prosciutto-Wrapped Asparagus", description: "Simple European: Wrap thin prosciutto around asparagus spears; grill or eat raw.", gi: "GI: 15", giValue: 15, calories: 100, protein: 8, carbs: 4, fat: 6, tags: ["italian", "protein", "elegant", "keto"], category: "european", cuisine: "Italian" },
  { id: 74, name: "Greek Yogurt Cucumber Dill Dip", description: "Tzatziki-inspired: Plain Greek yogurt mixed with grated cucumber + dill.", gi: "GI: 20", giValue: 20, calories: 110, protein: 12, carbs: 6, fat: 4, tags: ["greek", "probiotic", "dip", "fresh"], category: "european", cuisine: "Greek" },
  { id: 75, name: "Walnut & Blue Cheese Bites", description: "French-style pairing: Small cubes of blue cheese + walnut halves. Bold flavors.", gi: "GI: 0", giValue: 0, calories: 190, protein: 8, carbs: 4, fat: 15, tags: ["french", "cheese", "nuts", "bold"], category: "european", cuisine: "French" },
  { id: 76, name: "Roasted Beetroot with Goat Cheese", description: "European root veg: Roast beets, top with goat cheese. Earthy and creamy.", gi: "GI: 38", giValue: 38, calories: 140, protein: 7, carbs: 12, fat: 8, tags: ["european", "cheese", "root-veg", "colorful"], category: "european", cuisine: "European" },
  { id: 77, name: "Chia Seed Crackers", description: "Scandinavian-inspired: Bake chia seeds + water + herbs into thin crackers.", gi: "GI: 1", giValue: 1, calories: 110, protein: 4, carbs: 8, fat: 7, tags: ["seeds", "fiber", "keto", "crunchy"], category: "european", cuisine: "Scandinavian" },
  { id: 78, name: "Sardines on Cucumber", description: "Mediterranean canned fish: Sardines (in olive oil, drained) on cucumber slices.", gi: "GI: 0", giValue: 0, calories: 150, protein: 12, carbs: 3, fat: 10, tags: ["mediterranean", "omega-3", "protein", "quick"], category: "european", cuisine: "Mediterranean" },
  { id: 79, name: "Herb-Roasted Chickpeas", description: "Continental spiced: Roast chickpeas with rosemary + garlic. Aromatic crunch.", gi: "GI: 28", giValue: 28, calories: 140, protein: 7, carbs: 18, fat: 4, tags: ["mediterranean", "vegan", "herbs", "crunchy"], category: "european", cuisine: "Mediterranean" },
  { id: 80, name: "Pear & Ricotta Toast", description: "On low GI crispbread: Ricotta on whole-grain crispbread + sliced pear.", gi: "GI: 40", giValue: 40, calories: 160, protein: 8, carbs: 15, fat: 6, tags: ["italian", "cheese", "fruit", "breakfast"], category: "european", cuisine: "Italian" },
  
  // More Asian (81-90)
  { id: 81, name: "Gyoza-Style Cabbage Rolls", description: "Japanese-inspired low-carb: Steam cabbage leaves filled with ground turkey + ginger.", gi: "GI: 15", giValue: 15, calories: 120, protein: 12, carbs: 6, fat: 5, tags: ["japanese", "protein", "low-carb", "steamed"], category: "asian", cuisine: "Japanese" },
  { id: 82, name: "Miso-Glazed Eggplant", description: "Japanese nasu dengaku mini: Grill eggplant slices with light miso. Umami-rich.", gi: "GI: 20", giValue: 20, calories: 80, protein: 4, carbs: 10, fat: 3, tags: ["japanese", "vegetable", "umami", "grilled"], category: "asian", cuisine: "Japanese" },
  { id: 83, name: "Thai Cucumber Salad", description: "Som tam style, no sugar: Cucumber + lime + chili + peanuts. Spicy and fresh.", gi: "GI: 15", giValue: 15, calories: 110, protein: 4, carbs: 8, fat: 8, tags: ["thai", "fresh", "spicy", "salad"], category: "asian", cuisine: "Thai" },
  { id: 84, name: "Steamed Broccoli Sesame", description: "Chinese simple: Steam broccoli, toss with sesame oil + seeds. Nutrient-dense.", gi: "GI: 15", giValue: 15, calories: 100, protein: 5, carbs: 8, fat: 6, tags: ["chinese", "vegetable", "simple", "healthy"], category: "asian", cuisine: "Chinese" },
  { id: 85, name: "Shrimp & Avocado Rolls", description: "Vietnamese-inspired: Use lettuce wraps with shrimp + avocado + herbs. Fresh.", gi: "GI: 15", giValue: 15, calories: 140, protein: 10, carbs: 6, fat: 8, tags: ["vietnamese", "protein", "fresh", "light"], category: "asian", cuisine: "Vietnamese" },
  { id: 86, name: "Ginger-Turmeric Tea + Almonds", description: "Asian warming drink + nuts: Herbal tea + handful almonds. Anti-inflammatory.", gi: "GI: 0", giValue: 0, calories: 170, protein: 6, carbs: 6, fat: 14, tags: ["asian", "warming", "anti-inflammatory", "nuts"], category: "asian", cuisine: "Asian" },
  { id: 87, name: "Korean Spinach Namul", description: "Seasoned greens: Blanched spinach with garlic + sesame. Simple side dish.", gi: "GI: 15", giValue: 15, calories: 80, protein: 4, carbs: 5, fat: 5, tags: ["korean", "vegetable", "side", "sesame"], category: "asian", cuisine: "Korean" },
  { id: 88, name: "Tofu Satay Skewers", description: "Indonesian-inspired: Grilled tofu with peanut sauce (low-sugar). Plant protein.", gi: "GI: 15", giValue: 15, calories: 180, protein: 12, carbs: 6, fat: 10, tags: ["indonesian", "vegan", "grilled", "protein"], category: "asian", cuisine: "Indonesian" },
  { id: 89, name: "Wakame Seaweed Salad", description: "Japanese simple: Rehydrated wakame + sesame + vinegar. Mineral-rich.", gi: "GI: 0", giValue: 0, calories: 50, protein: 3, carbs: 4, fat: 3, tags: ["japanese", "minerals", "light", "salad"], category: "asian", cuisine: "Japanese" },
  { id: 90, name: "Garlic Bok Choy Stir-Fry", description: "Chinese quick veg: Sauté bok choy in minimal oil + garlic. Quick and healthy.", gi: "GI: 15", giValue: 15, calories: 70, protein: 3, carbs: 6, fat: 4, tags: ["chinese", "vegetable", "quick", "garlic"], category: "asian", cuisine: "Chinese" },
  
  // More Indian (91-100)
  { id: 91, name: "Ragi Porridge Bites", description: "South Indian finger millet: Cook ragi flour into small steamed bites. Calcium-rich.", gi: "GI: 45", giValue: 45, calories: 120, protein: 5, carbs: 15, fat: 3, tags: ["indian", "millet", "calcium", "traditional"], category: "indian", cuisine: "Indian" },
  { id: 92, name: "Paneer Bhurji Lettuce Wraps", description: "North Indian scrambled paneer: Paneer scrambled with spices in lettuce leaves.", gi: "GI: 0", giValue: 0, calories: 200, protein: 15, carbs: 5, fat: 12, tags: ["indian", "protein", "keto", "wraps"], category: "indian", cuisine: "Indian" },
  { id: 93, name: "Jowar Popcorn", description: "Millet popped like corn: Roast jowar grains lightly. Ancient grain snack.", gi: "GI: 40", giValue: 40, calories: 100, protein: 4, carbs: 15, fat: 2, tags: ["indian", "millet", "whole-grain", "crunchy"], category: "indian", cuisine: "Indian" },
  { id: 94, name: "Karela Chips (Bitter Gourd)", description: "Bake thin karela slices with spices. Blood sugar friendly vegetable.", gi: "GI: 0", giValue: 0, calories: 60, protein: 2, carbs: 6, fat: 3, tags: ["indian", "vegetable", "diabetic", "baked"], category: "indian", cuisine: "Indian" },
  { id: 95, name: "Besan Cheela Mini", description: "Chickpea flour pancake: Small savory cheela with veggies. Protein-packed.", gi: "GI: 35", giValue: 35, calories: 130, protein: 8, carbs: 12, fat: 5, tags: ["indian", "protein", "savory", "breakfast"], category: "indian", cuisine: "Indian" },
  { id: 96, name: "Curd with Roasted Jeera", description: "Spiced yogurt: Plain curd + roasted cumin powder. Cooling and digestive.", gi: "GI: 30", giValue: 30, calories: 100, protein: 10, carbs: 6, fat: 4, tags: ["indian", "probiotic", "cooling", "digestive"], category: "indian", cuisine: "Indian" },
  { id: 97, name: "Bajra Khakhra Bites", description: "Millet crisp: Break bajra khakhra into pieces. Traditional Gujarati snack.", gi: "GI: 40", giValue: 40, calories: 120, protein: 5, carbs: 15, fat: 4, tags: ["indian", "millet", "crispy", "traditional"], category: "indian", cuisine: "Indian" },
  { id: 98, name: "Methi Thepla Mini", description: "Fenugreek flatbread small: Make mini theplas with whole wheat + methi. Herby.", gi: "GI: 50", giValue: 50, calories: 140, protein: 6, carbs: 18, fat: 5, tags: ["indian", "whole-grain", "herbs", "portable"], category: "indian", cuisine: "Indian" },
  { id: 99, name: "Chana Jor Garam", description: "Roasted Bengal gram: Spiced roasted chana. Classic street snack.", gi: "GI: 28", giValue: 28, calories: 140, protein: 8, carbs: 18, fat: 4, tags: ["indian", "protein", "street-food", "crunchy"], category: "indian", cuisine: "Indian" },
  { id: 100, name: "Avocado Raita", description: "Fusion with Indian yogurt: Mashed avocado in spiced curd. Creamy and unique.", gi: "GI: 20", giValue: 20, calories: 150, protein: 6, carbs: 8, fat: 10, tags: ["indian", "fusion", "healthy-fat", "creamy"], category: "indian", cuisine: "Indian" },
  
  // American (101-120)
  { id: 101, name: "Turkey & Avocado Roll-Ups", description: "Deli-style: Turkey slices + avocado wrapped. Protein and healthy fats.", gi: "GI: 0", giValue: 0, calories: 160, protein: 12, carbs: 5, fat: 10, tags: ["american", "protein", "keto", "portable"], category: "american", cuisine: "American" },
  { id: 102, name: "Cottage Cheese with Pineapple", description: "Classic combo, small portion: Low-fat cottage cheese + fresh pineapple chunks.", gi: "GI: 40", giValue: 40, calories: 120, protein: 14, carbs: 10, fat: 2, tags: ["american", "protein", "fruit", "classic"], category: "american", cuisine: "American" },
  { id: 103, name: "Popcorn with Nutritional Yeast", description: "Savory movie snack: Popcorn + yeast for cheesy flavor. Whole grain.", gi: "GI: 55", giValue: 55, calories: 110, protein: 5, carbs: 18, fat: 2, tags: ["american", "whole-grain", "savory", "movie"], category: "american", cuisine: "American" },
  { id: 104, name: "Peanut Butter Celery Boats", description: "American classic: Celery filled with natural peanut butter. Crunchy and creamy.", gi: "GI: 14", giValue: 14, calories: 130, protein: 5, carbs: 6, fat: 9, tags: ["american", "classic", "protein", "kids"], category: "american", cuisine: "American" },
  { id: 105, name: "Tuna Stuffed Avocado", description: "Half avocado: Canned tuna mixed in avocado half. Omega-3 powerhouse.", gi: "GI: 15", giValue: 15, calories: 220, protein: 15, carbs: 8, fat: 15, tags: ["american", "protein", "omega-3", "filling"], category: "american", cuisine: "American" },
  { id: 106, name: "Kale Chips with Parmesan", description: "Baked American: Bake kale + sprinkle Parmesan. Cheesy and crispy.", gi: "GI: 0", giValue: 0, calories: 100, protein: 5, carbs: 8, fat: 6, tags: ["american", "vegetable", "cheese", "baked"], category: "american", cuisine: "American" },
  { id: 107, name: "Egg Salad on Lettuce", description: "Picnic-style: Hard-boiled eggs mashed + light mayo, on lettuce leaves.", gi: "GI: 0", giValue: 0, calories: 160, protein: 12, carbs: 3, fat: 10, tags: ["american", "protein", "classic", "keto"], category: "american", cuisine: "American" },
  { id: 108, name: "Chia Seed Energy Balls", description: "No-bake American: Chia + nut butter + cocoa (unsweetened). Nutrient-dense.", gi: "GI: 15", giValue: 15, calories: 150, protein: 6, carbs: 10, fat: 10, tags: ["american", "seeds", "portable", "energy"], category: "american", cuisine: "American" },
  { id: 109, name: "Greek Yogurt Ranch Dip", description: "Ranch-style, low-fat: Yogurt + herbs as dip for carrots/celery.", gi: "GI: 25", giValue: 25, calories: 120, protein: 12, carbs: 10, fat: 3, tags: ["american", "dip", "probiotic", "veggies"], category: "american", cuisine: "American" },
  { id: 110, name: "Dark Chocolate Almonds", description: "70%+ cocoa, minimal: Small handful. Antioxidants and healthy fats.", gi: "GI: 25", giValue: 25, calories: 170, protein: 5, carbs: 10, fat: 12, tags: ["american", "treat", "antioxidants", "nuts"], category: "american", cuisine: "American" },
  { id: 111, name: "Chicken Salad Lettuce Wraps", description: "Deli-inspired: Shredded chicken + yogurt dressing in lettuce.", gi: "GI: 0", giValue: 0, calories: 140, protein: 15, carbs: 5, fat: 6, tags: ["american", "protein", "low-carb", "wraps"], category: "american", cuisine: "American" },
  { id: 112, name: "Berry & Nut Parfait", description: "Layered yogurt: Greek yogurt + berries + walnuts. Protein-rich breakfast.", gi: "GI: 35", giValue: 35, calories: 200, protein: 15, carbs: 12, fat: 10, tags: ["american", "breakfast", "protein", "layered"], category: "american", cuisine: "American" },
  { id: 113, name: "Baked Apple Chips", description: "Cinnamon-spiced: Thin apple slices baked. Sweet and crunchy.", gi: "GI: 35", giValue: 35, calories: 60, protein: 1, carbs: 15, fat: 0, tags: ["american", "fruit", "sweet", "baked"], category: "american", cuisine: "American" },
  { id: 114, name: "Salmon Jerky", description: "Store-bought low-sugar: High-protein jerky. Omega-3 rich.", gi: "GI: 0", giValue: 0, calories: 90, protein: 10, carbs: 2, fat: 5, tags: ["american", "protein", "omega-3", "portable"], category: "american", cuisine: "American" },
  { id: 115, name: "Pumpkin Seed Trail Mix", description: "No-sugar American mix: Pumpkin seeds + almonds + dark chocolate bits.", gi: "GI: 20", giValue: 20, calories: 180, protein: 8, carbs: 6, fat: 15, tags: ["american", "seeds", "nuts", "portable"], category: "american", cuisine: "American" },
  { id: 116, name: "Deviled Eggs", description: "Classic picnic: Hard-boiled eggs with mustard + herbs. Always a hit.", gi: "GI: 0", giValue: 0, calories: 100, protein: 6, carbs: 1, fat: 8, tags: ["american", "protein", "classic", "party"], category: "american", cuisine: "American" },
  { id: 117, name: "Hummus & Bell Pepper Strips", description: "American veggie dip: Plain hummus + red peppers. Colorful and crunchy.", gi: "GI: 15", giValue: 15, calories: 120, protein: 4, carbs: 12, fat: 6, tags: ["american", "dip", "vegan", "colorful"], category: "american", cuisine: "American" },
  { id: 118, name: "Overnight Chia Oats", description: "Small portion, steel-cut: Chia + oats + almond milk + nuts. Prep ahead.", gi: "GI: 50", giValue: 50, calories: 200, protein: 8, carbs: 20, fat: 8, tags: ["american", "oats", "fiber", "breakfast"], category: "american", cuisine: "American" },
  { id: 119, name: "Cheese & Olive Skewers", description: "Simple American party: Cubes of cheddar + olives on picks.", gi: "GI: 0", giValue: 0, calories: 160, protein: 8, carbs: 3, fat: 12, tags: ["american", "cheese", "party", "keto"], category: "american", cuisine: "American" },
  { id: 120, name: "Protein Smoothie Bowl", description: "Blended low-GI: Protein powder + spinach + berries + almond butter.", gi: "GI: 25", giValue: 25, calories: 220, protein: 20, carbs: 10, fat: 10, tags: ["american", "protein", "breakfast", "fitness"], category: "american", cuisine: "American" },
];

// --- UNIQUE TAGS ---
const ALL_TAGS = Array.from(new Set(SNACKS_DATA.flatMap(s => s.tags))).sort();

// --- CATEGORIES ---
const CATEGORIES = [
  { key: 'all', label: 'All Snacks', emoji: '🍽️', count: SNACKS_DATA.length },
  { key: 'store-bought', label: 'Store-Bought', emoji: '🛒', count: SNACKS_DATA.filter(s => s.category === 'store-bought').length },
  { key: 'homemade', label: 'Homemade', emoji: '👨‍🍳', count: SNACKS_DATA.filter(s => s.category === 'homemade').length },
  { key: 'european', label: 'European', emoji: '🇪🇺', count: SNACKS_DATA.filter(s => s.category === 'european').length },
  { key: 'asian', label: 'Asian', emoji: '🥢', count: SNACKS_DATA.filter(s => s.category === 'asian').length },
  { key: 'indian', label: 'Indian', emoji: '🇮🇳', count: SNACKS_DATA.filter(s => s.category === 'indian').length },
  { key: 'american', label: 'American', emoji: '🇺🇸', count: SNACKS_DATA.filter(s => s.category === 'american').length },
];

// --- GI LEVEL HELPER ---
const getGiLevel = (gi: number): { label: string; color: string; bg: string } => {
  if (gi <= 20) return { label: 'Very Low', color: 'text-emerald-700', bg: 'bg-emerald-100' };
  if (gi <= 40) return { label: 'Low', color: 'text-green-700', bg: 'bg-green-100' };
  if (gi <= 55) return { label: 'Low-Medium', color: 'text-yellow-700', bg: 'bg-yellow-100' };
  return { label: 'Medium', color: 'text-orange-700', bg: 'bg-orange-100' };
};

// --- SNACK CARD COMPONENT ---
const SnackCard = ({ snack }: { snack: Snack }) => {
  const giLevel = getGiLevel(snack.giValue);
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-emerald-300 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
          {snack.id}. {snack.name}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${giLevel.bg} ${giLevel.color} whitespace-nowrap`}>
          {snack.gi}
        </span>
      </div>
      
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{snack.description}</p>
      
      {/* Macros */}
      <div className="grid grid-cols-4 gap-2 mb-4 text-center">
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-sm font-bold text-slate-900">{snack.calories}</div>
          <div className="text-xs text-slate-500">cal</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-2">
          <div className="text-sm font-bold text-blue-700">{snack.protein}g</div>
          <div className="text-xs text-slate-500">protein</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-2">
          <div className="text-sm font-bold text-amber-700">{snack.carbs}g</div>
          <div className="text-xs text-slate-500">carbs</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-2">
          <div className="text-sm font-bold text-purple-700">{snack.fat}g</div>
          <div className="text-xs text-slate-500">fat</div>
        </div>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">
          {snack.cuisine}
        </span>
        {snack.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function LowGlycemicSnacksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter Logic
  const filteredSnacks = useMemo(() => {
    return SNACKS_DATA.filter(snack => {
      const matchesSearch = 
        snack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snack.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = activeCategory === 'all' || snack.category === activeCategory;
      
      const matchesTags = activeTags.length === 0 || activeTags.some(tag => snack.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchTerm, activeCategory, activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setActiveTags([]);
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HERO SECTION */}
      <header className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-semibold mb-6 tracking-wide uppercase">
            <CheckCircle2 size={16} /> Updated for 2026 • 120 Snacks
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            120 <span className="text-emerald-400">Low Glycemic Snacks</span> for Stable Blood Sugar
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            The ultimate list of <strong>low GI snacks</strong> with complete macros and calories. Perfect for diabetics, weight loss, or anyone who wants sustained energy without blood sugar spikes. Includes store-bought, homemade, Indian, Asian &amp; Mediterranean options.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Track Snacks with Snapie AI
            </a>
            <a href="#snack-list" className="text-slate-300 hover:text-white font-medium underline underline-offset-4 decoration-slate-500 hover:decoration-white transition-all">
              Jump to Snack List ↓
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 -mt-20 relative z-20 mb-20">
        
        {/* INTRO CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Are <span className="text-emerald-600">Low Glycemic Snacks</span>?</h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            <strong>Low glycemic snacks</strong> are foods with a <strong>glycemic index (GI) of 55 or less</strong> that are digested slowly, causing a gradual rise in blood sugar. Unlike <strong>high glycemic foods</strong> that spike your glucose and leave you crashing, <strong>low GI snacks</strong> provide sustained energy for hours.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            This comprehensive <strong>glycemic index food chart</strong> includes 120 snacks with complete macros—from quick store-bought options like almonds (<strong>apple glycemic index: 36</strong>) to homemade recipes. Whether you&apos;re managing diabetes or following a <strong>low glycemic diet plan</strong>, these snacks will keep your blood sugar stable. Check out our <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="text-emerald-600 hover:text-emerald-700 font-semibold underline">complete low glycemic foods list</Link> for even more options.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-600">120</div>
              <div className="text-sm text-slate-600">Low GI Snacks</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">6</div>
              <div className="text-sm text-slate-600">Cuisine Styles</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-amber-600">GI ≤55</div>
              <div className="text-sm text-slate-600">All Snacks</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-slate-600">With Macros</div>
            </div>
          </div>

          {/* Internal Links */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-slate-700 font-medium mb-2">📚 Related Resources:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/guide/7-Day-Low-Glycemic-Diet-Plan-for-Beginners" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline text-sm font-medium">
                7-Day Low GI Diet Plan →
              </Link>
              <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline text-sm font-medium">
                500+ Low GI Foods List →
              </Link>
              <Link href="/calculators/macro-calculator" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline text-sm font-medium">
                Macro Calculator →
              </Link>
              <Link href="/calculators/calorie-deficit-calculator" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline text-sm font-medium">
                Calorie Deficit Calculator →
              </Link>
            </div>
          </div>
        </div>

        {/* UNDERSTANDING GI SECTION */}
        <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-10 border border-emerald-100 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Info className="w-7 h-7 text-emerald-600" />
            Understanding the <span className="text-emerald-600">Glycemic Index Chart</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl p-5 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="font-bold text-emerald-700">Low GI (0-55)</span>
              </div>
              <p className="text-sm text-slate-600">Slow digestion, gradual blood sugar rise. Best for stable energy. Examples: almonds, <strong>low gi oats</strong>, berries, <strong>low glycemic fruits</strong>.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="font-bold text-yellow-700">Medium GI (56-69)</span>
              </div>
              <p className="text-sm text-slate-600">Moderate blood sugar impact. Enjoy in moderation. Examples: <strong>banana glycemic index</strong> varies (51-62), some breads.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="font-bold text-red-700">High GI (70+)</span>
              </div>
              <p className="text-sm text-slate-600">Rapid blood sugar spikes. Avoid for stable energy. Examples: <strong>high glycemic foods</strong> like white bread, candy, chips.</p>
            </div>
          </div>
          <p className="text-slate-700 text-sm">
            <strong>Pro tip:</strong> The <strong>glycemic index of foods</strong> can vary based on ripeness, cooking method, and what you eat them with. Pairing carbs with protein or fat lowers overall GI impact. Use our <Link href="/calculators/macro-calculator" className="text-emerald-600 hover:underline font-semibold">macro calculator</Link> to balance your snacks.
          </p>
        </div>

        {/* SNAPIE AI CTA */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 mb-12 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
              <Image
                src="/logo.png"
                alt="Snapie AI"
                width={56}
                height={56}
                className="rounded-xl"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Track Your Snacks Instantly with Snapie AI</h3>
              <p className="text-slate-300 mb-4">Snap a photo of any snack and get instant calories, macros, and glycemic index. No more guessing or manual logging!</p>
              <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                <span className="text-white ml-2 text-sm">4.8/5 from 300+ users</span>
              </div>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Get Free on Play Store
            </a>
          </div>
        </div>

        {/* SNACK LIST SECTION */}
        <section id="snack-list" className="scroll-mt-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search snacks by name, ingredient, or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${
                showFilters || activeTags.length > 0
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Filter size={20} />
              Filters {activeTags.length > 0 && `(${activeTags.length})`}
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.key ? 'bg-white/20' : 'bg-slate-200'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tags Filter Panel */}
          {showFilters && (
            <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Filter by Tags</h3>
                {activeTags.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <X size={16} /> Clear all
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeTags.includes(tag)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">
              Showing <span className="font-bold text-emerald-600">{filteredSnacks.length}</span> of {SNACKS_DATA.length} <strong>low glycemic snacks</strong>
            </p>
            {(searchTerm || activeCategory !== 'all' || activeTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Snack Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSnacks.map(snack => (
              <SnackCard key={snack.id} snack={snack} />
            ))}
          </div>

          {/* No Results */}
          {filteredSnacks.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No snacks found</h3>
              <p className="text-slate-600 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* MID-PAGE CTA */}
        <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-6 my-12 border border-emerald-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Snapie AI"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <div>
                <p className="font-bold text-slate-800">Found your perfect snack?</p>
                <p className="text-sm text-slate-600">Track it instantly with Snapie AI - just snap a photo!</p>
              </div>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              Download Free
            </a>
          </div>
        </div>

        {/* BENEFITS SECTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Why Choose <span className="text-emerald-600">Low GI Snacks</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Sustained Energy</h3>
              <p className="text-slate-600 text-sm">Unlike <strong>high glycemic foods</strong> that cause crashes, <strong>low glycemic snacks</strong> provide steady fuel for hours without energy dips.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Better Blood Sugar Control</h3>
              <p className="text-slate-600 text-sm">Following a <strong>glycemic index chart for diabetics</strong> helps manage glucose levels naturally, reducing medication needs over time.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Weight Management</h3>
              <p className="text-slate-600 text-sm"><strong>Low glycemic load foods</strong> keep you fuller longer, reducing cravings and helping you stick to your <Link href="/calculators/calorie-deficit-calculator" className="text-emerald-600 hover:underline">calorie deficit</Link>.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Apple className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Nutrient Dense</h3>
              <p className="text-slate-600 text-sm">Most <strong>low GI snacks</strong> are whole foods rich in fiber, protein, vitamins, and minerals—unlike processed high GI alternatives.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Heart Health</h3>
              <p className="text-slate-600 text-sm">Studies show <strong>foods low in glycemic index</strong> improve cholesterol levels and reduce inflammation markers linked to heart disease.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Better Focus</h3>
              <p className="text-slate-600 text-sm">Stable blood sugar means stable brain function. <strong>Low glycemic index snacks</strong> help maintain concentration and mental clarity.</p>
            </div>
          </div>
        </section>

        {/* GI VALUES QUICK REFERENCE */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Quick <span className="text-emerald-600">Glycemic Index Reference</span> for Popular Snacks
          </h2>
          <p className="text-slate-600 mb-6">
            Use this <strong>gi index chart</strong> as a quick reference when choosing snacks. Remember, <strong>low gi snacks</strong> (GI ≤55) are your best choice for stable blood sugar.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} /> Low GI Snacks (Best Choices)
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Almonds, Walnuts, Peanuts</span>
                  <span className="font-semibold text-emerald-600">GI: 0-15</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Greek Yogurt (plain)</span>
                  <span className="font-semibold text-emerald-600">GI: 35-40</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span><strong>Apple glycemic index</strong></span>
                  <span className="font-semibold text-emerald-600">GI: 36</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Berries (strawberries, blueberries)</span>
                  <span className="font-semibold text-emerald-600">GI: 25-53</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Dark Chocolate (70%+)</span>
                  <span className="font-semibold text-emerald-600">GI: 25</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span><strong>Oatmeal glycemic index</strong> (steel-cut)</span>
                  <span className="font-semibold text-emerald-600">GI: 42-55</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Hummus</span>
                  <span className="font-semibold text-emerald-600">GI: 6-15</span>
                </li>
                <li className="flex justify-between py-2">
                  <span><strong>Popcorn glycemic index</strong> (air-popped)</span>
                  <span className="font-semibold text-emerald-600">GI: 55</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <X size={18} /> High GI Snacks (Avoid)
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>White Bread</span>
                  <span className="font-semibold text-red-600">GI: 75</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Potato Chips</span>
                  <span className="font-semibold text-red-600">GI: 70-80</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Rice Cakes</span>
                  <span className="font-semibold text-red-600">GI: 82</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Watermelon (<strong>high glycemic fruits</strong>)</span>
                  <span className="font-semibold text-red-600">GI: 76</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Pretzels</span>
                  <span className="font-semibold text-red-600">GI: 83</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Instant Oatmeal (flavored)</span>
                  <span className="font-semibold text-red-600">GI: 79</span>
                </li>
                <li className="flex justify-between py-2 border-b border-slate-100">
                  <span>Candy / Gummies</span>
                  <span className="font-semibold text-red-600">GI: 80+</span>
                </li>
                <li className="flex justify-between py-2">
                  <span>Corn Flakes</span>
                  <span className="font-semibold text-red-600">GI: 81</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-xl border border-slate-200 p-5 group">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                What are the best low GI snacks for diabetics?
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600">
                The best <strong>low glycemic index snacks</strong> for diabetics include: nuts (almonds, walnuts - GI: 0), Greek yogurt (GI: 35), hard-boiled eggs (GI: 0), cheese, vegetables with hummus, and <strong>low glycemic fruits</strong> like berries and apples. These foods have minimal impact on blood sugar while providing essential nutrients. Check our <strong>glycemic index chart for diabetics</strong> above for more options.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-slate-200 p-5 group">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                Is popcorn a good low glycemic snack?
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600">
                Yes! <strong>Popcorn glycemic index</strong> is 55 (air-popped), making it a borderline low GI snack. It&apos;s a whole grain with fiber that slows digestion. However, avoid movie theater popcorn or heavily buttered varieties. For the healthiest option, air-pop at home and season with herbs or nutritional yeast instead of sugar.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-slate-200 p-5 group">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                What fruits are low in glycemic index?
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600">
                <strong>Low gi fruits</strong> include: berries (GI: 25-40), <strong>apple glycemic index</strong> (36), pears (38), oranges (43), peaches (42), plums (39), grapefruit (25), and <strong>kiwi glycemic index</strong> (50). The <strong>banana glycemic index</strong> varies from 51 (unripe) to 62 (very ripe). Avoid <strong>high glycemic fruits</strong> like watermelon (76) and overripe tropical fruits.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-slate-200 p-5 group">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                What&apos;s the difference between glycemic index and glycemic load?
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600">
                The <strong>glycemic index</strong> measures how quickly a food raises blood sugar on a scale of 0-100. <strong>Glycemic load</strong> considers both GI and portion size, giving a more accurate picture. For example, watermelon has a high GI (76) but low GL (4) because a typical serving has few carbs. Both metrics are useful for choosing <strong>low glycemic load foods</strong>. Check our <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="text-emerald-600 hover:underline font-semibold">glycemic index and glycemic load chart</Link> for details.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-slate-200 p-5 group">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                How do I incorporate low GI snacks into my diet?
                <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-slate-600">
                Start by replacing <strong>high glycemic foods</strong> with <strong>low gi snacks</strong> from this list. Pair carbs with protein or healthy fats to lower overall GI impact. Plan ahead by prepping homemade snacks or stocking store-bought staples. Use our <Link href="/guide/7-Day-Low-Glycemic-Diet-Plan-for-Beginners" className="text-emerald-600 hover:underline font-semibold">7-day low glycemic diet plan</Link> for a complete eating framework.
              </p>
            </details>
          </div>
        </section>

        {/* RELATED CONTENT */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group">
              <span className="text-2xl mb-2 block">📋</span>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">500+ Low GI Foods List</h3>
              <p className="text-sm text-slate-600">Complete searchable database of low glycemic foods</p>
            </Link>
            <Link href="/guide/7-Day-Low-Glycemic-Diet-Plan-for-Beginners" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group">
              <span className="text-2xl mb-2 block">📅</span>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">7-Day Low GI Diet Plan</h3>
              <p className="text-sm text-slate-600">Complete meal plan with recipes and macros</p>
            </Link>
            <Link href="/calculators/macro-calculator" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group">
              <span className="text-2xl mb-2 block">🧮</span>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">Macro Calculator</h3>
              <p className="text-sm text-slate-600">Calculate your ideal protein, carbs, and fat</p>
            </Link>
            <Link href="/calculators/calorie-deficit-calculator" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group">
              <span className="text-2xl mb-2 block">🔥</span>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">Calorie Deficit Calculator</h3>
              <p className="text-sm text-slate-600">Find your optimal deficit for weight loss</p>
            </Link>
            <Link href="/calculators/tdee-calculator" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group">
              <span className="text-2xl mb-2 block">⚡</span>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">TDEE Calculator</h3>
              <p className="text-sm text-slate-600">Calculate your total daily energy expenditure</p>
            </Link>
            <Link href="/calculators/protein-intake-calculator" className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group">
              <span className="text-2xl mb-2 block">💪</span>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">Protein Calculator</h3>
              <p className="text-sm text-slate-600">Find your daily protein needs</p>
            </Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Image
                src="/logo.png"
                alt="Snapie AI"
                width={56}
                height={56}
                className="rounded-xl"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4">Track Your Low GI Snacks Effortlessly</h2>
            <p className="text-slate-300 mb-6">
              Stop manually logging every snack. With Snapie AI, just snap a photo and instantly get calories, macros, and glycemic index for any food. Perfect for managing diabetes or following a <strong>low glycemic diet plan</strong>.
            </p>
            <div className="flex items-center justify-center gap-1 text-yellow-400 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              <span className="text-white ml-2">4.8/5 from 300+ users</span>
            </div>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Download Snapie AI Free
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="Snapie AI"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-white font-bold text-lg">Snapie AI</span>
          </div>
          <p className="text-sm mb-4">
            The smarter way to track your nutrition. AI-powered food recognition with instant macros.
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} Snapie AI. This <strong>low glycemic snacks</strong> guide is for informational purposes. 
            Consult a healthcare provider for personalized dietary advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
