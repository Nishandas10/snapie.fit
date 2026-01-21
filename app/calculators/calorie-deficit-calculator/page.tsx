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
  { value: "mildLoss", label: "Mild Weight Loss", deficit: -250, rate: "0.25 kg/week", description: "Sustainable, muscle preserving" },
  { value: "weightLoss", label: "Weight Loss", deficit: -500, rate: "0.5 kg/week", description: "Recommended for most people" },
  { value: "fastLoss", label: "Fast Weight Loss", deficit: -750, rate: "0.75 kg/week", description: "Aggressive, requires discipline" },
  { value: "extremeLoss", label: "Extreme Weight Loss", deficit: -1000, rate: "1 kg/week", description: "Not recommended long-term" },
  { value: "maintain", label: "Maintain Weight", deficit: 0, rate: "0 kg/week", description: "Stay at current weight" },
  { value: "mildGain", label: "Mild Weight Gain", deficit: 250, rate: "+0.25 kg/week", description: "Lean bulk" },
  { value: "weightGain", label: "Weight Gain", deficit: 500, rate: "+0.5 kg/week", description: "Standard bulk" },
];

export default function CalorieDeficitCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [activity, setActivity] = useState<number>(1.55);
  const [goal, setGoal] = useState<string>("weightLoss");
  const [targetWeight, setTargetWeight] = useState<string>("");
  const [errors, setErrors] = useState<{ age?: boolean; weight?: boolean; height?: boolean }>({});
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    targetCalories: number;
    deficit: number;
    weeklyRate: string;
    weeksToGoal: number;
    targetDate: string;
  } | null>(null);

  const calculateCalories = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);
    const targetWeightNum = parseFloat(targetWeight);

    const newErrors: { age?: boolean; weight?: boolean; height?: boolean } = {};
    if (!ageNum) newErrors.age = true;
    if (!weightNum) newErrors.weight = true;
    if (!heightNum) newErrors.height = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let weightKg = weightNum;
    let heightCm = heightNum;
    let targetKg = targetWeightNum;

    if (unit === "imperial") {
      weightKg = weightNum * 0.453592;
      heightCm = heightNum * 2.54;
      targetKg = targetWeightNum * 0.453592;
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
    const targetCalories = Math.max(Math.round(tdee + selectedGoal.deficit), gender === "female" ? 1200 : 1500);

    // Calculate time to reach goal
    let weeksToGoal = 0;
    let targetDate = "";
    
    if (targetKg && selectedGoal.deficit !== 0) {
      const weightDiff = Math.abs(weightKg - targetKg);
      const weeklyChange = Math.abs(selectedGoal.deficit) * 7 / 7700; // 7700 cal ≈ 1 kg
      weeksToGoal = Math.ceil(weightDiff / weeklyChange);
      
      const date = new Date();
      date.setDate(date.getDate() + weeksToGoal * 7);
      targetDate = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      deficit: selectedGoal.deficit,
      weeklyRate: selectedGoal.rate,
      weeksToGoal,
      targetDate,
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">Free Calorie Deficit Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Calorie Deficit
              <span className="block text-emerald-400 mt-2">Surplus Planner</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Plan your calorie intake for weight loss or muscle gain. Get personalized daily calorie targets and see exactly when you&apos;ll reach your goal weight.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Plan Your Calorie Goals</h2>

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
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-slate-400 mb-2 font-medium">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => { setAge(e.target.value); setErrors(prev => ({...prev, age: false})); }}
                  placeholder="25"
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.age ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.age && <span className="text-red-500 text-sm mt-1 block">Required</span>}
                {!errors.age && <span className="text-slate-500 text-sm mt-1 block">years</span>}
              </div>
              <div>
                <label className="block text-slate-400 mb-2 font-medium">Current Weight</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => { setWeight(e.target.value); setErrors(prev => ({...prev, weight: false})); }}
                  placeholder={unit === "metric" ? "70" : "154"}
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.weight ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.weight && <span className="text-red-500 text-sm mt-1 block">Required</span>}
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
                {errors.height && <span className="text-red-500 text-sm mt-1 block">Required</span>}
                {!errors.height && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "cm" : "inches"}</span>}
              </div>
              <div>
                <label className="block text-slate-400 mb-2 font-medium">Target Weight</label>
                <input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  placeholder={unit === "metric" ? "65" : "143"}
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg"
                />
                <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "kg" : "lbs"} (optional)</span>
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
            <div className="mb-8">
              <label className="block text-slate-400 mb-3 font-medium">Your Goal</label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGoal(g.value)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      goal === g.value
                        ? g.deficit < 0 ? "bg-red-500/20 border-2 border-red-500" :
                          g.deficit > 0 ? "bg-blue-500/20 border-2 border-blue-500" :
                          "bg-emerald-500/20 border-2 border-emerald-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`block font-semibold text-sm ${
                      goal === g.value ? 
                        g.deficit < 0 ? "text-red-400" :
                        g.deficit > 0 ? "text-blue-400" :
                        "text-emerald-400"
                      : "text-white"
                    }`}>
                      {g.label}
                    </span>
                    <span className="text-slate-500 text-xs block">{g.rate}</span>
                    <span className="text-slate-600 text-xs">{g.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateCalories}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate My Calories
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="grid sm:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                    <p className="text-slate-400 mb-2 text-sm">Your BMR</p>
                    <p className="text-2xl font-bold text-slate-300">{result.bmr}</p>
                    <p className="text-slate-500 text-xs">cal at rest</p>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                    <p className="text-slate-400 mb-2 text-sm">Your TDEE</p>
                    <p className="text-2xl font-bold text-slate-300">{result.tdee}</p>
                    <p className="text-slate-500 text-xs">maintenance</p>
                  </div>
                  <div className="text-center p-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                    <p className="text-slate-400 mb-2 text-sm">Your Target</p>
                    <p className="text-3xl font-bold text-emerald-400">{result.targetCalories}</p>
                    <p className="text-emerald-400/70 text-xs">calories/day</p>
                  </div>
                </div>

                <div className="text-center p-4 bg-slate-800/50 rounded-xl mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Daily {result.deficit < 0 ? "Deficit" : result.deficit > 0 ? "Surplus" : "Balance"}</p>
                      <p className={`text-2xl font-bold ${result.deficit < 0 ? "text-red-400" : result.deficit > 0 ? "text-blue-400" : "text-emerald-400"}`}>
                        {result.deficit > 0 ? "+" : ""}{result.deficit} cal
                      </p>
                    </div>
                    <div className="w-px h-12 bg-white/10"></div>
                    <div>
                      <p className="text-slate-400 text-sm">Expected Rate</p>
                      <p className="text-xl font-bold text-white">{result.weeklyRate}</p>
                    </div>
                  </div>
                </div>

                {result.weeksToGoal > 0 && (
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl mb-6">
                    <div className="text-center">
                      <p className="text-slate-400 mb-2">Estimated Time to Reach Goal</p>
                      <p className="text-2xl font-bold text-purple-400">{result.weeksToGoal} weeks</p>
                      <p className="text-slate-500 text-sm">Target date: {result.targetDate}</p>
                    </div>
                  </div>
                )}

                {/* Weekly Calorie Overview */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 text-center">Weekly Calorie Overview</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="bg-slate-800/50 rounded-lg p-2 text-center">
                        <p className="text-slate-500 text-xs">{day}</p>
                        <p className="text-emerald-400 font-bold">{result.targetCalories}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-slate-500 text-sm mt-2">
                    Weekly total: {result.targetCalories * 7} cal | Weekly {result.deficit < 0 ? "deficit" : "surplus"}: {Math.abs(result.deficit * 7)} cal
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-slate-400 mb-4">Track your calories automatically with AI food recognition</p>
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
            <h2 className="text-3xl font-bold text-white mb-6">What is a Calorie Deficit?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              A <strong className="text-white">calorie deficit</strong> occurs when you consume fewer calories than your body burns. This forces your body to use stored energy (primarily fat) to make up the difference, resulting in weight loss. Conversely, a <strong className="text-white">calorie surplus</strong> means eating more than you burn, which is necessary for muscle building.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              The concept is rooted in the fundamental law of thermodynamics: energy cannot be created or destroyed, only transformed. When it comes to body weight, calories in versus calories out determines whether you gain, lose, or maintain weight.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">How Much Deficit for Weight Loss?</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              The rate at which you lose weight depends on the size of your calorie deficit. Here&apos;s a breakdown of different deficit levels:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                <h4 className="text-emerald-400 font-semibold mb-2">Small Deficit: 250-300 calories/day</h4>
                <p className="text-slate-400 text-sm">Results in ~0.25 kg (0.5 lb) weight loss per week. This is the most sustainable approach and best preserves muscle mass. Ideal for those who are already lean or want to minimize muscle loss.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                <h4 className="text-blue-400 font-semibold mb-2">Moderate Deficit: 500 calories/day</h4>
                <p className="text-slate-400 text-sm">Results in ~0.5 kg (1 lb) weight loss per week. This is the most commonly recommended deficit for most people. It balances speed of results with sustainability.</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5">
                <h4 className="text-orange-400 font-semibold mb-2">Large Deficit: 750 calories/day</h4>
                <p className="text-slate-400 text-sm">Results in ~0.75 kg (1.5 lb) weight loss per week. More aggressive but still manageable for those with higher body fat percentages. May increase hunger and require more discipline.</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                <h4 className="text-red-400 font-semibold mb-2">Extreme Deficit: 1000+ calories/day</h4>
                <p className="text-slate-400 text-sm">Results in 1+ kg (2+ lb) weight loss per week. Not recommended for extended periods. Increases risk of muscle loss, nutrient deficiencies, and metabolic adaptation.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">The Science Behind Calorie Deficits</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Approximately <strong className="text-white">7,700 calories equals 1 kg (3,500 calories = 1 lb)</strong> of body fat. This means:
            </p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>A 500 cal/day deficit × 7 days = 3,500 cal weekly deficit ≈ 0.5 kg loss</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>A 1,000 cal/day deficit × 7 days = 7,700 cal weekly deficit ≈ 1 kg loss</span>
              </li>
            </ul>
            <p className="text-slate-400 leading-relaxed mb-6">
              However, this is simplified. In reality, weight loss isn&apos;t perfectly linear due to factors like water retention, metabolic adaptation, and changes in body composition.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Calorie Surplus for Muscle Building</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              To build muscle, you need a calorie surplus combined with strength training and adequate protein. Here&apos;s how to approach it:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-blue-400 font-semibold mb-2">Lean Bulk (+200-300 cal)</h4>
                <p className="text-slate-400 text-sm">Minimal fat gain, slower muscle growth. Best for those who want to stay relatively lean while building muscle.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-purple-400 font-semibold mb-2">Standard Bulk (+500 cal)</h4>
                <p className="text-slate-400 text-sm">Faster muscle growth, some fat gain. Good for beginners or hardgainers who struggle to gain weight.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Minimum Safe Calorie Intake</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              There are minimum calorie levels below which you shouldn&apos;t go:
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
              <h4 className="text-red-400 font-semibold mb-3">⚠️ Minimum Calorie Guidelines</h4>
              <ul className="space-y-2 text-slate-400">
                <li><strong className="text-white">Women:</strong> Should not eat below 1,200 calories/day</li>
                <li><strong className="text-white">Men:</strong> Should not eat below 1,500 calories/day</li>
                <li><strong className="text-white">Never below BMR:</strong> Eating below your basal metabolic rate can cause serious health issues</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Tips for Successful Calorie Deficit</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Track your food:</strong> Use an app like Snapie AI to accurately track calories. Most people underestimate by 20-50%.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Prioritize protein:</strong> Eat 1.6-2.2g protein per kg bodyweight to preserve muscle during weight loss.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Eat filling foods:</strong> Focus on high-volume, low-calorie foods like vegetables, lean proteins, and whole grains.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Include exercise:</strong> Strength training helps preserve muscle; cardio increases your deficit.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Be patient:</strong> Weight fluctuates daily. Track weekly averages for a true picture of progress.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Take diet breaks:</strong> Periodically eating at maintenance helps prevent metabolic adaptation.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Common Mistakes to Avoid</h3>
            <div className="space-y-4 mb-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">❌ Being Too Aggressive</h4>
                <p className="text-slate-400 text-sm">Extreme deficits lead to muscle loss, metabolic slowdown, and eventual binging. Slow and steady wins the race.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">❌ Not Tracking Accurately</h4>
                <p className="text-slate-400 text-sm">Eyeballing portions and forgetting small bites adds up. Weigh your food and track everything.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">❌ Ignoring Protein</h4>
                <p className="text-slate-400 text-sm">Low protein during a deficit = muscle loss. Prioritize protein at every meal.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">❌ Weekend Overeating</h4>
                <p className="text-slate-400 text-sm">Two days of overeating can erase a week&apos;s deficit. Stay consistent or plan for higher days.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">How long should I stay in a calorie deficit?</h4>
                <p className="text-slate-400">For most people, 12-16 weeks is a reasonable dieting phase. After that, take a 2-4 week diet break at maintenance before continuing if needed.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Can I lose fat without a calorie deficit?</h4>
                <p className="text-slate-400">No, a calorie deficit is the only way to lose fat. However, beginners can sometimes build muscle and lose fat simultaneously (body recomposition) even at maintenance calories.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Should I eat back calories burned from exercise?</h4>
                <p className="text-slate-400">Generally, no. Exercise calorie estimates are often inaccurate. Your TDEE already accounts for your activity level. Only eat back exercise calories if you&apos;re very active and losing weight too fast.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">What if I hit a weight loss plateau?</h4>
                <p className="text-slate-400">First, ensure you&apos;re tracking accurately. If so, either reduce calories by 100-200, increase activity, or take a 1-2 week diet break at maintenance, then resume your deficit.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="calorie-deficit-calculator" />
    </CalculatorLayout>
  );
}
