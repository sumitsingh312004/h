import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Disc,
  Sparkles,
  Truck,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Tag,
} from 'lucide-react';

export const MainServicesSection: React.FC = () => {
  const { openModal } = useApp();

  return (
    <section id="services" className="py-20 px-4 sm:px-6 bg-[#121212] text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#76bc21]">
            Comprehensive Automotive Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Premium Car Care on Your Terms
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-400 text-sm sm:text-base">
            Every service is backed by verified certifications, transparent pricing, and instant synchronization into your CarDaddy Digital Bill Book.
          </p>
        </div>

        {/* 3 Main Services Cards + 1 Roadside card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: Find Repair Shop */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-7 flex flex-col justify-between hover:border-[#198cd6]/60 transition shadow-xl group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#198cd6]/15 text-[#198cd6] flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition">
                  Find Repair Shop
                </h3>
                <p className="text-xs text-[#76bc21] font-semibold mt-0.5">
                  Certified & Highly-Rated Auto Facilities
                </p>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Locate certified and highly-rated auto repair facilities in your vicinity for reliable, top-tier automotive maintenance.
              </p>

              {/* Feature Checklist */}
              <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Nearby shops with live GPS radius search</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Verified Red Seal technician ratings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Opening hours, direct phone & directions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Transparent digital invoicing & warranty</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                id="explore-repair-shops-btn"
                onClick={() => openModal('repair-shop-finder')}
                className="w-full py-3 px-4 rounded-xl bg-[#198cd6] hover:bg-[#1479bb] text-white font-bold text-sm flex items-center justify-center gap-2 transition"
              >
                <span>Find Nearby Shops</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Service 2: Find Tires and Deals */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-7 flex flex-col justify-between hover:border-[#76bc21]/60 transition shadow-xl group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#76bc21]/15 text-[#76bc21] flex items-center justify-center">
                <Disc className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
                  Find Tires and Deals
                </h3>
                <p className="text-xs text-[#76bc21] font-semibold mt-0.5">
                  Exclusive Promotional Savings
                </p>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Discover premium tire options and exclusive promotional deals to ensure optimal road safety and performance.
              </p>

              {/* Feature Checklist */}
              <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Michelin, Bridgestone, Goodyear & Pirelli</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Size & vehicle compatibility matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Live price comparison & seasonal rebates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Local pickup or Canada-wide direct delivery</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                id="explore-tire-deals-btn"
                onClick={() => openModal('tire-deals-modal')}
                className="w-full py-3 px-4 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-sm flex items-center justify-center gap-2 transition"
              >
                <span>Browse Tire Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Service 3: Car Detailing Presto */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-7 flex flex-col justify-between hover:border-purple-500/60 transition shadow-xl group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                  Car Detailing Presto
                </h3>
                <p className="text-xs text-purple-400 font-semibold mt-0.5">
                  Doorstep & In-Shop Aesthetics
                </p>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Easily schedule professional car detailing services to maintain your vehicle's aesthetic appeal and pristine condition.
              </p>

              {/* Feature Checklist */}
              <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Exterior foam hand wash & ceramic spray</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Interior steam sanitation & leather care</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Flexible Doorstep Service at your home or office</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#76bc21]" />
                  <span>Instant slot booking & upfront pricing</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                id="book-detailing-btn"
                onClick={() => openModal('detailing-booking-modal')}
                className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition"
              >
                <span>Schedule Detailing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4th Emergency Towing Quick Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/80 via-neutral-900 to-neutral-900 border border-red-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-lg">24/7 Canadian Emergency Towing & Roadside</span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase">
                  Rapid Dispatch
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Stuck on the highway or in your driveway? Flat tire, dead battery, or mechanical breakdown—help arrives fast.
              </p>
            </div>
          </div>
          <button
            onClick={() => openModal('emergency-tow')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shrink-0 flex items-center justify-center gap-2 shadow-lg transition"
          >
            <span>Request Immediate Tow</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
