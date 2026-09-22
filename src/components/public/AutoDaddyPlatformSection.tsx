import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Compass,
  Zap,
  Car,
  FileText,
  Bell,
  Wrench,
  Truck,
  Disc,
} from 'lucide-react';

export const AutoDaddyPlatformSection: React.FC = () => {
  return (
    <section id="platform" className="py-20 px-4 sm:px-6 bg-[#161616] text-white border-t border-neutral-800">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section 3: AutoDaddy Software Platform */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            Automotive Operating System
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            AutoDaddy Software Platform
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-xl sm:text-2xl font-bold text-neutral-100">
              No more confusion. No more lost service records. Just drive with confidence.
            </p>
            <p className="text-lg font-medium text-[#76bc21]">
              CarDADDY – the system that simplifies car care
            </p>
          </div>
        </div>

        {/* Vision & Tagline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-neutral-700 transition">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wider uppercase">
                <Clock className="w-4 h-4" />
                <span>Our Vision</span>
              </div>
              <p className="text-xl sm:text-2xl text-neutral-200 font-medium italic leading-relaxed">
                "Everyone has 24 hours in a day, but very few have the passion to set it right."
              </p>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              Designed for Canadian car owners, fleet operators & repair partners.
            </div>
          </div>

          {/* Tagline & Mission */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#198cd6]/20 via-neutral-900 to-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-6 hover:border-[#198cd6]/40 transition">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#76bc21] font-semibold text-xs tracking-wider uppercase">
                <Zap className="w-4 h-4" />
                <span>Our Core Promise</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Drive Confident. We Handle the Rest
              </h3>
            </div>
            <p className="text-sm text-neutral-300">
              Automated service intervals, cloud-secured invoices, certified warranty tracking, and roadside emergency dispatch—synchronized across all your devices.
            </p>
          </div>
        </div>

        {/* Section 4: Autodaddy - A Name of Promise */}
        <div className="pt-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/90 border border-neutral-800 relative">
            <div className="max-w-3xl space-y-4 mb-8">
              <span className="text-xs uppercase tracking-widest font-bold text-[#76bc21]">
                Unifying The Entire Lifecycle
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                Autodaddy - A name of Promise
              </h3>
              <p className="text-lg sm:text-xl font-semibold text-sky-400">
                Less Stress - more freedom
              </p>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                CarDaddy brings vehicle information, service records, reminders, shops and automotive services into one seamless platform. You never have to rifle through glovebox paper receipts, miss warranty milestones, or wonder where to find an honest mechanic again.
              </p>
            </div>

            {/* Visual ecosystem nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white">Vehicle Profiles</div>
                <div className="text-[11px] text-neutral-400">VIN, specs & telemetry</div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white">Service Records</div>
                <div className="text-[11px] text-neutral-400">Digital bill book logs</div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white">Smart Reminders</div>
                <div className="text-[11px] text-neutral-400">Mileage & date alerts</div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white">Verified Shops</div>
                <div className="text-[11px] text-neutral-400">Certified local mechanics</div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-center space-y-2 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 mx-auto rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-white">Towing & Detailing</div>
                <div className="text-[11px] text-neutral-400">Doorstep & emergency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
