"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

export default function BMRCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [result, setResult] = useState<{ bmr: number; formula: string } | null>(null);
  const [errors, setErrors] = useState<{ age?: boolean; weight?: boolean; height?: boolean }>({});

  const calculateBMR = () => {
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

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    setResult({
      bmr: Math.round(bmr),
      formula: "Mifflin-St Jeor",
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">Free BMR Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              BMR Calculator
              <span className="block text-emerald-400 mt-2">Basal Metabolic Rate</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Calculate how many calories your body burns at rest. Your BMR is the foundation for any nutrition plan, weight loss strategy, or fitness goal.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Calculate Your BMR</h2>

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
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
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

            <button
              onClick={calculateBMR}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate BMR
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="text-center">
                  <p className="text-slate-400 mb-2">Your Basal Metabolic Rate</p>
                  <p className="text-5xl font-bold text-emerald-400 mb-2">{result.bmr}</p>
                  <p className="text-slate-400">calories/day</p>
                  <p className="text-sm text-slate-500 mt-4">Calculated using {result.formula} equation</p>
                </div>
                <div className="mt-6 grid sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Weight Loss</p>
                    <p className="text-xl font-bold text-red-400">{Math.round(result.bmr * 0.8)}</p>
                    <p className="text-slate-500 text-xs">cal/day (-20%)</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Maintenance</p>
                    <p className="text-xl font-bold text-emerald-400">{result.bmr}</p>
                    <p className="text-slate-500 text-xs">cal/day</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">Weight Gain</p>
                    <p className="text-xl font-bold text-blue-400">{Math.round(result.bmr * 1.2)}</p>
                    <p className="text-slate-500 text-xs">cal/day (+20%)</p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 mb-4">Want to track your actual calorie intake automatically?</p>
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
            <h2 className="text-3xl font-bold text-white mb-6">What is BMR (Basal Metabolic Rate)?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Your <strong className="text-white">Basal Metabolic Rate (BMR)</strong> is the number of calories your body needs to perform basic life-sustaining functions while at complete rest. These functions include breathing, circulation, cell production, nutrient processing, protein synthesis, and ion transport. BMR accounts for approximately 60-75% of your total daily energy expenditure, making it the single largest component of your metabolism.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">How is BMR Calculated?</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Our BMR calculator uses the <strong className="text-white">Mifflin-St Jeor Equation</strong>, which is considered the most accurate formula for calculating BMR according to the American Dietetic Association. The formula takes into account your weight, height, age, and biological sex to provide a precise estimation of your resting metabolic rate.
            </p>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Mifflin-St Jeor Equation:</h4>
              <p className="text-slate-300 font-mono text-sm mb-2">For Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</p>
              <p className="text-slate-300 font-mono text-sm">For Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</p>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Factors That Affect Your BMR</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Age:</strong> BMR decreases by about 1-2% per decade after age 20 due to loss of muscle mass and hormonal changes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Body Composition:</strong> Muscle tissue burns more calories at rest than fat tissue. More muscle mass = higher BMR.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Gender:</strong> Men typically have higher BMRs than women due to greater muscle mass and lower body fat percentages.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Genetics:</strong> Your genes can influence your metabolic rate by up to 10%, affecting how efficiently you burn calories.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Hormones:</strong> Thyroid hormones, growth hormone, and cortisol all play significant roles in regulating metabolism.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Temperature:</strong> Exposure to cold can temporarily increase BMR as your body works to maintain core temperature.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">BMR vs TDEE: What&apos;s the Difference?</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              While BMR represents calories burned at complete rest, your <strong className="text-white">Total Daily Energy Expenditure (TDEE)</strong> includes all calories burned throughout the day, including physical activity and the thermic effect of food. TDEE is calculated by multiplying your BMR by an activity factor:
            </p>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-white font-semibold py-2">Activity Level</th>
                    <th className="text-white font-semibold py-2">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-white/5">
                    <td className="py-2">Sedentary (little/no exercise)</td>
                    <td className="py-2">BMR × 1.2</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Lightly Active (1-3 days/week)</td>
                    <td className="py-2">BMR × 1.375</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Moderately Active (3-5 days/week)</td>
                    <td className="py-2">BMR × 1.55</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">Very Active (6-7 days/week)</td>
                    <td className="py-2">BMR × 1.725</td>
                  </tr>
                  <tr>
                    <td className="py-2">Extra Active (physical job + training)</td>
                    <td className="py-2">BMR × 1.9</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">How to Use Your BMR for Weight Loss</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Understanding your BMR is crucial for effective weight management. To lose weight, you need to create a calorie deficit by eating fewer calories than your TDEE. A safe and sustainable approach is to aim for a 500-750 calorie deficit per day, which translates to approximately 0.5-0.75 kg (1-1.5 lbs) of weight loss per week.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              However, it&apos;s important <strong className="text-white">never to eat below your BMR</strong> for extended periods. Consuming fewer calories than your body needs for basic functions can slow your metabolism, cause muscle loss, and lead to nutritional deficiencies.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">How to Increase Your BMR Naturally</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Build Muscle Mass:</strong> Strength training increases muscle tissue, which burns more calories at rest than fat.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">High-Intensity Interval Training:</strong> HIIT can boost your metabolism for up to 24 hours after exercise.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Eat Enough Protein:</strong> Protein has a high thermic effect and helps preserve muscle mass during weight loss.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Stay Hydrated:</strong> Even mild dehydration can slow your metabolism by up to 3%.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Get Quality Sleep:</strong> Poor sleep can decrease your BMR and increase hunger hormones.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions About BMR</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">What is a good BMR for my age?</h4>
                <p className="text-slate-400">BMR varies significantly based on individual factors. For reference, average BMR for a 30-year-old is approximately 1400-1800 calories for women and 1600-2000 calories for men. However, your ideal BMR depends on your height, weight, and body composition.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Why does BMR decrease with age?</h4>
                <p className="text-slate-400">As we age, we naturally lose muscle mass (sarcopenia) and our hormonal balance shifts. This results in a lower metabolic rate. Regular exercise and adequate protein intake can help minimize this decline.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Can I measure my exact BMR?</h4>
                <p className="text-slate-400">Yes, precise BMR measurement requires indirect calorimetry performed in a clinical setting. However, equations like Mifflin-St Jeor provide estimates that are accurate within 10% for most people.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Should I eat at my BMR to lose weight?</h4>
                <p className="text-slate-400">No, eating at BMR is not recommended. You should calculate your TDEE and create a moderate deficit (500-750 calories) below that number. Eating at or below BMR can cause metabolic adaptation and muscle loss.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="bmr-calculator" />
    </CalculatorLayout>
  );
}
