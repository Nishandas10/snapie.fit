"use client";

import { useState } from "react";
import { CalculatorLayout, RelatedCalculators, GooglePlayBadge } from "@/app/components/CalculatorLayout";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

const fastingMethods = [
  { value: "16:8", label: "16:8 Method", fastingHours: 16, eatingHours: 8, description: "Most popular, beginner-friendly" },
  { value: "18:6", label: "18:6 Method", fastingHours: 18, eatingHours: 6, description: "Intermediate fasting" },
  { value: "20:4", label: "20:4 (Warrior)", fastingHours: 20, eatingHours: 4, description: "Advanced fasting" },
  { value: "14:10", label: "14:10 Method", fastingHours: 14, eatingHours: 10, description: "Gentle start for beginners" },
];

const formatTime = (hours: number, minutes: number = 0): string => {
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const parseTime = (timeString: string): { hours: number; minutes: number } | null => {
  const match = timeString.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return { hours, minutes };
};

const addHours = (hours: number, minutes: number, addHrs: number): { hours: number; minutes: number } => {
  let newHours = hours + addHrs;
  if (newHours >= 24) newHours -= 24;
  return { hours: newHours, minutes };
};

export default function IntermittentFastingCalculator() {
  const [wakeTime, setWakeTime] = useState<string>("07:00");
  const [method, setMethod] = useState<string>("16:8");
  const [errors, setErrors] = useState<{ wakeTime?: boolean }>({});
  const [result, setResult] = useState<{
    fastingStart: string;
    fastingEnd: string;
    eatingStart: string;
    eatingEnd: string;
    fastingHours: number;
    eatingHours: number;
    timeline: Array<{ time: string; event: string; icon: string }>;
  } | null>(null);

  const [fastingTracker, setFastingTracker] = useState<{
    isActive: boolean;
    startTime: Date | null;
    currentPhase: "fasting" | "eating" | null;
    elapsedHours: number;
    remainingHours: number;
  }>({
    isActive: false,
    startTime: null,
    currentPhase: null,
    elapsedHours: 0,
    remainingHours: 0,
  });

  const calculateFastingWindow = () => {
    const time = parseTime(wakeTime);
    
    const newErrors: { wakeTime?: boolean } = {};
    if (!time) newErrors.wakeTime = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const selectedMethod = fastingMethods.find(m => m.value === method)!;
    const { fastingHours, eatingHours } = selectedMethod;

    // For 16:8: Eating window typically starts 5 hours after waking
    // Eating window for 16:8 starts around noon if you wake at 7 AM
    const hoursAfterWake = method === "14:10" ? 3 : method === "16:8" ? 5 : method === "18:6" ? 7 : 9;
    
    const eatingStart = addHours(time!.hours, time!.minutes, hoursAfterWake);
    const eatingEnd = addHours(eatingStart.hours, eatingStart.minutes, eatingHours);
    const fastingStart = eatingEnd;
    const fastingEnd = eatingStart;

    // Build timeline
    const timeline = [
      { time: formatTime(time!.hours, time!.minutes), event: "Wake Up", icon: "🌅" },
      { time: formatTime(eatingStart.hours, eatingStart.minutes), event: "Eating Window Opens", icon: "🍽️" },
      { time: formatTime(addHours(eatingStart.hours, eatingStart.minutes, Math.floor(eatingHours / 2)).hours, 0), event: "Midpoint - Have a Balanced Meal", icon: "🥗" },
      { time: formatTime(eatingEnd.hours, eatingEnd.minutes), event: "Eating Window Closes", icon: "⏰" },
      { time: formatTime(eatingEnd.hours, eatingEnd.minutes), event: "Fasting Begins", icon: "🚫" },
    ];

    setResult({
      fastingStart: formatTime(fastingStart.hours, fastingStart.minutes),
      fastingEnd: formatTime(fastingEnd.hours, fastingEnd.minutes),
      eatingStart: formatTime(eatingStart.hours, eatingStart.minutes),
      eatingEnd: formatTime(eatingEnd.hours, eatingEnd.minutes),
      fastingHours,
      eatingHours,
      timeline,
    });
  };

  const startFasting = () => {
    if (!result) return;
    setFastingTracker({
      isActive: true,
      startTime: new Date(),
      currentPhase: "fasting",
      elapsedHours: 0,
      remainingHours: result.fastingHours,
    });
  };

  const stopFasting = () => {
    setFastingTracker({
      isActive: false,
      startTime: null,
      currentPhase: null,
      elapsedHours: 0,
      remainingHours: 0,
    });
  };

  return (
    <CalculatorLayout>
      {/* Hero Section */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium">Free Intermittent Fasting Calculator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Intermittent Fasting
              <span className="block text-purple-400 mt-2">Window Generator</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-8">
              Generate your personalized fasting and eating windows based on your wake time. Choose from popular fasting methods like 16:8, 18:6, or 20:4.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">Generate Your Fasting Schedule</h2>

            {/* Wake Time Input */}
            <div className="mb-6">
              <label className="block text-slate-400 mb-2 font-medium">What time do you wake up?</label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => { setWakeTime(e.target.value); setErrors(prev => ({...prev, wakeTime: false})); }}
                className={`w-full bg-slate-800 border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-colors text-lg ${errors.wakeTime ? 'border-red-500' : 'border-white/10'}`}
              />
              {errors.wakeTime && <span className="text-red-500 text-sm mt-1 block">Please enter a valid wake time</span>}
              {!errors.wakeTime && <span className="text-slate-500 text-sm mt-1 block">24-hour format (e.g., 07:00)</span>}
            </div>

            {/* Fasting Method */}
            <div className="mb-8">
              <label className="block text-slate-400 mb-3 font-medium">Fasting Method</label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {fastingMethods.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMethod(m.value)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      method === m.value
                        ? "bg-purple-500/20 border-2 border-purple-500"
                        : "bg-slate-800 border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`block text-2xl font-bold ${method === m.value ? "text-purple-400" : "text-white"}`}>
                      {m.label}
                    </span>
                    <span className="text-slate-500 text-sm">{m.fastingHours}h fast, {m.eatingHours}h eat</span>
                    <span className="text-slate-600 text-xs block mt-1">{m.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateFastingWindow}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
            >
              Generate My Fasting Schedule
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8">
                {/* Visual Timeline */}
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Your Fasting Schedule</h3>
                  
                  {/* Visual Bar */}
                  <div className="relative h-16 bg-slate-800 rounded-xl overflow-hidden mb-6">
                    <div 
                      className="absolute h-full bg-emerald-500/30 border-r-2 border-emerald-500"
                      style={{ 
                        left: '0%', 
                        width: `${(result.eatingHours / 24) * 100}%`,
                        marginLeft: `${(parseTime(wakeTime)!.hours + (method === "14:10" ? 3 : method === "16:8" ? 5 : method === "18:6" ? 7 : 9)) / 24 * 100}%`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-semibold text-sm">
                        Eating ({result.eatingHours}h)
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-between px-4 text-xs text-slate-500">
                      <span>12 AM</span>
                      <span>6 AM</span>
                      <span>12 PM</span>
                      <span>6 PM</span>
                      <span>12 AM</span>
                    </div>
                  </div>

                  {/* Key Times */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                      <p className="text-emerald-400 font-semibold text-lg">🍽️ Eating Window</p>
                      <p className="text-3xl font-bold text-white">{result.eatingStart} - {result.eatingEnd}</p>
                      <p className="text-slate-400 text-sm">{result.eatingHours} hours to eat</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                      <p className="text-red-400 font-semibold text-lg">🚫 Fasting Window</p>
                      <p className="text-3xl font-bold text-white">{result.fastingStart} - {result.fastingEnd}</p>
                      <p className="text-slate-400 text-sm">{result.fastingHours} hours fasting</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">📅 Daily Timeline</h4>
                    {result.timeline.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <span className="text-white font-medium">{item.event}</span>
                        </div>
                        <span className="text-purple-400 font-mono font-bold">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fasting Tracker */}
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 mb-6">
                  <h4 className="text-white font-semibold mb-4">⏱️ Fasting Tracker</h4>
                  
                  {!fastingTracker.isActive ? (
                    <div className="text-center">
                      <p className="text-slate-400 mb-4">Ready to start your fast?</p>
                      <button
                        onClick={startFasting}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                      >
                        Start Fasting Now
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-purple-500 flex items-center justify-center bg-purple-500/10">
                        <div>
                          <p className="text-4xl font-bold text-purple-400">{fastingTracker.elapsedHours}</p>
                          <p className="text-slate-400 text-sm">hours</p>
                        </div>
                      </div>
                      <p className="text-slate-300 mb-2">
                        Currently <span className="text-purple-400 font-bold">Fasting</span>
                      </p>
                      <p className="text-slate-500 text-sm mb-4">
                        {result.fastingHours - fastingTracker.elapsedHours} hours remaining
                      </p>
                      <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                        <div 
                          className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(fastingTracker.elapsedHours / result.fastingHours) * 100}%` }}
                        ></div>
                      </div>
                      <button
                        onClick={stopFasting}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-xl font-semibold transition-all"
                      >
                        End Fast
                      </button>
                    </div>
                  )}
                </div>

                {/* Tips */}
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">💡 Tips for Success</h4>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li>• Drink plenty of water, black coffee, or unsweetened tea during fasting</li>
                    <li>• Start with a gentle method (14:10 or 16:8) if you&apos;re new to fasting</li>
                    <li>• Break your fast with nutrient-dense foods, not junk food</li>
                    <li>• Stay consistent with your schedule for best results</li>
                  </ul>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 mb-4">Track your fasting and meals with Snapie AI</p>
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
            <h2 className="text-3xl font-bold text-white mb-6">What is Intermittent Fasting?</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Intermittent fasting (IF) is not a diet but an <strong className="text-white">eating pattern</strong> that cycles between periods of fasting and eating. It doesn&apos;t specify which foods to eat but rather <em>when</em> you should eat them. The most popular methods involve 16-hour fasts or fasting for 24 hours, twice per week.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4">Popular Fasting Methods</h3>
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-300 font-medium">⭐ 16:8 Method (Leangains)</p>
                  <p className="text-slate-500 text-sm">Fast for 16 hours, eat within 8 hours. Most popular and sustainable for beginners.</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">🌙 18:6 Method</p>
                  <p className="text-slate-500 text-sm">Fast for 18 hours, eat within 6 hours. Intermediate level with enhanced benefits.</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">⚔️ 20:4 Warrior Diet</p>
                  <p className="text-slate-500 text-sm">Fast for 20 hours, eat within 4 hours. Advanced method, one main meal focus.</p>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">🔄 5:2 Diet</p>
                  <p className="text-slate-500 text-sm">Eat normally 5 days, restrict calories (500-600) on 2 non-consecutive days.</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Benefits of Intermittent Fasting</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong className="text-white">Weight Loss:</strong> Reduces calorie intake and boosts metabolism through hormonal changes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong className="text-white">Insulin Sensitivity:</strong> Lowers insulin levels, making stored body fat more accessible.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong className="text-white">Cellular Repair:</strong> Triggers autophagy, where cells remove dysfunctional components.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong className="text-white">Brain Health:</strong> May increase brain hormone BDNF and aid new nerve cell growth.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">•</span>
                <span><strong className="text-white">Simplicity:</strong> Fewer meals to plan, prepare, and clean up after.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-white mb-4">What Can You Have During Fasting?</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <h4 className="text-emerald-400 font-semibold mb-2">✅ Allowed (Zero/Minimal Calories)</h4>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Water (plain or sparkling)</li>
                  <li>• Black coffee (no sugar/cream)</li>
                  <li>• Unsweetened tea</li>
                  <li>• Apple cider vinegar (diluted)</li>
                  <li>• Sugar-free gum (limited)</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <h4 className="text-red-400 font-semibold mb-2">❌ Avoid (Breaks the Fast)</h4>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Any food or snacks</li>
                  <li>• Sugary drinks or juice</li>
                  <li>• Coffee with milk/cream</li>
                  <li>• Diet sodas (may spike insulin)</li>
                  <li>• Supplements with calories</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Who Should Avoid Intermittent Fasting?</h3>
            <ul className="space-y-3 text-slate-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">⚠️</span>
                <span>Pregnant or breastfeeding women</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">⚠️</span>
                <span>People with diabetes (consult doctor first)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">⚠️</span>
                <span>Those with a history of eating disorders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">⚠️</span>
                <span>Children and teenagers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">⚠️</span>
                <span>Underweight individuals (BMI &lt; 18.5)</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <RelatedCalculators currentCalculator="intermittent-fasting-calculator" />
    </CalculatorLayout>
  );
}
