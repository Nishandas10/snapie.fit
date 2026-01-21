"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

const getBodyFatCategory = (bf: number, gender: "male" | "female") => {
  if (gender === "male") {
    if (bf < 6) return { category: "Essential Fat", color: "text-red-400", bgColor: "bg-red-500/20" };
    if (bf < 14) return { category: "Athletes", color: "text-blue-400", bgColor: "bg-blue-500/20" };
    if (bf < 18) return { category: "Fitness", color: "text-emerald-400", bgColor: "bg-emerald-500/20" };
    if (bf < 25) return { category: "Average", color: "text-yellow-400", bgColor: "bg-yellow-500/20" };
    return { category: "Obese", color: "text-red-500", bgColor: "bg-red-600/20" };
  } else {
    if (bf < 14) return { category: "Essential Fat", color: "text-red-400", bgColor: "bg-red-500/20" };
    if (bf < 21) return { category: "Athletes", color: "text-blue-400", bgColor: "bg-blue-500/20" };
    if (bf < 25) return { category: "Fitness", color: "text-emerald-400", bgColor: "bg-emerald-500/20" };
    if (bf < 32) return { category: "Average", color: "text-yellow-400", bgColor: "bg-yellow-500/20" };
    return { category: "Obese", color: "text-red-500", bgColor: "bg-red-600/20" };
  }
};

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [method, setMethod] = useState<"navy" | "bmi">("navy");
  
  // Navy method inputs
  const [height, setHeight] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [neck, setNeck] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  
  // BMI method inputs
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  // Errors
  const [errors, setErrors] = useState<{ height?: boolean; waist?: boolean; neck?: boolean; hip?: boolean; age?: boolean; weight?: boolean }>({});
  
  const [result, setResult] = useState<{
    bodyFat: number;
    category: string;
    color: string;
    bgColor: string;
    fatMass: number;
    leanMass: number;
  } | null>(null);

  const calculateBodyFat = () => {
    let bodyFat: number;
    let weightKg: number = 0;
    const newErrors: { height?: boolean; waist?: boolean; neck?: boolean; hip?: boolean; age?: boolean; weight?: boolean } = {};

    if (method === "navy") {
      // U.S. Navy Method
      let heightCm = parseFloat(height);
      let waistCm = parseFloat(waist);
      let neckCm = parseFloat(neck);
      let hipCm = parseFloat(hip);

      if (unit === "imperial") {
        heightCm = heightCm * 2.54;
        waistCm = waistCm * 2.54;
        neckCm = neckCm * 2.54;
        hipCm = hipCm * 2.54;
      }

      if (!parseFloat(height)) newErrors.height = true;
      if (!parseFloat(waist)) newErrors.waist = true;
      if (!parseFloat(neck)) newErrors.neck = true;
      if (gender === "female" && !parseFloat(hip)) newErrors.hip = true;

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      if (gender === "male") {
        // Men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
      } else {
        // Women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
      }

      // Estimate weight for fat/lean mass calculation (using height and average BMI)
      const heightM = heightCm / 100;
      weightKg = 22 * heightM * heightM; // Assuming average BMI of 22
    } else {
      // BMI-based body fat estimation
      let heightCm = parseFloat(height);
      weightKg = parseFloat(weight);
      const ageNum = parseInt(age);

      if (unit === "imperial") {
        heightCm = heightCm * 2.54;
        weightKg = weightKg * 0.453592;
      }

      if (!parseFloat(height)) newErrors.height = true;
      if (!parseFloat(weight)) newErrors.weight = true;
      if (!parseInt(age)) newErrors.age = true;

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      const heightM = heightCm / 100;
      const bmi = weightKg / (heightM * heightM);

      // Adult Body Fat % = (1.20 × BMI) + (0.23 × Age) − (10.8 × sex) − 5.4
      // sex = 1 for males, 0 for females
      const sexFactor = gender === "male" ? 1 : 0;
      bodyFat = (1.20 * bmi) + (0.23 * ageNum) - (10.8 * sexFactor) - 5.4;
    }

    bodyFat = Math.max(0, Math.min(bodyFat, 60)); // Clamp to reasonable range
    const category = getBodyFatCategory(bodyFat, gender);
    const fatMass = weightKg * (bodyFat / 100);
    const leanMass = weightKg - fatMass;

    setResult({
      bodyFat: Math.round(bodyFat * 10) / 10,
      ...category,
      fatMass: Math.round(fatMass * 10) / 10,
      leanMass: Math.round(leanMass * 10) / 10,
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">Free Body Fat Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Body Fat Calculator
              <span className="block text-emerald-400 mt-2">Estimate Your Body Fat %</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Calculate your body fat percentage using the U.S. Navy method or BMI-based estimation. Understand your body composition for better fitness planning.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Calculate Your Body Fat %</h2>

            {/* Method Selection */}
            <div className="mb-6">
              <label className="block text-slate-400 mb-3 font-medium">Calculation Method</label>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setMethod("navy")}
                  className={`p-4 rounded-xl text-left transition-all ${
                    method === "navy"
                      ? "bg-emerald-500/20 border-2 border-emerald-500"
                      : "bg-slate-800 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className={`block font-semibold ${method === "navy" ? "text-emerald-400" : "text-white"}`}>
                    U.S. Navy Method
                  </span>
                  <span className="text-slate-500 text-sm">Uses body measurements (more accurate)</span>
                </button>
                <button
                  onClick={() => setMethod("bmi")}
                  className={`p-4 rounded-xl text-left transition-all ${
                    method === "bmi"
                      ? "bg-emerald-500/20 border-2 border-emerald-500"
                      : "bg-slate-800 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className={`block font-semibold ${method === "bmi" ? "text-emerald-400" : "text-white"}`}>
                    BMI-Based Estimation
                  </span>
                  <span className="text-slate-500 text-sm">Uses weight, height, age (simpler)</span>
                </button>
              </div>
            </div>

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
                Metric (cm/kg)
              </button>
              <button
                onClick={() => setUnit("imperial")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  unit === "imperial"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Imperial (in/lbs)
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
            {method === "navy" ? (
              <div className="space-y-6 mb-8">
                <div className="grid sm:grid-cols-2 gap-6">
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
                  <div>
                    <label className="block text-slate-400 mb-2 font-medium">Neck Circumference</label>
                    <input
                      type="number"
                      value={neck}
                      onChange={(e) => { setNeck(e.target.value); setErrors(prev => ({...prev, neck: false})); }}
                      placeholder={unit === "metric" ? "38" : "15"}
                      className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.neck ? 'border-red-500' : 'border-white/10'}`}
                    />
                    {errors.neck && <span className="text-red-500 text-sm mt-1 block">Please enter neck circumference</span>}
                    {!errors.neck && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "cm" : "inches"} (at narrowest point)</span>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-400 mb-2 font-medium">Waist Circumference</label>
                    <input
                      type="number"
                      value={waist}
                      onChange={(e) => { setWaist(e.target.value); setErrors(prev => ({...prev, waist: false})); }}
                      placeholder={unit === "metric" ? "85" : "33"}
                      className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.waist ? 'border-red-500' : 'border-white/10'}`}
                    />
                    {errors.waist && <span className="text-red-500 text-sm mt-1 block">Please enter waist circumference</span>}
                    {!errors.waist && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "cm" : "inches"} (at navel level)</span>}
                  </div>
                  {gender === "female" && (
                    <div>
                      <label className="block text-slate-400 mb-2 font-medium">Hip Circumference</label>
                      <input
                        type="number"
                        value={hip}
                        onChange={(e) => { setHip(e.target.value); setErrors(prev => ({...prev, hip: false})); }}
                        placeholder={unit === "metric" ? "100" : "39"}
                        className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.hip ? 'border-red-500' : 'border-white/10'}`}
                      />
                      {errors.hip && <span className="text-red-500 text-sm mt-1 block">Please enter hip circumference</span>}
                      {!errors.hip && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "cm" : "inches"} (at widest point)</span>}
                    </div>
                  )}
                </div>
                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">📏 How to Measure</h4>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• <strong className="text-white">Neck:</strong> Measure at the narrowest point, below the larynx</li>
                    <li>• <strong className="text-white">Waist:</strong> Measure at navel level (belly button), relaxed</li>
                    {gender === "female" && (
                      <li>• <strong className="text-white">Hips:</strong> Measure at the widest point of your hips/buttocks</li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
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
            )}

            <button
              onClick={calculateBodyFat}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate Body Fat %
            </button>

            {/* Result */}
            {result && (
              <div className={`mt-8 p-6 ${result.bgColor} border border-white/10 rounded-2xl`}>
                <div className="text-center mb-6">
                  <p className="text-slate-400 mb-2">Your Estimated Body Fat</p>
                  <p className={`text-6xl font-bold ${result.color} mb-2`}>{result.bodyFat}%</p>
                  <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
                </div>

                {method === "bmi" && (
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                      <p className="text-slate-400 text-sm mb-1">Fat Mass</p>
                      <p className="text-2xl font-bold text-white">{result.fatMass} {unit === "metric" ? "kg" : "lbs"}</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                      <p className="text-slate-400 text-sm mb-1">Lean Mass</p>
                      <p className="text-2xl font-bold text-emerald-400">{result.leanMass} {unit === "metric" ? "kg" : "lbs"}</p>
                    </div>
                  </div>
                )}

                {/* Body Fat Visual */}
                <div className="mb-6">
                  <div className="relative h-8 rounded-full overflow-hidden flex">
                    <div className="bg-red-500 w-[6%]" title="Essential"></div>
                    <div className="bg-blue-500 w-[8%]" title="Athletes"></div>
                    <div className="bg-emerald-500 w-[7%]" title="Fitness"></div>
                    <div className="bg-yellow-500 w-[7%]" title="Average"></div>
                    <div className="bg-red-600 flex-1" title="Obese"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>0%</span>
                    <span>{gender === "male" ? "6%" : "14%"}</span>
                    <span>{gender === "male" ? "14%" : "21%"}</span>
                    <span>{gender === "male" ? "18%" : "25%"}</span>
                    <span>{gender === "male" ? "25%" : "32%"}</span>
                    <span>40%+</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-slate-400 mb-4">Track your nutrition and body composition with AI</p>
                  <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block transition-all hover:scale-105">
                    <GooglePlayBadge />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Body Fat Categories Reference */}
          <div className="mt-8 bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-4">Body Fat Categories</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-blue-400 font-semibold mb-3">Men</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-red-500/10 rounded-lg">
                    <span className="text-slate-300">Essential Fat</span>
                    <span className="text-red-400">2-5%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-blue-500/10 rounded-lg">
                    <span className="text-slate-300">Athletes</span>
                    <span className="text-blue-400">6-13%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-emerald-500/10 rounded-lg">
                    <span className="text-slate-300">Fitness</span>
                    <span className="text-emerald-400">14-17%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-yellow-500/10 rounded-lg">
                    <span className="text-slate-300">Average</span>
                    <span className="text-yellow-400">18-24%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-600/10 rounded-lg">
                    <span className="text-slate-300">Obese</span>
                    <span className="text-red-500">25%+</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-pink-400 font-semibold mb-3">Women</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-red-500/10 rounded-lg">
                    <span className="text-slate-300">Essential Fat</span>
                    <span className="text-red-400">10-13%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-blue-500/10 rounded-lg">
                    <span className="text-slate-300">Athletes</span>
                    <span className="text-blue-400">14-20%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-emerald-500/10 rounded-lg">
                    <span className="text-slate-300">Fitness</span>
                    <span className="text-emerald-400">21-24%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-yellow-500/10 rounded-lg">
                    <span className="text-slate-300">Average</span>
                    <span className="text-yellow-400">25-31%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-600/10 rounded-lg">
                    <span className="text-slate-300">Obese</span>
                    <span className="text-red-500">32%+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-white mb-6">What is Body Fat Percentage?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              <strong className="text-white">Body fat percentage</strong> is the proportion of fat in your body compared to your total body weight. Unlike BMI, which only considers weight and height, body fat percentage gives you a much clearer picture of your actual body composition and health status.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              Your body is made up of two types of mass: <strong className="text-white">fat mass</strong> (essential fat + storage fat) and <strong className="text-white">lean mass</strong> (muscles, bones, organs, water). Understanding this breakdown is crucial for fitness goals, whether you&apos;re trying to lose fat, build muscle, or optimize athletic performance.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Types of Body Fat</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-emerald-400 font-semibold mb-2">Essential Fat</h4>
                <p className="text-slate-400 text-sm">Required for normal physiological function. Protects organs, regulates hormones, and stores energy. Men need ~3%, women need ~12%.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-blue-400 font-semibold mb-2">Storage Fat</h4>
                <p className="text-slate-400 text-sm">Excess energy stored in adipose tissue. Can be reduced through diet and exercise without health consequences.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-orange-400 font-semibold mb-2">Subcutaneous Fat</h4>
                <p className="text-slate-400 text-sm">Fat stored under the skin. Makes up most visible body fat. Less dangerous than visceral fat but affects appearance.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-red-400 font-semibold mb-2">Visceral Fat</h4>
                <p className="text-slate-400 text-sm">Fat stored around organs. Associated with higher health risks including heart disease, diabetes, and metabolic syndrome.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Body Fat Measurement Methods</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              There are several ways to measure body fat, ranging from simple estimates to highly accurate lab tests:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-5">
                <h4 className="text-emerald-400 font-semibold mb-2">U.S. Navy Method (Used in this calculator)</h4>
                <p className="text-slate-400 text-sm mb-2"><strong className="text-white">Accuracy:</strong> ±3-4% compared to DEXA</p>
                <p className="text-slate-400 text-sm">Uses body circumference measurements (waist, neck, hip for women) and height. Simple, free, and reasonably accurate for most people.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">Skinfold Calipers</h4>
                <p className="text-slate-400 text-sm mb-2"><strong className="text-white">Accuracy:</strong> ±3-5% (depends on tester skill)</p>
                <p className="text-slate-400 text-sm">Pinches subcutaneous fat at specific sites. Requires practice and consistent technique for reliable results.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">Bioelectrical Impedance (BIA)</h4>
                <p className="text-slate-400 text-sm mb-2"><strong className="text-white">Accuracy:</strong> ±3-8% (affected by hydration)</p>
                <p className="text-slate-400 text-sm">Found in smart scales. Sends electrical current through body. Accuracy varies greatly with hydration level, time of day, and device quality.</p>
              </div>
              <div className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-5">
                <h4 className="text-blue-400 font-semibold mb-2">DEXA Scan (Gold Standard)</h4>
                <p className="text-slate-400 text-sm mb-2"><strong className="text-white">Accuracy:</strong> ±1-2%</p>
                <p className="text-slate-400 text-sm">X-ray technology that precisely measures fat, muscle, and bone. Most accurate method but requires specialized equipment and costs $50-150.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-2">Hydrostatic Weighing</h4>
                <p className="text-slate-400 text-sm mb-2"><strong className="text-white">Accuracy:</strong> ±1-2%</p>
                <p className="text-slate-400 text-sm">Underwater weighing that calculates body density. Highly accurate but impractical for regular use.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Ideal Body Fat Percentage</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              The &quot;ideal&quot; body fat percentage depends on your goals, age, and gender. Here&apos;s a detailed breakdown:
            </p>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <h4 className="text-white font-semibold mb-4">Recommended Body Fat Ranges</h4>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-white font-semibold py-3">Category</th>
                    <th className="text-white font-semibold py-3">Men</th>
                    <th className="text-white font-semibold py-3">Women</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-white/5">
                    <td className="py-3">Essential Fat (minimum)</td>
                    <td className="py-3">2-5%</td>
                    <td className="py-3">10-13%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Competition Bodybuilder</td>
                    <td className="py-3">3-6%</td>
                    <td className="py-3">9-12%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Athletes</td>
                    <td className="py-3">6-13%</td>
                    <td className="py-3">14-20%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Fitness / Beach Body</td>
                    <td className="py-3">14-17%</td>
                    <td className="py-3">21-24%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3">Healthy / Average</td>
                    <td className="py-3">18-24%</td>
                    <td className="py-3">25-31%</td>
                  </tr>
                  <tr>
                    <td className="py-3">Obese</td>
                    <td className="py-3">25%+</td>
                    <td className="py-3">32%+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">How to Reduce Body Fat</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Reducing body fat while preserving muscle requires a strategic approach:
            </p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Create a moderate calorie deficit:</strong> Aim for 500-750 calories below your TDEE for sustainable fat loss of 0.5-0.75 kg per week.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Prioritize protein:</strong> Eat 1.8-2.4g per kg bodyweight to preserve muscle mass during weight loss.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Strength train regularly:</strong> Resistance training signals your body to maintain muscle while burning fat.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Add cardio strategically:</strong> HIIT or moderate cardio helps increase calorie burn without excessive muscle loss.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Get enough sleep:</strong> Poor sleep increases cortisol and can promote fat storage, especially visceral fat.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Track your progress:</strong> Use consistent measurement methods and track body measurements, not just weight.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Why Women Have Higher Body Fat</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Women naturally carry more body fat than men due to biological differences:
            </p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Reproductive function:</strong> Extra fat is needed for pregnancy, childbirth, and nursing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Hormones:</strong> Estrogen promotes fat storage in hips, thighs, and breasts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Lower muscle mass:</strong> Less testosterone means naturally less muscle, which affects body composition ratios</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Which body fat calculator is most accurate?</h4>
                <p className="text-slate-400">The U.S. Navy method is one of the most accurate estimation formulas, typically within 3-4% of DEXA scans. However, no calculator is perfectly accurate - use it to track trends over time rather than absolute values.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Can I have visible abs and high body fat?</h4>
                <p className="text-slate-400">Generally no. Most men need to be below 15% body fat to see abs, and women below 20%. However, ab visibility also depends on genetics and abdominal muscle development.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Is it bad to have very low body fat?</h4>
                <p className="text-slate-400">Yes, going below essential fat levels (3% for men, 12% for women) can cause hormonal issues, immune suppression, and other health problems. Competition-level body fat is not sustainable or healthy long-term.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Why do my results differ from my smart scale?</h4>
                <p className="text-slate-400">Smart scales use bioelectrical impedance which is heavily affected by hydration, food intake, and time of day. The Navy method uses measurements that don&apos;t fluctuate as much, making it more consistent.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="body-fat-calculator" />
    </CalculatorLayout>
  );
}
