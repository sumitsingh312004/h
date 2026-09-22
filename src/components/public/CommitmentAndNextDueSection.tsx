import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Calendar,
  AlertCircle,
  Bell,
  CheckCircle2,
  Clock,
  Car,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const CommitmentAndNextDueSection: React.FC = () => {
  const { openModal, vehicles, setView } = useApp();
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);

  const activeVehicle = vehicles[selectedVehicleIndex] || vehicles[0];

  return (
    <section id="next-service" className="py-20 px-4 sm:px-6 bg-[#161616] text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section 6: A commitment that matters... */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 via-[#181818] to-neutral-900 border border-neutral-800 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[#76bc21]">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              A commitment that matters...
            </h2>
            <p className="text-xl sm:text-2xl font-semibold text-neutral-300 italic">
              "Just take a bold step... you would never regret it ..."
            </p>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed pt-2">
              We eliminate guesswork with mathematical service interval calculations, cryptographic record integrity, and verified Red Seal shop data so you maintain complete control of your vehicle's health and investment value.
            </p>
          </div>

          {/* 6 Trust Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
            {[
              { title: 'Accuracy', desc: 'Precision interval tracking' },
              { title: 'Transparency', desc: 'Zero hidden repair markups' },
              { title: 'Advanced Tech', desc: 'A.I. health diagnostics' },
              { title: 'Vehicle Data', desc: 'Complete OEM specs' },
              { title: 'Service Records', desc: 'Standardized digital receipts' },
              { title: 'Reliable Info', desc: 'Verified shop network' },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60 text-center space-y-1.5"
              >
                <div className="w-8 h-8 mx-auto rounded-full bg-[#76bc21]/15 text-[#76bc21] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <div className="font-bold text-sm text-white">{pillar.title}</div>
                <div className="text-[11px] text-neutral-400">{pillar.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Access of next due service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#198cd6]/15 text-[#198cd6] text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Interval Intelligence</span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Access of next due service
            </h3>
            <p className="text-base text-neutral-300 leading-relaxed">
              Never guess again. Our system proactively monitors your vehicle's health and service intervals, sending you precise alerts before a minor issue becomes a major expense.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#76bc21]/20 text-[#76bc21] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dynamic Mileage Predictions</h4>
                  <p className="text-xs text-neutral-400">
                    Algorithms calculate average daily driving distance to alert you before milestone breaches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#198cd6]/20 text-[#198cd6] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Multi-Channel Service Alerts</h4>
                  <p className="text-xs text-neutral-400">
                    Timely SMS, push notification, and digital diary reminders with one-tap shop booking.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                id="view-next-service-btn"
                onClick={() => openModal('ai-assistant', { initialQuery: 'When is my next oil change service due?' })}
                className="px-6 py-3 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>Check Service Timeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => openModal('ai-assistant', { initialQuery: 'When is my next oil change service due?' })}
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 text-sm font-medium transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#76bc21]" />
                <span>Service Schedule</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Service Timeline Display */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Vehicle Selector Pills */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                  <Car className="w-4 h-4 text-[#76bc21]" />
                  <span>FLEET VEHICLES:</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {vehicles.slice(0, 3).map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicleIndex(i)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition whitespace-nowrap ${
                        selectedVehicleIndex === i
                          ? 'bg-[#198cd6] text-white'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {v.year} {v.make} {v.model.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Vehicle Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-800/70 border border-neutral-700/60">
                <div>
                  <div className="text-xs text-neutral-400 font-mono">VIN: {activeVehicle.vin}</div>
                  <h4 className="text-lg font-black text-white">
                    {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
                  </h4>
                  <div className="text-xs text-[#76bc21] font-semibold mt-0.5">
                    Owner: {activeVehicle.ownerName}
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      activeVehicle.status === 'Overdue'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : activeVehicle.status === 'Service Due'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {activeVehicle.status}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    Odometer: {activeVehicle.currentMileage.toLocaleString()} km
                  </span>
                </div>
              </div>

              {/* Next Due Service Spotlight Card */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-800/80 border border-[#76bc21]/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#76bc21] animate-bounce" />
                    <span className="text-xs uppercase font-bold text-[#76bc21] tracking-wider">
                      Upcoming Required Maintenance
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    Target: {activeVehicle.nextServiceMileage.toLocaleString()} km
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xl font-extrabold text-white">
                    {activeVehicle.nextServiceType}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-neutral-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      Due Date: <strong className="text-white">{activeVehicle.nextServiceDate}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Interval: every {activeVehicle.serviceIntervalKm.toLocaleString()} km
                    </span>
                  </div>
                </div>

                {/* Progress Bar towards next service */}
                {(() => {
                  const lastMileage = activeVehicle.lastServiceMileage ?? Math.max(0, activeVehicle.currentMileage - 8000);
                  const mileageSpan = Math.max(1, activeVehicle.nextServiceMileage - lastMileage);
                  const progressRatio = Math.min(100, Math.max(15, ((activeVehicle.currentMileage - lastMileage) / mileageSpan) * 100));
                  return (
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                        <span>Last: {lastMileage.toLocaleString()} km</span>
                        <span className="text-white font-semibold">
                          {Math.max(
                            0,
                            activeVehicle.nextServiceMileage - activeVehicle.currentMileage
                          ).toLocaleString()}{' '}
                          km remaining
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-700 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 via-[#76bc21] to-amber-500 transition-all duration-500"
                          style={{ width: `${progressRatio}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Service Timeline Steps */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Service Timeline History
                </div>
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#76bc21] ring-4 ring-neutral-900" />
                    <div className="text-xs font-semibold text-white">
                      Last Recorded Service: {activeVehicle.lastServiceDate} ({(activeVehicle.lastServiceMileage ?? 0).toLocaleString()} km)
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Standard maintenance completed & logged in CarDaddy Digital Bill Book.
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-neutral-900" />
                    <div className="text-xs font-semibold text-white">
                      Next Estimated Milestone: {activeVehicle.nextServiceDate}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {activeVehicle.nextServiceType} — Automated notifications pre-scheduled.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
