'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Apple, 
  Wheat, 
  ChevronRight,
  Info,
  Sparkles,
  Camera,
  Zap,
  Target,
  Heart,
  Brain,
  Clock,
  Utensils,
  Flame,
  Scale,
  Activity,
  Globe,
  Star,
  Calculator
} from 'lucide-react';

// Play Store URL constant
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

import { foodDatabaseUnique as foodDatabase, categories, totalFoodCount } from './foodDatabase';

export default function LowGlycemicGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showMacros, setShowMacros] = useState(false);

  // Filter Logic
  const filteredFood = foodDatabase.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HERO SECTION */}
      <header className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-semibold mb-6 tracking-wide uppercase">
            <CheckCircle2 size={16} /> Updated for 2026 • {totalFoodCount}+ Foods
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            500+ <span className="text-emerald-400">Low Glycemic Index Food List</span> (Complete Guide)
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            The most comprehensive <strong>glycemic index food chart</strong> with {totalFoodCount}+ <strong>foods low in glycemic index</strong>. Perfect for anyone following a <strong>low glycemic diet plan</strong>, managing diabetes, or seeking stable energy throughout the day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Get Snapie AI on Play Store
            </a>
            <a href="#master-list" className="text-slate-300 hover:text-white font-medium underline underline-offset-4 decoration-slate-500 hover:decoration-white transition-all">
              Jump to Searchable List
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 -mt-20 relative z-20 mb-20">
        
        {/* INTRO CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Your Blood Sugar Matters</h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            We&apos;ve all felt it. That post-lunch slump where your brain feels like fog and you&apos;d kill for a nap. That isn&apos;t just &quot;tiredness&quot;—it&apos;s a biological roller coaster caused by <strong>high glycemic foods</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            The <strong>glycemic index of foods</strong> measures how quickly they spike your blood sugar. High GI foods are like rocket fuel: they burn hot and fast, leaving you crashing. <strong>Low glycemic foods list</strong> items are like slow-burning logs on a fire—steady, consistent energy that lasts for hours. This <strong>gi index chart</strong> helps you make smarter choices.
          </p>
          
          {/* Internal Links Section */}
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 mb-8">
            <p className="text-emerald-800 font-medium mb-2">📚 Related Resources:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="https://snapie.fit/guide/7-Day-Low-Glycemic-Diet-Plan-for-Beginners" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline text-sm font-medium">
                7-Day Low GI Diet Plan <ChevronRight size={14} />
              </Link>
              <Link href="/calculators/bmi-calculator" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline text-sm font-medium">
                BMI Calculator <ChevronRight size={14} />
              </Link>
              <Link href="/calculators/calorie-deficit-calculator" className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 underline text-sm font-medium">
                Calorie Deficit Calculator <ChevronRight size={14} />
              </Link>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-emerald-600" size={20} /> Benefits of Low GI Foods
              </h3>
              <ul className="space-y-2 text-emerald-800">
                <li>• Steady energy levels all day</li>
                <li>• Reduced cravings and hunger</li>
                <li>• Better insulin sensitivity</li>
                <li>• Improved mood and focus</li>
                <li>• Better blood sugar control for diabetics</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-3">
                <AlertTriangle className="text-amber-600" size={20} /> The GI Scale
              </h3>
              <ul className="space-y-2 text-amber-800">
                <li>🟢 <strong>Low (0-55):</strong> Eat freely - best for <strong>low gi meal plan</strong></li>
                <li>🟡 <strong>Medium (56-69):</strong> Portion control</li>
                <li>🔴 <strong>High (70+):</strong> Limit or pair with protein</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION: GI VS GL */}
        <section className="mb-20">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600 shrink-0">
              <Info size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">GI vs. GL: Understanding the Glycemic Index Chart</h2>
              <p className="text-slate-500 font-medium">The <strong>gi index of foods</strong> tells only half the story.</p>
            </div>
          </div>
          
          <div className="prose prose-slate prose-lg max-w-none text-slate-600">
            <p>
              Imagine a watermelon. It tastes sweet, right? It actually has a high GI (72), making it one of the <strong>high glycemic fruits</strong>. But here is the catch: you would need to eat a massive amount of watermelon to actually spike your blood sugar because it is mostly water.
            </p>
            <p>
              This is where <strong>Glycemic Load (GL)</strong> comes in. While the <strong>glycemic index of foods</strong> measures the <em>quality</em> of the carb, GL measures the <em>quantity</em> impacting your body. <strong>Low glycemic load foods</strong> are the real winners for blood sugar control.
            </p>
            <blockquote className="border-l-4 border-emerald-500 pl-4 italic bg-slate-50 py-2 pr-2 my-6">
              &quot;A food can have a high GI but a low GL if the serving size has very few carbs. This <strong>glycemic index chart for diabetics</strong> includes both values to help you make informed decisions.&quot;
            </blockquote>
          </div>

          {/* GI vs GL Comparison Table */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Scale size={20} /> Glycemic Index (GI)
              </h4>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>• Measures how FAST a food raises blood sugar</li>
                <li>• Based on 50g of available carbohydrates</li>
                <li>• Compared against pure glucose (GI=100)</li>
                <li>• Doesn&apos;t consider serving size</li>
              </ul>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <Activity size={20} /> Glycemic Load (GL)
              </h4>
              <ul className="space-y-2 text-indigo-800 text-sm">
                <li>• Measures TOTAL blood sugar impact</li>
                <li>• Accounts for typical serving sizes</li>
                <li>• GL = (GI × carbs per serving) / 100</li>
                <li>• More practical for meal planning</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SNAPIE AI CTA - PRIMARY */}
        <div className="bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-white mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-4">
                  <Sparkles size={14} /> AI-Powered Nutrition
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Snap a Photo, Know the GI Instantly
                </h3>
                <p className="text-purple-100 mb-6 leading-relaxed">
                  Why memorize this entire <strong>glycemic index food chart</strong> when AI can do it for you? <strong>Snapie AI</strong> instantly analyzes any food, meal, or recipe and tells you its glycemic impact. Perfect for following your <strong>low gi diet plan</strong>.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <Camera size={18} className="text-purple-200" />
                    <span>Instant food recognition from photos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap size={18} className="text-purple-200" />
                    <span>Real-time GI & GL calculations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target size={18} className="text-purple-200" />
                    <span>Personalized <strong>low glycemic index meal plan</strong> suggestions</span>
                  </li>
                </ul>
                <a 
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-purple-700 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Get on Google Play
                </a>
              </div>
              <div className="hidden md:flex w-48 h-48 bg-white/10 rounded-3xl border border-white/20 items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="Snapie AI Logo" 
                  width={100} 
                  height={100}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: SCIENCE BEHIND LOW GI */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">The Science Behind Blood Sugar Control</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="text-rose-600" size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Heart Health</h4>
              <p className="text-sm text-slate-600">Low GI diets reduce cardiovascular disease risk by 25%</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="text-purple-600" size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Mental Clarity</h4>
              <p className="text-sm text-slate-600">Stable blood sugar improves focus and cognitive function</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Flame className="text-orange-600" size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Fat Burning</h4>
              <p className="text-sm text-slate-600">Lower insulin levels promote fat oxidation over storage</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="text-teal-600" size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Sustained Energy</h4>
              <p className="text-sm text-slate-600">No more energy crashes or afternoon slumps</p>
            </div>
          </div>

          <div className="bg-linear-to-r from-slate-50 to-emerald-50 p-8 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">How Blood Sugar Spikes Affect Your Body</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">1</span>
                  High GI Food Consumed
                </div>
                <p className="text-slate-600">Glucose floods your bloodstream rapidly, causing a sharp spike in blood sugar levels within 15-30 minutes.</p>
              </div>
              <div>
                <div className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">2</span>
                  Insulin Response
                </div>
                <p className="text-slate-600">Your pancreas releases insulin to shuttle glucose into cells. High spikes trigger excessive insulin release.</p>
              </div>
              <div>
                <div className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">3</span>
                  The Crash
                </div>
                <p className="text-slate-600">Too much insulin causes blood sugar to plummet, leaving you hungry, tired, and craving more sugar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CATEGORIZED BREAKDOWN */}
        <section className="space-y-16 mb-24">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Breakdown by Category</h2>
          
          {/* Fruits */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600"><Apple /></div>
                <h3 className="text-2xl font-bold text-slate-900">Low Glycemic Fruits & Low GI Fruits</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Nature&apos;s candy doesn&apos;t have to be forbidden. Temperate <strong>low glycemic fruits</strong> (apples, pears, berries) generally have much lower GI scores than tropical fruits like pineapple or mango, which are considered <strong>high glycemic fruits</strong>.
              </p>
              <ul className="space-y-2">
                {['Cherries (22) - Best low gi fruits', 'Grapefruit (25)', 'Dried Apricots (31)', 'Apples (36) - Ideal low glycemic fruits'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                    <ChevronRight size={16} className="text-rose-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-rose-50 p-6 rounded-xl border border-rose-100">
              <h4 className="font-bold text-rose-900 mb-2">💡 Pro Tip for Low GI Fruits</h4>
              <p className="text-rose-800 text-sm">
                The riper the fruit, the higher the GI. A green banana has a GI of roughly 40 (mostly resistant starch), while a brown, spotted banana can hit a GI of 60+. For the best <strong>low gi fruits</strong>, eat them while they are firm!
              </p>
            </div>
          </div>

          {/* Grains */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Wheat /></div>
                <h3 className="text-2xl font-bold text-slate-900">Smart Grains & Carbs</h3>
              </div>
              <p className="text-slate-600 mb-4">
                You don&apos;t have to go Keto to lower your blood sugar. It&apos;s about choosing complex carbs that digest slowly.
              </p>
              <ul className="space-y-2">
                {['Barley (25)', 'Whole Grain Pasta (42)', 'Quinoa (53)', 'Steel Cut Oats (55)'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                    <ChevronRight size={16} className="text-amber-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h4 className="font-bold text-amber-900 mb-2">💡 The &quot;Al Dente&quot; Hack</h4>
              <p className="text-amber-800 text-sm">
                Cook your pasta &quot;al dente&quot; (firm to the bite). Overcooking gelatinizes the starch, making it easier to digest and raising the GI score.
              </p>
            </div>
          </div>

          {/* Global Cuisines */}
          <div className="bg-linear-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border border-cyan-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600"><Globe /></div>
              <h3 className="text-2xl font-bold text-slate-900">Global Low GI Cuisines</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Our database now includes foods from cuisines around the world—Indian, Asian, African, Mediterranean, and Latin American dishes—so you can enjoy diverse flavors while maintaining stable blood sugar.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/70 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🇮🇳</div>
                <div className="font-semibold text-slate-800 text-sm">Indian</div>
                <div className="text-xs text-slate-500">Dals, Chapati, Idli</div>
              </div>
              <div className="bg-white/70 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌏</div>
                <div className="font-semibold text-slate-800 text-sm">Asian</div>
                <div className="text-xs text-slate-500">Soba, Miso, Kimchi</div>
              </div>
              <div className="bg-white/70 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌍</div>
                <div className="font-semibold text-slate-800 text-sm">African</div>
                <div className="text-xs text-slate-500">Injera, Githeri</div>
              </div>
              <div className="bg-white/70 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌎</div>
                <div className="font-semibold text-slate-800 text-sm">Latin</div>
                <div className="text-xs text-slate-500">Black Beans, Tacos</div>
              </div>
            </div>
          </div>
        </section>

        {/* INLINE CTA - SNAPIE AI */}
        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-16">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Tired of Looking Up GI Values in This Chart?</h3>
              <p className="text-slate-300 text-sm">
                Let Snapie AI do the work. Just snap a photo of your meal and get instant GI analysis, macro breakdown, and personalized <strong>low gi meal plan</strong> suggestions.
              </p>
            </div>
            <a 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Get Snapie AI Free
            </a>
          </div>
        </div>

        {/* SECTION: MASTER SEARCHABLE TABLE */}
        <section id="master-list" className="scroll-mt-24">
          <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-white">Complete Low GI Foods Chart</h2>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">
                  {totalFoodCount} Foods
                </span>
              </div>
              <p className="text-slate-400 mb-6">Search our comprehensive <strong className="text-slate-300">glycemic index food chart</strong> with {totalFoodCount}+ <strong className="text-slate-300">low glycemic foods list</strong> items from around the world. Perfect <strong className="text-slate-300">glycemic index chart for diabetics</strong> and anyone following a <strong className="text-slate-300">low gi diet plan</strong>.</p>
              
              {/* Controls */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search for a food (e.g., 'Oats', 'Quinoa', 'Dosa')..." 
                      className="w-full bg-slate-800 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => setShowMacros(!showMacros)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                      showMacros 
                        ? 'bg-violet-500 text-white' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {showMacros ? '✓ Macros' : 'Show Macros'}
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                        activeCategory === cat 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="px-6 py-3 bg-slate-800/50 border-b border-slate-700">
              <p className="text-sm text-slate-400">
                Showing <span className="text-white font-semibold">{filteredFood.length}</span> of {totalFoodCount} foods
                {searchTerm && <span> matching &quot;{searchTerm}&quot;</span>}
                {activeCategory !== 'All' && <span> in {activeCategory}</span>}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto max-h-150 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800/50 text-xs uppercase tracking-wider text-slate-400 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 font-bold">Food Name</th>
                    <th className="px-6 py-4 font-bold text-center">GI</th>
                    <th className="px-6 py-4 font-bold text-center hidden sm:table-cell">GL</th>
                    {showMacros && (
                      <>
                        <th className="px-4 py-4 font-bold text-center hidden lg:table-cell">Cal</th>
                        <th className="px-4 py-4 font-bold text-center hidden lg:table-cell">Carbs</th>
                        <th className="px-4 py-4 font-bold text-center hidden lg:table-cell">Protein</th>
                        <th className="px-4 py-4 font-bold text-center hidden lg:table-cell">Fat</th>
                      </>
                    )}
                    <th className="px-6 py-4 font-bold hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredFood.length > 0 ? (
                    filteredFood.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{item.name}</div>
                          <div className="text-xs text-slate-500">{item.serving}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            item.gi <= 55 ? 'bg-emerald-500/10 text-emerald-400' : 
                            item.gi <= 69 ? 'bg-amber-500/10 text-amber-400' :
                            'bg-red-500/10 text-red-400'
                          }`}>
                            {item.gi}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-slate-400 hidden sm:table-cell">
                          {item.gl ?? '-'}
                        </td>
                        {showMacros && (
                          <>
                            <td className="px-4 py-4 text-center text-slate-400 text-sm hidden lg:table-cell">
                              {item.calories}
                            </td>
                            <td className="px-4 py-4 text-center text-slate-400 text-sm hidden lg:table-cell">
                              {item.carbs}g
                            </td>
                            <td className="px-4 py-4 text-center text-slate-400 text-sm hidden lg:table-cell">
                              {item.protein}g
                            </td>
                            <td className="px-4 py-4 text-center text-slate-400 text-sm hidden lg:table-cell">
                              {item.fat}g
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 text-sm text-slate-400 hidden md:table-cell group-hover:text-slate-300">
                          {item.notes}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={showMacros ? 8 : 4} className="px-6 py-12 text-center text-slate-500">
                        No foods found matching &quot;{searchTerm}&quot; in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-800/30 text-center text-xs text-slate-500 border-t border-slate-800">
              *GI scores can vary based on ripeness, cooking method, and origin. Data compiled from international GI tables.
            </div>
          </div>
        </section>

        {/* SECTION: HOW TO USE THIS LIST */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How to Use This List Effectively</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Build Your Plate Smart</h4>
                  <p className="text-slate-600 text-sm">Fill half your plate with low GI vegetables, quarter with lean protein, and quarter with low GI carbs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Pair High GI with Protein</h4>
                  <p className="text-slate-600 text-sm">If you must eat a high GI food, combine it with protein or healthy fats to slow absorption.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Eat Fiber First</h4>
                  <p className="text-slate-600 text-sm">Start meals with vegetables or salad. Fiber creates a gel that slows carb digestion.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Consider Glycemic Load</h4>
                  <p className="text-slate-600 text-sm">A food&apos;s GL matters more than GI for real-world eating. Watermelon has high GI but low GL.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Vinegar Trick</h4>
                  <p className="text-slate-600 text-sm">Adding vinegar or lemon to meals can reduce the overall glycemic response by up to 30%.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">6</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Stay Active After Meals</h4>
                  <p className="text-slate-600 text-sm">A 15-minute walk after eating helps your muscles absorb glucose, reducing blood sugar spikes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: ZERO GI FOODS */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The &quot;Free Pass&quot; List: Zero GI & Low Glycemic Snacks</h2>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <p className="text-slate-600 mb-6">
              Looking for <strong className="text-slate-800">low gi snacks</strong> and <strong className="text-slate-800">low glycemic snacks</strong>? Proteins and fats generally have little to no immediate effect on blood sugar. These foods make perfect <strong className="text-slate-800">low gi snacks for diabetics</strong> and can add bulk and satiety to your meals without worrying about the GI score.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Eggs', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Chicken Breast', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Salmon / Fish', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Olive Oil', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Beef / Lamb', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Avocado', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Nuts & Seeds', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Cheese', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Tofu / Tempeh', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3 font-medium text-slate-700">
                  {item.icon} {item.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: MEAL PLANNING TIPS */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Low Glycemic Index Meal Plan Ideas</h2>
          <p className="text-slate-600 mb-8">Creating a <strong className="text-slate-800">low gi meal plan</strong> doesn&apos;t have to be complicated. Here are meal ideas using foods from our <strong className="text-slate-800">low glycemic foods list</strong>. For a complete week of meals, check out our <Link href="https://snapie.fit/guide/7-Day-Low-Glycemic-Diet-Plan-for-Beginners" className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2">7-Day Low Glycemic Diet Plan for Beginners</Link>.</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-linear-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="text-orange-500" size={20} />
                <h4 className="font-bold text-slate-900">Breakfast Ideas</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Steel cut oats with berries & nuts</li>
                <li>• Greek yogurt parfait</li>
                <li>• Eggs with whole grain toast</li>
                <li>• Smoothie with spinach & protein</li>
                <li>• Dosa with sambar (Indian)</li>
              </ul>
            </div>
            <div className="bg-linear-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="text-green-500" size={20} />
                <h4 className="font-bold text-slate-900">Lunch Ideas</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Quinoa salad with chickpeas</li>
                <li>• Lentil soup with rye bread</li>
                <li>• Brown rice bowl with veggies</li>
                <li>• Whole wheat wrap with hummus</li>
                <li>• Soba noodle stir fry</li>
              </ul>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="text-purple-500" size={20} />
                <h4 className="font-bold text-slate-900">Dinner Ideas</h4>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Grilled salmon with barley</li>
                <li>• Chicken with roasted vegetables</li>
                <li>• Dal with chapati (Indian)</li>
                <li>• Mediterranean salad with falafel</li>
                <li>• Black bean tacos</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SNAPIE AI CTA - SECONDARY */}
        <div className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white mb-16">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Star className="fill-yellow-300 text-yellow-300" size={20} />
                <Star className="fill-yellow-300 text-yellow-300" size={20} />
                <Star className="fill-yellow-300 text-yellow-300" size={20} />
                <Star className="fill-yellow-300 text-yellow-300" size={20} />
                <Star className="fill-yellow-300 text-yellow-300" size={20} />
                <span className="text-emerald-100 text-sm ml-2">4.8/5 from 300+ users</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Make Low GI Eating Effortless</h3>
              <p className="text-emerald-100">
                Snapie AI tracks your meals, provides instant GI analysis, and helps you build sustainable eating habits. Join thousands who&apos;ve already transformed their health with our <strong>low gi meal planning</strong> features.
              </p>
            </div>
            <div className="shrink-0">
              <a 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Get Snapie AI
              </a>
            </div>
          </div>
        </div>

        {/* SECTION: COMMON MISTAKES */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Common Low GI Mistakes to Avoid</h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <div className="flex items-start gap-4">
                <div className="shrink-0 text-red-500 mt-1">❌</div>
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Assuming &quot;Whole Grain&quot; Means Low GI</h4>
                  <p className="text-red-800 text-sm">Many whole grain products are finely milled, making them high GI. Whole wheat bread (GI 73) can spike blood sugar as much as white bread. Look for coarse, intact grains.</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <div className="flex items-start gap-4">
                <div className="shrink-0 text-red-500 mt-1">❌</div>
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Ignoring Portion Sizes</h4>
                  <p className="text-red-800 text-sm">Even low GI foods can spike blood sugar in large quantities. A small bowl of pasta is different from a giant plate. This is why GL matters.</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <div className="flex items-start gap-4">
                <div className="shrink-0 text-red-500 mt-1">❌</div>
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Drinking Fruit Juice</h4>
                  <p className="text-red-800 text-sm">Juicing removes fiber and concentrates sugar. Orange juice (GI 50) hits your bloodstream faster than a whole orange (GI 43) despite similar GI.</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <div className="flex items-start gap-4">
                <div className="shrink-0 text-red-500 mt-1">❌</div>
                <div>
                  <h4 className="font-bold text-red-900 mb-1">Overcooking Your Food</h4>
                  <p className="text-red-800 text-sm">Cooking breaks down starches. Al dente pasta has a lower GI than well-cooked. Same goes for rice, potatoes, and other starches.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="border-t border-slate-200 pt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions About the Glycemic Index</h2>
          <div className="grid gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Can I eat high GI foods if I mix them?</h3>
              <p className="text-slate-600">
                Yes! This is the best trick in the book. If you want to eat white rice (High GI), mix it with plenty of veggies (fiber) and chicken (protein). The overall <strong>glycemic load</strong> of the meal will drop significantly. Use our <strong className="text-slate-700">gi index chart</strong> to find good pairing options.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Is a Low GI diet good for weight loss?</h3>
              <p className="text-slate-600">
                Absolutely. By preventing insulin spikes, your body enters &quot;fat storage mode&quot; less often. Plus, <strong>low glycemic foods</strong> tend to be higher in fiber, keeping you full so you naturally eat less. Check our <Link href="/calculators/calorie-deficit-calculator" className="text-emerald-600 hover:underline">calorie deficit calculator</Link> to optimize your results.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Do I need to count calories too?</h3>
              <p className="text-slate-600">
                Calories still matter, but quality matters more. A 200-calorie donut affects your hormones differently than 200 calories of almonds. Focus on the GI first, and portion control second. Our <Link href="/calculators/tdee-calculator" className="text-emerald-600 hover:underline">TDEE calculator</Link> can help you understand your calorie needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Is a low GI diet suitable for diabetics?</h3>
              <p className="text-slate-600">
                Low GI eating is highly recommended for people with diabetes or prediabetes. This <strong className="text-slate-700">glycemic index chart for diabetics</strong> can help manage blood sugar. Multiple studies show it improves blood sugar control and reduces HbA1c levels. Always consult your doctor for personalized advice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">How quickly will I see results?</h3>
              <p className="text-slate-600">
                Many people notice improved energy levels within the first week. Weight loss and other metabolic improvements typically become noticeable after 2-4 weeks of consistent <strong className="text-slate-700">low gi diet</strong> eating.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Can I still enjoy my favorite foods?</h3>
              <p className="text-slate-600">
                Yes! The goal isn&apos;t restriction—it&apos;s smart substitutions. Love pasta? Try whole grain al dente. Love bread? Choose pumpernickel or sourdough. Love rice? Try <strong className="text-slate-700">low gi rice</strong> like basmati or pair it with beans and vegetables.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Eating Habits?
          </h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Download Snapie AI and take the guesswork out of healthy eating. Snap, track, and optimize your meals with our comprehensive <strong className="text-emerald-400">glycemic index food chart</strong> for stable energy and lasting health.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              Download Snapie AI Free
            </a>
            <Link 
              href="/calculators"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              <Calculator size={20} />
              Explore Our Calculators
            </Link>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white p-1 rounded-sm font-bold text-xs">AI</span>
              <span className="text-slate-800 font-bold text-lg tracking-tight">Snapie.fit</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            © 2026 Snapie.fit. Medical Disclaimer: This content is for informational purposes only and not medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}