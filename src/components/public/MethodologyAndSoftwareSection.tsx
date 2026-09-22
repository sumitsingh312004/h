import React from 'react';
import {
  ClipboardCheck,
  FileCheck2,
  Gauge,
  Building2,
  Receipt,
  History,
  Award,
  Cloud,
  Cpu,
  Database,
  BellRing,
  LineChart,
  ShieldCheck,
  Lock,
  Server,
  KeyRound,
  FileLock,
  Clock,
} from 'lucide-react';

export const MethodologyAndSoftwareSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#121212] text-white border-t border-neutral-800 space-y-24">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section 8: Proven Methodology */}
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-widest font-bold text-[#76bc21]">
              Systematic Workflow
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Proven Methodology
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              We've replaced "unplanned" chaos with a systematic approach. Our workflow is designed by automotive experts to ensure every service is recorded, verified, and valuable for your vehicle's resale.
            </p>
          </div>

          {/* 7 Workflow Steps from user prompt */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              {
                icon: <ClipboardCheck className="w-5 h-5 text-sky-400" />,
                title: 'Service Recorded',
                sub: 'Instant cloud entry',
              },
              {
                icon: <FileCheck2 className="w-5 h-5 text-emerald-400" />,
                title: 'Service Verified',
                sub: 'Certified shop stamp',
              },
              {
                icon: <Gauge className="w-5 h-5 text-amber-400" />,
                title: 'Mileage Tracked',
                sub: 'Tamper-free odometer',
              },
              {
                icon: <Building2 className="w-5 h-5 text-purple-400" />,
                title: 'Workshop Log',
                sub: 'Red Seal technician',
              },
              {
                icon: <Receipt className="w-5 h-5 text-pink-400" />,
                title: 'Digital Invoice',
                sub: 'Itemized parts & labor',
              },
              {
                icon: <History className="w-5 h-5 text-indigo-400" />,
                title: 'History Dossier',
                sub: 'Complete timeline',
              },
              {
                icon: <Award className="w-5 h-5 text-[#76bc21]" />,
                title: 'Resale-Ready',
                sub: 'Max buyer appraisal',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center space-y-2 hover:border-neutral-700 transition"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-neutral-800 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="font-bold text-xs sm:text-sm text-white">{step.title}</div>
                <div className="text-[11px] text-neutral-400">{step.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 9: Advanced Software */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-sky-400">
              Autonomous Intelligence
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              Advanced Software
            </h3>
            <p className="text-base text-neutral-300 leading-relaxed">
              Experience a system that "helps itself". Our cloud-based software uses intelligent data tracking to manage your vehicle or shop with zero complexity and maximum speed.
            </p>
            <p className="text-sm text-neutral-400">
              Whether you are tracking a single daily commuter, a family fleet of three SUVs, or a 50-van delivery operation, CarDaddy handles the calculations, reminders, and invoicing behind the scenes.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: <Cloud className="w-5 h-5 text-sky-400" />, title: 'Cloud-Based', desc: 'Sync across all screens' },
              { icon: <Cpu className="w-5 h-5 text-[#76bc21]" />, title: 'Smart Telematics', desc: 'Instant diagnostic lookup' },
              { icon: <Database className="w-5 h-5 text-purple-400" />, title: 'Vehicle Database', desc: 'Complete OEM specs' },
              { icon: <BellRing className="w-5 h-5 text-amber-400" />, title: 'Service Reminders', desc: 'Proactive scheduling' },
              { icon: <LineChart className="w-5 h-5 text-emerald-400" />, title: 'Automated Tracking', desc: 'Mileage curves' },
              { icon: <Award className="w-5 h-5 text-pink-400" />, title: 'Fleet Analytics', desc: 'Operating cost per km' },
            ].map((feature, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-neutral-800/70 border border-neutral-700/50 space-y-1">
                <div className="mb-2">{feature.icon}</div>
                <div className="font-bold text-xs text-white">{feature.title}</div>
                <div className="text-[10px] text-neutral-400">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 10: Secure & Reliable */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#141414] border border-neutral-800 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#76bc21]">
              <ShieldCheck className="w-4 h-4" />
              <span>Data Protection</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Secure & Reliable
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Your data is an asset. We use bank-level security and local Canadian hosting to ensure your records are private, protected, and accessible 24/7 - whenever and wherever you need them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/50 space-y-1.5">
              <Lock className="w-5 h-5 text-emerald-400" />
              <div className="font-bold text-sm text-white">Secure Account</div>
              <div className="text-xs text-neutral-400">Encrypted authentication & 2FA support</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/50 space-y-1.5">
              <Server className="w-5 h-5 text-sky-400" />
              <div className="font-bold text-sm text-white">Canadian Hosting</div>
              <div className="text-xs text-neutral-400">Data residency kept within Canadian soil</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/50 space-y-1.5">
              <KeyRound className="w-5 h-5 text-amber-400" />
              <div className="font-bold text-sm text-white">Private History</div>
              <div className="text-xs text-neutral-400">Strict owner permission-controlled visibility</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/50 space-y-1.5">
              <FileLock className="w-5 h-5 text-purple-400" />
              <div className="font-bold text-sm text-white">Secure Documents</div>
              <div className="text-xs text-neutral-400">Invoices, work orders & PDF export backups</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/50 space-y-1.5 col-span-1 sm:col-span-2 lg:col-span-1">
              <Clock className="w-5 h-5 text-[#76bc21]" />
              <div className="font-bold text-sm text-white">24/7 Access</div>
              <div className="text-xs text-neutral-400">Always available on mobile, tablet & desktop</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
