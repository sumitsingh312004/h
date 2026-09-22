import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CarDaddyLogo } from '../common/CarDaddyLogo';
import {
  Sparkles,
  Search,
  Wrench,
  Disc,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Zap,
} from 'lucide-react';

export const PublicHero: React.FC = () => {
  const { openModal, setView, vehicles } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const samplePrompts = [
    'Oil change service due on...',
    'Find best tire deals',
    'Tow service near me',
    'Car detailing near me',
    'When is my next service?',
    'Show my vehicle service history',
  ];

  const handleAskAi = (queryToUse?: string) => {
    const q = queryToUse || searchQuery;
    openModal('ai-assistant', { initialQuery: q || 'When is my next service due?' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAskAi();
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#121212] via-[#161616] to-[#121212] text-white pt-10 pb-20 px-4 sm:px-6">
      {/* Subtle tech background grid pattern & ambient glowing gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#198cd6]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-[#76bc21]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Brand identity badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 shadow-sm text-xs text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-[#76bc21]" />
          <span className="font-semibold text-white">CarDaddy</span>
          <span className="text-neutral-500">•</span>
          <span>Canadian Automotive Management & Telematics Network</span>
        </div>

        {/* Main Headline & Subheadline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Smart System to track
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#76bc21]">
            Smart reminders for your next due service
          </p>
        </div>

        {/* Additional Supporting Message */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
          Find nearby and trusted repair shop options, find deals on new tyres for my car or manage multiple vehicles effortlessly and access all information about your vehicle through verified digital service records.
        </p>

        {/* Interactive Service Question / Search Box */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative flex flex-col sm:flex-row items-stretch rounded-2xl bg-neutral-900/90 border-2 border-neutral-700/80 shadow-2xl p-2 transition focus-within:border-[#76bc21] focus-within:ring-2 focus-within:ring-[#76bc21]/20">
            <div className="flex items-center flex-1 px-3 py-2">
              <Sparkles className="w-5 h-5 text-[#76bc21] shrink-0 mr-3 animate-pulse" />
              <input
                id="hero-ai-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Lookup service - Oil change Service due on... find best Tire deals... Tow service or Car detailing etc."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>
            <button
              id="hero-ask-ai-btn"
              onClick={() => handleAskAi()}
              className="mt-2 sm:mt-0 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-sm shadow-md transition transform active:scale-95 whitespace-nowrap"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Search Records & Due Dates</span>
            </button>
          </div>

          {/* Clickable Example Inquiries */}
          <div className="pt-3 text-left">
            <div className="text-xs text-neutral-400 font-medium mb-1.5 text-center sm:text-left">
              Quick lookups:
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(prompt);
                    handleAskAi(prompt);
                  }}
                  className="px-2.5 py-1 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60 text-xs transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            id="hero-find-services-btn"
            onClick={() => {
              const el = document.getElementById('services');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#198cd6] hover:bg-[#1479bb] text-white font-bold text-sm sm:text-base shadow-lg transition"
          >
            <Wrench className="w-4 h-4" />
            <span>Find Services</span>
          </button>

          <button
            id="hero-manage-vehicle-btn"
            onClick={() => {
              const el = document.getElementById('platform');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm sm:text-base border border-neutral-700 shadow-lg transition"
          >
            <ShieldCheck className="w-4 h-4 text-[#76bc21]" />
            <span>Explore Vehicle Services</span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* Live Quick Stats Strip */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-2xl font-black text-white">4,850+</div>
            <div className="text-xs text-neutral-400 font-medium">Vehicles Monitored</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-2xl font-black text-[#76bc21]">99.4%</div>
            <div className="text-xs text-neutral-400 font-medium">On-Time Reminders</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-2xl font-black text-sky-400">1,200+</div>
            <div className="text-xs text-neutral-400 font-medium">Certified Repair Shops</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-2xl font-black text-amber-400">24/7</div>
            <div className="text-xs text-neutral-400 font-medium">Tow & Roadside Network</div>
          </div>
        </div>
      </div>
    </section>
  );
};
