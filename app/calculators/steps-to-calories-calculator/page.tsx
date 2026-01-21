"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

const paceOptions = [
  { value: "slow", label: "Slow Walk", description: "Casual stroll (~2 mph)", calPerStep: 0.035 },
  { value: "normal", label: "Normal Walk", description: "Regular pace (~3 mph)", calPerStep: 0.04 },
  { value: "brisk", label: "Brisk Walk", description: "Fast walk (~4 mph)", calPerStep: 0.05 },
  { value: "jogging", label: "Light Jogging", description: "Easy jog (~5 mph)", calPerStep: 0.07 },
  { value: "running", label: "Running", description: "Running (~6+ mph)", calPerStep: 0.1 },
];

export default function StepsToCaloriesCalculator() {
  const [steps, setSteps] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [pace, setPace] = useState<string>("normal");
  const [errors, setErrors] = useState<{ steps?: boolean; weight?: boolean }>({});
  const [result, setResult] = useState<{
    calories: number;
    distance: number;
    time: number;
  } | null>(null);

  const calculateCalories = () => {
    const stepsNum = parseInt(steps);
    const weightNum = parseFloat(weight);

    const newErrors: { steps?: boolean; weight?: boolean } = {};
    if (!stepsNum) newErrors.steps = true;
    if (!weightNum) newErrors.weight = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let weightKg = weightNum;
    if (unit === "imperial") {
      weightKg = weightNum * 0.453592;
    }

    const selectedPace = paceOptions.find(p => p.value === pace)!;
    
    // Calories burned = (Base cal per step) * (weight factor) * steps
    // Weight factor adjusts for heavier people burning more calories
    const weightFactor = weightKg / 70; // Normalized to 70kg
    const calories = selectedPace.calPerStep * weightFactor * stepsNum;

    // Average stride length is about 2.5 feet (0.76m) for walking
    const strideLength = pace === "running" || pace === "jogging" ? 1.2 : 0.76;
    const distanceKm = (stepsNum * strideLength) / 1000;

    // Steps per minute varies by pace
    const stepsPerMinute = pace === "slow" ? 80 : pace === "normal" ? 100 : pace === "brisk" ? 120 : pace === "jogging" ? 140 : 160;
    const time = stepsNum / stepsPerMinute;

    setResult({
      calories: Math.round(calories),
      distance: Math.round(distanceKm * 100) / 100,
      time: Math.round(time),
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">Free Steps to Calories Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Steps to Calories
              <span className="block text-emerald-400 mt-2">Converter</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Convert your daily step count into calories burned. See how your walking or running contributes to your fitness goals and calorie deficit.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Convert Your Steps</h2>

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
                Metric (kg)
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  unit === "imperial"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Imperial (lbs)
              </button>
            </div>

            {/* Input Fields */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-slate-400 mb-2 font-medium">Number of Steps</label>
                <input
                  type="number"
                  value={steps}
                  onChange={(e) => { setSteps(e.target.value); setErrors(prev => ({...prev, steps: false})); }}
                  placeholder="10000"
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.steps ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.steps && <span className="text-red-500 text-sm mt-1 block">Please enter number of steps</span>}
                {!errors.steps && <span className="text-slate-500 text-sm mt-1 block">Total steps</span>}
              </div>
              <div>
                <label className="block text-slate-400 mb-2 font-medium">Your Weight</label>
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
            </div>

            {/* Pace Selection */}
            <div className="mb-8">
              <label className="block text-slate-400 mb-3 font-medium">Walking/Running Pace</label>
              <div className="grid sm:grid-cols-5 gap-2">
                {paceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPace(option.value)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      pace === option.value
                        ? "bg-emerald-500/20 border-2 border-emerald-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`block font-semibold text-sm ${pace === option.value ? "text-emerald-400" : "text-white"}`}>
                      {option.label}
                    </span>
                    <span className="text-slate-500 text-xs">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateCalories}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate Calories Burned
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="text-center mb-6">
                  <p className="text-slate-400 mb-2">Estimated Calories Burned</p>
                  <p className="text-6xl font-bold text-emerald-400 mb-2">{result.calories}</p>
                  <p className="text-slate-400">calories</p>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-blue-400">{result.distance}</p>
                    <p className="text-slate-400 text-sm">km walked</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-purple-400">{result.time}</p>
                    <p className="text-slate-400 text-sm">minutes</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-orange-400">{Math.round(result.calories / (result.time || 1))}</p>
                    <p className="text-slate-400 text-sm">cal/minute</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">🎯 Step Goals Comparison</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">5,000 steps (light active)</span>
                      <span className="text-white font-medium">~{Math.round(result.calories * (5000 / parseInt(steps)))} cal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">10,000 steps (active)</span>
                      <span className="text-emerald-400 font-medium">~{Math.round(result.calories * (10000 / parseInt(steps)))} cal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">15,000 steps (very active)</span>
                      <span className="text-blue-400 font-medium">~{Math.round(result.calories * (15000 / parseInt(steps)))} cal</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 mb-4">Track your steps and calories automatically with Snapie AI</p>
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
            <h2 className="text-3xl font-bold text-white mb-6">How Many Calories Do Steps Burn?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Walking is one of the most accessible and effective forms of exercise. On average, <strong className="text-white">100 steps burn approximately 4-5 calories</strong> for a person of average weight walking at a moderate pace. This means the commonly recommended goal of 10,000 steps per day can burn approximately <strong className="text-white">400-500 extra calories</strong>.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Factors That Affect Calories Burned Per Step</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Body Weight:</strong> Heavier individuals burn more calories per step because more energy is required to move a larger mass.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Walking Speed:</strong> Faster walking (brisk pace) burns significantly more calories than a slow stroll.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Terrain:</strong> Walking uphill or on uneven surfaces increases calorie burn by 15-30%.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Stride Length:</strong> Longer strides cover more ground but may burn slightly fewer calories per step.</span>
              </li>
            </ul>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">📊 Average Calories Per 1,000 Steps</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-300 font-medium">Slow Walk (2 mph)</p>
                  <p className="text-slate-500 text-sm">~30-35 calories / 1,000 steps</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Normal Walk (3 mph)</p>
                  <p className="text-slate-500 text-sm">~40-45 calories / 1,000 steps</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Brisk Walk (4 mph)</p>
                  <p className="text-slate-500 text-sm">~50-55 calories / 1,000 steps</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Running (6 mph)</p>
                  <p className="text-slate-500 text-sm">~80-100 calories / 1,000 steps</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Step Goals for Weight Loss</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              To lose one pound of fat, you need to create a calorie deficit of approximately <strong className="text-white">3,500 calories</strong>. If you walk 10,000 steps daily and burn ~400 calories from walking alone, you could lose about 1 pound every 8-9 days purely from walking (assuming your diet stays constant).
            </p>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">🚶 Recommended Daily Steps by Activity Level</h4>
              <ul className="space-y-2 text-slate-400">
                <li><strong className="text-white">Sedentary:</strong> Less than 5,000 steps/day</li>
                <li><strong className="text-white">Low Active:</strong> 5,000-7,500 steps/day</li>
                <li><strong className="text-white">Somewhat Active:</strong> 7,500-10,000 steps/day</li>
                <li><strong className="text-white">Active:</strong> 10,000-12,500 steps/day</li>
                <li><strong className="text-white">Highly Active:</strong> More than 12,500 steps/day</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Tips to Increase Your Daily Steps</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">1.</span>
                <span>Take the stairs instead of the elevator whenever possible</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">2.</span>
                <span>Park farther away from your destination</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">3.</span>
                <span>Take walking breaks during work (5 minutes every hour)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">4.</span>
                <span>Walk while talking on the phone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">5.</span>
                <span>Schedule a daily walk after meals to aid digestion</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="steps-to-calories-calculator" />
    </CalculatorLayout>
  );
}
