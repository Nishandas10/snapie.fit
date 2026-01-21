"use client";

import Link from "next/link";
import { CalculatorLayout } from "@/app/components/CalculatorLayout";

const calculators = [
  {
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate to know how many calories your body burns at rest. Essential for any diet or fitness plan.",
    href: "/calculators/bmr-calculator",
    icon: "🔥",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "TDEE Calculator",
    description: "Find your Total Daily Energy Expenditure including activity. Know exactly how many calories you burn each day.",
    href: "/calculators/tdee-calculator",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Macro Calculator",
    description: "Get your optimal protein, carbs, and fat split based on your goals. Perfect for weight loss or muscle building.",
    href: "/calculators/macro-calculator",
    icon: "🥗",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index to assess if you're at a healthy weight for your height. Quick health screening tool.",
    href: "/calculators/bmi-calculator",
    icon: "⚖️",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Calorie Deficit Planner",
    description: "Plan your calorie intake for weight loss or muscle gain. See exactly when you'll reach your goal weight.",
    href: "/calculators/calorie-deficit-calculator",
    icon: "📉",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Body Fat Calculator",
    description: "Estimate your body fat percentage using the U.S. Navy method. Better than BMI for understanding body composition.",
    href: "/calculators/body-fat-calculator",
    icon: "📊",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Steps to Calories",
    description: "Convert your daily step count into calories burned. See how walking contributes to your calorie deficit.",
    href: "/calculators/steps-to-calories-calculator",
    icon: "👟",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Water Intake Calculator",
    description: "Calculate your optimal daily water intake based on weight, activity, and climate. Stay properly hydrated.",
    href: "/calculators/water-intake-calculator",
    icon: "💧",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Protein Intake Calculator",
    description: "Get your optimal daily protein based on weight and fitness goals. Essential for muscle building and recovery.",
    href: "/calculators/protein-intake-calculator",
    icon: "🥩",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Intermittent Fasting",
    description: "Generate your personalized fasting and eating windows. Choose from 16:8, 18:6, or 20:4 methods with tracker.",
    href: "/calculators/intermittent-fasting-calculator",
    icon: "⏱️",
    color: "from-violet-500 to-purple-500",
  },
];

export default function CalculatorsPage() {
  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-emerald-400 text-sm font-medium">Free Fitness Calculators</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Fitness &amp; Nutrition
              <span className="block text-emerald-400 mt-2">Calculators</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Free, accurate calculators for BMR, TDEE, macros, BMI, body fat, and calorie planning. Get the numbers you need to achieve your fitness goals.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${calc.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {calc.icon}
                </div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {calc.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {calc.description}
                </p>
                <div className="flex items-center text-emerald-400 font-semibold text-sm">
                  Calculate Now
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Our Calculators Section */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Use Our Calculators?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our calculators use scientifically-validated formulas to give you accurate results for your fitness journey.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Accurate Formulas</h3>
              <p className="text-slate-500 text-sm">Based on peer-reviewed scientific research and validated equations</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-white font-semibold mb-2">100% Private</h3>
              <p className="text-slate-500 text-sm">All calculations happen in your browser. We never store your data</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Completely Free</h3>
              <p className="text-slate-500 text-sm">No sign-up required. No hidden fees. Free forever</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-slate-500 text-sm">Works perfectly on any device - phone, tablet, or desktop</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How to Use These Calculators</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Start with BMR or TDEE</h3>
                <p className="text-slate-400">Calculate your baseline calorie needs. This is the foundation for any nutrition plan.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Set Your Goal with Calorie Planner</h3>
                <p className="text-slate-400">Use the calorie deficit/surplus calculator to determine your daily target based on your goals.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">3</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Calculate Your Macros</h3>
                <p className="text-slate-400">Get your optimal protein, carbs, and fat split to maximize results from your diet.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">4</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Track Your Progress</h3>
                <p className="text-slate-400">Monitor BMI and body fat over time. Use Snapie AI to automatically track your nutrition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CalculatorLayout>
  );
}
