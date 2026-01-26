'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Apple, 
  Wheat, 
  ChevronRight,
  Info
} from 'lucide-react';

// --- DATA: The Massive Low GI Food Database ---
type FoodItem = {
  name: string;
  gi: number;
  gl: number;
  category: string;
  serving: string;
  notes: string;
};

const foodDatabase: FoodItem[] = [
  // Fruits
  { name: 'Cherries (Sour)', gi: 22, gl: 3, category: 'Fruits', serving: '1 cup', notes: 'Packed with antioxidants.' },
  { name: 'Grapefruit', gi: 25, gl: 3, category: 'Fruits', serving: '½ fruit', notes: 'Be careful if on medication.' },
  { name: 'Apple (with skin)', gi: 36, gl: 6, category: 'Fruits', serving: '1 medium', notes: 'Fiber in skin lowers GI.' },
  { name: 'Pear', gi: 38, gl: 4, category: 'Fruits', serving: '1 medium', notes: 'Eat firm, not over-ripe.' },
  { name: 'Strawberries', gi: 40, gl: 1, category: 'Fruits', serving: '1 cup', notes: 'Lowest sugar berry.' },
  { name: 'Orange', gi: 43, gl: 5, category: 'Fruits', serving: '1 medium', notes: 'Better than juice.' },
  { name: 'Peach', gi: 42, gl: 5, category: 'Fruits', serving: '1 medium', notes: 'Fresh is better than canned.' },
  
  // Vegetables
  { name: 'Spinach', gi: 6, gl: 0, category: 'Vegetables', serving: '1 cup', notes: 'Virtually zero impact.' },
  { name: 'Broccoli', gi: 10, gl: 1, category: 'Vegetables', serving: '1 cup', notes: 'High in chromium.' },
  { name: 'Cabbage', gi: 10, gl: 1, category: 'Vegetables', serving: '1 cup', notes: 'Fermented (Kimchi) is even better.' },
  { name: 'Carrots (Raw)', gi: 16, gl: 1, category: 'Vegetables', serving: '1 medium', notes: 'Cooked carrots have higher GI.' },
  { name: 'Green Peas', gi: 48, gl: 4, category: 'Vegetables', serving: '½ cup', notes: 'Higher starch than leafy greens.' },
  { name: 'Sweet Potato (Boiled)', gi: 44, gl: 11, category: 'Vegetables', serving: '1 medium', notes: 'Boiling keeps GI lower than baking.' },

  // Grains & Legumes
  { name: 'Chickpeas', gi: 28, gl: 9, category: 'Legumes', serving: '1 cup cooked', notes: 'Great for sustained energy.' },
  { name: 'Lentils (Green)', gi: 30, gl: 5, category: 'Legumes', serving: '1 cup cooked', notes: 'Protein powerhouse.' },
  { name: 'Barley', gi: 25, gl: 11, category: 'Grains', serving: '1 cup cooked', notes: 'Contains beta-glucan.' },
  { name: 'Quinoa', gi: 53, gl: 13, category: 'Grains', serving: '1 cup cooked', notes: 'A complete protein.' },
  { name: 'Kidney Beans', gi: 24, gl: 7, category: 'Legumes', serving: '1 cup cooked', notes: 'High fiber content.' },
  { name: 'Sourdough Bread', gi: 53, gl: 8, category: 'Grains', serving: '1 slice', notes: 'Acidity lowers the GI.' },

  // Dairy & Alternatives
  { name: 'Greek Yogurt (Unsweetened)', gi: 12, gl: 1, category: 'Dairy', serving: '1 cup', notes: 'Choose full fat for lower spike.' },
  { name: 'Soy Milk', gi: 34, gl: 4, category: 'Dairy', serving: '1 cup', notes: 'Check for added sugar.' },
  { name: 'Whole Milk', gi: 39, gl: 4, category: 'Dairy', serving: '1 cup', notes: 'Lactose is a slow sugar.' },

  // Nuts & Fats
  { name: 'Peanuts', gi: 14, gl: 1, category: 'Nuts', serving: '1 oz', notes: 'Ideally unsalted.' },
  { name: 'Cashews', gi: 22, gl: 3, category: 'Nuts', serving: '1 oz', notes: 'Slightly carb-heavy for a nut.' },
  { name: 'Almonds', gi: 0, gl: 0, category: 'Nuts', serving: '1 oz', notes: 'Negligible GI.' },
];

export default function LowGlycemicGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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
            <CheckCircle2 size={16} /> Updated for 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            The Ultimate <span className="text-emerald-400">Low Glycemic Foods List</span> (Complete Guide)
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop the sugar crash. Discover the science-backed <strong>foods low in glycemic index</strong> that stabilize your energy, burn fat, and keep you full longer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/25">
              <Download size={20} />
              Download PDF Chart
            </button>
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
            We&apos;ve all felt it. That post-lunch slump where your brain feels like fog and you&apos;d kill for a nap. That isn&apos;t just &quot;tiredness&quot;—it&apos;s a biological roller coaster.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            The Glycemic Index (GI) measures how quickly food spikes your blood sugar. High GI foods are like rocket fuel: they burn hot and fast, leaving you crashing. <strong>Low glycemic foods</strong> are like slow-burning logs on a fire—steady, consistent energy that lasts for hours.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-emerald-600" size={20} /> The Benefits
              </h3>
              <ul className="space-y-2 text-emerald-800">
                <li>• Steady energy levels all day</li>
                <li>• Reduced cravings and hunger</li>
                <li>• Better insulin sensitivity</li>
                <li>• Improved mood and focus</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-3">
                <AlertTriangle className="text-amber-600" size={20} /> The GI Scale
              </h3>
              <ul className="space-y-2 text-amber-800">
                <li>🟢 <strong>Low (0-55):</strong> Eat freely</li>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-2">GI vs. GL: The Crucial Difference</h2>
              <p className="text-slate-500 font-medium">Don&apos;t be fooled by the numbers alone.</p>
            </div>
          </div>
          
          <div className="prose prose-slate prose-lg max-w-none text-slate-600">
            <p>
              Imagine a watermelon. It tastes sweet, right? It actually has a high GI (72). But here is the catch: you would need to eat a massive amount of watermelon to actually spike your blood sugar because it is mostly water.
            </p>
            <p>
              This is where <strong>Glycemic Load (GL)</strong> comes in. While GI measures the <em>quality</em> of the carb, GL measures the <em>quantity</em> impacting your body.
            </p>
            <blockquote className="border-l-4 border-emerald-500 pl-4 italic bg-slate-50 py-2 pr-2 my-6">
              &quot;A food can have a high GI but a low GL if the serving size has very few carbs. However, for the best metabolic health, focusing on <strong>low glycemic foods</strong> is the safest bet.&quot;
            </blockquote>
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
                <h3 className="text-2xl font-bold text-slate-900">Low GI Fruits</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Nature&apos;s candy doesn&apos;t have to be forbidden. Temperate fruits (apples, pears, berries) generally have much lower GI scores than tropical fruits (pineapple, mango).
              </p>
              <ul className="space-y-2">
                {['Cherries (22)', 'Grapefruit (25)', 'Dried Apricots (31)', 'Apples (36)'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                    <ChevronRight size={16} className="text-rose-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-rose-50 p-6 rounded-xl border border-rose-100">
              <h4 className="font-bold text-rose-900 mb-2">💡 Pro Tip</h4>
              <p className="text-rose-800 text-sm">
                The riper the fruit, the higher the GI. A green banana has a GI of roughly 40 (mostly resistant starch), while a brown, spotted banana can hit a GI of 60+. Eat them while they are firm!
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
        </section>

        {/* SECTION: MASTER SEARCHABLE TABLE */}
        <section id="master-list" className="scroll-mt-24">
          <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-2">The Master Low Glycemic Foods List</h2>
              <p className="text-slate-400 mb-6">Search over 50+ common foods to find their GI score.</p>
              
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search for a food (e.g., 'Oats')..." 
                    className="w-full bg-slate-800 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  {['All', 'Fruits', 'Vegetables', 'Grains', 'Legumes', 'Nuts', 'Dairy'].map(cat => (
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800/50 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-bold">Food Name</th>
                    <th className="px-6 py-4 font-bold text-center">GI Score</th>
                    <th className="px-6 py-4 font-bold text-center hidden sm:table-cell">GL Score</th>
                    <th className="px-6 py-4 font-bold hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredFood.length > 0 ? (
                    filteredFood.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{item.name}</div>
                          <div className="text-xs text-slate-500 sm:hidden">{item.serving} • {item.notes}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            item.gi < 55 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {item.gi}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-slate-400 hidden sm:table-cell">
                          {item.gl}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400 hidden md:table-cell group-hover:text-slate-300">
                          {item.notes}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                        No foods found matching &quot;{searchTerm}&quot; in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-800/30 text-center text-xs text-slate-500 border-t border-slate-800">
              *GI scores can vary based on ripeness, cooking method, and origin.
            </div>
          </div>
        </section>

        {/* SECTION: ZERO GI FOODS */}
        <section className="mb-20 mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The &quot;Free Pass&quot; List: Zero GI</h2>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <p className="text-slate-600 mb-6">
              Proteins and fats generally have little to no immediate effect on blood sugar. You can eat these to add bulk and satiety to your meals without worrying about the GI score.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Eggs', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Chicken Breast', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Salmon / Fish', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Olive Oil', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Beef / Lamb', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
                { name: 'Avocado', icon: <CheckCircle2 size={18} className="text-emerald-500" /> },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3 font-medium text-slate-700">
                  {item.icon} {item.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="border-t border-slate-200 pt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
          <div className="grid gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Can I eat high GI foods if I mix them?</h3>
              <p className="text-slate-600">
                Yes! This is the best trick in the book. If you want to eat white rice (High GI), mix it with plenty of veggies (fiber) and chicken (protein). The overall glycemic load of the meal will drop significantly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Is a Low GI diet good for weight loss?</h3>
              <p className="text-slate-600">
                Absolutely. By preventing insulin spikes, your body enters &quot;fat storage mode&quot; less often. Plus, <strong>low glycemic foods</strong> tend to be higher in fiber, keeping you full so you naturally eat less.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Do I need to count calories too?</h3>
              <p className="text-slate-600">
                Calories still matter, but quality matters more. A 200-calorie donut affects your hormones differently than 200 calories of almonds. Focus on the GI first, and portion control second.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-bold text-slate-900 mb-4">Get the full chart in your inbox</h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Join 20,000+ readers who use our printable guide for their weekly grocery shopping.
          </p>
          <div className="flex justify-center gap-3 max-w-sm mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
            />
            <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
              Send
            </button>
          </div>
          <p className="mt-12 text-xs text-slate-400">
            © 2026 YourBrand. Medical Disclaimer: This content is for informational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
