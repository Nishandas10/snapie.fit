"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

const activityLevels = [
  { value: "sedentary", label: "Sedentary", description: "Little to no exercise", multiplier: 1.0 },
  { value: "light", label: "Light Activity", description: "Light exercise 1-2 days/week", multiplier: 1.1 },
  { value: "moderate", label: "Moderate Activity", description: "Moderate exercise 3-5 days/week", multiplier: 1.2 },
  { value: "active", label: "Very Active", description: "Hard exercise 6-7 days/week", multiplier: 1.3 },
  { value: "athlete", label: "Athlete", description: "Intense training daily", multiplier: 1.5 },
];

const climateOptions = [
  { value: "temperate", label: "Temperate", description: "Comfortable climate", multiplier: 1.0 },
  { value: "hot", label: "Hot/Humid", description: "Hot weather or humid", multiplier: 1.2 },
  { value: "cold", label: "Cold", description: "Cold/dry climate", multiplier: 1.1 },
];

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [activity, setActivity] = useState<string>("moderate");
  const [climate, setClimate] = useState<string>("temperate");
  const [errors, setErrors] = useState<{ weight?: boolean }>({});
  const [result, setResult] = useState<{
    liters: number;
    glasses: number;
    ml: number;
    oz: number;
  } | null>(null);

  const calculateWaterIntake = () => {
    const weightNum = parseFloat(weight);

    const newErrors: { weight?: boolean } = {};
    if (!weightNum) newErrors.weight = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let weightKg = weightNum;
    if (unit === "imperial") {
      weightKg = weightNum * 0.453592;
    }

    // Base water intake: 30-35 ml per kg of body weight
    const baseWaterMl = weightKg * 33;

    // Apply activity multiplier
    const activityMult = activityLevels.find(a => a.value === activity)?.multiplier || 1.0;
    
    // Apply climate multiplier
    const climateMult = climateOptions.find(c => c.value === climate)?.multiplier || 1.0;

    const totalMl = baseWaterMl * activityMult * climateMult;
    const liters = totalMl / 1000;
    const glasses = totalMl / 250; // Standard glass = 250ml
    const oz = totalMl * 0.033814;

    setResult({
      liters: Math.round(liters * 10) / 10,
      glasses: Math.round(glasses),
      ml: Math.round(totalMl),
      oz: Math.round(oz),
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-blue-400 text-sm font-medium">Free Water Intake Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Water Intake
              <span className="block text-blue-400 mt-2">Calculator</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Calculate your optimal daily water intake based on your body weight, activity level, and climate. Stay properly hydrated for better health and fitness.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Calculate Your Water Needs</h2>

            {/* Unit Toggle */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setUnit("metric")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  unit === "metric"
                    ? "bg-blue-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Metric (kg)
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  unit === "imperial"
                    ? "bg-blue-500 text-white"
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
                className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-lg ${errors.weight ? 'border-red-500' : 'border-white/10'}`}
              />
              {errors.weight && <span className="text-red-500 text-sm mt-1 block">Please enter your weight</span>}
              {!errors.weight && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "kilograms (kg)" : "pounds (lbs)"}</span>}
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
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`block font-semibold text-sm ${activity === level.value ? "text-blue-400" : "text-white"}`}>
                      {level.label}
                    </span>
                    <span className="text-slate-500 text-xs hidden sm:block">{level.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Climate */}
            <div className="mb-8">
              <label className="block text-slate-400 mb-3 font-medium">Climate / Environment</label>
              <div className="grid sm:grid-cols-3 gap-3">
                {climateOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setClimate(option.value)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      climate === option.value
                        ? "bg-blue-500/20 border-2 border-blue-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-2xl mb-1 block">
                      {option.value === "temperate" ? "🌤️" : option.value === "hot" ? "☀️" : "❄️"}
                    </span>
                    <span className={`block font-semibold ${climate === option.value ? "text-blue-400" : "text-white"}`}>
                      {option.label}
                    </span>
                    <span className="text-slate-500 text-sm">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateWaterIntake}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate Water Intake
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <div className="text-center mb-6">
                  <p className="text-slate-400 mb-2">Your Daily Water Intake</p>
                  <p className="text-6xl font-bold text-blue-400 mb-2">{result.liters}L</p>
                  <p className="text-slate-400">liters per day</p>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-cyan-400">💧 {result.glasses}</p>
                    <p className="text-slate-400 text-sm">glasses (250ml each)</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-blue-400">{result.ml}</p>
                    <p className="text-slate-400 text-sm">milliliters</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-indigo-400">{result.oz}</p>
                    <p className="text-slate-400 text-sm">fluid ounces</p>
                  </div>
                </div>

                {/* Hydration Schedule */}
                <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                  <h4 className="text-white font-semibold mb-3">⏰ Suggested Hydration Schedule</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>🌅 Morning (6-9 AM)</span>
                      <span className="text-blue-400 font-medium">~{Math.round(result.ml * 0.2)}ml</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>☀️ Mid-Morning (9-12 PM)</span>
                      <span className="text-blue-400 font-medium">~{Math.round(result.ml * 0.2)}ml</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>🍽️ Afternoon (12-3 PM)</span>
                      <span className="text-blue-400 font-medium">~{Math.round(result.ml * 0.25)}ml</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>🌆 Evening (3-6 PM)</span>
                      <span className="text-blue-400 font-medium">~{Math.round(result.ml * 0.2)}ml</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>🌙 Night (6-9 PM)</span>
                      <span className="text-blue-400 font-medium">~{Math.round(result.ml * 0.15)}ml</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 mb-4">Track your water intake and nutrition with Snapie AI</p>
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
            <h2 className="text-3xl font-bold text-white mb-6">Why is Proper Hydration Important?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Water is essential for nearly every bodily function. It makes up about <strong className="text-white">60% of your body weight</strong> and is crucial for maintaining body temperature, transporting nutrients, removing waste, and cushioning joints. Even mild dehydration can affect your physical performance, cognitive function, and overall health.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Signs of Dehydration</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Thirst:</strong> If you feel thirsty, you&apos;re already mildly dehydrated.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Dark Urine:</strong> Healthy urine should be light yellow to clear.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Fatigue:</strong> Dehydration can cause tiredness and low energy.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Headaches:</strong> Even mild dehydration can trigger headaches.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Dry Skin:</strong> Skin may become dry and less elastic when dehydrated.</span>
              </li>
            </ul>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">💧 Benefits of Proper Hydration</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-300 font-medium">🏋️ Better Exercise Performance</p>
                  <p className="text-slate-500 text-sm">Staying hydrated improves endurance and strength</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">🧠 Improved Brain Function</p>
                  <p className="text-slate-500 text-sm">Better focus, memory, and mood</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">⚡ More Energy</p>
                  <p className="text-slate-500 text-sm">Reduces fatigue and boosts alertness</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">🔥 Supports Metabolism</p>
                  <p className="text-slate-500 text-sm">Water is essential for calorie burning</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">When to Drink More Water</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">1.</span>
                <span><strong className="text-white">During Exercise:</strong> Drink 7-10 oz every 10-20 minutes during physical activity.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">2.</span>
                <span><strong className="text-white">In Hot Weather:</strong> Increase intake by 1.5-2x in hot or humid conditions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">3.</span>
                <span><strong className="text-white">When Sick:</strong> Fever, vomiting, or diarrhea increase water needs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">4.</span>
                <span><strong className="text-white">During Pregnancy/Breastfeeding:</strong> Additional water is needed for fetal development and milk production.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">5.</span>
                <span><strong className="text-white">With Caffeine/Alcohol:</strong> These are diuretics that increase water loss.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Tips to Drink More Water</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Keep a water bottle with you throughout the day</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Drink a glass of water before each meal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Set reminders on your phone to drink water</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Add natural flavors like lemon or cucumber</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Eat water-rich foods (watermelon, cucumber, oranges)</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="water-intake-calculator" />
    </CalculatorLayout>
  );
}
