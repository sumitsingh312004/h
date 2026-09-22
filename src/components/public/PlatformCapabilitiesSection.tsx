import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Tag,
  MapPin,
  Truck,
  Sparkles,
  Disc,
  ShieldAlert,
  Receipt,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const PlatformCapabilitiesSection: React.FC = () => {
  const { openModal } = useApp();

  const capabilities = [
    {
      id: 'digital-history',
      icon: <FileText className="w-6 h-6 text-sky-400" />,
      title: 'Digital Service History',
      description:
        "Maintain a comprehensive digitized log of the vehicle's complete service history, including mileage, service date, service type, workshop notes, parts, repairs, invoices, and documents.",
      actionLabel: 'View Verified History',
      onClick: () => openModal('digital-history-preview'),
    },
    {
      id: 'exclusive-deals',
      icon: <Tag className="w-6 h-6 text-[#76bc21]" />,
      title: 'Exclusive Local Deals',
      description:
        'Unlock exclusive verified promotions and seasonal discounts from trusted automotive service partners across Canadian cities.',
      actionLabel: 'Explore Verified Deals',
      onClick: () => openModal('tire-deals-modal'),
    },
    {
      id: 'precision-mapping',
      icon: <MapPin className="w-6 h-6 text-amber-400" />,
      title: 'Precision Shop Mapping',
      description:
        'Navigate to highly-rated authorized repair centers using integrated real-time geolocation mapping with live distance and ratings.',
      actionLabel: 'Map Nearby Centers',
      onClick: () => openModal('repair-shop-finder'),
    },
    {
      id: 'tow-services',
      icon: <Truck className="w-6 h-6 text-red-400" />,
      title: 'Access Tow Services',
      description:
        'Instantly access emergency roadside assistance and heavy-duty towing services with GPS location pin drop and rapid dispatch.',
      actionLabel: 'Emergency Dispatch',
      onClick: () => openModal('emergency-tow'),
    },
    {
      id: 'washing-detailing',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: 'Washing and Detailing',
      description:
        'Book premium car washing and comprehensive detailing packages with flexible doorstep service options at your residence or workplace.',
      actionLabel: 'Book Detailing Slot',
      onClick: () => openModal('detailing-booking-modal'),
    },
    {
      id: 'tire-deals',
      icon: <Disc className="w-6 h-6 text-emerald-400" />,
      title: 'Tire Deals',
      description:
        'Compare tire brands, pricing, load ratings, seasonal snow certifications and limited-time wholesale offers with vehicle fitment checks.',
      actionLabel: 'Compare Tire Sizes',
      onClick: () => openModal('tire-deals-modal'),
    },
    {
      id: 'autobody-network',
      icon: <ShieldAlert className="w-6 h-6 text-pink-400" />,
      title: 'AutoBody Network',
      description:
        'Locate specialized autobody experts for dent removal, precision laser paint matching, collision restoration, and structural aluminum repair.',
      actionLabel: 'Find AutoBody Specialists',
      onClick: () => openModal('autobody-modal'),
    },
    {
      id: 'digital-invoicing',
      icon: <Receipt className="w-6 h-6 text-indigo-400" />,
      title: 'Digital Invoicing',
      description:
        'Generate transparent detailed invoices and securely download standardized payment-ready records matching CRA & Provincial tax regulations.',
      actionLabel: 'Preview Digital Invoicing',
      onClick: () => openModal('invoicing-preview'),
    },
  ];

  return (
    <section id="capabilities" className="py-20 px-4 sm:px-6 bg-[#121212] text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-sky-400">
            End-to-End Automotive Excellence
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Platform Capabilities
          </h2>
          <p className="text-lg sm:text-xl font-semibold text-[#76bc21]">
            Where Possibilities begin... Connect and Correct
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition shadow-lg group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">
                  {cap.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={cap.onClick}
                  className="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-between border border-neutral-700 transition"
                >
                  <span>{cap.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#76bc21]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
