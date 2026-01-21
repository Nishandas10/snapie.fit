"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

const activityLevels = [
  { value: "sedentary", label: "Sedentary", description: "Little to no exercise", multiplier: 0.8 },
  { value: "light", label: "Light Activity", description: "Light exercise 1-2 days/week", multiplier: 1.0 },
  { value: "moderate", label: "Moderate Activity", description: "Moderate exercise 3-5 days/week", multiplier: 1.2 },
  { value: "active", label: "Very Active", description: "Hard exercise 6-7 days/week", multiplier: 1.4 },
  { value: "athlete", label: "Athlete", description: "Intense training daily", multiplier: 1.6 },
];

const goals = [
  { value: "maintain", label: "Maintain Muscle", description: "Keep current muscle mass", baseMultiplier: 1.6 },
  { value: "lose", label: "Fat Loss", description: "Preserve muscle while losing fat", baseMultiplier: 2.0 },
  { value: "build", label: "Build Muscle", description: "Maximize muscle growth", baseMultiplier: 2.2 },
  { value: "general", label: "General Health", description: "Minimum healthy intake", baseMultiplier: 1.2 },
];

export default function ProteinIntakeCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [activity, setActivity] = useState<string>("moderate");
  const [goal, setGoal] = useState<string>("maintain");
  const [errors, setErrors] = useState<{ weight?: boolean }>({});
  const [result, setResult] = useState<{
    proteinGrams: number;
    proteinMin: number;
    proteinMax: number;
    mealsPerDay: number;
    perMeal: number;
    calories: number;
  } | null>(null);

  const calculateProtein = () => {
    const weightNum = parseFloat(weight);

    const newErrors: { weight?: boolean } = {};
    if (!weightNum) newErrors.weight = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let weightKg = weightNum;
    if (unit === "imperial") {
      weightKg = weightNum * 0.453592;
    }

    // Get base multiplier from goal
    const selectedGoal = goals.find(g => g.value === goal)!;
    const baseProtein = selectedGoal.baseMultiplier;

    // Adjust for activity level (slight modifications)
    const activityMod = activityLevels.find(a => a.value === activity)?.multiplier || 1.0;
    
    // Calculate protein range
    const proteinGrams = Math.round(weightKg * baseProtein * (activityMod / 1.2));
    const proteinMin = Math.round(proteinGrams * 0.85);
    const proteinMax = Math.round(proteinGrams * 1.15);

    // Optimal meals per day and protein per meal
    const mealsPerDay = 4;
    const perMeal = Math.round(proteinGrams / mealsPerDay);

    // Calories from protein (4 cal per gram)
    const calories = proteinGrams * 4;

    setResult({
      proteinGrams,
      proteinMin,
      proteinMax,
      mealsPerDay,
      perMeal,
      calories,
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-orange-400 text-sm font-medium">Free Protein Intake Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Protein Intake
              <span className="block text-orange-400 mt-2">Calculator</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Calculate your optimal daily protein intake based on your weight, activity level, and fitness goals. Get personalized recommendations for muscle building, fat loss, or general health.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Calculate Your Protein Needs</h2>

            {/* Unit Toggle */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setUnit("metric")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  unit === "metric"
                    ? "bg-orange-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Metric (kg)
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  unit === "imperial"
                    ? "bg-orange-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Imperial (lbs)
              </button>
            </div>

            {/* Weight Input */}
            <div className="mb-6">
              <label className="block text-slate-400 mb-2 font-medium">Your Weight</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => { setWeight(e.target.value); setErrors(prev => ({...prev, weight: false})); }}
                placeholder={unit === "metric" ? "70" : "154"}
                className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors text-lg ${errors.weight ? 'border-red-500' : 'border-white/10'}`}
              />
              {errors.weight && <span className="text-red-500 text-sm mt-1 block">Please enter your weight</span>}
              {!errors.weight && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "kilograms (kg)" : "pounds (lbs)"}</span>}
            </div>

            {/* Fitness Goal */}
            <div className="mb-6">
              <label className="block text-slate-400 mb-3 font-medium">Your Fitness Goal</label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGoal(g.value)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      goal === g.value
                        ? "bg-orange-500/20 border-2 border-orange-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-2xl mb-1 block">
                      {g.value === "maintain" ? "💪" : g.value === "lose" ? "🔥" : g.value === "build" ? "🏋️" : "❤️"}
                    </span>
                    <span className={`block font-semibold ${goal === g.value ? "text-orange-400" : "text-white"}`}>
                      {g.label}
                    </span>
                    <span className="text-slate-500 text-xs">{g.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Level */}
            <div className="mb-8">
              <label className="block text-slate-400 mb-3 font-medium">Activity Level</label>
              <div className="grid sm:grid-cols-5 gap-2">
                {activityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setActivity(level.value)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      activity === level.value
                        ? "bg-orange-500/20 border-2 border-orange-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`block font-semibold text-sm ${activity === level.value ? "text-orange-400" : "text-white"}`}>
                      {level.label}
                    </span>
                    <span className="text-slate-500 text-xs hidden sm:block">{level.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateProtein}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate Protein Intake
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                <div className="text-center mb-6">
                  <p className="text-slate-400 mb-2">Your Daily Protein Target</p>
                  <p className="text-6xl font-bold text-orange-400 mb-2">{result.proteinGrams}g</p>
                  <p className="text-slate-400">grams per day</p>
                  <p className="text-slate-500 text-sm mt-2">Range: {result.proteinMin}g - {result.proteinMax}g</p>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-yellow-400">🍽️ {result.perMeal}g</p>
                    <p className="text-slate-400 text-sm">per meal ({result.mealsPerDay} meals)</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-red-400">{result.calories}</p>
                    <p className="text-slate-400 text-sm">calories from protein</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-green-400">{Math.round(result.proteinGrams / (parseFloat(weight) * (unit === "imperial" ? 0.453592 : 1)) * 10) / 10}g</p>
                    <p className="text-slate-400 text-sm">per kg body weight</p>
                  </div>
                </div>

                {/* Protein Sources */}
                <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                  <h4 className="text-white font-semibold mb-3">🥩 High-Protein Food Sources</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="text-center">
                      <p className="text-2xl mb-1">🍗</p>
                      <p className="text-slate-300 font-medium">Chicken Breast</p>
                      <p className="text-slate-500">31g / 100g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl mb-1">🥚</p>
                      <p className="text-slate-300 font-medium">Eggs</p>
                      <p className="text-slate-500">13g / 100g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl mb-1">🐟</p>
                      <p className="text-slate-300 font-medium">Salmon</p>
                      <p className="text-slate-500">25g / 100g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl mb-1">🥛</p>
                      <p className="text-slate-300 font-medium">Greek Yogurt</p>
                      <p className="text-slate-500">10g / 100g</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 mb-4">Track your protein intake automatically with Snapie AI</p>
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
            <h2 className="text-3xl font-bold text-white mb-6">Why is Protein Important?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Protein is one of the three macronutrients essential for human health. It&apos;s made up of amino acids, which are the <strong className="text-white">building blocks of muscle, skin, enzymes, and hormones</strong>. Your body needs adequate protein to repair tissues, build muscle, support immune function, and maintain healthy hair, skin, and nails.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Protein Requirements by Goal</h3>
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-300 font-medium">🏃 General Health / Sedentary</p>
                  <p className="text-slate-500 text-sm">0.8 - 1.2g per kg of body weight</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">💪 Maintain Muscle Mass</p>
                  <p className="text-slate-500 text-sm">1.4 - 1.8g per kg of body weight</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">🔥 Fat Loss (while preserving muscle)</p>
                  <p className="text-slate-500 text-sm">1.8 - 2.4g per kg of body weight</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">🏋️ Muscle Building / Bodybuilding</p>
                  <p className="text-slate-500 text-sm">2.0 - 2.4g per kg of body weight</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Benefits of Adequate Protein Intake</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong className="text-white">Muscle Growth & Recovery:</strong> Protein provides amino acids needed for muscle protein synthesis after workouts.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong className="text-white">Increased Satiety:</strong> Protein is the most filling macronutrient, helping reduce hunger and cravings.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong className="text-white">Higher Thermic Effect:</strong> Your body burns 20-30% of protein calories during digestion.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong className="text-white">Bone Health:</strong> Adequate protein supports bone density and reduces fracture risk.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">•</span>
                <span><strong className="text-white">Metabolism Boost:</strong> Higher protein intake can increase metabolic rate.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Best Protein Sources</h3>
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">🥩 Animal Protein Sources</h4>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-slate-300 font-medium">Chicken Breast (100g)</p>
                  <p className="text-slate-500 text-sm">31g protein, 165 calories</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Lean Beef (100g)</p>
                  <p className="text-slate-500 text-sm">26g protein, 250 calories</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Salmon (100g)</p>
                  <p className="text-slate-500 text-sm">25g protein, 208 calories</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Eggs (2 large)</p>
                  <p className="text-slate-500 text-sm">12g protein, 140 calories</p>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-4">🌱 Plant Protein Sources</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-300 font-medium">Tofu (100g)</p>
                  <p className="text-slate-500 text-sm">8g protein, 76 calories</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Lentils (100g cooked)</p>
                  <p className="text-slate-500 text-sm">9g protein, 116 calories</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Chickpeas (100g cooked)</p>
                  <p className="text-slate-500 text-sm">8.9g protein, 164 calories</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Quinoa (100g cooked)</p>
                  <p className="text-slate-500 text-sm">4.4g protein, 120 calories</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Protein Timing Tips</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">1.</span>
                <span><strong className="text-white">Spread intake throughout the day:</strong> Aim for 20-40g per meal for optimal muscle protein synthesis.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">2.</span>
                <span><strong className="text-white">Post-workout protein:</strong> Consume protein within 2 hours after training for recovery.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">3.</span>
                <span><strong className="text-white">Breakfast protein:</strong> Starting with protein helps control hunger throughout the day.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 mt-1">4.</span>
                <span><strong className="text-white">Bedtime protein:</strong> Casein protein before bed supports overnight muscle recovery.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="protein-intake-calculator" />
    </CalculatorLayout>
  );
}
