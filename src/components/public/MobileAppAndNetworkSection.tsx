import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  Coins,
  Package,
  Share2,
  Globe2,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Tag,
  Car,
  Download,
} from 'lucide-react';

export const MobileAppAndNetworkSection: React.FC = () => {
  const { openModal, setView } = useApp();

  return (
    <section id="mobile-app" className="py-20 px-4 sm:px-6 bg-[#161616] text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section 11: CarDaddy Mobile App */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#1b271d] border border-neutral-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76bc21]/15 text-[#76bc21] text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>CarDaddy Mobile App</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  From Trash to Cash: Sell Across Canada!
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-[#76bc21]">
                  Turn your sitting inventory into active revenue.
                </p>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Allow your automotive shop or garage to catalog and list surplus stock directly from your smartphone. Reach thousands of Canadian car owners and fellow repair shops seeking verified components.
              </p>

              {/* What shops can list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-neutral-200">
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#76bc21] shrink-0" />
                  <span>Old & Refurbished Parts</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#76bc21] shrink-0" />
                  <span>Brand New OEM Stock</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#76bc21] shrink-0" />
                  <span>Automotive Accessories</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#76bc21] shrink-0" />
                  <span>Overstocked Tires</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#76bc21] shrink-0" />
                  <span>Shop Fluids & Tools</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#76bc21] shrink-0" />
                  <span>Specialty Fleet Equipment</span>
                </div>
              </div>

              {/* National Deals statement */}
              <div className="p-4 rounded-xl bg-neutral-800/90 border border-neutral-700 space-y-2">
                <div className="text-xs uppercase tracking-wider font-bold text-sky-400">
                  National Deals Network
                </div>
                <p className="text-sm text-neutral-200">
                  "We leverage your shop's presence to cover the market from local to national in seconds—with no extra charges."
                </p>
                <p className="text-sm font-bold text-white italic">
                  "Don't let parts collect dust. Let them collect profit."
                </p>
              </div>

              {/* Action Buttons & URL badge */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="list-your-stock-btn"
                  onClick={() => openModal('join-network')}
                  className="px-6 py-3 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>List Your Stock</span>
                </button>

                <button
                  id="join-network-btn"
                  onClick={() => openModal('join-network')}
                  className="px-6 py-3 rounded-xl bg-[#198cd6] hover:bg-[#1479bb] text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <Globe2 className="w-4 h-4" />
                  <span>Join the National Network</span>
                </button>

                <div className="px-3.5 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-xs font-mono text-[#76bc21] font-bold">
                  cardaddy.ca
                </div>
              </div>
            </div>

            {/* Right Phone Mockup Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-72 sm:w-80 rounded-[36px] bg-[#0c0c0c] border-4 border-neutral-700 shadow-2xl p-4 space-y-4">
                {/* Phone Speaker & Camera notch */}
                <div className="w-24 h-4 bg-neutral-800 rounded-full mx-auto" />

                {/* App Screen Content */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-white">CarDaddy Mobile</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#76bc21]/20 text-[#76bc21] font-bold">
                      LIVE
                    </span>
                  </div>

                  {/* Mock quick card */}
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                    <div className="text-[10px] text-neutral-400">Next Service In</div>
                    <div className="text-sm font-bold text-[#76bc21]">4,350 km (Oct 2)</div>
                    <div className="text-[10px] text-neutral-400">2024 Ford F-150 SuperCrew</div>
                  </div>

                  {/* Mock parts listed */}
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>National Parts Marketplace</span>
                      <span className="text-[10px] text-sky-400 font-normal">Canada-wide</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between p-1.5 rounded bg-neutral-800/80">
                        <span>Michelin CrossClimate 2 (Set of 4)</span>
                        <strong className="text-emerald-400">$968 CAD</strong>
                      </div>
                      <div className="flex justify-between p-1.5 rounded bg-neutral-800/80">
                        <span>F-150 Brake Caliper Kit</span>
                        <strong className="text-emerald-400">$185 CAD</strong>
                      </div>
                    </div>
                  </div>

                  {/* Instant dispatch button */}
                  <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/40 text-center">
                    <div className="text-[11px] font-bold text-red-400">1-Tap Emergency Towing</div>
                    <div className="text-[9px] text-neutral-400">GPS location dispatched immediately</div>
                  </div>
                </div>

                {/* Home indicator bar */}
                <div className="w-28 h-1 bg-neutral-700 rounded-full mx-auto mt-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 12: Join the National Network */}
        <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-sky-400">
              For Automotive Businesses & Independent Garages
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Join the National Network
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Automotive businesses can reach customers across local and national markets with seamless shop profiles, certified service listing, and direct customer discovery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
            {[
              'Shop Profile',
              'Inventory Listing',
              'Parts Listing',
              'Deals & Promos',
              'Customer Discovery',
              'National Visibility',
              'Digital Invoicing',
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-neutral-800/70 border border-neutral-700/60 text-center text-xs font-bold text-neutral-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
