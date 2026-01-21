"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-400", bgColor: "bg-blue-500/20", borderColor: "border-blue-500/20" };
  if (bmi < 25) return { category: "Normal Weight", color: "text-emerald-400", bgColor: "bg-emerald-500/20", borderColor: "border-emerald-500/20" };
  if (bmi < 30) return { category: "Overweight", color: "text-orange-400", bgColor: "bg-orange-500/20", borderColor: "border-orange-500/20" };
  if (bmi < 35) return { category: "Obese (Class I)", color: "text-red-400", bgColor: "bg-red-500/20", borderColor: "border-red-500/20" };
  if (bmi < 40) return { category: "Obese (Class II)", color: "text-red-500", bgColor: "bg-red-600/20", borderColor: "border-red-600/20" };
  return { category: "Obese (Class III)", color: "text-red-600", bgColor: "bg-red-700/20", borderColor: "border-red-700/20" };
};

const getHealthyWeightRange = (heightCm: number) => {
  const heightM = heightCm / 100;
  const minWeight = (18.5 * heightM * heightM).toFixed(1);
  const maxWeight = (24.9 * heightM * heightM).toFixed(1);
  return { min: minWeight, max: maxWeight };
};

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightFt, setHeightFt] = useState<string>("");
  const [heightIn, setHeightIn] = useState<string>("");
  const [errors, setErrors] = useState<{ weight?: boolean; height?: boolean }>({});
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    bgColor: string;
    borderColor: string;
    healthyRange: { min: string; max: string };
  } | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    
    let heightCm: number;
    if (unit === "metric") {
      heightCm = parseFloat(height);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      heightCm = (ft * 12 + inches) * 2.54;
    }

    const newErrors: { weight?: boolean; height?: boolean } = {};
    if (!weightNum) newErrors.weight = true;
    if (!heightCm) newErrors.height = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    let weightKg = weightNum;
    if (unit === "imperial") {
      weightKg = weightNum * 0.453592;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const category = getBMICategory(bmi);
    const healthyRange = getHealthyWeightRange(heightCm);

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      ...category,
      healthyRange: unit === "imperial" 
        ? { min: (parseFloat(healthyRange.min) * 2.205).toFixed(1), max: (parseFloat(healthyRange.max) * 2.205).toFixed(1) }
        : healthyRange,
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">Free BMI Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              BMI Calculator
              <span className="block text-emerald-400 mt-2">Body Mass Index</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Calculate your Body Mass Index to understand where you stand on the weight spectrum. A quick way to assess if you&apos;re at a healthy weight for your height.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Calculate Your BMI</h2>

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
                Imperial (lbs/ft)
              </button>
            </div>

            {/* Input Fields */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
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
                {!errors.weight && <span className="text-slate-500 text-sm mt-1 block">{unit === "metric" ? "kilograms (kg)" : "pounds (lbs)"}</span>}
              </div>
              
              {unit === "metric" ? (
                <div>
                  <label className="block text-slate-400 mb-2 font-medium">Height</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => { setHeight(e.target.value); setErrors(prev => ({...prev, height: false})); }}
                    placeholder="175"
                    className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.height ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.height && <span className="text-red-500 text-sm mt-1 block">Please enter your height</span>}
                  {!errors.height && <span className="text-slate-500 text-sm mt-1 block">centimeters (cm)</span>}
                </div>
              ) : (
                <div>
                  <label className="block text-slate-400 mb-2 font-medium">Height</label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => { setHeightFt(e.target.value); setErrors(prev => ({...prev, height: false})); }}
                        placeholder="5"
                        className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.height ? 'border-red-500' : 'border-white/10'}`}
                      />
                      <span className="text-slate-500 text-sm mt-1 block">feet</span>
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => { setHeightIn(e.target.value); setErrors(prev => ({...prev, height: false})); }}
                        placeholder="9"
                        className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-lg ${errors.height ? 'border-red-500' : 'border-white/10'}`}
                      />
                      <span className="text-slate-500 text-sm mt-1 block">inches</span>
                    </div>
                  </div>
                  {errors.height && <span className="text-red-500 text-sm mt-1 block">Please enter your height</span>}
                </div>
              )}
            </div>

            <button
              onClick={calculateBMI}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Calculate BMI
            </button>

            {/* Result */}
            {result && (
              <div className={`mt-8 p-6 ${result.bgColor} border ${result.borderColor} rounded-2xl`}>
                <div className="text-center mb-6">
                  <p className="text-slate-400 mb-2">Your Body Mass Index</p>
                  <p className={`text-6xl font-bold ${result.color} mb-2`}>{result.bmi}</p>
                  <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
                </div>

                {/* BMI Scale Visual */}
                <div className="mb-6">
                  <div className="relative h-8 rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 w-[18.5%]"></div>
                    <div className="bg-emerald-500 w-[6.4%]"></div>
                    <div className="bg-orange-500 w-[5%]"></div>
                    <div className="bg-red-400 w-[5%]"></div>
                    <div className="bg-red-500 w-[5%]"></div>
                    <div className="bg-red-600 flex-1"></div>
                  </div>
                  <div className="relative mt-2">
                    <div 
                      className="absolute w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-white transform -translate-x-1/2"
                      style={{ left: `${Math.min(Math.max((result.bmi / 50) * 100, 0), 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-4">
                    <span>0</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>35</span>
                    <span>40+</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-slate-400 text-sm mb-1">Healthy Weight Range</p>
                    <p className="text-white font-bold text-lg">
                      {result.healthyRange.min} - {result.healthyRange.max} {unit === "metric" ? "kg" : "lbs"}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-slate-400 text-sm mb-1">BMI Prime</p>
                    <p className="text-white font-bold text-lg">{(result.bmi / 25).toFixed(2)}</p>
                    <p className="text-slate-500 text-xs">(optimal = 1.0)</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-slate-400 mb-4">Track your weight and nutrition journey with AI</p>
                  <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block transition-all hover:scale-105">
                    <GooglePlayBadge />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* BMI Categories Reference */}
          <div className="mt-8 bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-4">BMI Categories</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-white font-medium">Underweight</p>
                  <p className="text-slate-400 text-sm">&lt; 18.5</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-white font-medium">Normal Weight</p>
                  <p className="text-slate-400 text-sm">18.5 - 24.9</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <div>
                  <p className="text-white font-medium">Overweight</p>
                  <p className="text-slate-400 text-sm">25 - 29.9</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="w-4 h-4 rounded-full bg-red-400"></div>
                <div>
                  <p className="text-white font-medium">Obese (Class I)</p>
                  <p className="text-slate-400 text-sm">30 - 34.9</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-600/10 border border-red-600/20">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-white font-medium">Obese (Class II)</p>
                  <p className="text-slate-400 text-sm">35 - 39.9</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-700/10 border border-red-700/20">
                <div className="w-4 h-4 rounded-full bg-red-600"></div>
                <div>
                  <p className="text-white font-medium">Obese (Class III)</p>
                  <p className="text-slate-400 text-sm">≥ 40</p>
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
            <h2 className="text-3xl font-bold text-white mb-6">What is BMI (Body Mass Index)?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              <strong className="text-white">Body Mass Index (BMI)</strong> is a simple numerical measure that uses your height and weight to estimate whether you&apos;re at a healthy weight. Developed by Belgian mathematician Adolphe Quetelet in the 1830s, BMI has become the most widely used screening tool for assessing weight-related health risks at the population level.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              While BMI is a useful starting point, it&apos;s important to understand both its benefits and limitations. BMI doesn&apos;t distinguish between muscle and fat mass, which is why athletes with high muscle mass may have high BMIs despite being very healthy.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">How is BMI Calculated?</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              BMI is calculated using a simple formula that divides your weight by your height squared:
            </p>

            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">BMI Formula:</h4>
              <p className="text-slate-300 font-mono text-center text-lg mb-4">BMI = Weight (kg) ÷ Height² (m²)</p>
              <p className="text-slate-400 text-sm text-center">For imperial: BMI = (Weight in lbs ÷ Height² in inches) × 703</p>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">BMI Categories and Health Risks</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              The World Health Organization (WHO) defines BMI categories based on associated health risks:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                <h4 className="text-blue-400 font-semibold mb-2">Underweight (BMI &lt; 18.5)</h4>
                <p className="text-slate-400 text-sm">May indicate malnutrition, eating disorders, or other health problems. Associated with increased risk of osteoporosis, weakened immune system, and fertility issues.</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
                <h4 className="text-emerald-400 font-semibold mb-2">Normal Weight (BMI 18.5-24.9)</h4>
                <p className="text-slate-400 text-sm">Generally associated with the lowest health risks. This range is considered optimal for most adults in terms of disease prevention and overall health.</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5">
                <h4 className="text-orange-400 font-semibold mb-2">Overweight (BMI 25-29.9)</h4>
                <p className="text-slate-400 text-sm">Increased risk of type 2 diabetes, cardiovascular disease, and other health conditions. Lifestyle modifications are typically recommended.</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                <h4 className="text-red-400 font-semibold mb-2">Obese (BMI ≥ 30)</h4>
                <p className="text-slate-400 text-sm">Significantly elevated health risks including heart disease, type 2 diabetes, certain cancers, sleep apnea, and joint problems. Medical consultation recommended.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Limitations of BMI</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              While BMI is useful for population-level health assessments, it has several important limitations:
            </p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Doesn&apos;t measure body composition:</strong> BMI can&apos;t distinguish between muscle, fat, and bone mass. A muscular athlete may have a &quot;high&quot; BMI despite having low body fat.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Ignores fat distribution:</strong> Where you carry fat matters. Visceral (belly) fat is more dangerous than subcutaneous fat, but BMI doesn&apos;t capture this.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Age-related changes:</strong> As we age, we naturally lose muscle and gain fat, but BMI may stay the same, masking health changes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Ethnic variations:</strong> Health risks associated with specific BMI values vary among different ethnic groups. Asians, for example, may have higher health risks at lower BMIs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Not suitable for everyone:</strong> BMI isn&apos;t appropriate for children, pregnant women, the elderly, or very muscular individuals.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Better Measures of Health</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              For a more complete picture of your health, consider these additional measurements alongside BMI:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-emerald-400 font-semibold mb-2">Waist Circumference</h4>
                <p className="text-slate-400 text-sm">Measures abdominal fat. Risk increases with waist &gt;94cm (men) or &gt;80cm (women).</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-blue-400 font-semibold mb-2">Waist-to-Hip Ratio</h4>
                <p className="text-slate-400 text-sm">Indicates fat distribution pattern. Higher ratios indicate more visceral fat.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-purple-400 font-semibold mb-2">Body Fat Percentage</h4>
                <p className="text-slate-400 text-sm">Directly measures body composition. More accurate than BMI for assessing health.</p>
              </div>
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h4 className="text-orange-400 font-semibold mb-2">Waist-to-Height Ratio</h4>
                <p className="text-slate-400 text-sm">Keep your waist circumference less than half your height for optimal health.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">How to Achieve a Healthy BMI</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              If your BMI falls outside the healthy range, here are evidence-based strategies:
            </p>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Focus on nutrition:</strong> Eat a balanced diet rich in vegetables, lean proteins, whole grains, and healthy fats. Track your calories and macros.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Exercise regularly:</strong> Aim for at least 150 minutes of moderate aerobic activity plus 2 strength training sessions per week.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Set realistic goals:</strong> Aim to lose 0.5-1 kg per week. Sustainable changes beat crash diets.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Get enough sleep:</strong> Poor sleep affects hormones that control hunger and metabolism.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Manage stress:</strong> Chronic stress can lead to weight gain through cortisol and emotional eating.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">What is the ideal BMI for my age?</h4>
                <p className="text-slate-400">The healthy BMI range (18.5-24.9) applies to adults of all ages. However, for older adults (65+), a slightly higher BMI (25-27) may actually be associated with lower mortality risk.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Is BMI accurate for athletes?</h4>
                <p className="text-slate-400">No, BMI often overestimates body fat in athletes with high muscle mass. Body fat percentage and other measures are more appropriate for athletes.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Does BMI differ for men and women?</h4>
                <p className="text-slate-400">The BMI categories are the same, but women naturally carry more body fat than men. At the same BMI, women typically have higher body fat percentages.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Can I have a normal BMI but still be unhealthy?</h4>
                <p className="text-slate-400">Yes, &quot;normal weight obesity&quot; occurs when someone has a normal BMI but high body fat percentage. This is why body composition matters more than weight alone.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="bmi-calculator" />
    </CalculatorLayout>
  );
}
