"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

// Colorful Google Play triangle icon
export const GooglePlayIcon = () => (
  <svg viewBox="0 0 512 512" className="w-6 h-6">
    <path fill="#4285F4" d="M325.3 234.3L104.6 13l220.7 221.3z"/>
    <path fill="#34A853" d="M47 0c-13 6.8-21.7 19.2-21.7 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l258-256L47 0z"/>
    <path fill="#EA4335" d="M47 512l258-256 60.6 60.6L47 512z"/>
    <path fill="#FBBC04" d="M305 256l60.6-60.6 98.1 56.6c18 10.4 18 27.2 0 37.6l-98.1 56.6L305 256z"/>
  </svg>
);

// Full Google Play Store badge
export const GooglePlayBadge = () => (
  <svg viewBox="0 0 135 40" className="h-12 w-auto">
    <rect width="135" height="40" rx="5" fill="#000"/>
    <path fill="#00D4FF" d="M24.77 20.08l-11-11.42a.52.52 0 00-.89.37v22.95a.52.52 0 00.89.37l11-11.42a.52.52 0 000-.85z" transform="translate(7, 6.5) scale(0.9)"/>
    <path fill="#00F076" d="M25.9 19.37L14.4 7.87l11.5 11.5z" transform="translate(7, 6.5) scale(0.9)"/>
    <path fill="#FFD400" d="M30.84 17.35L25.9 19.37l-11.5 11.5 16.44-9.5a2 2 0 000-3.47z" transform="translate(7, 6.5) scale(0.9)"/>
    <path fill="#FF3A44" d="M14.4 7.87l16.44 9.48-5 2.02L14.4 7.87z" transform="translate(7, 6.5) scale(0.9)"/>
    <text x="47" y="13" fill="#FFF" fontSize="6.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="400" letterSpacing="0.5">GET IT ON</text>
    <text x="47" y="27" fill="#FFF" fontSize="12" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">Google Play</text>
  </svg>
);

export const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

interface CalculatorLayoutProps {
  children: React.ReactNode;
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Snapie AI Logo" width={40} height={40} className="w-10 h-10" />
            <div>
              <span className="text-xl font-bold text-white">Snapie AI</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-slate-400 hover:text-white transition-colors">Features</Link>
            <Link href="/guide/120-Low-Glycemic-Snacks-for-Stable-Blood-Sugar" className="text-slate-400 hover:text-white transition-colors">120 Low GI Snacks</Link>
            <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" className="text-slate-400 hover:text-white transition-colors">Low GI Food List</Link>
            <Link href="/guide/7-Day-Low-Glycemic-Diet-Plan-for-Beginners" className="text-slate-400 hover:text-white transition-colors">7-Day Meal Plan</Link>
            <div className="relative group">
              <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Calculators
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <Link href="/calculators/bmr-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">🔥 BMR Calculator</Link>
                  <Link href="/calculators/tdee-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">⚡ TDEE Calculator</Link>
                  <Link href="/calculators/macro-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">🥗 Macro Calculator</Link>
                  <Link href="/calculators/bmi-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">⚖️ BMI Calculator</Link>
                  <Link href="/calculators/calorie-deficit-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">📉 Calorie Deficit Planner</Link>
                  <Link href="/calculators/body-fat-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">📊 Body Fat Calculator</Link>
                  <Link href="/calculators/steps-to-calories-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">👟 Steps to Calories</Link>
                  <Link href="/calculators/water-intake-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">💧 Water Intake Calculator</Link>
                  <Link href="/calculators/protein-intake-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">🥩 Protein Intake Calculator</Link>
                  <Link href="/calculators/intermittent-fasting-calculator" className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">⏱️ Intermittent Fasting</Link>
                  <div className="border-t border-white/10 mt-2 pt-2">
                    <Link href="/calculators" className="block px-4 py-2 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 rounded-lg transition-colors font-medium">📱 View All Calculators</Link>
                  </div>
                </div>
              </div>
            </div>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105 border border-white/20">
              <GooglePlayIcon />
              <span className="hidden sm:inline">Google Play</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-slate-900 text-white px-3 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all border border-white/20 text-sm">
              <GooglePlayIcon />
              <span>Get App</span>
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/5 p-4 overflow-y-auto max-h-[80vh]">
          <div className="flex flex-col gap-4">
            <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 border-b border-white/5">Features</Link>
            <Link href="/guide/120-Low-Glycemic-Snacks-for-Stable-Blood-Sugar" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 border-b border-white/5">120 Low GI Snacks</Link>
            <Link href="/guide/The-Ultimate-Low-Glycemic-Food-List" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 border-b border-white/5">Low GI Food List</Link>
            <Link href="/guide/7-Day-Low-Glycemic-Diet-Plan-for-Beginners" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white py-2 border-b border-white/5">7-Day Meal Plan</Link>
            
            <div className="py-2">
              <div className="text-white font-medium mb-3">Calculators</div>
              <div className="grid grid-cols-1 gap-2 pl-4">
                {calculatorLinks.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-slate-400 hover:text-white"
                  >
                    <span>{calc.icon}</span>
                    <span className="text-sm">{calc.name}</span>
                  </Link>
                ))}
                <Link
                  href="/calculators"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-emerald-400 hover:text-emerald-300"
                >
                  <span>📱</span>
                  <span className="text-sm font-medium">View All Calculators</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-emerald-900/30 to-blue-900/30"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px]"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">Track Your Nutrition Automatically with AI</h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Stop manual calculations! Snapie AI tracks calories, macros, and micronutrients instantly from food photos. The smartest way to reach your fitness goals.</p>
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block transition-all hover:scale-105">
          <GooglePlayBadge />
        </a>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-slate-400">
          <div className="flex items-center gap-2"><CheckIcon /><span>Free to download</span></div>
          <div className="flex items-center gap-2"><CheckIcon /><span>AI-powered tracking</span></div>
          <div className="flex items-center gap-2"><CheckIcon /><span>20+ nutrients tracked</span></div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.svg" alt="Snapie AI Logo" width={40} height={40} className="w-10 h-10" />
              <div><span className="text-xl font-bold text-white">Snapie AI</span><p className="text-slate-500 text-sm">AI Calorie Counter &amp; Nutrition Tracker</p></div>
            </div>
            <p className="text-slate-500 text-sm max-w-md">The 1st nutrient-based AI calorie counter that tracks micronutrients, vitamins, and provides personalized health insights.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><Link href="/calculators/bmr-calculator" className="hover:text-white transition-colors">BMR Calculator</Link></li>
              <li><Link href="/calculators/tdee-calculator" className="hover:text-white transition-colors">TDEE Calculator</Link></li>
              <li><Link href="/calculators/macro-calculator" className="hover:text-white transition-colors">Macro Calculator</Link></li>
              <li><Link href="/calculators/bmi-calculator" className="hover:text-white transition-colors">BMI Calculator</Link></li>
              <li><Link href="/calculators/calorie-deficit-calculator" className="hover:text-white transition-colors">Calorie Deficit Planner</Link></li>
              <li><Link href="/calculators/body-fat-calculator" className="hover:text-white transition-colors">Body Fat Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <a href="mailto:pallabi@snapie.fit" className="text-slate-500 hover:text-white transition-colors text-sm">pallabi@snapie.fit</a>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Five Point AI Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function MobileDownloadBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 md:hidden z-50">
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3 border border-white/20">
        <GooglePlayIcon />
        Get it on Google Play
      </a>
    </div>
  );
}

export function CalculatorLayout({ children }: CalculatorLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-emerald-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-blue-500/10 rounded-full blur-[150px]"></div>
      </div>
      <Navbar />
      {children}
      <CTASection />
      <Footer />
      <MobileDownloadBar />
    </main>
  );
}

export function RelatedCalculators({ currentCalculator }: { currentCalculator: string }) {
  const calculators = [
    { name: "BMR Calculator", href: "/calculators/bmr-calculator", description: "Calculate your Basal Metabolic Rate" },
    { name: "TDEE Calculator", href: "/calculators/tdee-calculator", description: "Find your Total Daily Energy Expenditure" },
    { name: "Macro Calculator", href: "/calculators/macro-calculator", description: "Get your optimal macronutrient split" },
    { name: "BMI Calculator", href: "/calculators/bmi-calculator", description: "Check your Body Mass Index" },
    { name: "Calorie Deficit Planner", href: "/calculators/calorie-deficit-calculator", description: "Plan your weight loss/gain goals" },
    { name: "Body Fat Calculator", href: "/calculators/body-fat-calculator", description: "Estimate your body fat percentage" },
    { name: "Steps to Calories", href: "/calculators/steps-to-calories-calculator", description: "Convert steps to calories burned" },
    { name: "Water Intake Calculator", href: "/calculators/water-intake-calculator", description: "Calculate daily water needs" },
    { name: "Protein Intake Calculator", href: "/calculators/protein-intake-calculator", description: "Find your optimal protein intake" },
    { name: "Intermittent Fasting", href: "/calculators/intermittent-fasting-calculator", description: "Generate your fasting schedule" },
  ].filter(calc => !calc.href.includes(currentCalculator));

  return (
    <section className="py-16 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Related Fitness Calculators</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href} className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all hover:-translate-y-1 group">
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">{calc.name}</h3>
              <p className="text-slate-400 text-sm">{calc.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const calculatorLinks = [
  { name: "BMR Calculator", href: "/calculators/bmr-calculator", icon: "🔥" },
  { name: "TDEE Calculator", href: "/calculators/tdee-calculator", icon: "⚡" },
  { name: "Macro Calculator", href: "/calculators/macro-calculator", icon: "🥗" },
  { name: "BMI Calculator", href: "/calculators/bmi-calculator", icon: "⚖️" },
  { name: "Calorie Deficit", href: "/calculators/calorie-deficit-calculator", icon: "📉" },
  { name: "Body Fat Calculator", href: "/calculators/body-fat-calculator", icon: "📊" },
  { name: "Steps to Calories", href: "/calculators/steps-to-calories-calculator", icon: "👟" },
  { name: "Water Intake", href: "/calculators/water-intake-calculator", icon: "💧" },
  { name: "Protein Intake", href: "/calculators/protein-intake-calculator", icon: "🥩" },
  { name: "Intermittent Fasting", href: "/calculators/intermittent-fasting-calculator", icon: "⏱️" },
];
