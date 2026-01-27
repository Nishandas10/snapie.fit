'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../../components/CalculatorLayout';
import { 
  Calendar,
  CheckCircle2, 
  Clock,
  Coffee,
  Flame,
  Heart,
  Info,
  Leaf,
  ListChecks,
  Moon,
  Star,
  Sun,
  Utensils,
  Zap
} from 'lucide-react';

// Play Store URL constant
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI';

// --- TYPE DEFINITIONS ---
type Meal = {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  gi: string;
  recipe?: string[];
  prepTime?: string;
};

type DayPlan = {
  day: string;
  theme: string;
  breakfast: Meal;
  snack1: Meal;
  lunch: Meal;
  snack2: Meal;
  dinner: Meal;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
};

type PlanKey = 'balanced' | 'mediterranean' | 'keto' | 'indian' | 'asian' | 'latin';

type MealPlan = {
  key: PlanKey;
  label: string;
  emoji: string;
  description: string;
  days: DayPlan[];
};

// --- 7-DAY MEAL PLAN DATA (Balanced / General) ---
const balancedMealPlan: DayPlan[] = [
  {
    day: "Monday",
    theme: "Energizing Start",
    breakfast: {
      name: "Greek Yogurt Power Bowl",
      description: "Creamy Greek yogurt topped with fresh berries, chia seeds, and a drizzle of almond butter for sustained energy.",
      calories: 385,
      protein: 28,
      carbs: 32,
      fat: 18,
      fiber: 8,
      gi: "Low (GI: 25)",
      recipe: [
        "1 cup plain Greek yogurt (unsweetened)",
        "½ cup mixed berries (strawberries, blueberries)",
        "1 tbsp chia seeds",
        "1 tbsp almond butter",
        "Sprinkle of cinnamon"
      ],
      prepTime: "5 mins"
    },
    snack1: {
      name: "Apple with Almond Butter",
      description: "Crisp apple slices paired with protein-rich almond butter for a satisfying mid-morning snack.",
      calories: 195,
      protein: 4,
      carbs: 21,
      fat: 12,
      fiber: 5,
      gi: "Low (GI: 36)"
    },
    lunch: {
      name: "Mediterranean Chickpea Salad",
      description: "Hearty chickpeas with cucumber, tomatoes, feta cheese, and olive oil dressing on a bed of spinach.",
      calories: 445,
      protein: 18,
      carbs: 42,
      fat: 24,
      fiber: 12,
      gi: "Low (GI: 28)",
      recipe: [
        "1 cup cooked chickpeas",
        "2 cups fresh spinach",
        "½ cucumber, diced",
        "½ cup cherry tomatoes",
        "2 oz feta cheese",
        "2 tbsp olive oil",
        "1 tbsp lemon juice",
        "Salt, pepper, oregano"
      ],
      prepTime: "15 mins"
    },
    snack2: {
      name: "Mixed Nuts & Seeds",
      description: "A handful of almonds, walnuts, and pumpkin seeds for healthy fats and protein.",
      calories: 175,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: "Very Low (GI: 15)"
    },
    dinner: {
      name: "Grilled Salmon with Quinoa & Vegetables",
      description: "Omega-3 rich salmon fillet served with fluffy quinoa and roasted broccoli drizzled with lemon.",
      calories: 520,
      protein: 42,
      carbs: 35,
      fat: 22,
      fiber: 7,
      gi: "Low (GI: 53)",
      recipe: [
        "6 oz salmon fillet",
        "¾ cup cooked quinoa",
        "1.5 cups roasted broccoli",
        "1 tbsp olive oil",
        "Lemon, garlic, dill, salt, pepper"
      ],
      prepTime: "30 mins"
    },
    totalCalories: 1720,
    totalProtein: 98,
    totalCarbs: 136,
    totalFat: 91
  },
  {
    day: "Tuesday",
    theme: "Plant-Powered Day",
    breakfast: {
      name: "Steel-Cut Oatmeal with Walnuts",
      description: "Hearty steel-cut oats topped with walnuts, cinnamon, and a few fresh strawberries.",
      calories: 365,
      protein: 12,
      carbs: 45,
      fat: 16,
      fiber: 7,
      gi: "Low (GI: 42)",
      recipe: [
        "½ cup steel-cut oats",
        "1 cup water + ½ cup milk",
        "¼ cup walnuts, chopped",
        "5 strawberries, sliced",
        "1 tsp cinnamon"
      ],
      prepTime: "20 mins"
    },
    snack1: {
      name: "Carrot Sticks with Hummus",
      description: "Crunchy raw carrots with creamy, protein-rich hummus.",
      calories: 165,
      protein: 5,
      carbs: 18,
      fat: 8,
      fiber: 5,
      gi: "Very Low (GI: 16)"
    },
    lunch: {
      name: "Lentil Vegetable Soup",
      description: "Warming soup packed with green lentils, carrots, celery, and aromatic herbs.",
      calories: 380,
      protein: 22,
      carbs: 52,
      fat: 8,
      fiber: 18,
      gi: "Low (GI: 30)",
      recipe: [
        "1 cup cooked green lentils",
        "½ cup diced carrots",
        "½ cup diced celery",
        "¼ cup diced onion",
        "2 cups vegetable broth",
        "1 tbsp olive oil",
        "Cumin, bay leaf, salt, pepper"
      ],
      prepTime: "35 mins"
    },
    snack2: {
      name: "Pear with Cheese",
      description: "A ripe pear paired with a small portion of aged cheddar cheese.",
      calories: 185,
      protein: 7,
      carbs: 22,
      fat: 9,
      fiber: 5,
      gi: "Low (GI: 38)"
    },
    dinner: {
      name: "Grilled Chicken with Sweet Potato & Green Beans",
      description: "Herb-marinated chicken breast with roasted sweet potato and sautéed green beans.",
      calories: 485,
      protein: 45,
      carbs: 38,
      fat: 16,
      fiber: 8,
      gi: "Low (GI: 44)",
      recipe: [
        "6 oz chicken breast",
        "1 medium sweet potato, cubed",
        "1.5 cups green beans",
        "1 tbsp olive oil",
        "Rosemary, thyme, garlic, salt, pepper"
      ],
      prepTime: "40 mins"
    },
    totalCalories: 1580,
    totalProtein: 91,
    totalCarbs: 175,
    totalFat: 57
  },
  {
    day: "Wednesday",
    theme: "Mediterranean Focus",
    breakfast: {
      name: "Veggie Scrambled Eggs",
      description: "Fluffy scrambled eggs with spinach, tomatoes, and feta cheese on whole grain sourdough.",
      calories: 395,
      protein: 24,
      carbs: 22,
      fat: 24,
      fiber: 4,
      gi: "Low (GI: 45)",
      recipe: [
        "3 large eggs",
        "1 cup fresh spinach",
        "¼ cup diced tomatoes",
        "1 oz feta cheese",
        "1 slice sourdough bread",
        "1 tsp butter"
      ],
      prepTime: "12 mins"
    },
    snack1: {
      name: "Greek Yogurt with Berries",
      description: "Plain Greek yogurt topped with a handful of fresh blueberries.",
      calories: 145,
      protein: 15,
      carbs: 14,
      fat: 3,
      fiber: 2,
      gi: "Low (GI: 25)"
    },
    lunch: {
      name: "Tuna Salad Lettuce Wraps",
      description: "Light and refreshing tuna salad wrapped in crisp butter lettuce leaves.",
      calories: 320,
      protein: 32,
      carbs: 8,
      fat: 18,
      fiber: 3,
      gi: "Very Low (GI: 10)",
      recipe: [
        "5 oz canned tuna (in water, drained)",
        "2 tbsp Greek yogurt",
        "1 tbsp Dijon mustard",
        "¼ cup diced celery",
        "4 large butter lettuce leaves",
        "Salt, pepper, dill"
      ],
      prepTime: "10 mins"
    },
    snack2: {
      name: "Handful of Cherries",
      description: "Sweet, antioxidant-rich fresh cherries.",
      calories: 85,
      protein: 1,
      carbs: 22,
      fat: 0,
      fiber: 3,
      gi: "Low (GI: 22)"
    },
    dinner: {
      name: "Baked Cod with Barley Pilaf",
      description: "Tender baked cod with a side of pearl barley pilaf loaded with herbs and vegetables.",
      calories: 465,
      protein: 38,
      carbs: 45,
      fat: 14,
      fiber: 9,
      gi: "Low (GI: 25)",
      recipe: [
        "6 oz cod fillet",
        "¾ cup cooked pearl barley",
        "½ cup diced bell peppers",
        "¼ cup diced onion",
        "1 tbsp olive oil",
        "Parsley, lemon, garlic, salt, pepper"
      ],
      prepTime: "35 mins"
    },
    totalCalories: 1410,
    totalProtein: 110,
    totalCarbs: 111,
    totalFat: 59
  },
  {
    day: "Thursday",
    theme: "High Protein Day",
    breakfast: {
      name: "Protein Smoothie Bowl",
      description: "Thick protein smoothie topped with sliced almonds, chia seeds, and fresh berries.",
      calories: 355,
      protein: 32,
      carbs: 28,
      fat: 14,
      fiber: 7,
      gi: "Low (GI: 30)",
      recipe: [
        "1 scoop vanilla protein powder",
        "1 cup unsweetened almond milk",
        "½ frozen banana",
        "½ cup frozen berries",
        "1 tbsp almond butter",
        "Top: 1 tbsp chia seeds, sliced almonds"
      ],
      prepTime: "5 mins"
    },
    snack1: {
      name: "Hard-Boiled Eggs (2)",
      description: "Two perfectly cooked hard-boiled eggs with a sprinkle of everything bagel seasoning.",
      calories: 155,
      protein: 13,
      carbs: 1,
      fat: 11,
      fiber: 0,
      gi: "Zero (GI: 0)"
    },
    lunch: {
      name: "Grilled Chicken Caesar Salad (Low GI)",
      description: "Grilled chicken on romaine lettuce with parmesan, light Caesar dressing, and no croutons.",
      calories: 420,
      protein: 42,
      carbs: 12,
      fat: 24,
      fiber: 4,
      gi: "Very Low (GI: 15)",
      recipe: [
        "6 oz grilled chicken breast",
        "3 cups romaine lettuce",
        "2 tbsp light Caesar dressing",
        "2 tbsp shaved parmesan",
        "Black pepper"
      ],
      prepTime: "20 mins"
    },
    snack2: {
      name: "Cottage Cheese with Cucumber",
      description: "Creamy cottage cheese with fresh cucumber slices and dill.",
      calories: 135,
      protein: 14,
      carbs: 6,
      fat: 5,
      fiber: 1,
      gi: "Very Low (GI: 10)"
    },
    dinner: {
      name: "Beef Stir-Fry with Cauliflower Rice",
      description: "Tender beef strips with colorful vegetables served over low-carb cauliflower rice.",
      calories: 485,
      protein: 40,
      carbs: 18,
      fat: 28,
      fiber: 6,
      gi: "Very Low (GI: 15)",
      recipe: [
        "6 oz beef sirloin, sliced",
        "2 cups cauliflower rice",
        "1 cup mixed bell peppers",
        "½ cup snap peas",
        "2 tbsp coconut aminos (or low-sodium soy sauce)",
        "1 tbsp sesame oil",
        "Ginger, garlic"
      ],
      prepTime: "25 mins"
    },
    totalCalories: 1550,
    totalProtein: 141,
    totalCarbs: 65,
    totalFat: 82
  },
  {
    day: "Friday",
    theme: "Fiber Focus",
    breakfast: {
      name: "Avocado Toast on Sourdough with Egg",
      description: "Smashed avocado on toasted sourdough topped with a perfectly poached egg.",
      calories: 395,
      protein: 16,
      carbs: 28,
      fat: 26,
      fiber: 9,
      gi: "Low (GI: 53)",
      recipe: [
        "1 slice sourdough bread, toasted",
        "½ medium avocado, smashed",
        "1 large egg, poached",
        "Red pepper flakes, salt, pepper",
        "Squeeze of lemon"
      ],
      prepTime: "10 mins"
    },
    snack1: {
      name: "Orange & Almonds",
      description: "A fresh orange paired with a small handful of raw almonds.",
      calories: 175,
      protein: 5,
      carbs: 18,
      fat: 10,
      fiber: 5,
      gi: "Low (GI: 40)"
    },
    lunch: {
      name: "Black Bean & Vegetable Bowl",
      description: "Hearty black beans with roasted vegetables, salsa, and a dollop of Greek yogurt.",
      calories: 425,
      protein: 18,
      carbs: 58,
      fat: 12,
      fiber: 16,
      gi: "Low (GI: 30)",
      recipe: [
        "1 cup cooked black beans",
        "½ cup roasted zucchini",
        "½ cup roasted bell peppers",
        "¼ cup fresh salsa",
        "2 tbsp Greek yogurt",
        "Fresh cilantro, lime"
      ],
      prepTime: "25 mins"
    },
    snack2: {
      name: "Celery with Peanut Butter",
      description: "Crisp celery sticks filled with natural peanut butter.",
      calories: 165,
      protein: 6,
      carbs: 8,
      fat: 14,
      fiber: 3,
      gi: "Very Low (GI: 14)"
    },
    dinner: {
      name: "Herb-Crusted Pork Tenderloin with Roasted Vegetables",
      description: "Lean pork tenderloin with a crispy herb crust served with colorful roasted vegetables.",
      calories: 445,
      protein: 38,
      carbs: 22,
      fat: 22,
      fiber: 6,
      gi: "Very Low (GI: 12)",
      recipe: [
        "6 oz pork tenderloin",
        "1 cup roasted Brussels sprouts",
        "½ cup roasted carrots",
        "1 tbsp olive oil",
        "Fresh herbs (rosemary, thyme)",
        "Garlic, salt, pepper"
      ],
      prepTime: "40 mins"
    },
    totalCalories: 1605,
    totalProtein: 83,
    totalCarbs: 134,
    totalFat: 84
  },
  {
    day: "Saturday",
    theme: "Weekend Brunch Day",
    breakfast: {
      name: "Veggie Omelette with Whole Grain Toast",
      description: "Fluffy three-egg omelette stuffed with mushrooms, spinach, and cheese with whole grain toast.",
      calories: 445,
      protein: 28,
      carbs: 24,
      fat: 28,
      fiber: 5,
      gi: "Low (GI: 45)",
      recipe: [
        "3 large eggs",
        "½ cup sliced mushrooms",
        "1 cup fresh spinach",
        "1 oz Swiss cheese",
        "1 slice whole grain bread",
        "1 tsp butter"
      ],
      prepTime: "15 mins"
    },
    snack1: {
      name: "Grapefruit Half with Honey",
      description: "Half a grapefruit with a light drizzle of raw honey.",
      calories: 85,
      protein: 1,
      carbs: 22,
      fat: 0,
      fiber: 2,
      gi: "Low (GI: 25)"
    },
    lunch: {
      name: "Turkey & Avocado Lettuce Wraps",
      description: "Sliced turkey breast with avocado, tomato, and mustard wrapped in crisp romaine.",
      calories: 335,
      protein: 32,
      carbs: 12,
      fat: 18,
      fiber: 7,
      gi: "Very Low (GI: 10)",
      recipe: [
        "5 oz sliced turkey breast",
        "½ medium avocado, sliced",
        "½ cup sliced tomatoes",
        "4 large romaine leaves",
        "1 tbsp Dijon mustard",
        "Salt, pepper"
      ],
      prepTime: "10 mins"
    },
    snack2: {
      name: "Dark Chocolate (85%) & Berries",
      description: "A small square of dark chocolate with fresh raspberries.",
      calories: 125,
      protein: 2,
      carbs: 12,
      fat: 9,
      fiber: 4,
      gi: "Low (GI: 23)"
    },
    dinner: {
      name: "Grilled Shrimp with Whole Wheat Pasta & Pesto",
      description: "Succulent grilled shrimp tossed with whole wheat pasta, homemade basil pesto, and cherry tomatoes.",
      calories: 525,
      protein: 36,
      carbs: 48,
      fat: 22,
      fiber: 7,
      gi: "Low (GI: 42)",
      recipe: [
        "6 oz shrimp, peeled and deveined",
        "1 cup cooked whole wheat pasta",
        "2 tbsp basil pesto",
        "½ cup cherry tomatoes, halved",
        "1 tbsp olive oil",
        "Garlic, parmesan, salt, pepper"
      ],
      prepTime: "25 mins"
    },
    totalCalories: 1515,
    totalProtein: 99,
    totalCarbs: 118,
    totalFat: 77
  },
  {
    day: "Sunday",
    theme: "Rest & Reset",
    breakfast: {
      name: "Overnight Oats with Berries",
      description: "Creamy overnight oats made with almond milk, topped with fresh berries and a sprinkle of flax seeds.",
      calories: 345,
      protein: 14,
      carbs: 48,
      fat: 12,
      fiber: 9,
      gi: "Low (GI: 40)",
      recipe: [
        "½ cup rolled oats",
        "1 cup unsweetened almond milk",
        "1 tbsp maple syrup",
        "½ cup mixed berries",
        "1 tbsp ground flax seeds",
        "Refrigerate overnight"
      ],
      prepTime: "5 mins (prep night before)"
    },
    snack1: {
      name: "Peach with Cottage Cheese",
      description: "A ripe peach served with a side of creamy cottage cheese.",
      calories: 155,
      protein: 14,
      carbs: 16,
      fat: 3,
      fiber: 2,
      gi: "Low (GI: 42)"
    },
    lunch: {
      name: "Quinoa Buddha Bowl",
      description: "Colorful bowl with quinoa, roasted chickpeas, avocado, and tahini dressing.",
      calories: 485,
      protein: 18,
      carbs: 52,
      fat: 24,
      fiber: 14,
      gi: "Low (GI: 48)",
      recipe: [
        "¾ cup cooked quinoa",
        "½ cup roasted chickpeas",
        "½ avocado, sliced",
        "1 cup mixed greens",
        "¼ cup shredded carrots",
        "2 tbsp tahini dressing",
        "Sesame seeds, lemon"
      ],
      prepTime: "30 mins"
    },
    snack2: {
      name: "Edamame (steamed)",
      description: "Lightly salted steamed edamame pods – a protein-packed snack.",
      calories: 155,
      protein: 13,
      carbs: 12,
      fat: 7,
      fiber: 5,
      gi: "Very Low (GI: 18)"
    },
    dinner: {
      name: "Herb-Roasted Chicken with Roasted Vegetables & Barley",
      description: "Juicy roasted chicken thigh with a medley of roasted vegetables and chewy pearl barley.",
      calories: 535,
      protein: 42,
      carbs: 42,
      fat: 22,
      fiber: 9,
      gi: "Low (GI: 25)",
      recipe: [
        "6 oz chicken thigh (bone-in, skin removed)",
        "½ cup cooked pearl barley",
        "1 cup roasted vegetables (zucchini, onions, bell peppers)",
        "1 tbsp olive oil",
        "Fresh herbs (thyme, rosemary)",
        "Garlic, lemon, salt, pepper"
      ],
      prepTime: "50 mins"
    },
    totalCalories: 1675,
    totalProtein: 101,
    totalCarbs: 170,
    totalFat: 68
  }
];

// --- 7-DAY MEAL PLAN DATA (Mediterranean) ---
const mediterraneanMealPlan: DayPlan[] = [
  {
    day: 'Monday',
    theme: 'Olive Oil + Veggies',
    breakfast: {
      name: 'Greek Yogurt + Berries + Walnuts',
      description: 'Unsweetened Greek yogurt with berries, walnuts, and cinnamon for a low GI start.',
      calories: 380,
      protein: 26,
      carbs: 28,
      fat: 18,
      fiber: 7,
      gi: 'Low (GI: 25)'
    },
    snack1: {
      name: 'Cucumber + Hummus',
      description: 'Crunchy cucumber slices with hummus for fiber + protein.',
      calories: 160,
      protein: 6,
      carbs: 14,
      fat: 9,
      fiber: 5,
      gi: 'Very Low (GI: 15)'
    },
    lunch: {
      name: 'Chickpea Greek Salad',
      description: 'Chickpeas, tomato, cucumber, feta, olive oil, lemon, oregano.',
      calories: 460,
      protein: 18,
      carbs: 44,
      fat: 24,
      fiber: 12,
      gi: 'Low (GI: 28)'
    },
    snack2: {
      name: 'Olives + Almonds',
      description: 'Healthy fats to keep you full without blood sugar spikes.',
      calories: 170,
      protein: 5,
      carbs: 6,
      fat: 14,
      fiber: 3,
      gi: 'Zero–Very Low (GI: 0-10)'
    },
    dinner: {
      name: 'Salmon + Quinoa + Roasted Vegetables',
      description: 'Omega-3 salmon, quinoa, and roasted veggies for steady energy.',
      calories: 540,
      protein: 42,
      carbs: 38,
      fat: 24,
      fiber: 8,
      gi: 'Low (GI: 53)'
    },
    totalCalories: 1710,
    totalProtein: 97,
    totalCarbs: 130,
    totalFat: 89
  },
  {
    day: 'Tuesday',
    theme: 'Legumes + Whole Grains',
    breakfast: {
      name: 'Savory Omelette + Sourdough',
      description: 'Eggs with spinach + tomato; 1 slice sourdough for a lower GI bread option.',
      calories: 410,
      protein: 24,
      carbs: 24,
      fat: 26,
      fiber: 4,
      gi: 'Low (GI: 45)'
    },
    snack1: {
      name: 'Pear + Cheese',
      description: 'Fruit + protein/fat combo to blunt glucose response.',
      calories: 185,
      protein: 7,
      carbs: 22,
      fat: 9,
      fiber: 5,
      gi: 'Low (GI: 38)'
    },
    lunch: {
      name: 'Lentil Soup + Side Salad',
      description: 'Hearty lentil soup with herbs and olive oil + greens.',
      calories: 420,
      protein: 22,
      carbs: 50,
      fat: 12,
      fiber: 18,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Greek Yogurt (Plain)',
      description: 'High-protein snack with a very low glycemic impact.',
      calories: 140,
      protein: 16,
      carbs: 10,
      fat: 4,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    dinner: {
      name: 'Chicken Souvlaki + Bulgur',
      description: 'Marinated chicken with bulgur and grilled veggies.',
      calories: 520,
      protein: 45,
      carbs: 40,
      fat: 18,
      fiber: 8,
      gi: 'Low (GI: 46)'
    },
    totalCalories: 1675,
    totalProtein: 114,
    totalCarbs: 146,
    totalFat: 69
  },
  {
    day: 'Wednesday',
    theme: 'Seafood Focus',
    breakfast: {
      name: 'Overnight Oats (Mediterranean Style)',
      description: 'Oats with chia, cinnamon, berries and crushed pistachios.',
      calories: 360,
      protein: 14,
      carbs: 50,
      fat: 12,
      fiber: 10,
      gi: 'Low (GI: 40)'
    },
    snack1: {
      name: 'Orange + Almonds',
      description: 'A low GI fruit paired with nuts for stability.',
      calories: 175,
      protein: 5,
      carbs: 18,
      fat: 10,
      fiber: 5,
      gi: 'Low (GI: 40)'
    },
    lunch: {
      name: 'Tuna Lettuce Wraps',
      description: 'Tuna with Greek yogurt + mustard in crisp lettuce wraps.',
      calories: 320,
      protein: 32,
      carbs: 8,
      fat: 18,
      fiber: 3,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Olive Oil Roasted Nuts',
      description: 'A small handful of mixed nuts for healthy fats.',
      calories: 170,
      protein: 6,
      carbs: 7,
      fat: 14,
      fiber: 3,
      gi: 'Zero–Very Low (GI: 0-10)'
    },
    dinner: {
      name: 'Baked Cod + Barley Pilaf',
      description: 'Cod with herb barley and vegetables.',
      calories: 480,
      protein: 40,
      carbs: 46,
      fat: 14,
      fiber: 9,
      gi: 'Low (GI: 25)'
    },
    totalCalories: 1505,
    totalProtein: 92,
    totalCarbs: 129,
    totalFat: 68
  },
  {
    day: 'Thursday',
    theme: 'Vegetarian Mediterranean',
    breakfast: {
      name: 'Greek Yogurt Parfait',
      description: 'Greek yogurt with berries and chia for fiber and protein.',
      calories: 360,
      protein: 26,
      carbs: 30,
      fat: 16,
      fiber: 8,
      gi: 'Low (GI: 25)'
    },
    snack1: {
      name: 'Tomato + Mozzarella',
      description: 'Caprese-style snack with olive oil and basil.',
      calories: 180,
      protein: 10,
      carbs: 6,
      fat: 13,
      fiber: 2,
      gi: 'Very Low (GI: 10)'
    },
    lunch: {
      name: 'Quinoa Tabbouleh + Chickpeas',
      description: 'Quinoa with parsley, cucumber, lemon, olive oil + chickpeas.',
      calories: 460,
      protein: 16,
      carbs: 56,
      fat: 18,
      fiber: 12,
      gi: 'Low (GI: 48)'
    },
    snack2: {
      name: 'Plain Yogurt + Cinnamon',
      description: 'Simple high-protein snack.',
      calories: 120,
      protein: 15,
      carbs: 8,
      fat: 3,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    dinner: {
      name: 'Falafel Salad Bowl',
      description: 'Baked falafel over greens with tahini-lemon dressing.',
      calories: 520,
      protein: 18,
      carbs: 52,
      fat: 24,
      fiber: 14,
      gi: 'Low (GI: 35)'
    },
    totalCalories: 1640,
    totalProtein: 85,
    totalCarbs: 152,
    totalFat: 78
  },
  {
    day: 'Friday',
    theme: 'Simple & Balanced',
    breakfast: {
      name: 'Avocado Toast (Sourdough) + Egg',
      description: 'Sourdough with avocado + egg for fiber + fat + protein.',
      calories: 395,
      protein: 16,
      carbs: 28,
      fat: 26,
      fiber: 9,
      gi: 'Low (GI: 53)'
    },
    snack1: {
      name: 'Cherries (1 cup)',
      description: 'Antioxidant-rich low GI fruit.',
      calories: 85,
      protein: 1,
      carbs: 22,
      fat: 0,
      fiber: 3,
      gi: 'Low (GI: 22)'
    },
    lunch: {
      name: 'Black Bean Bowl + Salsa',
      description: 'Black beans with veggies, salsa, and Greek yogurt.',
      calories: 425,
      protein: 18,
      carbs: 58,
      fat: 12,
      fiber: 16,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Nuts & Seeds',
      description: 'A handful of nuts and seeds.',
      calories: 175,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 15)'
    },
    dinner: {
      name: 'Herb Chicken + Roasted Vegetables',
      description: 'Lean chicken with roasted vegetables and olive oil.',
      calories: 480,
      protein: 45,
      carbs: 26,
      fat: 20,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1560,
    totalProtein: 86,
    totalCarbs: 140,
    totalFat: 73
  },
  {
    day: 'Saturday',
    theme: 'Weekend Brunch',
    breakfast: {
      name: 'Veggie Omelette + Whole Grain Toast',
      description: 'Egg omelette with veggies and one slice whole grain toast.',
      calories: 445,
      protein: 28,
      carbs: 24,
      fat: 28,
      fiber: 5,
      gi: 'Low (GI: 45)'
    },
    snack1: {
      name: 'Grapefruit Half',
      description: 'Low GI citrus option.',
      calories: 85,
      protein: 1,
      carbs: 22,
      fat: 0,
      fiber: 2,
      gi: 'Low (GI: 25)'
    },
    lunch: {
      name: 'Turkey + Avocado Lettuce Wraps',
      description: 'Protein + fat combo in lettuce wraps.',
      calories: 335,
      protein: 32,
      carbs: 12,
      fat: 18,
      fiber: 7,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Dark Chocolate (85%) + Berries',
      description: 'Small treat with low GI fruit.',
      calories: 125,
      protein: 2,
      carbs: 12,
      fat: 9,
      fiber: 4,
      gi: 'Low (GI: 23)'
    },
    dinner: {
      name: 'Shrimp + Whole Wheat Pasta + Pesto',
      description: 'Whole wheat pasta (al dente) with shrimp and pesto.',
      calories: 525,
      protein: 36,
      carbs: 48,
      fat: 22,
      fiber: 7,
      gi: 'Low (GI: 42)'
    },
    totalCalories: 1515,
    totalProtein: 99,
    totalCarbs: 118,
    totalFat: 77
  },
  {
    day: 'Sunday',
    theme: 'Reset Day',
    breakfast: {
      name: 'Overnight Oats + Flax',
      description: 'Overnight oats with flax and berries for fiber.',
      calories: 345,
      protein: 14,
      carbs: 48,
      fat: 12,
      fiber: 9,
      gi: 'Low (GI: 40)'
    },
    snack1: {
      name: 'Peach + Cottage Cheese',
      description: 'Fruit + protein snack.',
      calories: 155,
      protein: 14,
      carbs: 16,
      fat: 3,
      fiber: 2,
      gi: 'Low (GI: 42)'
    },
    lunch: {
      name: 'Quinoa Buddha Bowl (Mediterranean)',
      description: 'Quinoa with chickpeas, greens, tahini, olive oil and lemon.',
      calories: 485,
      protein: 18,
      carbs: 52,
      fat: 24,
      fiber: 14,
      gi: 'Low (GI: 48)'
    },
    snack2: {
      name: 'Edamame (Steamed)',
      description: 'Protein-packed snack.',
      calories: 155,
      protein: 13,
      carbs: 12,
      fat: 7,
      fiber: 5,
      gi: 'Very Low (GI: 18)'
    },
    dinner: {
      name: 'Herb-Roasted Chicken + Barley + Veggies',
      description: 'Chicken with barley and roasted vegetables.',
      calories: 535,
      protein: 42,
      carbs: 42,
      fat: 22,
      fiber: 9,
      gi: 'Low (GI: 25)'
    },
    totalCalories: 1675,
    totalProtein: 101,
    totalCarbs: 170,
    totalFat: 68
  }
];

// --- 7-DAY MEAL PLAN DATA (Keto - Low Carb) ---
const ketoMealPlan: DayPlan[] = [
  {
    day: 'Monday',
    theme: 'Keto Kickoff',
    breakfast: {
      name: 'Spinach + Feta Omelette',
      description: '3-egg omelette with spinach, feta, and olive oil.',
      calories: 420,
      protein: 26,
      carbs: 8,
      fat: 32,
      fiber: 3,
      gi: 'Zero (GI: 0)'
    },
    snack1: {
      name: 'Almonds (Small Handful)',
      description: 'Healthy fats + protein.',
      calories: 170,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 0-10)'
    },
    lunch: {
      name: 'Chicken Caesar Salad (No Croutons)',
      description: 'Romaine, grilled chicken, parmesan, light dressing.',
      calories: 430,
      protein: 42,
      carbs: 12,
      fat: 24,
      fiber: 4,
      gi: 'Very Low (GI: 15)'
    },
    snack2: {
      name: 'Cottage Cheese + Cucumber',
      description: 'Protein-rich snack that stays low GI.',
      calories: 135,
      protein: 14,
      carbs: 6,
      fat: 5,
      fiber: 1,
      gi: 'Very Low (GI: 10)'
    },
    dinner: {
      name: 'Salmon + Roasted Broccoli + Avocado',
      description: 'High-protein, high-fat dinner with minimal carbs.',
      calories: 560,
      protein: 42,
      carbs: 14,
      fat: 36,
      fiber: 8,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1715,
    totalProtein: 130,
    totalCarbs: 46,
    totalFat: 112
  },
  {
    day: 'Tuesday',
    theme: 'Low-Carb Comfort',
    breakfast: {
      name: 'Greek Yogurt (Unsweetened) + Chia',
      description: 'Add chia for fiber; keep carbs moderate.',
      calories: 330,
      protein: 28,
      carbs: 16,
      fat: 16,
      fiber: 8,
      gi: 'Low (GI: 25)'
    },
    snack1: {
      name: 'Hard-Boiled Eggs (2)',
      description: 'Simple, zero GI snack.',
      calories: 155,
      protein: 13,
      carbs: 1,
      fat: 11,
      fiber: 0,
      gi: 'Zero (GI: 0)'
    },
    lunch: {
      name: 'Tuna Salad Lettuce Wraps',
      description: 'Tuna with Greek yogurt + mustard in lettuce wraps.',
      calories: 320,
      protein: 32,
      carbs: 8,
      fat: 18,
      fiber: 3,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Olives + Cheese',
      description: 'Low carb snack with fats.',
      calories: 190,
      protein: 8,
      carbs: 4,
      fat: 16,
      fiber: 1,
      gi: 'Zero (GI: 0)'
    },
    dinner: {
      name: 'Beef Stir-Fry + Cauliflower Rice',
      description: 'Vegetable-forward stir-fry over cauliflower rice.',
      calories: 485,
      protein: 40,
      carbs: 18,
      fat: 28,
      fiber: 6,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1480,
    totalProtein: 121,
    totalCarbs: 47,
    totalFat: 89
  },
  {
    day: 'Wednesday',
    theme: 'Protein First',
    breakfast: {
      name: 'Eggs + Avocado Plate',
      description: 'Eggs with avocado and tomatoes.',
      calories: 420,
      protein: 20,
      carbs: 12,
      fat: 34,
      fiber: 8,
      gi: 'Very Low (GI: 10)'
    },
    snack1: {
      name: 'Nuts & Seeds',
      description: 'Small mix of nuts and seeds.',
      calories: 175,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 15)'
    },
    lunch: {
      name: 'Turkey + Avocado Lettuce Wraps',
      description: 'Lean turkey with avocado in romaine leaves.',
      calories: 335,
      protein: 32,
      carbs: 12,
      fat: 18,
      fiber: 7,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Greek Yogurt (Plain)',
      description: 'High-protein snack to curb cravings.',
      calories: 140,
      protein: 16,
      carbs: 10,
      fat: 4,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    dinner: {
      name: 'Chicken Thigh + Roasted Veggies',
      description: 'Roasted chicken thigh with zucchini, peppers, onions.',
      calories: 560,
      protein: 45,
      carbs: 18,
      fat: 34,
      fiber: 7,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1630,
    totalProtein: 119,
    totalCarbs: 58,
    totalFat: 105
  },
  {
    day: 'Thursday',
    theme: 'Low GI, Low Carb',
    breakfast: {
      name: 'Protein Smoothie (Low Carb)',
      description: 'Protein powder blended with unsweetened almond milk + spinach.',
      calories: 320,
      protein: 32,
      carbs: 10,
      fat: 14,
      fiber: 5,
      gi: 'Low (GI: 30)'
    },
    snack1: {
      name: 'Cheese Sticks',
      description: 'Quick snack with minimal carbs.',
      calories: 160,
      protein: 10,
      carbs: 2,
      fat: 13,
      fiber: 0,
      gi: 'Zero (GI: 0)'
    },
    lunch: {
      name: 'Salmon Salad Bowl',
      description: 'Salmon over greens with olive oil + lemon.',
      calories: 460,
      protein: 35,
      carbs: 10,
      fat: 30,
      fiber: 6,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Cucumber + Hummus (Small)',
      description: 'Smaller portion to keep carbs lower.',
      calories: 120,
      protein: 4,
      carbs: 10,
      fat: 7,
      fiber: 4,
      gi: 'Very Low (GI: 15)'
    },
    dinner: {
      name: 'Beef + Veggie Stir-Fry (No Rice)',
      description: 'Stir-fry with peppers, broccoli, mushrooms.',
      calories: 520,
      protein: 40,
      carbs: 16,
      fat: 32,
      fiber: 7,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1580,
    totalProtein: 121,
    totalCarbs: 48,
    totalFat: 96
  },
  {
    day: 'Friday',
    theme: 'Keto-friendly Treats',
    breakfast: {
      name: 'Scrambled Eggs + Mushrooms',
      description: 'Eggs with mushrooms and spinach.',
      calories: 390,
      protein: 25,
      carbs: 10,
      fat: 28,
      fiber: 3,
      gi: 'Very Low (GI: 10)'
    },
    snack1: {
      name: 'Dark Chocolate (85%)',
      description: 'Small square—keep portions modest.',
      calories: 90,
      protein: 1,
      carbs: 8,
      fat: 7,
      fiber: 3,
      gi: 'Low (GI: 23)'
    },
    lunch: {
      name: 'Chicken + Avocado Salad',
      description: 'Chicken, avocado, greens, olive oil.',
      calories: 480,
      protein: 40,
      carbs: 14,
      fat: 30,
      fiber: 8,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Nuts & Seeds',
      description: 'Small handful.',
      calories: 175,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 15)'
    },
    dinner: {
      name: 'Cod + Asparagus + Olive Oil',
      description: 'Lean fish with roasted asparagus.',
      calories: 460,
      protein: 40,
      carbs: 12,
      fat: 26,
      fiber: 5,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1595,
    totalProtein: 112,
    totalCarbs: 50,
    totalFat: 106
  },
  {
    day: 'Saturday',
    theme: 'Weekend Keto',
    breakfast: {
      name: 'Omelette + Cheese + Herbs',
      description: 'Omelette with cheese, herbs, and veggies.',
      calories: 430,
      protein: 26,
      carbs: 10,
      fat: 32,
      fiber: 3,
      gi: 'Very Low (GI: 10)'
    },
    snack1: {
      name: 'Greek Yogurt (Plain, Small)',
      description: 'Keep portion moderate to control carbs.',
      calories: 120,
      protein: 14,
      carbs: 8,
      fat: 3,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    lunch: {
      name: 'Tuna Salad Bowl',
      description: 'Tuna, greens, olive oil, lemon.',
      calories: 440,
      protein: 35,
      carbs: 10,
      fat: 28,
      fiber: 5,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Cheese + Olives',
      description: 'No sugar spike snack.',
      calories: 190,
      protein: 8,
      carbs: 4,
      fat: 16,
      fiber: 1,
      gi: 'Zero (GI: 0)'
    },
    dinner: {
      name: 'Beef Burger Patty + Salad',
      description: 'Bunless burger with salad and olive oil dressing.',
      calories: 560,
      protein: 40,
      carbs: 14,
      fat: 36,
      fiber: 7,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1740,
    totalProtein: 123,
    totalCarbs: 46,
    totalFat: 119
  },
  {
    day: 'Sunday',
    theme: 'Reset & Prepare',
    breakfast: {
      name: 'Eggs + Avocado + Greens',
      description: 'Easy plate with protein, fat and fiber.',
      calories: 420,
      protein: 20,
      carbs: 12,
      fat: 34,
      fiber: 8,
      gi: 'Very Low (GI: 10)'
    },
    snack1: {
      name: 'Almonds',
      description: 'A small handful.',
      calories: 170,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 0-10)'
    },
    lunch: {
      name: 'Chicken Salad Lettuce Wraps',
      description: 'Chicken with yogurt dressing in lettuce wraps.',
      calories: 380,
      protein: 38,
      carbs: 12,
      fat: 18,
      fiber: 5,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Cottage Cheese',
      description: 'Protein snack.',
      calories: 135,
      protein: 14,
      carbs: 6,
      fat: 5,
      fiber: 1,
      gi: 'Very Low (GI: 10)'
    },
    dinner: {
      name: 'Salmon + Veggies',
      description: 'Salmon with roasted veggies and olive oil.',
      calories: 560,
      protein: 42,
      carbs: 14,
      fat: 36,
      fiber: 8,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1665,
    totalProtein: 120,
    totalCarbs: 50,
    totalFat: 108
  }
];

// --- 7-DAY MEAL PLAN DATA (Indian - Low GI) ---
const indianMealPlan: DayPlan[] = [
  {
    day: 'Monday',
    theme: 'South Indian Light',
    breakfast: {
      name: 'Dosa + Sambar',
      description: 'Fermented dosa with protein-rich sambar. Keep portions moderate for low GI.',
      calories: 420,
      protein: 16,
      carbs: 58,
      fat: 14,
      fiber: 8,
      gi: 'Low (GI: 45)'
    },
    snack1: {
      name: 'Guava (1) + Nuts',
      description: 'Low GI fruit paired with nuts.',
      calories: 170,
      protein: 5,
      carbs: 20,
      fat: 9,
      fiber: 6,
      gi: 'Low (GI: 31)'
    },
    lunch: {
      name: 'Rajma + Brown Rice (Small) + Salad',
      description: 'Kidney bean curry with a small portion of brown rice and salad.',
      calories: 520,
      protein: 20,
      carbs: 70,
      fat: 14,
      fiber: 14,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Buttermilk (Chaas)',
      description: 'Light, probiotic drink without added sugar.',
      calories: 90,
      protein: 6,
      carbs: 8,
      fat: 2,
      fiber: 0,
      gi: 'Low (GI: 30)'
    },
    dinner: {
      name: 'Dal + Chapati + Veg Sabzi',
      description: 'Lentil dal with whole wheat chapati and non-starchy vegetables.',
      calories: 540,
      protein: 24,
      carbs: 68,
      fat: 16,
      fiber: 14,
      gi: 'Low (GI: 40)'
    },
    totalCalories: 1740,
    totalProtein: 71,
    totalCarbs: 224,
    totalFat: 55
  },
  {
    day: 'Tuesday',
    theme: 'High Fiber',
    breakfast: {
      name: 'Moong Dal Chilla',
      description: 'Protein-rich lentil pancakes with mint chutney.',
      calories: 390,
      protein: 22,
      carbs: 44,
      fat: 12,
      fiber: 10,
      gi: 'Low (GI: 35)'
    },
    snack1: {
      name: 'Apple + Peanut Butter',
      description: 'Fruit + protein/fat combo.',
      calories: 195,
      protein: 4,
      carbs: 21,
      fat: 12,
      fiber: 5,
      gi: 'Low (GI: 36)'
    },
    lunch: {
      name: 'Chole Salad Bowl',
      description: 'Chickpeas with cucumber, tomato, onion, lemon, spices.',
      calories: 460,
      protein: 18,
      carbs: 58,
      fat: 16,
      fiber: 15,
      gi: 'Low (GI: 28)'
    },
    snack2: {
      name: 'Roasted Chana',
      description: 'Crunchy, high-protein snack.',
      calories: 160,
      protein: 10,
      carbs: 20,
      fat: 4,
      fiber: 6,
      gi: 'Low (GI: 28)'
    },
    dinner: {
      name: 'Paneer Tikka + Salad',
      description: 'Grilled paneer with veggies. Keep carbs low at dinner.',
      calories: 520,
      protein: 34,
      carbs: 18,
      fat: 34,
      fiber: 6,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1725,
    totalProtein: 88,
    totalCarbs: 161,
    totalFat: 78
  },
  {
    day: 'Wednesday',
    theme: 'Balanced Indian',
    breakfast: {
      name: 'Vegetable Upma (Small) + Yogurt',
      description: 'Portion-controlled upma with yogurt to reduce glycemic impact.',
      calories: 420,
      protein: 16,
      carbs: 58,
      fat: 14,
      fiber: 8,
      gi: 'Medium (GI: 60)'
    },
    snack1: {
      name: 'Pear + Cheese',
      description: 'Fruit + protein snack.',
      calories: 185,
      protein: 7,
      carbs: 22,
      fat: 9,
      fiber: 5,
      gi: 'Low (GI: 38)'
    },
    lunch: {
      name: 'Dal + Brown Rice (Small) + Salad',
      description: 'Lentils with a small portion of brown rice and vegetables.',
      calories: 520,
      protein: 22,
      carbs: 72,
      fat: 12,
      fiber: 14,
      gi: 'Low (GI: 40)'
    },
    snack2: {
      name: 'Buttermilk (Chaas)',
      description: 'Probiotic drink.',
      calories: 90,
      protein: 6,
      carbs: 8,
      fat: 2,
      fiber: 0,
      gi: 'Low (GI: 30)'
    },
    dinner: {
      name: 'Fish Curry + Veggies',
      description: 'Fish curry with non-starchy vegetables. Minimal carbs at dinner.',
      calories: 520,
      protein: 40,
      carbs: 18,
      fat: 30,
      fiber: 6,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1735,
    totalProtein: 91,
    totalCarbs: 178,
    totalFat: 70
  },
  {
    day: 'Thursday',
    theme: 'High Protein',
    breakfast: {
      name: 'Besan Cheela + Yogurt',
      description: 'Chickpea flour pancake; add yogurt for protein.',
      calories: 410,
      protein: 22,
      carbs: 44,
      fat: 14,
      fiber: 10,
      gi: 'Low (GI: 35)'
    },
    snack1: {
      name: 'Orange + Almonds',
      description: 'Low GI fruit + nuts.',
      calories: 175,
      protein: 5,
      carbs: 18,
      fat: 10,
      fiber: 5,
      gi: 'Low (GI: 40)'
    },
    lunch: {
      name: 'Chicken Tikka + Salad + Dal (Small)',
      description: 'Protein-focused lunch with a small lentil side.',
      calories: 540,
      protein: 48,
      carbs: 26,
      fat: 26,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    snack2: {
      name: 'Roasted Chana',
      description: 'High-protein snack.',
      calories: 160,
      protein: 10,
      carbs: 20,
      fat: 4,
      fiber: 6,
      gi: 'Low (GI: 28)'
    },
    dinner: {
      name: 'Palak Paneer + Veggies',
      description: 'Spinach paneer to keep carbs low at dinner.',
      calories: 520,
      protein: 32,
      carbs: 22,
      fat: 34,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1805,
    totalProtein: 117,
    totalCarbs: 130,
    totalFat: 88
  },
  {
    day: 'Friday',
    theme: 'Comfort Indian',
    breakfast: {
      name: 'Idli + Sambar',
      description: 'Fermented idli and sambar—moderate portions for low GI.',
      calories: 380,
      protein: 14,
      carbs: 55,
      fat: 10,
      fiber: 7,
      gi: 'Low (GI: 45)'
    },
    snack1: {
      name: 'Guava + Nuts',
      description: 'Low GI fruit paired with nuts.',
      calories: 170,
      protein: 5,
      carbs: 20,
      fat: 9,
      fiber: 6,
      gi: 'Low (GI: 31)'
    },
    lunch: {
      name: 'Sambar Rice (Small) + Salad',
      description: 'Small portion of rice with sambar and lots of veggies.',
      calories: 520,
      protein: 18,
      carbs: 74,
      fat: 12,
      fiber: 10,
      gi: 'Medium (GI: 58)'
    },
    snack2: {
      name: 'Greek Yogurt (Plain)',
      description: 'High-protein snack.',
      calories: 140,
      protein: 16,
      carbs: 10,
      fat: 4,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    dinner: {
      name: 'Tandoori Chicken + Veggies',
      description: 'Protein + veggies; minimal carbs.',
      calories: 520,
      protein: 50,
      carbs: 18,
      fat: 28,
      fiber: 6,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1730,
    totalProtein: 103,
    totalCarbs: 177,
    totalFat: 63
  },
  {
    day: 'Saturday',
    theme: 'Weekend Veg',
    breakfast: {
      name: 'Vegetable Poha (Small) + Yogurt',
      description: 'Portion-controlled poha with yogurt to lower impact.',
      calories: 420,
      protein: 14,
      carbs: 64,
      fat: 10,
      fiber: 8,
      gi: 'Medium (GI: 60)'
    },
    snack1: {
      name: 'Apple + Peanut Butter',
      description: 'Balanced snack.',
      calories: 195,
      protein: 4,
      carbs: 21,
      fat: 12,
      fiber: 5,
      gi: 'Low (GI: 36)'
    },
    lunch: {
      name: 'Chole + Chapati + Salad',
      description: 'Chickpeas with chapati and salad.',
      calories: 540,
      protein: 22,
      carbs: 70,
      fat: 16,
      fiber: 14,
      gi: 'Low (GI: 28)'
    },
    snack2: {
      name: 'Roasted Chana',
      description: 'Crunchy snack.',
      calories: 160,
      protein: 10,
      carbs: 20,
      fat: 4,
      fiber: 6,
      gi: 'Low (GI: 28)'
    },
    dinner: {
      name: 'Paneer Bhurji + Salad',
      description: 'Protein-focused dinner with low carbs.',
      calories: 520,
      protein: 32,
      carbs: 18,
      fat: 34,
      fiber: 6,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1835,
    totalProtein: 82,
    totalCarbs: 193,
    totalFat: 76
  },
  {
    day: 'Sunday',
    theme: 'Reset',
    breakfast: {
      name: 'Moong Dal Chilla',
      description: 'High-protein lentil pancakes.',
      calories: 390,
      protein: 22,
      carbs: 44,
      fat: 12,
      fiber: 10,
      gi: 'Low (GI: 35)'
    },
    snack1: {
      name: 'Pear + Cheese',
      description: 'Fruit + protein.',
      calories: 185,
      protein: 7,
      carbs: 22,
      fat: 9,
      fiber: 5,
      gi: 'Low (GI: 38)'
    },
    lunch: {
      name: 'Dal + Brown Rice (Small) + Salad',
      description: 'Balanced plate with lentils and veggies.',
      calories: 520,
      protein: 22,
      carbs: 72,
      fat: 12,
      fiber: 14,
      gi: 'Low (GI: 40)'
    },
    snack2: {
      name: 'Buttermilk (Chaas)',
      description: 'Probiotic drink.',
      calories: 90,
      protein: 6,
      carbs: 8,
      fat: 2,
      fiber: 0,
      gi: 'Low (GI: 30)'
    },
    dinner: {
      name: 'Grilled Fish + Veggies',
      description: 'Protein + non-starchy vegetables.',
      calories: 520,
      protein: 40,
      carbs: 18,
      fat: 30,
      fiber: 6,
      gi: 'Very Low (GI: 10)'
    },
    totalCalories: 1705,
    totalProtein: 97,
    totalCarbs: 164,
    totalFat: 65
  }
];

// --- 7-DAY MEAL PLAN DATA (Asian - Low GI) ---
const asianMealPlan: DayPlan[] = [
  {
    day: 'Monday',
    theme: 'Balanced Bowls',
    breakfast: {
      name: 'Miso Soup + Egg + Edamame',
      description: 'Warm, savory breakfast with protein and fiber.',
      calories: 360,
      protein: 26,
      carbs: 22,
      fat: 16,
      fiber: 7,
      gi: 'Very Low (GI: 15)'
    },
    snack1: {
      name: 'Cucumber + Nuts',
      description: 'Crunchy snack with healthy fats.',
      calories: 160,
      protein: 5,
      carbs: 8,
      fat: 12,
      fiber: 4,
      gi: 'Very Low (GI: 10)'
    },
    lunch: {
      name: 'Soba Noodle Salad',
      description: 'Buckwheat soba with veggies and tofu.',
      calories: 480,
      protein: 22,
      carbs: 60,
      fat: 14,
      fiber: 10,
      gi: 'Low (GI: 48)'
    },
    snack2: {
      name: 'Greek Yogurt (Plain)',
      description: 'High protein snack.',
      calories: 140,
      protein: 16,
      carbs: 10,
      fat: 4,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    dinner: {
      name: 'Salmon + Stir-Fry Veggies',
      description: 'Salmon with broccoli, peppers and sesame.',
      calories: 540,
      protein: 42,
      carbs: 20,
      fat: 34,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1520,
    totalProtein: 111,
    totalCarbs: 120,
    totalFat: 80
  },
  {
    day: 'Tuesday',
    theme: 'Rice Done Right',
    breakfast: {
      name: 'Savory Oats + Egg',
      description: 'Oats cooked savory with veggies and egg.',
      calories: 380,
      protein: 22,
      carbs: 44,
      fat: 14,
      fiber: 7,
      gi: 'Low (GI: 42)'
    },
    snack1: {
      name: 'Orange + Almonds',
      description: 'Fruit + nuts.',
      calories: 175,
      protein: 5,
      carbs: 18,
      fat: 10,
      fiber: 5,
      gi: 'Low (GI: 40)'
    },
    lunch: {
      name: 'Chicken + Brown Rice (Small) + Veggies',
      description: 'Portion-controlled brown rice with chicken and lots of veggies.',
      calories: 520,
      protein: 42,
      carbs: 52,
      fat: 16,
      fiber: 8,
      gi: 'Low (GI: 50)'
    },
    snack2: {
      name: 'Edamame',
      description: 'Steamed edamame pods.',
      calories: 155,
      protein: 13,
      carbs: 12,
      fat: 7,
      fiber: 5,
      gi: 'Very Low (GI: 18)'
    },
    dinner: {
      name: 'Tofu + Veggie Stir-Fry',
      description: 'Tofu stir-fry with non-starchy vegetables.',
      calories: 480,
      protein: 28,
      carbs: 24,
      fat: 30,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1710,
    totalProtein: 110,
    totalCarbs: 150,
    totalFat: 77
  },
  {
    day: 'Wednesday',
    theme: 'Fermented + Fiber',
    breakfast: {
      name: 'Greek Yogurt + Berries',
      description: 'Easy low GI breakfast.',
      calories: 320,
      protein: 24,
      carbs: 26,
      fat: 14,
      fiber: 6,
      gi: 'Low (GI: 25)'
    },
    snack1: {
      name: 'Kimchi + Eggs',
      description: 'Simple snack, adds fermented foods.',
      calories: 180,
      protein: 13,
      carbs: 4,
      fat: 12,
      fiber: 2,
      gi: 'Zero (GI: 0)'
    },
    lunch: {
      name: 'Lentil Soup (Asian spices)',
      description: 'Lentils with ginger, garlic, and sesame.',
      calories: 400,
      protein: 22,
      carbs: 52,
      fat: 10,
      fiber: 18,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Nuts & Seeds',
      description: 'Small handful.',
      calories: 175,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 15)'
    },
    dinner: {
      name: 'Fish + Steamed Veggies',
      description: 'Lean fish with vegetables and soy/ginger sauce.',
      calories: 480,
      protein: 40,
      carbs: 18,
      fat: 28,
      fiber: 7,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1555,
    totalProtein: 105,
    totalCarbs: 106,
    totalFat: 79
  },
  {
    day: 'Thursday',
    theme: 'Protein Day',
    breakfast: {
      name: 'Protein Smoothie Bowl',
      description: 'Protein powder with berries and chia.',
      calories: 355,
      protein: 32,
      carbs: 28,
      fat: 14,
      fiber: 7,
      gi: 'Low (GI: 30)'
    },
    snack1: {
      name: 'Hard-Boiled Eggs (2)',
      description: 'Zero GI snack.',
      calories: 155,
      protein: 13,
      carbs: 1,
      fat: 11,
      fiber: 0,
      gi: 'Zero (GI: 0)'
    },
    lunch: {
      name: 'Chicken + Veggies + Soba (Small)',
      description: 'Portion-controlled soba with chicken and vegetables.',
      calories: 500,
      protein: 42,
      carbs: 46,
      fat: 16,
      fiber: 8,
      gi: 'Low (GI: 48)'
    },
    snack2: {
      name: 'Edamame',
      description: 'Steamed edamame.',
      calories: 155,
      protein: 13,
      carbs: 12,
      fat: 7,
      fiber: 5,
      gi: 'Very Low (GI: 18)'
    },
    dinner: {
      name: 'Beef + Veggie Stir-Fry + Cauliflower Rice',
      description: 'Stir-fry with cauliflower rice.',
      calories: 485,
      protein: 40,
      carbs: 18,
      fat: 28,
      fiber: 6,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1650,
    totalProtein: 140,
    totalCarbs: 105,
    totalFat: 76
  },
  {
    day: 'Friday',
    theme: 'Fiber Forward',
    breakfast: {
      name: 'Overnight Oats + Flax',
      description: 'Oats with flax and berries.',
      calories: 345,
      protein: 14,
      carbs: 48,
      fat: 12,
      fiber: 9,
      gi: 'Low (GI: 40)'
    },
    snack1: {
      name: 'Apple + Peanut Butter',
      description: 'Balanced snack.',
      calories: 195,
      protein: 4,
      carbs: 21,
      fat: 12,
      fiber: 5,
      gi: 'Low (GI: 36)'
    },
    lunch: {
      name: 'Black Bean Bowl (Asian-style)',
      description: 'Beans with veggies and sesame-ginger dressing.',
      calories: 425,
      protein: 18,
      carbs: 58,
      fat: 12,
      fiber: 16,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Greek Yogurt',
      description: 'Protein snack.',
      calories: 140,
      protein: 16,
      carbs: 10,
      fat: 4,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    dinner: {
      name: 'Salmon + Veggies',
      description: 'Fish and vegetables.',
      calories: 540,
      protein: 42,
      carbs: 20,
      fat: 34,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1645,
    totalProtein: 92,
    totalCarbs: 157,
    totalFat: 74
  },
  {
    day: 'Saturday',
    theme: 'Weekend',
    breakfast: {
      name: 'Veggie Omelette',
      description: 'Egg omelette with veggies.',
      calories: 420,
      protein: 24,
      carbs: 18,
      fat: 28,
      fiber: 5,
      gi: 'Very Low (GI: 10)'
    },
    snack1: {
      name: 'Grapefruit Half',
      description: 'Low GI fruit.',
      calories: 85,
      protein: 1,
      carbs: 22,
      fat: 0,
      fiber: 2,
      gi: 'Low (GI: 25)'
    },
    lunch: {
      name: 'Turkey Lettuce Wraps',
      description: 'Turkey with avocado.',
      calories: 335,
      protein: 32,
      carbs: 12,
      fat: 18,
      fiber: 7,
      gi: 'Very Low (GI: 10)'
    },
    snack2: {
      name: 'Dark Chocolate + Berries',
      description: 'Small treat.',
      calories: 125,
      protein: 2,
      carbs: 12,
      fat: 9,
      fiber: 4,
      gi: 'Low (GI: 23)'
    },
    dinner: {
      name: 'Shrimp + Veggie Stir-Fry',
      description: 'Shrimp with vegetables; keep carbs low.',
      calories: 480,
      protein: 36,
      carbs: 18,
      fat: 28,
      fiber: 6,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1445,
    totalProtein: 95,
    totalCarbs: 82,
    totalFat: 83
  },
  {
    day: 'Sunday',
    theme: 'Reset',
    breakfast: {
      name: 'Steel-Cut Oats + Walnuts',
      description: 'Hearty oats with walnuts and cinnamon.',
      calories: 365,
      protein: 12,
      carbs: 45,
      fat: 16,
      fiber: 7,
      gi: 'Low (GI: 42)'
    },
    snack1: {
      name: 'Carrot Sticks + Hummus',
      description: 'Fiber and protein snack.',
      calories: 165,
      protein: 5,
      carbs: 18,
      fat: 8,
      fiber: 5,
      gi: 'Very Low (GI: 16)'
    },
    lunch: {
      name: 'Quinoa Buddha Bowl',
      description: 'Quinoa, avocado, greens, tahini.',
      calories: 485,
      protein: 18,
      carbs: 52,
      fat: 24,
      fiber: 14,
      gi: 'Low (GI: 48)'
    },
    snack2: {
      name: 'Edamame',
      description: 'Protein snack.',
      calories: 155,
      protein: 13,
      carbs: 12,
      fat: 7,
      fiber: 5,
      gi: 'Very Low (GI: 18)'
    },
    dinner: {
      name: 'Chicken + Roasted Veggies',
      description: 'Lean protein with vegetables.',
      calories: 480,
      protein: 45,
      carbs: 26,
      fat: 20,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1650,
    totalProtein: 93,
    totalCarbs: 153,
    totalFat: 79
  }
];

// --- 7-DAY MEAL PLAN DATA (Latin - Low GI) ---
const latinMealPlan: DayPlan[] = [
  {
    day: 'Monday',
    theme: 'Beans + Greens',
    breakfast: {
      name: 'Eggs + Avocado + Salsa',
      description: 'Eggs with avocado and fresh salsa.',
      calories: 420,
      protein: 20,
      carbs: 12,
      fat: 34,
      fiber: 8,
      gi: 'Very Low (GI: 10)'
    },
    snack1: {
      name: 'Orange + Almonds',
      description: 'Fruit + nuts.',
      calories: 175,
      protein: 5,
      carbs: 18,
      fat: 10,
      fiber: 5,
      gi: 'Low (GI: 40)'
    },
    lunch: {
      name: 'Black Bean Bowl + Veggies',
      description: 'Black beans with roasted vegetables, salsa, Greek yogurt.',
      calories: 425,
      protein: 18,
      carbs: 58,
      fat: 12,
      fiber: 16,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Nuts & Seeds',
      description: 'Small handful.',
      calories: 175,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 15)'
    },
    dinner: {
      name: 'Fish Tacos (Lettuce Wraps)',
      description: 'Fish tacos in lettuce wraps with cabbage slaw.',
      calories: 520,
      protein: 40,
      carbs: 22,
      fat: 30,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1715,
    totalProtein: 89,
    totalCarbs: 116,
    totalFat: 101
  },
  {
    day: 'Tuesday',
    theme: 'Lean Protein',
    breakfast: {
      name: 'Greek Yogurt + Berries',
      description: 'High protein breakfast.',
      calories: 320,
      protein: 24,
      carbs: 26,
      fat: 14,
      fiber: 6,
      gi: 'Low (GI: 25)'
    },
    snack1: {
      name: 'Apple + Peanut Butter',
      description: 'Balanced snack.',
      calories: 195,
      protein: 4,
      carbs: 21,
      fat: 12,
      fiber: 5,
      gi: 'Low (GI: 36)'
    },
    lunch: {
      name: 'Chicken Burrito Bowl (No Tortilla)',
      description: 'Chicken, beans, greens, salsa, avocado, small brown rice.',
      calories: 540,
      protein: 42,
      carbs: 54,
      fat: 18,
      fiber: 12,
      gi: 'Low (GI: 48)'
    },
    snack2: {
      name: 'Cottage Cheese',
      description: 'Protein snack.',
      calories: 135,
      protein: 14,
      carbs: 6,
      fat: 5,
      fiber: 1,
      gi: 'Very Low (GI: 10)'
    },
    dinner: {
      name: 'Turkey + Roasted Veggies',
      description: 'Lean turkey with veggies.',
      calories: 480,
      protein: 45,
      carbs: 26,
      fat: 20,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1670,
    totalProtein: 129,
    totalCarbs: 133,
    totalFat: 69
  },
  {
    day: 'Wednesday',
    theme: 'Seafood Day',
    breakfast: {
      name: 'Veggie Scrambled Eggs',
      description: 'Eggs with spinach, tomato, onions.',
      calories: 395,
      protein: 24,
      carbs: 22,
      fat: 24,
      fiber: 4,
      gi: 'Low (GI: 45)'
    },
    snack1: {
      name: 'Grapefruit Half',
      description: 'Low GI fruit.',
      calories: 85,
      protein: 1,
      carbs: 22,
      fat: 0,
      fiber: 2,
      gi: 'Low (GI: 25)'
    },
    lunch: {
      name: 'Black Bean Tacos (Lettuce Wraps)',
      description: 'Beans and veggies in lettuce wraps.',
      calories: 420,
      protein: 18,
      carbs: 52,
      fat: 12,
      fiber: 16,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Nuts & Seeds',
      description: 'Small handful.',
      calories: 175,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 15)'
    },
    dinner: {
      name: 'Grilled Shrimp + Veggies',
      description: 'Shrimp with roasted vegetables.',
      calories: 480,
      protein: 36,
      carbs: 18,
      fat: 28,
      fiber: 6,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1555,
    totalProtein: 85,
    totalCarbs: 120,
    totalFat: 95
  },
  {
    day: 'Thursday',
    theme: 'Protein + Fiber',
    breakfast: {
      name: 'Overnight Oats + Flax',
      description: 'Oats with flax and berries.',
      calories: 345,
      protein: 14,
      carbs: 48,
      fat: 12,
      fiber: 9,
      gi: 'Low (GI: 40)'
    },
    snack1: {
      name: 'Carrot Sticks + Hummus',
      description: 'Fiber snack.',
      calories: 165,
      protein: 5,
      carbs: 18,
      fat: 8,
      fiber: 5,
      gi: 'Very Low (GI: 16)'
    },
    lunch: {
      name: 'Lentil Soup + Salad',
      description: 'High fiber lentil soup + greens.',
      calories: 400,
      protein: 22,
      carbs: 52,
      fat: 10,
      fiber: 18,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Greek Yogurt',
      description: 'Protein snack.',
      calories: 140,
      protein: 16,
      carbs: 10,
      fat: 4,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    dinner: {
      name: 'Chicken + Sweet Potato + Green Beans',
      description: 'Low GI dinner with portion-controlled sweet potato.',
      calories: 485,
      protein: 45,
      carbs: 38,
      fat: 16,
      fiber: 8,
      gi: 'Low (GI: 44)'
    },
    totalCalories: 1535,
    totalProtein: 102,
    totalCarbs: 166,
    totalFat: 50
  },
  {
    day: 'Friday',
    theme: 'Friday Fiesta',
    breakfast: {
      name: 'Avocado Toast + Egg (Sourdough)',
      description: 'Sourdough avocado toast with egg.',
      calories: 395,
      protein: 16,
      carbs: 28,
      fat: 26,
      fiber: 9,
      gi: 'Low (GI: 53)'
    },
    snack1: {
      name: 'Pear + Cheese',
      description: 'Balanced snack.',
      calories: 185,
      protein: 7,
      carbs: 22,
      fat: 9,
      fiber: 5,
      gi: 'Low (GI: 38)'
    },
    lunch: {
      name: 'Chicken + Bean Salad',
      description: 'Chicken with beans and greens.',
      calories: 480,
      protein: 42,
      carbs: 32,
      fat: 22,
      fiber: 12,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Nuts & Seeds',
      description: 'Small handful.',
      calories: 175,
      protein: 6,
      carbs: 6,
      fat: 15,
      fiber: 3,
      gi: 'Very Low (GI: 15)'
    },
    dinner: {
      name: 'Fish Tacos (Lettuce Wraps)',
      description: 'Fish tacos in lettuce with slaw.',
      calories: 520,
      protein: 40,
      carbs: 22,
      fat: 30,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1755,
    totalProtein: 111,
    totalCarbs: 110,
    totalFat: 102
  },
  {
    day: 'Saturday',
    theme: 'Weekend',
    breakfast: {
      name: 'Veggie Omelette',
      description: 'Egg omelette with veggies.',
      calories: 420,
      protein: 24,
      carbs: 18,
      fat: 28,
      fiber: 5,
      gi: 'Very Low (GI: 10)'
    },
    snack1: {
      name: 'Orange + Almonds',
      description: 'Fruit + nuts.',
      calories: 175,
      protein: 5,
      carbs: 18,
      fat: 10,
      fiber: 5,
      gi: 'Low (GI: 40)'
    },
    lunch: {
      name: 'Black Bean Bowl + Veggies',
      description: 'Beans and veggies with salsa.',
      calories: 425,
      protein: 18,
      carbs: 58,
      fat: 12,
      fiber: 16,
      gi: 'Low (GI: 30)'
    },
    snack2: {
      name: 'Dark Chocolate + Berries',
      description: 'Small treat.',
      calories: 125,
      protein: 2,
      carbs: 12,
      fat: 9,
      fiber: 4,
      gi: 'Low (GI: 23)'
    },
    dinner: {
      name: 'Grilled Chicken + Veggies',
      description: 'Lean protein with roasted veggies.',
      calories: 480,
      protein: 45,
      carbs: 26,
      fat: 20,
      fiber: 8,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1625,
    totalProtein: 94,
    totalCarbs: 132,
    totalFat: 79
  },
  {
    day: 'Sunday',
    theme: 'Reset',
    breakfast: {
      name: 'Steel-Cut Oats + Walnuts',
      description: 'Oats with walnuts and cinnamon.',
      calories: 365,
      protein: 12,
      carbs: 45,
      fat: 16,
      fiber: 7,
      gi: 'Low (GI: 42)'
    },
    snack1: {
      name: 'Carrot Sticks + Hummus',
      description: 'Fiber snack.',
      calories: 165,
      protein: 5,
      carbs: 18,
      fat: 8,
      fiber: 5,
      gi: 'Very Low (GI: 16)'
    },
    lunch: {
      name: 'Quinoa Buddha Bowl',
      description: 'Quinoa with veggies and tahini.',
      calories: 485,
      protein: 18,
      carbs: 52,
      fat: 24,
      fiber: 14,
      gi: 'Low (GI: 48)'
    },
    snack2: {
      name: 'Greek Yogurt',
      description: 'Protein snack.',
      calories: 140,
      protein: 16,
      carbs: 10,
      fat: 4,
      fiber: 0,
      gi: 'Low (GI: 25)'
    },
    dinner: {
      name: 'Shrimp + Veggie Stir-Fry',
      description: 'Shrimp and veggies.',
      calories: 480,
      protein: 36,
      carbs: 18,
      fat: 28,
      fiber: 6,
      gi: 'Very Low (GI: 15)'
    },
    totalCalories: 1635,
    totalProtein: 87,
    totalCarbs: 143,
    totalFat: 80
  }
];

const MEAL_PLANS: MealPlan[] = [
  {
    key: 'balanced',
    label: 'Balanced',
    emoji: '⚖️',
    description: 'A general low glycemic plan with a mix of cuisines (great starting point).',
    days: balancedMealPlan
  },
  {
    key: 'mediterranean',
    label: 'Mediterranean',
    emoji: '🫒',
    description: 'Olive oil, legumes, fish, and whole foods—low GI meals with Mediterranean flavors.',
    days: mediterraneanMealPlan
  },
  {
    key: 'keto',
    label: 'Keto',
    emoji: '🥑',
    description: 'Low carb, higher fat/protein options that keep blood sugar steady.',
    days: ketoMealPlan
  },
  {
    key: 'indian',
    label: 'Indian',
    emoji: '🍛',
    description: 'Low GI Indian staples with portion control and high-fiber swaps.',
    days: indianMealPlan
  },
  {
    key: 'asian',
    label: 'Asian',
    emoji: '🍜',
    description: 'Soba, tofu, fish, and veggies with low GI techniques and portions.',
    days: asianMealPlan
  },
  {
    key: 'latin',
    label: 'Latin',
    emoji: '🌮',
    description: 'Beans, salsa, lean proteins, and veggie-forward bowls—low GI Latin-inspired meals.',
    days: latinMealPlan
  }
];

// --- HELPER FUNCTION ---
const getMealIcon = (mealType: string) => {
  switch (mealType) {
    case 'breakfast': return <Coffee className="text-amber-500" size={20} />;
    case 'snack1': return <Sun className="text-yellow-500" size={20} />;
    case 'lunch': return <Utensils className="text-emerald-500" size={20} />;
    case 'snack2': return <Zap className="text-orange-500" size={20} />;
    case 'dinner': return <Moon className="text-indigo-500" size={20} />;
    default: return <Utensils size={20} />;
  }
};

// --- MEALCARD COMPONENT ---
type MealCardProps = {
  meal: Meal;
  mealType: string;
  mealLabel: string;
  isExpanded: boolean;
  onToggle: () => void;
};

const MealCard = ({ meal, mealType, mealLabel, isExpanded, onToggle }: MealCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div 
        className="p-5 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start gap-4">
          <div className="p-2 bg-slate-100 rounded-lg shrink-0">
            {getMealIcon(mealType)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{mealLabel}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{meal.gi}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">{meal.name}</h4>
            <p className="text-sm text-slate-600 line-clamp-2">{meal.description}</p>
            
            {/* Macros Row */}
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="flex items-center gap-1 text-xs">
                <Flame size={14} className="text-orange-500" />
                <span className="font-semibold text-slate-700">{meal.calories}</span>
                <span className="text-slate-400">cal</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="font-semibold text-blue-600">P: {meal.protein}g</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="font-semibold text-amber-600">C: {meal.carbs}g</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="font-semibold text-purple-600">F: {meal.fat}g</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Leaf size={14} className="text-green-500" />
                <span className="font-semibold text-green-600">{meal.fiber}g fiber</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Recipe Section */}
      {isExpanded && meal.recipe && (
        <div className="border-t border-slate-100 bg-slate-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <ListChecks size={16} className="text-emerald-600" />
            <span className="font-bold text-slate-800 text-sm">Ingredients & Recipe</span>
            {meal.prepTime && (
              <span className="ml-auto flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} /> {meal.prepTime}
              </span>
            )}
          </div>
          <ul className="space-y-1.5">
            {meal.recipe.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function LowGlycemicDietPlanPage() {
  const [activePlanKey, setActivePlanKey] = useState<PlanKey>('balanced');
  const [activeDay, setActiveDay] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const selectedPlan = MEAL_PLANS.find((p) => p.key === activePlanKey) ?? MEAL_PLANS[0];
  const days = selectedPlan.days;
  const currentPlan = days[activeDay];


  const toggleMealExpand = (mealId: string) => {
    setExpandedMeal(expandedMeal === mealId ? null : mealId);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* NAVBAR */}
      <Navbar />
      
      {/* HERO SECTION */}
      <header className="relative bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-sm font-semibold mb-6 tracking-wide uppercase">
            <Calendar size={16} /> Complete 7-Day Low GI Meal Plan with Recipes
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            7-Day <span className="text-emerald-300">Low Glycemic Diet Plan</span> for Beginners
          </h1>
          <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            A complete <strong>low glycemic index meal plan</strong> with delicious recipes, exact calories, macros, and shopping-ready ingredients. Control your blood sugar, boost energy, and feel amazing with our <strong>low gi diet plan</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold transition-all shadow-lg group"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              Download Snapie AI
            </a>
            <a
              href="#meal-plan"
              className="text-emerald-200 hover:text-white font-medium underline underline-offset-4 decoration-emerald-400/50 hover:decoration-white transition-all"
            >
              Jump to Meal Plan →
            </a>
          </div>
          <p className="text-sm text-emerald-200/70 mt-4">Track your low GI meals effortlessly with AI • 4.8/5 from 300+ users</p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 -mt-16 relative z-20 pb-20">
        
        {/* INTRO SECTION */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What is a Low Glycemic Diet Plan?</h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            If you&apos;ve ever experienced an energy crash after eating, intense cravings, or struggled with weight that just won&apos;t budge, your blood sugar might be on a roller coaster. A <strong>low glycemic diet plan</strong> is your ticket off that ride. By focusing on <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">foods low in glycemic index</Link>, you can achieve stable energy, reduced cravings, and sustainable weight loss.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            The <strong>glycemic index of foods</strong> measures how quickly they raise your blood sugar. Foods with a <strong>low GI (55 or below)</strong> are digested slowly, providing steady energy without the spikes and crashes. This isn&apos;t just another fad diet—it&apos;s a scientifically-backed approach to eating that has been used for decades to manage diabetes, support weight loss, and improve overall health. Check our <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">glycemic index food chart</Link> for a complete reference.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            This comprehensive <strong>low gi meal plan</strong> gives you everything you need: 7 full days of meals, complete with recipes, calorie counts, and macro breakdowns. No guesswork, no complicated rules—just delicious <strong>low glycemic foods</strong> that keep your blood sugar stable. Use our <Link href="/calculators/macro-calculator" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">macro calculator</Link> to personalize your targets.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2 mb-4">
                <Heart className="text-emerald-600" size={20} /> Why Follow This Low GI Diet Plan?
              </h3>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Stable energy throughout the day—no more 3pm slumps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Reduced cravings with <strong>low glycemic snacks</strong> between meals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Better blood sugar control—ideal <strong>glycemic index chart for diabetics</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Supports sustainable, healthy weight loss</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Improved focus, mood, and mental clarity</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-4">
                <Info className="text-blue-600" size={20} /> What&apos;s Included in This Meal Plan
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <Star size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>7 days of complete <strong>low glycemic index meal plans</strong> (breakfast, lunch, dinner + snacks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>35 unique low GI recipes with step-by-step instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>Exact calorie and macro counts for every meal</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span><strong>GI index</strong> rating for each food item</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>Prep times and shopping-ready ingredient lists</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* UNDERSTANDING GI SECTION */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Understanding the Glycemic Index (GI Index Chart)</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              Before diving into the meal plan, let&apos;s quickly understand what makes a food &quot;low glycemic.&quot; The <strong>gi index of foods</strong> ranks carbohydrate-containing foods on a scale of 0 to 100 based on how quickly they raise blood glucose levels. This <strong>glycemic chart</strong> is essential for making smart food choices.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">0-55</div>
                <div className="font-semibold text-emerald-800 mb-1">Low GI Foods</div>
                <p className="text-sm text-emerald-700">Slow digestion, steady energy. Include <strong>low gi oats</strong>, <strong>low glycemic fruits</strong>, legumes.</p>
              </div>
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">56-69</div>
                <div className="font-semibold text-amber-800 mb-1">Medium GI</div>
                <p className="text-sm text-amber-700">Moderate impact. Use portion control with <strong>whole grain basmati rice</strong>.</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl border border-red-100 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">70+</div>
                <div className="font-semibold text-red-800 mb-1">High GI Foods</div>
                <p className="text-sm text-red-700">Rapid spikes. Limit <strong>high glycemic foods</strong> or pair with protein.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">💡 Pro Tip: Glycemic Load Matters Too</h3>
              <p className="text-slate-600">
                While GI tells you the <em>quality</em> of the carb, <strong>glycemic index and glycemic load chart</strong> together give the full picture. Glycemic Load (GL) accounts for the <em>quantity</em>. A watermelon has a high GI (72) but a low GL because it&apos;s mostly water. In this meal plan, we&apos;ve optimized both GI and GL for <strong>low glycemic load foods</strong> that give you the best metabolic results.
              </p>
            </div>
          </div>
        </section>

        {/* MAIN MEAL PLAN SECTION */}
        <section id="meal-plan" className="scroll-mt-24 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Your Complete 7-Day Low GI Diet Plan</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Click on each day to view the full meal plan. Tap any meal to see the complete recipe and ingredient list.
            </p>
          </div>

          {/* Plan Style Selector - Redesigned */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 mb-8 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Choose Your Cuisine Style</h3>
                  <p className="text-sm text-slate-600">Select a plan that matches your taste preferences</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                  <span className="text-lg">{selectedPlan.emoji}</span>
                  <span className="font-semibold">{selectedPlan.label}</span>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {MEAL_PLANS.map((plan) => {
                  const isActive = plan.key === activePlanKey;
                  return (
                    <button
                      key={plan.key}
                      type="button"
                      onClick={() => {
                        setActivePlanKey(plan.key);
                        setActiveDay(0);
                        setExpandedMeal(null);
                      }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl font-semibold transition-all border-2 ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-500 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="text-2xl">{plan.emoji}</span>
                      <span className="text-sm">{plan.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-slate-600 text-center">{selectedPlan.description}</p>
            </div>
          </div>

          {/* Snapie AI CTA - Between Cuisine Selector and Day Selector */}
          <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-5 mb-8 border border-emerald-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Snapie AI"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Track your meals with Snapie AI</p>
                  <p className="text-sm text-slate-600">Snap a photo → Get instant calories, macros & GI values</p>
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
                Get Free App
              </a>
            </div>
          </div>

          {/* Day Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveDay(idx);
                  setExpandedMeal(null);
                }}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  activeDay === idx 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <span className="hidden sm:inline">{day.day}</span>
                <span className="sm:hidden">Day {idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Current Day Display */}
          <div className="bg-linear-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-emerald-200 text-sm font-semibold mb-1">Day {activeDay + 1}</div>
                <h3 className="text-3xl font-bold mb-1">{currentPlan.day}</h3>
                <p className="text-emerald-100">Theme: {currentPlan.theme}</p>
              </div>
              <div className="flex flex-wrap gap-4 bg-white/10 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{currentPlan.totalCalories}</div>
                  <div className="text-xs text-emerald-200">Total Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-200">{currentPlan.totalProtein}g</div>
                  <div className="text-xs text-emerald-200">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-200">{currentPlan.totalCarbs}g</div>
                  <div className="text-xs text-emerald-200">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-200">{currentPlan.totalFat}g</div>
                  <div className="text-xs text-emerald-200">Fat</div>
                </div>
              </div>
            </div>
          </div>

          {/* Meal Cards */}
          <div className="space-y-4">
            <MealCard 
              meal={currentPlan.breakfast} 
              mealType="breakfast" 
              mealLabel="Breakfast (7:00 AM)" 
              isExpanded={expandedMeal === `${activeDay}-breakfast`}
              onToggle={() => toggleMealExpand(`${activeDay}-breakfast`)}
            />
            <MealCard 
              meal={currentPlan.snack1} 
              mealType="snack1" 
              mealLabel="Morning Snack (10:00 AM)" 
              isExpanded={expandedMeal === `${activeDay}-snack1`}
              onToggle={() => toggleMealExpand(`${activeDay}-snack1`)}
            />
            <MealCard 
              meal={currentPlan.lunch} 
              mealType="lunch" 
              mealLabel="Lunch (12:30 PM)" 
              isExpanded={expandedMeal === `${activeDay}-lunch`}
              onToggle={() => toggleMealExpand(`${activeDay}-lunch`)}
            />
            <MealCard 
              meal={currentPlan.snack2} 
              mealType="snack2" 
              mealLabel="Afternoon Snack (3:30 PM)" 
              isExpanded={expandedMeal === `${activeDay}-snack2`}
              onToggle={() => toggleMealExpand(`${activeDay}-snack2`)}
            />
            <MealCard 
              meal={currentPlan.dinner} 
              mealType="dinner" 
              mealLabel="Dinner (7:00 PM)" 
              isExpanded={expandedMeal === `${activeDay}-dinner`}
              onToggle={() => toggleMealExpand(`${activeDay}-dinner`)}
            />
          </div>
        </section>

        {/* WEEKLY OVERVIEW TABLE */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="p-6 md:p-8 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Weekly Nutrition Overview</h2>
              <p className="text-slate-600">A summary of daily calories and macros for the entire week.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Day</th>
                    <th className="px-6 py-4 font-bold text-center">Calories</th>
                    <th className="px-6 py-4 font-bold text-center">Protein</th>
                    <th className="px-6 py-4 font-bold text-center">Carbs</th>
                    <th className="px-6 py-4 font-bold text-center">Fat</th>
                    <th className="px-6 py-4 font-bold text-center hidden md:table-cell">Theme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {days.map((day, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{day.day}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-slate-900">{day.totalCalories}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-blue-600 font-semibold">{day.totalProtein}g</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-amber-600 font-semibold">{day.totalCarbs}g</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-purple-600 font-semibold">{day.totalFat}g</span>
                      </td>
                      <td className="px-6 py-4 text-center hidden md:table-cell">
                        <span className="text-sm text-slate-500">{day.theme}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-emerald-50 border-t-2 border-emerald-200">
                  <tr>
                    <td className="px-6 py-4 font-bold text-emerald-900">Weekly Avg</td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-900">
                      {Math.round(days.reduce((acc, d) => acc + d.totalCalories, 0) / 7)}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-900">
                      {Math.round(days.reduce((acc, d) => acc + d.totalProtein, 0) / 7)}g
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-900">
                      {Math.round(days.reduce((acc, d) => acc + d.totalCarbs, 0) / 7)}g
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-900">
                      {Math.round(days.reduce((acc, d) => acc + d.totalFat, 0) / 7)}g
                    </td>
                    <td className="px-6 py-4 text-center hidden md:table-cell">—</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* LOW GI FOOD PRINCIPLES */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Principles of a Low Glycemic Diet</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  Choose Whole, Unprocessed Foods from the <strong>Low Glycaemic Foods</strong> List
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Processing breaks down the cellular structure of foods, making them faster to digest and higher GI. A whole apple (<strong>apple glycemic index</strong>: 36) is much better than apple juice (GI: 44). Steel-cut <strong>oats glycemic index</strong> (42) outperform instant oats (GI: 79). The <strong>glycemic index of oats with milk</strong> is even lower due to the added protein and fat. Choose <strong>low glycemic index bread</strong> like sourdough over white bread.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  Pair Carbs with Protein, Fat, or Fiber
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Want to eat something with a higher GI? Pair it with protein, healthy fat, or fiber to slow down digestion. That&apos;s why our <strong>low glycemic diet food list</strong> includes balanced combinations—like apple with almond butter or quinoa with grilled chicken. This &quot;GI lowering&quot; effect is one of the most powerful tools in your arsenal. Use our <Link href="/calculators/protein-intake-calculator" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">protein calculator</Link> to optimize your intake.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  Mind Your Cooking Methods for <strong>Low GI Rice</strong> and Starches
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  How you cook matters! Pasta cooked &quot;al dente&quot; has a lower GI than overcooked pasta. Looking for <strong>low gi rice for diabetics</strong>? <strong>Whole grain basmati rice glycemic index</strong> is 50-58 vs. white rice at 73. Boiled sweet potatoes (GI: 44) are better than baked (GI: 94). Cooling starchy foods after cooking creates resistant starch that lowers the GI further—making <strong>low glycemic index rice</strong> even more beneficial.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  Add Vinegar and Acidic Foods
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Acidic foods like vinegar, lemon juice, and fermented foods can lower the GI of a meal by up to 30%. That&apos;s why our plan includes dressings with lemon and vinegar, and why sourdough bread (GI: 53) is lower than regular white bread (GI: 75)—the fermentation creates acidity. Even <strong>red grapes glycemic index</strong> (46) can be lowered further when paired with cheese.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">5</span>
                  Prioritize Fiber-Rich <strong>Low Glycemic Index Snacks</strong>
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Fiber is your best friend on a low GI diet. It slows digestion, keeps you full longer, and feeds your beneficial gut bacteria. Aim for at least 25-35g of fiber daily. Our meal plan averages 35-45g of fiber per day, with sources like lentils, chickpeas, vegetables, and <strong>low gi grains</strong>. Great <strong>low gi snacks</strong> include <strong>popcorn glycemic index</strong> (55) and nuts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOODS TO INCLUDE/AVOID - Low GI Foods Chart */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Low GI Foods Chart: What to Eat & Avoid</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A quick reference <strong>low gi foods chart</strong> to help you make smart food choices. Check our full <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2">low glycemic foods list</Link> for 500+ foods.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600" size={28} />
                Low GI Foods to Include (<strong>Low GI List</strong>)
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Proteins (GI: 0)</h4>
                  <p className="text-emerald-700 text-sm">Chicken, fish, eggs, beef, turkey, tofu, tempeh</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2"><strong>Glycemic Index Vegetables</strong> (GI: 0-35)</h4>
                  <p className="text-emerald-700 text-sm">Spinach, broccoli, kale, zucchini, bell peppers, cauliflower, green beans, asparagus</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Legumes (GI: 20-40)</h4>
                  <p className="text-emerald-700 text-sm">Lentils, chickpeas, black beans, kidney beans, edamame</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2"><strong>Low GI Grains</strong> (GI: 40-55)</h4>
                  <p className="text-emerald-700 text-sm">Steel-cut oats (<strong>oatmeal glycemic index</strong>: 42), quinoa, barley, bulgur, <strong>low glycemic index pasta</strong> (al dente), sourdough bread</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2"><strong>Low Glycemic Fruits</strong> / <strong>Low GI Fruits</strong> (GI: 20-50)</h4>
                  <p className="text-emerald-700 text-sm">Cherries, grapefruit, <strong>apple glycemic index</strong>: 36, pears, berries, oranges, peaches, <strong>kiwi glycemic index</strong>: 47</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Dairy (GI: 10-40)</h4>
                  <p className="text-emerald-700 text-sm">Greek yogurt, cheese, milk, cottage cheese</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-2">
                <Info className="text-red-600" size={28} />
                <strong>High Glycemic Foods</strong> to Limit
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Refined Grains (GI: 70-90)</h4>
                  <p className="text-red-700 text-sm">White bread, white rice (<strong>gi rice</strong>), instant oatmeal, corn flakes, rice cakes</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Sugary Foods (GI: 65-100)</h4>
                  <p className="text-red-700 text-sm">Candy, cookies, cakes, donuts, sodas, most desserts</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Starchy Vegetables (GI: 70-95)</h4>
                  <p className="text-red-700 text-sm">Baked white potatoes (vs. <strong>low gi potatoes</strong>: boiled, cooled), instant mashed potatoes, parsnips</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Processed Snacks (GI: 70-90)</h4>
                  <p className="text-red-700 text-sm">Chips, crackers, pretzels, most packaged snack foods (choose <strong>low gi snacks</strong> instead)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Sweet Beverages (GI: 60-80)</h4>
                  <p className="text-red-700 text-sm">Fruit juices, sports drinks, sweetened coffees, energy drinks</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2"><strong>High Glycemic Fruits</strong> (GI: 60-75)</h4>
                  <p className="text-red-700 text-sm">Watermelon, pineapple (in excess), overripe <strong>banana glycemic index</strong>: 51-62, dried <strong>glycemic index of dates</strong>: 42-103</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIPS FOR SUCCESS */}
        <section className="mb-16">
          <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Tips for Low Glycemic Diet Success</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">🍳 Meal Prep on Sundays</h3>
                <p className="text-slate-300">
                  Spend 1-2 hours prepping ingredients for the week. Cook <strong>low gi grains</strong>, chop vegetables, and prepare protein sources. This makes following the <strong>low glycemic index meal plan</strong> much easier on busy weekdays.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">💧 Stay Hydrated</h3>
                <p className="text-slate-300">
                  Drink at least 8 glasses of water daily. Use our <Link href="/calculators/water-intake-calculator" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2">water intake calculator</Link> for personalized targets. Sometimes thirst masquerades as hunger, leading to unnecessary snacking.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">🥗 Start with Veggies</h3>
                <p className="text-slate-300">
                  Eat your <strong>glycemic index vegetables</strong> before carbs at each meal. Studies show this can reduce blood sugar spikes by up to 73%. The fiber creates a barrier that slows carbohydrate absorption.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">🚶 Move After Meals</h3>
                <p className="text-slate-300">
                  A 10-15 minute walk after eating can significantly reduce blood sugar spikes. Track your steps with our <Link href="/calculators/steps-to-calories-calculator" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2">steps to calories calculator</Link>. Your muscles use glucose for energy, clearing it faster from your bloodstream.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">📱 Track Your Progress with Snapie AI</h3>
                <p className="text-slate-300">
                  Use Snapie AI to easily track your meals, calories, and macros. Just snap a photo of your food and get instant nutritional data including the <strong>gi index</strong>. Makes logging effortless and keeps you accountable to your <strong>low gi diet plan</strong>.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">😴 Prioritize Sleep</h3>
                <p className="text-slate-300">
                  Poor sleep increases insulin resistance and cravings for <strong>high glycemic carbs</strong>. Aim for 7-9 hours of quality sleep each night to support your metabolic health goals. Calculate your <Link href="/calculators/bmr-calculator" className="text-emerald-300 hover:text-emerald-200 underline underline-offset-2">BMR</Link> to understand your body&apos;s needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Is a low glycemic diet good for weight loss?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes! A low GI diet is excellent for weight loss for several reasons. First, it keeps you feeling full longer by providing steady energy instead of spikes and crashes. Second, it reduces insulin levels, which helps your body burn fat more efficiently instead of storing it. Third, it naturally reduces cravings for sugary, high-calorie foods. Studies have shown that people on low GI diets lose more weight and keep it off longer than those on traditional low-fat diets.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Can I follow this plan if I have diabetes?</h3>
                <p className="text-slate-600 leading-relaxed">
                  A low glycemic diet is often recommended for people with type 2 diabetes or prediabetes, as it helps manage blood sugar levels naturally. However, if you&apos;re taking diabetes medication (especially insulin), always consult with your healthcare provider before making dietary changes. The improved blood sugar control from a low GI diet may require adjustments to your medication.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Can I swap meals between days?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Absolutely! The 7-day structure is a guide, not a strict rule. Feel free to swap meals between days based on your preferences or schedule. Just try to maintain a balance of protein, healthy fats, and low-GI carbs at each meal. The key is consistency with the types of foods, not the specific order.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">What if I&apos;m vegetarian or vegan?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Many of the meals in this plan can easily be made vegetarian or vegan. Replace animal proteins with tofu, tempeh, legumes (lentils, chickpeas, black beans), or seitan. Plant-based proteins are naturally low GI and high in fiber. For dairy, use unsweetened plant milks, coconut yogurt, or nutritional yeast for a cheesy flavor.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">How many calories should I eat on this plan?</h3>
                <p className="text-slate-600 leading-relaxed">
                  This meal plan averages around 1,500-1,700 calories per day, which works well for moderate weight loss for most adults. If you need more calories (larger body, high activity level, or maintenance), add an extra snack, increase protein portions, or add healthy fats like avocado, nuts, or olive oil. For faster weight loss, you can reduce portions slightly, but don&apos;t go below 1,200 calories without medical supervision.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Can I have coffee or tea on this diet?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes! Black coffee and unsweetened tea have a GI of zero and are perfectly fine. Avoid adding sugar—use a small amount of stevia, monk fruit, or a splash of unsweetened almond milk instead. Be cautious with flavored lattes or sweetened coffee drinks, which can be very high GI. Green tea is an excellent choice as it may even help improve insulin sensitivity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">How long until I see results?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Most people notice improved energy levels and reduced cravings within 3-5 days of starting a low GI diet. Weight loss typically becomes noticeable after 2-3 weeks. Blood sugar improvements can be seen almost immediately if you&apos;re monitoring levels. For lasting results and metabolic changes, aim to follow a low GI eating pattern for at least 8-12 weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="mb-16">
          <div className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="flex justify-center mb-6">
              <Image 
                src="/logo.png" 
                alt="Snapie AI Logo" 
                width={80} 
                height={80}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4">Track Your Low GI Meals with Snapie AI</h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Snap a photo of your food and instantly get calories, macros, and <strong>glycemic index</strong> data. Make following your <strong>low glycemic diet plan</strong> effortless with AI-powered meal tracking.
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold transition-all shadow-lg group"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
              </svg>
              Download Snapie AI Free
            </a>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-300 text-yellow-300" />
              ))}
              <span className="text-emerald-100 text-sm ml-2">4.8/5 from 300+ users</span>
            </div>
          </div>
        </section>

        {/* RELATED CONTENT */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Continue Your Low GI Journey</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">500+ Low Glycemic Foods List</h3>
              <p className="text-slate-600 text-sm">Complete searchable database of <strong>low glycemic foods</strong> with GI scores, GL, and macros.</p>
            </Link>
            <Link href="/guide/120-Low-Glycemic-Snacks-for-Stable-Blood-Sugar" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">🍎</div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">120 Low GI Snacks</h3>
              <p className="text-slate-600 text-sm">Searchable list of <strong>low glycemic snacks</strong> with macros, tags, and cuisine filters.</p>
            </Link>
            <Link href="/calculators/macro-calculator" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">🧮</div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">Macro Calculator</h3>
              <p className="text-slate-600 text-sm">Calculate your personal protein, carb, and fat targets for your <strong>low gi meal plan</strong>.</p>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Link href="/calculators/calorie-deficit-calculator" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">Calorie Deficit Calculator</h3>
              <p className="text-slate-600 text-sm">Find your optimal calorie deficit for sustainable weight loss with <strong>low glycaemic foods</strong>.</p>
            </Link>
            <Link href="/calculators/tdee-calculator" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">TDEE Calculator</h3>
              <p className="text-slate-600 text-sm">Calculate your Total Daily Energy Expenditure for accurate meal planning.</p>
            </Link>
            <Link href="/calculators/intermittent-fasting-calculator" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">Intermittent Fasting Calculator</h3>
              <p className="text-slate-600 text-sm">Combine IF with your <strong>low gi diet plan</strong> for enhanced blood sugar control.</p>
            </Link>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo.png" 
              alt="Snapie AI" 
              width={48} 
              height={48}
              className="rounded-xl"
            />
          </div>
          <p className="text-slate-600 text-sm mb-4">
            <strong>Snapie AI</strong> — Your AI-powered nutrition companion for tracking <strong>low glycemic index foods</strong> effortlessly.
          </p>
          <p className="text-slate-500 text-sm mb-4">
            <strong>Medical Disclaimer:</strong> This <strong>low glycemic diet plan</strong> is for informational purposes only and is not intended as medical advice. Always consult with a healthcare provider before making significant changes to your diet, especially if you have diabetes or other health conditions.
          </p>
          <p className="text-xs text-slate-400">
            © 2026 Snapie AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
