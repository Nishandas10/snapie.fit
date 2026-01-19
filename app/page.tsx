"use client";

import Image from "next/image";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.Five_Point_AI_Labs.CalTrackAI";

// Colorful Google Play triangle icon
const GooglePlayIcon = () => (
  <svg viewBox="0 0 512 512" className="w-6 h-6">
    <path fill="#4285F4" d="M325.3 234.3L104.6 13l220.7 221.3z"/>
    <path fill="#34A853" d="M47 0c-13 6.8-21.7 19.2-21.7 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l258-256L47 0z"/>
    <path fill="#EA4335" d="M47 512l258-256 60.6 60.6L47 512z"/>
    <path fill="#FBBC04" d="M305 256l60.6-60.6 98.1 56.6c18 10.4 18 27.2 0 37.6l-98.1 56.6L305 256z"/>
  </svg>
);

// Full Google Play Store badge
const GooglePlayBadge = () => (
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

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const CameraIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const BeakerIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const FireIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-emerald-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-blue-500/10 rounded-full blur-[150px]"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Snapie AI Logo" width={40} height={40} className="w-10 h-10" />
              <div>
                <span className="text-xl font-bold">Snapie AI</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#compare" className="text-slate-400 hover:text-white transition-colors">Why Snapie</a>
              <a href="#health" className="text-slate-400 hover:text-white transition-colors">Health Modes</a>
            </div>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105 border border-white/20">
              <GooglePlayIcon />
              <span className="hidden sm:inline">Google Play</span>
            </a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-24 pb-20 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-sm font-medium">1st Nutrient-Based Calorie Counter</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
                AI <span className="text-emerald-400">Calorie Counter</span><br />
                <span className="text-slate-400">&amp;</span> Nutrition Tracker
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Go beyond calories and macros. Track <span className="text-white font-medium">micronutrients</span>, <span className="text-white font-medium">vitamins</span>, and get <span className="text-white font-medium">personalized health insights</span>. Just snap a photo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="group transition-all hover:scale-105">
                  <GooglePlayBadge />
                </a>
                <a href="#compare" className="bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  See How It Works
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left"><div className="text-2xl font-bold text-emerald-400">200+</div><div className="text-sm text-slate-500">Users</div></div>
                <div className="text-center lg:text-left"><div className="text-2xl font-bold text-emerald-400">1000+</div><div className="text-sm text-slate-500">Foods Scanned</div></div>
                <div className="text-center lg:text-left"><div className="text-2xl font-bold text-emerald-400">94%</div><div className="text-sm text-slate-500">Accuracy</div></div>
                <div className="text-center lg:text-left"><div className="text-2xl font-bold text-emerald-400">&lt;7s</div><div className="text-sm text-slate-500">Scan Time</div></div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative flex gap-4 items-center">
                <div className="absolute -inset-8 bg-linear-to-r from-emerald-500/20 to-blue-500/20 rounded-[60px] blur-3xl"></div>
                <div className="relative phone-mockup scale-90">
                  <div className="phone-screen">
                    <Image src="/screenshots/2.png" alt="Snapie AI Food Scanner" width={260} height={520} className="w-full h-auto" priority />
                  </div>
                </div>
                <div className="relative phone-mockup scale-90">
                  <div className="phone-screen">
                    <Image src="/screenshots/3.png" alt="Snapie AI Nutrition Details" width={260} height={520} className="w-full h-auto" priority />
                  </div>
                </div>
                <div className="absolute -left-4 sm:-left-16 top-1/4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center"><span className="text-xl">🎯</span></div>
                    <div><p className="text-white font-semibold text-sm">20+ Nutrients</p><p className="text-slate-400 text-xs">Tracked Daily</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 bg-linear-to-r from-emerald-900/50 to-blue-900/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xl sm:text-2xl text-white font-medium">🏆 The <span className="text-emerald-400 font-bold">1st Nutrient-Based Calorie Counter</span> that goes beyond calories and macros — tracks <span className="text-emerald-400">micronutrients &amp; vitamins</span> for health insights based eating</p>
        </div>
      </section>

      <section id="compare" className="py-20 lg:py-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Why Snapie AI?</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Not All Calorie Counters Are Equal</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">See how Snapie AI compares to generic calorie tracking apps</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-800/50 border-b border-white/10">
              <div className="p-4 sm:p-6 text-center font-semibold text-slate-400 text-sm sm:text-base">Feature</div>
              <div className="p-4 sm:p-6 text-center border-x border-white/10"><span className="text-slate-400 font-medium text-sm sm:text-base">Generic Calorie Counter</span></div>
              <div className="p-4 sm:p-6 text-center bg-emerald-500/10"><span className="text-emerald-400 font-bold text-sm sm:text-base">Snapie AI</span></div>
            </div>
            <div className="grid grid-cols-3 bg-slate-900/30 border-b border-white/5"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">Food Logging</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-slate-500">Manual search</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ AI Photo (&lt; 7 sec)</div></div>
            <div className="grid grid-cols-3 bg-slate-900/10 border-b border-white/5"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">Calories &amp; Macros</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-slate-400">✓ Basic tracking</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ AI estimation</div></div>
            <div className="grid grid-cols-3 bg-slate-900/30 border-b border-white/5"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">Micronutrients</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-red-400">✗ Not tracked</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ 20+ nutrients</div></div>
            <div className="grid grid-cols-3 bg-slate-900/10 border-b border-white/5"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">Vitamins</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-red-400">✗ Not tracked</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ Fully tracked</div></div>
            <div className="grid grid-cols-3 bg-slate-900/30 border-b border-white/5"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">Health Modes</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-red-400">✗ Generic only</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ Diabetes, PCOS, BP</div></div>
            <div className="grid grid-cols-3 bg-slate-900/10 border-b border-white/5"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">AI Assistant</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-red-400">✗ None</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ 24/7 Coach (Sara)</div></div>
            <div className="grid grid-cols-3 bg-slate-900/30 border-b border-white/5"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">Indian &amp; Asian Food</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-slate-500">Limited</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ Full support</div></div>
            <div className="grid grid-cols-3 bg-slate-900/10 border-b border-white/5"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">Hidden Sugar Detection</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-red-400">✗ Not available</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ Yes</div></div>
            <div className="grid grid-cols-3 bg-slate-900/30"><div className="p-4 sm:p-5 text-slate-300 font-medium text-sm sm:text-base">Privacy</div><div className="p-4 sm:p-5 text-center border-x border-white/5 text-red-400">Ads &amp; data selling</div><div className="p-4 sm:p-5 text-center bg-emerald-500/5 text-emerald-400 font-medium">✓ No ads, private</div></div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Key Features</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Everything You Need for Better Nutrition</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Powered by advanced AI to make calorie counting and nutrition tracking effortless</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400"><CameraIcon /></div><span className="text-emerald-400 font-semibold">AI Camera Calorie Counter</span></div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Snap. Scan. Track. In Under 7 Seconds.</h3>
              <p className="text-slate-400 text-lg mb-6">Our AI camera recognizes foods from Indian, Asian, Western, and global cuisines. Detect multiple items on one plate, estimate portions, and get instant calorie &amp; macro breakdown.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shrink-0"><CheckIcon /></div>Recognizes dal chawal, butter chicken, pasta &amp; more</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shrink-0"><CheckIcon /></div>Detects multiple food items in one photo</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shrink-0"><CheckIcon /></div>Intelligent portion size estimation</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shrink-0"><CheckIcon /></div>94% accuracy rate</li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative"><div className="absolute -inset-4 bg-emerald-500/20 rounded-[50px] blur-2xl"></div><div className="relative phone-mockup"><div className="phone-screen"><Image src="/screenshots/2.png" alt="Snapie AI Camera Food Scanner" width={280} height={560} className="w-full h-auto" /></div></div></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="flex justify-center">
              <div className="relative"><div className="absolute -inset-4 bg-blue-500/20 rounded-[50px] blur-2xl"></div><div className="relative phone-mockup"><div className="phone-screen"><Image src="/screenshots/3.png" alt="Snapie AI Micronutrient Tracking" width={280} height={560} className="w-full h-auto" /></div></div></div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400"><BeakerIcon /></div><span className="text-blue-400 font-semibold">Micronutrient &amp; Vitamin Tracking</span></div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Go Deeper Than Calories</h3>
              <p className="text-slate-400 text-lg mb-6">Track 20+ nutrients including Iron, Sodium, Potassium, Sugar, Cholesterol, and essential vitamins. Get complete nutrition awareness, not just calorie counting.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 shrink-0"><CheckIcon /></div>Track Iron, Sodium, Potassium &amp; Cholesterol</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 shrink-0"><CheckIcon /></div>Monitor essential vitamins &amp; minerals</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 shrink-0"><CheckIcon /></div>Identify hidden sugars in daily meals</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 shrink-0"><CheckIcon /></div>Daily &amp; weekly nutrient summaries</li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400"><ChatIcon /></div><span className="text-purple-400 font-semibold">AI Nutrition Assistant</span></div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Meet Sara — Your 24/7 Nutrition Coach</h3>
              <p className="text-slate-400 text-lg mb-6">Chat with your personal AI nutrition assistant who understands your goals and health conditions. Ask about calories, get meal suggestions, and stay aligned with your health journey.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 shrink-0"><CheckIcon /></div>Understands your goals &amp; health conditions</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 shrink-0"><CheckIcon /></div>Ask about calories &amp; nutrients anytime</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 shrink-0"><CheckIcon /></div>Get healthier meal suggestions</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 shrink-0"><CheckIcon /></div>Remembers your preferences &amp; adapts</li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative"><div className="absolute -inset-4 bg-purple-500/20 rounded-[50px] blur-2xl"></div><div className="relative phone-mockup"><div className="phone-screen"><Image src="/screenshots/4.png" alt="Sara AI Nutrition Assistant" width={280} height={560} className="w-full h-auto" /></div></div></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative"><div className="absolute -inset-4 bg-orange-500/20 rounded-[50px] blur-2xl"></div><div className="relative phone-mockup"><div className="phone-screen"><Image src="/screenshots/5.png" alt="Snapie AI Dashboard" width={280} height={560} className="w-full h-auto" /></div></div></div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400"><ChartIcon /></div><span className="text-orange-400 font-semibold">Dashboard &amp; Analytics</span></div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">See Your Nutrition Journey Clearly</h3>
              <p className="text-slate-400 text-lg mb-6">Track daily, weekly, and monthly progress with beautiful visual charts. Monitor calories vs goals, macros, micronutrients, and food quality scores.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 shrink-0"><CheckIcon /></div>Calories consumed vs goals</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 shrink-0"><CheckIcon /></div>Macros: protein, carbs, fats &amp; fiber</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 shrink-0"><CheckIcon /></div>Micronutrient &amp; vitamin charts</li>
                <li className="flex items-center gap-3 text-slate-300"><div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 shrink-0"><CheckIcon /></div>Progress graphs &amp; BMI tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="health" className="py-20 lg:py-28 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Health Modes</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">Nutrition Tracking for Your Health Goals</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Get AI-powered insights tailored to your health conditions and goals. Educational guidance only — not a medical app.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:-translate-y-1"><div className="text-4xl mb-4">🩺</div><h3 className="text-xl font-bold text-white mb-2">Diabetes</h3><p className="text-slate-400 text-sm">Track sugar, carbs &amp; glycemic impact for stable blood sugar management</p></div>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:-translate-y-1"><div className="text-4xl mb-4">❤️</div><h3 className="text-xl font-bold text-white mb-2">Heart Health</h3><p className="text-slate-400 text-sm">Monitor cholesterol, sodium &amp; saturated fats for cardiovascular wellness</p></div>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:-translate-y-1"><div className="text-4xl mb-4">💜</div><h3 className="text-xl font-bold text-white mb-2">PCOS</h3><p className="text-slate-400 text-sm">Focus on insulin load &amp; anti-inflammatory foods for hormonal balance</p></div>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:-translate-y-1"><div className="text-4xl mb-4">⚖️</div><h3 className="text-xl font-bold text-white mb-2">Weight Management</h3><p className="text-slate-400 text-sm">Personalized calorie goals for fat loss, muscle gain or maintenance</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">More Features</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">Everything Else You Need</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all group"><div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform"><UserIcon /></div><h3 className="text-xl font-bold text-white mb-2">Personalized Insights</h3><p className="text-slate-400">Based on age, weight, activity level, health conditions &amp; goals. Recommendations that evolve with you.</p></div>
            <div className="bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all group"><div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform"><FireIcon /></div><h3 className="text-xl font-bold text-white mb-2">Streaks &amp; Reminders</h3><p className="text-slate-400">Daily streaks, motivation nudges &amp; custom meal reminders. Stay consistent without stress.</p></div>
            <div className="bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all group"><div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform"><ChartIcon /></div><h3 className="text-xl font-bold text-white mb-2">Progress Tracking</h3><p className="text-slate-400">Log weight &amp; measurements, view BMI graphs, and track consistency over time.</p></div>
            <div className="bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all group"><div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform"><CloudIcon /></div><h3 className="text-xl font-bold text-white mb-2">Cloud Sync &amp; Offline</h3><p className="text-slate-400">Log meals offline, automatic secure backup. Your data is always safe.</p></div>
            <div className="bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all group"><div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform"><ShieldIcon /></div><h3 className="text-xl font-bold text-white mb-2">Privacy First</h3><p className="text-slate-400">No ads, no data selling. Your chat history stays on your device — no one else has access.</p></div>
            <div className="bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all group"><div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform"><HeartIcon /></div><h3 className="text-xl font-bold text-white mb-2">For Everyone</h3><p className="text-slate-400">Gym enthusiasts, busy professionals, wellness seekers, families &amp; anyone with dietary needs.</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">App Preview</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">Beautiful. Intuitive. Powerful.</h2>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x px-4">
            <div className="shrink-0 snap-center"><div className="phone-mockup scale-90 sm:scale-100"><div className="phone-screen"><Image src="/screenshots/6.png" alt="Snapie AI screenshot 6" width={240} height={480} className="w-full h-auto" /></div></div></div>
            <div className="shrink-0 snap-center"><div className="phone-mockup scale-90 sm:scale-100"><div className="phone-screen"><Image src="/screenshots/7.png" alt="Snapie AI screenshot 7" width={240} height={480} className="w-full h-auto" /></div></div></div>
            <div className="shrink-0 snap-center"><div className="phone-mockup scale-90 sm:scale-100"><div className="phone-screen"><Image src="/screenshots/8.png" alt="Snapie AI screenshot 8" width={240} height={480} className="w-full h-auto" /></div></div></div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-900/30 to-blue-900/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Start Your Nutrition Journey Today</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join 200+ users tracking smarter with the 1st AI calorie counter that understands micronutrients, vitamins &amp; your health goals.</p>
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-block transition-all hover:scale-105">
            <GooglePlayBadge />
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <div className="flex items-center gap-2"><CheckIcon /><span>Free to download</span></div>
            <div className="flex items-center gap-2"><CheckIcon /><span>No ads</span></div>
            <div className="flex items-center gap-2"><CheckIcon /><span>Privacy first</span></div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Snapie AI Logo" width={40} height={40} className="w-10 h-10" />
              <div><span className="text-xl font-bold">Snapie AI</span><p className="text-slate-500 text-sm">AI Calorie Counter &amp; Nutrition Tracker</p></div>
            </div>
            <div className="flex items-center gap-6 text-slate-500">
              <a href="mailto:pallabi@snapie.fit" className="hover:text-white transition-colors">Contact: pallabi@snapie.fit</a>
            </div>
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Five Point AI Labs</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 md:hidden z-50">
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3 border border-white/20">
          <GooglePlayIcon />
          Get it on Google Play
        </a>
      </div>
    </main>
  );
}