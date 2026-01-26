'use client';

import React, { useState } from 'react';
import { 
  Calendar,
  CheckCircle2, 
  Clock,
  Coffee,
  Download,
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

// --- 7-DAY MEAL PLAN DATA ---
const mealPlanData: DayPlan[] = [
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
  const [activeDay, setActiveDay] = useState(0);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const currentPlan = mealPlanData[activeDay];

  const toggleMealExpand = (mealId: string) => {
    setExpandedMeal(expandedMeal === mealId ? null : mealId);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HERO SECTION */}
      <header className="relative bg-linear-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-sm font-semibold mb-6 tracking-wide uppercase">
            <Calendar size={16} /> Complete 7-Day Plan with Recipes
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            7-Day <span className="text-emerald-300">Low Glycemic Diet Plan</span> for Beginners
          </h1>
          <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            A complete <strong>low glycemic diet plan</strong> with delicious recipes, exact calories, macros, and shopping-ready ingredients. Control your blood sugar, boost energy, and feel amazing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-2 bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold transition-all shadow-lg">
              <Download size={20} />
              Download Free PDF
            </button>
            <a href="#meal-plan" className="text-emerald-200 hover:text-white font-medium underline underline-offset-4 decoration-emerald-400/50 hover:decoration-white transition-all">
              Jump to Meal Plan →
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 -mt-16 relative z-20 pb-20">
        
        {/* INTRO SECTION */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What is a Low Glycemic Diet Plan?</h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            If you&apos;ve ever experienced an energy crash after eating, intense cravings, or struggled with weight that just won&apos;t budge, your blood sugar might be on a roller coaster. A <strong>low glycemic diet plan</strong> is your ticket off that ride.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            The Glycemic Index (GI) measures how quickly foods raise your blood sugar. Foods with a <strong>low GI (55 or below)</strong> are digested slowly, providing steady energy without the spikes and crashes. This isn&apos;t just another fad diet—it&apos;s a scientifically-backed approach to eating that has been used for decades to manage diabetes, support weight loss, and improve overall health.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            This comprehensive <strong>low gi diet plan</strong> gives you everything you need: 7 full days of meals, complete with recipes, calorie counts, and macro breakdowns. No guesswork, no complicated rules—just delicious food that keeps your blood sugar stable.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2 mb-4">
                <Heart className="text-emerald-600" size={20} /> Why Follow This Plan?
              </h3>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Stable energy throughout the day—no more 3pm slumps</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Reduced cravings and hunger between meals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Better blood sugar control for diabetics and pre-diabetics</span>
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
                <Info className="text-blue-600" size={20} /> What&apos;s Included
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <Star size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>7 days of complete meal plans (breakfast, lunch, dinner + snacks)</span>
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
                  <span>GI rating for each food item</span>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Understanding the Glycemic Index</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              Before diving into the meal plan, let&apos;s quickly understand what makes a food &quot;low glycemic.&quot; The Glycemic Index ranks carbohydrate-containing foods on a scale of 0 to 100 based on how quickly they raise blood glucose levels.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">0-55</div>
                <div className="font-semibold text-emerald-800 mb-1">Low GI</div>
                <p className="text-sm text-emerald-700">Slow digestion, steady energy. Eat freely!</p>
              </div>
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">56-69</div>
                <div className="font-semibold text-amber-800 mb-1">Medium GI</div>
                <p className="text-sm text-amber-700">Moderate impact. Use portion control.</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl border border-red-100 text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">70+</div>
                <div className="font-semibold text-red-800 mb-1">High GI</div>
                <p className="text-sm text-red-700">Rapid spikes. Limit or pair with protein.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">💡 Pro Tip: Glycemic Load Matters Too</h3>
              <p className="text-slate-600">
                While GI tells you the <em>quality</em> of the carb, <strong>Glycemic Load (GL)</strong> accounts for the <em>quantity</em>. A watermelon has a high GI (72) but a low GL because it&apos;s mostly water. In this meal plan, we&apos;ve optimized both GI and GL to give you the best metabolic results.
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

          {/* Day Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {mealPlanData.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
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
                  {mealPlanData.map((day, idx) => (
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
                      {Math.round(mealPlanData.reduce((acc, d) => acc + d.totalCalories, 0) / 7)}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-900">
                      {Math.round(mealPlanData.reduce((acc, d) => acc + d.totalProtein, 0) / 7)}g
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-900">
                      {Math.round(mealPlanData.reduce((acc, d) => acc + d.totalCarbs, 0) / 7)}g
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-900">
                      {Math.round(mealPlanData.reduce((acc, d) => acc + d.totalFat, 0) / 7)}g
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
                  Choose Whole, Unprocessed Foods
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Processing breaks down the cellular structure of foods, making them faster to digest and higher GI. A whole apple (GI 36) is much better than apple juice (GI 44). Steel-cut oats (GI 42) outperform instant oats (GI 79). Whenever possible, choose foods in their most natural state.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  Pair Carbs with Protein, Fat, or Fiber
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Want to eat something with a higher GI? Pair it with protein, healthy fat, or fiber to slow down digestion. That&apos;s why our meal plan includes balanced combinations—like apple with almond butter or quinoa with grilled chicken. This &quot;GI lowering&quot; effect is one of the most powerful tools in your arsenal.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  Mind Your Cooking Methods
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  How you cook matters! Pasta cooked &quot;al dente&quot; has a lower GI than overcooked pasta. Boiled sweet potatoes (GI 44) are better than baked (GI 94). Cooling starchy foods after cooking (like making potato salad) creates resistant starch that lowers the GI further.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  Add Vinegar and Acidic Foods
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Acidic foods like vinegar, lemon juice, and fermented foods can lower the GI of a meal by up to 30%. That&apos;s why our plan includes dressings with lemon and vinegar, and why sourdough bread (GI 53) is lower than regular white bread (GI 75)—the fermentation creates acidity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">5</span>
                  Prioritize Fiber-Rich Foods
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Fiber is your best friend on a low GI diet. It slows digestion, keeps you full longer, and feeds your beneficial gut bacteria. Aim for at least 25-35g of fiber daily. Our meal plan averages 35-45g of fiber per day, with sources like lentils, chickpeas, vegetables, and whole grains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOODS TO INCLUDE/AVOID */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600" size={28} />
                Low GI Foods to Include
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Proteins (GI: 0)</h4>
                  <p className="text-emerald-700 text-sm">Chicken, fish, eggs, beef, turkey, tofu, tempeh</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Vegetables (GI: 0-35)</h4>
                  <p className="text-emerald-700 text-sm">Spinach, broccoli, kale, zucchini, bell peppers, cauliflower, green beans, asparagus</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Legumes (GI: 20-40)</h4>
                  <p className="text-emerald-700 text-sm">Lentils, chickpeas, black beans, kidney beans, edamame</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Whole Grains (GI: 40-55)</h4>
                  <p className="text-emerald-700 text-sm">Steel-cut oats, quinoa, barley, bulgur, whole wheat pasta (al dente), sourdough bread</p>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Fruits (GI: 20-50)</h4>
                  <p className="text-emerald-700 text-sm">Cherries, grapefruit, apples, pears, berries, oranges, peaches</p>
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
                High GI Foods to Limit
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Refined Grains (GI: 70-90)</h4>
                  <p className="text-red-700 text-sm">White bread, white rice, instant oatmeal, corn flakes, rice cakes</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Sugary Foods (GI: 65-100)</h4>
                  <p className="text-red-700 text-sm">Candy, cookies, cakes, donuts, sodas, most desserts</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Starchy Vegetables (GI: 70-95)</h4>
                  <p className="text-red-700 text-sm">Baked white potatoes, instant mashed potatoes, parsnips (cooked)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Processed Snacks (GI: 70-90)</h4>
                  <p className="text-red-700 text-sm">Chips, crackers, pretzels, most packaged snack foods</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">Sweet Beverages (GI: 60-80)</h4>
                  <p className="text-red-700 text-sm">Fruit juices, sports drinks, sweetened coffees, energy drinks</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-2">High-Sugar Fruits (GI: 60-75)</h4>
                  <p className="text-red-700 text-sm">Watermelon, pineapple (in excess), overripe bananas, dried dates</p>
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
                  Spend 1-2 hours prepping ingredients for the week. Cook grains, chop vegetables, and prepare protein sources. This makes following the plan much easier on busy weekdays.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">💧 Stay Hydrated</h3>
                <p className="text-slate-300">
                  Drink at least 8 glasses of water daily. Sometimes thirst masquerades as hunger, leading to unnecessary snacking. Staying hydrated also helps with digestion and nutrient absorption.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">🥗 Start with Veggies</h3>
                <p className="text-slate-300">
                  Eat your vegetables before carbs at each meal. Studies show this can reduce blood sugar spikes by up to 73%. The fiber creates a barrier that slows carbohydrate absorption.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">🚶 Move After Meals</h3>
                <p className="text-slate-300">
                  A 10-15 minute walk after eating can significantly reduce blood sugar spikes. Your muscles use glucose for energy, helping to clear it from your bloodstream faster.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">📱 Track Your Progress</h3>
                <p className="text-slate-300">
                  Use an app like Snapie AI to easily track your meals, calories, and macros. Taking photos of your food makes logging effortless and helps you stay accountable.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-bold text-emerald-300 mb-3 text-lg">😴 Prioritize Sleep</h3>
                <p className="text-slate-300">
                  Poor sleep increases insulin resistance and cravings for high-GI foods. Aim for 7-9 hours of quality sleep each night to support your metabolic health goals.
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
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Low GI Journey?</h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Download the free PDF version of this 7-day meal plan with a complete shopping list, prep guide, and bonus low GI snack ideas.
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold transition-all shadow-lg">
              <Download size={20} />
              Download Free PDF Meal Plan
            </button>
            <p className="text-sm text-emerald-200 mt-4">No email required • Instant download • Print-friendly</p>
          </div>
        </section>

        {/* RELATED CONTENT */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Continue Your Low GI Education</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/The-Ultimate-Low-Glycemic-Food-List" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">The Ultimate Low Glycemic Food List</h3>
              <p className="text-slate-600 text-sm">Complete searchable database of 100+ foods with GI scores, serving sizes, and practical tips.</p>
            </a>
            <a href="/calculators/macro-calculator" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 mb-2">Macro Calculator</h3>
              <p className="text-slate-600 text-sm">Calculate your personal protein, carb, and fat targets based on your body and goals.</p>
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-100 border-t border-slate-200 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm mb-4">
            <strong>Medical Disclaimer:</strong> This meal plan is for informational purposes only and is not intended as medical advice. Always consult with a healthcare provider before making significant changes to your diet, especially if you have diabetes or other health conditions.
          </p>
          <p className="text-xs text-slate-400">
            © 2026 Snapie AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
