"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

const activityLevels = [
  { value: 1.2, label: "Sedentary", description: "Little or no exercise" },
  { value: 1.375, label: "Lightly Active", description: "1-3 days/week" },
  { value: 1.55, label: "Moderately Active", description: "3-5 days/week" },
  { value: 1.725, label: "Very Active", description: "6-7 days/week" },
  { value: 1.9, label: "Extra Active", description: "Physical job + training" },
];

const goals = [
  { value: "lose", label: "Lose Weight", description: "Fat loss focused", deficit: -500, proteinMult: 2.2 },
  { value: "maintain", label: "Maintain", description: "Stay the same", deficit: 0, proteinMult: 1.8 },
  { value: "gain", label: "Build Muscle", description: "Lean muscle gain", deficit: 300, proteinMult: 2.0 },
];

const macroSplits = [
  { value: "balanced", label: "Balanced", protein: 30, carbs: 40, fat: 30, description: "Good for general health" },
  { value: "lowCarb", label: "Low Carb", protein: 35, carbs: 25, fat: 40, description: "For fat loss & insulin control" },
  { value: "highProtein", label: "High Protein", protein: 40, carbs: 35, fat: 25, description: "For muscle building" },
  { value: "keto", label: "Keto", protein: 25, carbs: 5, fat: 70, description: "Very low carb" },
  { value: "custom", label: "Custom", protein: 30, carbs: 40, fat: 30, description: "Set your own ratios" },
];

export default function MacroCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [activity, setActivity] = useState<number>(1.55);
  const [goal, setGoal] = useState<string>("maintain");
  const [split, setSplit] = useState<string>("balanced");
  const [customProtein, setCustomProtein] = useState<number>(30);
  const [customCarbs, setCustomCarbs] = useState<number>(40);
  const [customFat, setCustomFat] = useState<number>(30);
  const [errors, setErrors] = useState<{ age?: boolean; weight?: boolean; height?: boolean }>({});
  const [result, setResult] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  } | null>(null);

  const calculateMacros = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    const newErrors: { age?: boolean; weight?: boolean; height?: boolean } = {};
    if (!ageNum) newErrors.age = true;
    if (!weightNum) newErrors.weight = true;
    if (!heightNum) newErrors.height = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let weightKg = weightNum;
    let heightCm = heightNum;

    if (unit === "imperial") {
      weightKg = weightNum * 0.453592;
      heightCm = heightNum * 2.54;
    }

    // Calculate BMR using Mifflin-St Jeor
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    const tdee = bmr * activity;
    const selectedGoal = goals.find(g => g.value === goal)!;
    const targetCalories = Math.round(tdee + selectedGoal.deficit);

    // Get macro percentages
    let proteinPercent: number, carbsPercent: number, fatPercent: number;
    
    if (split === "custom") {
      proteinPercent = customProtein;
      carbsPercent = customCarbs;
      fatPercent = customFat;
    } else {
      const selectedSplit = macroSplits.find(s => s.value === split)!;
      proteinPercent = selectedSplit.protein;
      carbsPercent = selectedSplit.carbs;
      fatPercent = selectedSplit.fat;
    }

    // Calculate grams
    // Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g
    const proteinGrams = Math.round((targetCalories * (proteinPercent / 100)) / 4);
    const carbsGrams = Math.round((targetCalories * (carbsPercent / 100)) / 4);
    const fatGrams = Math.round((targetCalories * (fatPercent / 100)) / 9);

    setResult({
      calories: targetCalories,
      protein: proteinPercent,
      carbs: carbsPercent,
      fat: fatPercent,
      proteinGrams,
      carbsGrams,
      fatGrams,
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">Free Macro Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Macro Calculator
              <span className="block text-emerald-400 mt-2">Protein, Carbs &amp; Fats</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Calculate your optimal macronutrient split for weight loss, muscle building, or maintaining your physique. Get personalized protein, carbs, and fat targets.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Calculate Your Macros</h2>

            {/* Unit Toggle */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setUnit("metric")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  unit === "metric"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Metric (kg/cm)
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  unit === "imperial"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Imperial (lbs/in)
              </button>
            </div>

            {/* Gender Selection */}
            <div className="mb-6">
              <label className="block text-slate-400 mb-3 font-medium">Gender</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setGender("male")}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    gender === "male"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  <span className="text-xl">👨</span> Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    gender === "female"
                      ? "bg-pink-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  <span className="text-xl">👩</span> Female
                </button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-slate-400 mb-2 font-medium">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => { setAge(e.target.value); setErrors(prev => ({...prev, age: false})); }}
                  placeholder="25"
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.age ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.age && <span className="text-red-500 text-sm mt-1 block">Please enter your age</span>}
                {!errors.age && <span className="text-slate-500 text-sm mt-1 block">years</span>}
              </div>
              <div>
                <label className="block text-slate-400 mb-2 font-medium">Weight</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); setErrors(prev => ({...prev, weight: false})); }}
                  placeholder={unit === "metric" ? "70" : "154"}
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.weight ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.weight && <span className="text-red-500 text-sm mt-1 block">Please enter your weight</span>}
                {!errors.weight && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "kg" : "lbs"}</span>}
              </div>
              <div>
                <label className="block text-slate-400 mb-2 font-medium">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => { setHeight(e.target.value); setErrors(prev => ({...prev, height: false})); }}
                  placeholder={unit === "metric" ? "175" : "69"}
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.height ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.height && <span className="text-red-500 text-sm mt-1 block">Please enter your height</span>}
                {!errors.height && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "cm" : "inches"}</span>}
              </div>
            </div>

            {/* Activity Level */}
            <div className="mb-6">
              <label className="block text-slate-400 mb-3 font-medium">Activity Level</label>
              <div className="grid sm:grid-cols-5 gap-2">
                {activityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setActivity(level.value)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      activity === level.value
                        ? "bg-emerald-500/20 border-2 border-emerald-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`block font-semibold text-sm ${activity === level.value ? "text-emerald-400" : "text-white"}`}>
                      {level.label}
                    </span>
                    <span className="text-slate-500 text-xs">{level.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selection */}
            <div className="mb-6">
              <label className="block text-slate-400 mb-3 font-medium">Your Goal</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {goals.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGoal(g.value)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      goal === g.value
                        ? g.value === "lose" ? "bg-red-500/20 border-2 border-red-500" :
                          g.value === "gain" ? "bg-blue-500/20 border-2 border-blue-500" :
                          "bg-emerald-500/20 border-2 border-emerald-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`block font-semibold ${
                      goal === g.value ? 
                        g.value === "lose" ? "text-red-400" :
                        g.value === "gain" ? "text-blue-400" :
                        "text-emerald-400"
                      : "text-white"
                    }`}>
                      {g.label}
                    </span>
                    <span className="text-slate-500 text-sm">{g.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Macro Split Selection */}
            <div className="mb-6">
              <label className="block text-slate-400 mb-3 font-medium">Macro Split</label>
              <div className="grid sm:grid-cols-5 gap-2">
                {macroSplits.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSplit(s.value)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      split === s.value
                        ? "bg-purple-500/20 border-2 border-purple-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`block font-semibold text-sm ${split === s.value ? "text-purple-400" : "text-white"}`}>
                      {s.label}
                    </span>
                    <span className="text-slate-500 text-xs">{s.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Split Sliders */}
            {split === "custom" && (
              <div className="mb-6 p-4 bg-slate-800/50 rounded-xl">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Protein</span>
                      <span className="text-white font-semibold">{customProtein}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(parseInt(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Carbs</span>
                      <span className="text-white font-semibold">{customCarbs}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="65"
                      value={customCarbs}
                      onChange={(e) => setCustomCarbs(parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Fat</span>
                      <span className="text-white font-semibold">{customFat}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="75"
                      value={customFat}
                      onChange={(e) => setCustomFat(parseInt(e.target.value))}
                      className="w-full accent-orange-500"
                    />
                  </div>
                  <p className={`text-center text-sm ${
                    customProtein + customCarbs + customFat === 100 ? "text-emerald-400" : "text-red-400"
                  }`}>
                    Total: {customProtein + customCarbs + customFat}% {customProtein + customCarbs + customFat !== 100 && "(must equal 100%)"}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={calculateMacros}
              disabled={split === "custom" && customProtein + customCarbs + customFat !== 100}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate Macros
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="text-center mb-6">
                  <p className="text-slate-400 mb-2">Your Daily Target</p>
                  <p className="text-5xl font-bold text-emerald-400">{result.calories}</p>
                  <p className="text-slate-400">calories/day</p>
                </div>

                <h4 className="text-white font-semibold mb-4 text-center">Your Macro Breakdown</h4>
                <div className="grid sm:grid-cols-3 gap-4 text-center mb-6">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-3xl mb-2">🥩</div>
                    <p className="text-emerald-400 font-semibold mb-1">Protein</p>
                    <p className="text-3xl font-bold text-white">{result.proteinGrams}g</p>
                    <p className="text-slate-500 text-sm">{result.protein}% • {result.proteinGrams * 4} cal</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-3xl mb-2">🍚</div>
                    <p className="text-blue-400 font-semibold mb-1">Carbs</p>
                    <p className="text-3xl font-bold text-white">{result.carbsGrams}g</p>
                    <p className="text-slate-500 text-sm">{result.carbs}% • {result.carbsGrams * 4} cal</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-3xl mb-2">🥑</div>
                    <p className="text-orange-400 font-semibold mb-1">Fats</p>
                    <p className="text-3xl font-bold text-white">{result.fatGrams}g</p>
                    <p className="text-slate-500 text-sm">{result.fat}% • {result.fatGrams * 9} cal</p>
                  </div>
                </div>

                {/* Visual Macro Bar */}
                <div className="mb-6">
                  <div className="h-6 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-emerald-500 flex items-center justify-center text-xs font-semibold text-white"
                      style={{ width: `${result.protein}%` }}
                    >
                      P
                    </div>
                    <div 
                      className="bg-blue-500 flex items-center justify-center text-xs font-semibold text-white"
                      style={{ width: `${result.carbs}%` }}
                    >
                      C
                    </div>
                    <div 
                      className="bg-orange-500 flex items-center justify-center text-xs font-semibold text-white"
                      style={{ width: `${result.fat}%` }}
                    >
                      F
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-slate-400 mb-4">Track your macros automatically with AI-powered food scanning</p>
                  <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block transition-all hover:scale-105">
                    <GooglePlayBadge />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-white mb-6">What Are Macronutrients (Macros)?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              <strong className="text-white">Macronutrients</strong> are the three main nutrients your body needs in large amounts for energy, growth, and vital functions. Unlike micronutrients (vitamins and minerals) which are needed in small amounts, macros make up the bulk of your diet and provide the calories your body uses for fuel.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-6">
                <div className="text-4xl mb-3">🥩</div>
                <h3 className="text-emerald-400 font-bold text-xl mb-2">Protein</h3>
                <p className="text-slate-400 text-sm mb-3">4 calories per gram</p>
                <p className="text-slate-400 text-sm">Essential for muscle building, repair, enzymes, hormones, and immune function. Found in meat, fish, eggs, dairy, legumes, and tofu.</p>
              </div>
              <div className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-6">
                <div className="text-4xl mb-3">🍚</div>
                <h3 className="text-blue-400 font-bold text-xl mb-2">Carbohydrates</h3>
                <p className="text-slate-400 text-sm mb-3">4 calories per gram</p>
                <p className="text-slate-400 text-sm">Primary energy source for brain and muscles. Found in grains, fruits, vegetables, legumes, and sugars.</p>
              </div>
              <div className="bg-slate-900/50 border border-orange-500/20 rounded-xl p-6">
                <div className="text-4xl mb-3">🥑</div>
                <h3 className="text-orange-400 font-bold text-xl mb-2">Fats</h3>
                <p className="text-slate-400 text-sm mb-3">9 calories per gram</p>
                <p className="text-slate-400 text-sm">Essential for hormone production, nutrient absorption, and cell function. Found in oils, nuts, seeds, avocados, and fatty fish.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Why Track Macros Instead of Just Calories?</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              While total calorie intake determines weight loss or gain, <strong className="text-white">macro ratios determine body composition</strong>. Two people eating the same calories can have very different results depending on their macro split:
            </p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Higher protein</strong> helps preserve muscle during weight loss and builds more muscle during bulking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Optimal carb intake</strong> fuels workouts and supports athletic performance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Adequate fats</strong> support hormone health, satiety, and nutrient absorption</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Best Macro Split for Different Goals</h3>
            
            <div className="space-y-6 mb-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                <h4 className="text-red-400 font-semibold text-lg mb-3">🔥 For Weight Loss / Fat Loss</h4>
                <p className="text-slate-400 mb-3">Focus on higher protein to preserve muscle while in a caloric deficit.</p>
                <div className="flex gap-4 text-sm">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">Protein: 30-40%</span>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">Carbs: 25-35%</span>
                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">Fats: 25-35%</span>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                <h4 className="text-blue-400 font-semibold text-lg mb-3">💪 For Muscle Building</h4>
                <p className="text-slate-400 mb-3">Higher carbs fuel intense workouts; protein supports muscle protein synthesis.</p>
                <div className="flex gap-4 text-sm">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">Protein: 25-35%</span>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">Carbs: 40-50%</span>
                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">Fats: 20-30%</span>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                <h4 className="text-emerald-400 font-semibold text-lg mb-3">⚖️ For Maintenance / General Health</h4>
                <p className="text-slate-400 mb-3">Balanced approach suitable for most people maintaining their weight.</p>
                <div className="flex gap-4 text-sm">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">Protein: 25-30%</span>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">Carbs: 40-50%</span>
                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">Fats: 25-30%</span>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                <h4 className="text-purple-400 font-semibold text-lg mb-3">🥑 For Keto / Low-Carb Diet</h4>
                <p className="text-slate-400 mb-3">Very low carb intake to achieve ketosis for fat burning.</p>
                <div className="flex gap-4 text-sm">
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">Protein: 20-25%</span>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">Carbs: 5-10%</span>
                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">Fats: 65-75%</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">How Much Protein Do You Need?</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Protein needs vary based on activity level and goals. Here are evidence-based recommendations:
            </p>
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-white font-semibold py-3">Goal</th>
                    <th className="text-white font-semibold py-3">Protein (g/kg bodyweight)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-white/5">
                    <td className="py-3">Sedentary Adult</td>
                    <td className="py-3">0.8g per kg</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Active Adult / Weight Maintenance</td>
                    <td className="py-3">1.2-1.6g per kg</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Muscle Building</td>
                    <td className="py-3">1.6-2.2g per kg</td>
                  </tr>
                  <tr>
                    <td className="py-3">Fat Loss (preserve muscle)</td>
                    <td className="py-3">1.8-2.4g per kg</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Tips for Hitting Your Macros</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Plan meals in advance:</strong> Prep protein sources, measure portions, and batch cook to stay on track</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Prioritize protein:</strong> Build meals around your protein source first, then add carbs and fats</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Use a food tracking app:</strong> Apps like Snapie AI can automatically track macros from food photos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Don&apos;t aim for perfection:</strong> Being within 5-10g of your targets is good enough for results</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Focus on weekly averages:</strong> One off day won&apos;t derail your progress if your weekly average is on point</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Do I need to hit my macros exactly every day?</h4>
                <p className="text-slate-400">No, being within 5-10g of your targets is sufficient. Focus on weekly consistency rather than daily perfection. Protein is the most important to hit daily.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Can I eat more fat if I eat less carbs?</h4>
                <p className="text-slate-400">Yes, you can swap carbs and fats to some extent since they both provide energy. However, keep protein consistent regardless of how you split carbs and fats.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Is tracking macros better than counting calories?</h4>
                <p className="text-slate-400">Macro tracking includes calorie counting (since macros determine calories) but provides more control over body composition. It&apos;s better for optimizing muscle gain or fat loss.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">What if I&apos;m vegetarian or vegan?</h4>
                <p className="text-slate-400">You can absolutely hit your macros on a plant-based diet. Focus on protein-rich foods like tofu, tempeh, seitan, legumes, and protein supplements if needed.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="macro-calculator" />
    </CalculatorLayout>
  );
}
