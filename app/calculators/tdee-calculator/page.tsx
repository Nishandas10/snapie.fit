"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

const activityLevels = [
  { value: 1.2, label: "Sedentary", description: "Little or no exercise, desk job" },
  { value: 1.375, label: "Lightly Active", description: "Light exercise 1-3 days/week" },
  { value: 1.55, label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
  { value: 1.725, label: "Very Active", description: "Hard exercise 6-7 days/week" },
  { value: 1.9, label: "Extra Active", description: "Very hard exercise, physical job" },
];

export default function TDEECalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [activity, setActivity] = useState<number>(1.55);
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);
  const [errors, setErrors] = useState<{ age?: boolean; weight?: boolean; height?: boolean }>({});

  const calculateTDEE = () => {
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

    // Mifflin-St Jeor Equation for BMR
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    const tdee = bmr * activity;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">Free TDEE Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              TDEE Calculator
              <span className="block text-emerald-400 mt-2">Total Daily Energy Expenditure</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Calculate your Total Daily Energy Expenditure to know exactly how many calories you burn each day. Essential for weight loss, muscle gain, or maintaining your current weight.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Calculate Your TDEE</h2>

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
            <div className="mb-8">
              <label className="block text-slate-400 mb-3 font-medium">Activity Level</label>
              <div className="space-y-3">
                {activityLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setActivity(level.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      activity === level.value
                        ? "bg-emerald-500/20 border-2 border-emerald-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className={`font-semibold ${activity === level.value ? "text-emerald-400" : "text-white"}`}>
                          {level.label}
                        </span>
                        <p className="text-slate-400 text-sm mt-1">{level.description}</p>
                      </div>
                      <span className="text-slate-500 text-sm">×{level.value}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateTDEE}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate TDEE
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-slate-800/50 rounded-xl">
                    <p className="text-slate-400 mb-2">Your BMR</p>
                    <p className="text-3xl font-bold text-slate-300">{result.bmr}</p>
                    <p className="text-slate-500 text-sm">calories/day at rest</p>
                  </div>
                  <div className="text-center p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <p className="text-slate-400 mb-2">Your TDEE</p>
                    <p className="text-4xl font-bold text-emerald-400">{result.tdee}</p>
                    <p className="text-slate-500 text-sm">calories/day total</p>
                  </div>
                </div>

                <h4 className="text-white font-semibold mb-4 text-center">Daily Calorie Targets Based on Your Goals</h4>
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-red-400 font-semibold mb-1">Weight Loss</p>
                    <p className="text-2xl font-bold text-white">{Math.round(result.tdee - 500)}</p>
                    <p className="text-slate-500 text-xs">cal/day (-500)</p>
                    <p className="text-slate-400 text-xs mt-1">~0.5 kg/week loss</p>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                    <p className="text-emerald-400 font-semibold mb-1">Maintenance</p>
                    <p className="text-2xl font-bold text-white">{result.tdee}</p>
                    <p className="text-slate-500 text-xs">cal/day</p>
                    <p className="text-slate-400 text-xs mt-1">Maintain weight</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-blue-400 font-semibold mb-1">Muscle Gain</p>
                    <p className="text-2xl font-bold text-white">{Math.round(result.tdee + 300)}</p>
                    <p className="text-slate-500 text-xs">cal/day (+300)</p>
                    <p className="text-slate-400 text-xs mt-1">Lean bulk</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 mb-4">Track your calories automatically with AI-powered food recognition</p>
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
            <h2 className="text-3xl font-bold text-white mb-6">What is TDEE (Total Daily Energy Expenditure)?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              <strong className="text-white">Total Daily Energy Expenditure (TDEE)</strong> is the total number of calories you burn in a 24-hour period. Unlike BMR which only accounts for calories burned at rest, TDEE includes all the energy your body uses throughout the day, including physical activity, digestion, and non-exercise activity thermogenesis (NEAT).
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Understanding your TDEE is crucial for achieving any fitness goal, whether you want to lose weight, build muscle, or maintain your current physique. It&apos;s the foundation of calorie-based nutrition planning.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Components of TDEE</h3>
            <p className="text-slate-400 leading-relaxed mb-4">Your TDEE consists of four main components:</p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-emerald-400 font-semibold mb-2">BMR (60-70%)</h4>
                <p className="text-slate-400 text-sm">Basal Metabolic Rate - calories burned for basic life functions at complete rest</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-blue-400 font-semibold mb-2">TEF (10%)</h4>
                <p className="text-slate-400 text-sm">Thermic Effect of Food - calories burned digesting and processing food</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-purple-400 font-semibold mb-2">EAT (5-10%)</h4>
                <p className="text-slate-400 text-sm">Exercise Activity Thermogenesis - calories from planned exercise</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-orange-400 font-semibold mb-2">NEAT (15-30%)</h4>
                <p className="text-slate-400 text-sm">Non-Exercise Activity Thermogenesis - daily movements, fidgeting, walking</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">How to Calculate TDEE</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Our TDEE calculator uses the <strong className="text-white">Mifflin-St Jeor equation</strong> to first calculate your BMR, then multiplies it by an activity factor to estimate your total daily calories burned. The formula is:
            </p>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <p className="text-slate-300 font-mono text-center text-lg">TDEE = BMR × Activity Multiplier</p>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Activity Level Multipliers Explained</h3>
            <div className="space-y-4 mb-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">Sedentary (×1.2)</h4>
                <p className="text-slate-400 text-sm">Office job with no exercise. You spend most of your day sitting with minimal physical activity. Less than 5,000 steps per day.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">Lightly Active (×1.375)</h4>
                <p className="text-slate-400 text-sm">Light exercise 1-3 days per week or 5,000-7,500 daily steps. Includes walking, light housework, or casual sports once or twice a week.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">Moderately Active (×1.55)</h4>
                <p className="text-slate-400 text-sm">Moderate exercise 3-5 days per week. Regular gym sessions, running, swimming, or cycling. 7,500-10,000 daily steps typical.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">Very Active (×1.725)</h4>
                <p className="text-slate-400 text-sm">Hard exercise 6-7 days per week. Athletes in training, intense daily workouts, or physically demanding jobs with regular exercise.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">Extra Active (×1.9)</h4>
                <p className="text-slate-400 text-sm">Very intense daily exercise plus a physical job. Professional athletes, construction workers who also train, or twice-daily workouts.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Using TDEE for Weight Loss</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              To lose weight, you need to create a <strong className="text-white">calorie deficit</strong> - eating fewer calories than your TDEE. Here are evidence-based guidelines:
            </p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">250-500 calorie deficit:</strong> Slow, sustainable weight loss of 0.25-0.5 kg per week. Best for preserving muscle.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">500-750 calorie deficit:</strong> Moderate weight loss of 0.5-0.75 kg per week. Good balance of speed and sustainability.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">750-1000 calorie deficit:</strong> Aggressive weight loss of 0.75-1 kg per week. May cause muscle loss if not careful.</span>
              </li>
            </ul>
            <p className="text-slate-400 leading-relaxed mb-6">
              <strong className="text-red-400">Important:</strong> Never eat below your BMR. Extreme deficits can slow metabolism, cause muscle loss, and lead to nutrient deficiencies.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Using TDEE for Muscle Building</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              To build muscle, you need a <strong className="text-white">calorie surplus</strong> combined with strength training. Here&apos;s how to approach it:
            </p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Lean Bulk (+200-300 calories):</strong> Minimizes fat gain while supporting muscle growth. Ideal for most people.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Standard Bulk (+300-500 calories):</strong> Faster muscle gain but with some fat gain. Good for beginners.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Aggressive Bulk (+500+ calories):</strong> Maximum muscle gain potential but significant fat gain. Only for hardgainers.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">TDEE vs BMR: Key Differences</h3>
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-white font-semibold py-3">Aspect</th>
                    <th className="text-white font-semibold py-3">BMR</th>
                    <th className="text-white font-semibold py-3">TDEE</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-white/5">
                    <td className="py-3">Measures</td>
                    <td className="py-3">Resting calories</td>
                    <td className="py-3">Total daily calories</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Includes Activity</td>
                    <td className="py-3">No</td>
                    <td className="py-3">Yes</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Use for</td>
                    <td className="py-3">Minimum intake</td>
                    <td className="py-3">Calorie planning</td>
                  </tr>
                  <tr>
                    <td className="py-3">Typical Value</td>
                    <td className="py-3">1400-2000 cal</td>
                    <td className="py-3">1800-3000 cal</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions About TDEE</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">How accurate is the TDEE calculator?</h4>
                <p className="text-slate-400">TDEE calculators provide estimates that are typically within 10-15% of actual values. Use the result as a starting point, then adjust based on real-world results over 2-4 weeks.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Should I eat my full TDEE every day?</h4>
                <p className="text-slate-400">If you want to maintain weight, yes. For weight loss, eat below TDEE. For muscle gain, eat above TDEE. Your goal determines your target intake.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Why am I not losing weight eating below my TDEE?</h4>
                <p className="text-slate-400">Common reasons include: underestimating food intake, overestimating activity level, or metabolic adaptation. Try tracking food more precisely or recalculating with a lower activity level.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">How often should I recalculate my TDEE?</h4>
                <p className="text-slate-400">Recalculate every 4-6 weeks or whenever you lose/gain 5+ kg, significantly change your activity level, or hit a plateau.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="tdee-calculator" />
    </CalculatorLayout>
  );
}
