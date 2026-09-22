import React from 'react';
import { useApp } from '../../context/AppContext';
import { CarDaddyLogo } from '../common/CarDaddyLogo';
import {
  CheckCircle2,
  Heart,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  LogIn,
  Download,
  ExternalLink,
} from 'lucide-react';

export const AboutUsAndFooterSection: React.FC = () => {
  const { openModal, setView } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="about" className="bg-[#141414] text-white border-t border-neutral-800">
      {/* Section 14: About Us */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#76bc21]">
            Our Story & Canadian Commitment
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">About Us</h2>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-8 shadow-xl">
          <div className="space-y-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            <p className="font-semibold text-white text-xl">
              Thanks for downloading the app. Auto Daddy was created with a simple belief: Your vehicle is your most trusted partner.
            </p>
            <p>
              In today's busy life, managing multiple vehicles and remembering service dates, repairs, and expenses become difficult.
            </p>
            <p>
              Auto Daddy simplifies this process by giving car owners clear, recognized, and instant access to their vehicle information all in one place. From service history to repair records, tow to detailing, everything related to your vehicle is easy to track with a simple click.
            </p>
          </div>

          {/* Heading: Everyone has its own why. Let us explore: why Auto Daddy? */}
          <div className="pt-6 border-t border-neutral-800 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Everyone has its own why. Let us explore: why Auto Daddy?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Access all information about repair records',
                'Find nearby and reliable repair shops',
                'Combination of smart technology and A.I.-driven support',
                'Vehicle service reminders & interval forecasts',
                'National tire deals & exclusive discounts',
                'Emergency 24/7 roadside towing assistance',
                'Doorstep car washing & executive detailing',
                'CRA-compliant standardized digital bill book records',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-800/60 border border-neutral-700/50"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#76bc21] shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Message */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 via-neutral-800 to-neutral-800 border border-sky-800/50 text-center sm:text-left space-y-1">
            <p className="text-lg sm:text-xl font-black text-white">
              "We don't just track data - we honor the promise of a safer, more reliable drive for every Canadian."
            </p>
            <p className="text-xs text-neutral-400">
              Proudly engineered in Canada for coast-to-coast drivers, commercial fleets, and certified mechanics.
            </p>
          </div>
        </div>
      </section>

      {/* Section 15: Useful Links / Public Footer */}
      <footer className="border-t border-neutral-800 bg-[#0e0e0e] text-neutral-400 text-xs py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <CarDaddyLogo size="lg" showSubtitle />
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                Smart reminders for your next due service, verified repair shops, tire deals, towing, and comprehensive digital automotive bill book.
              </p>

              {/* App download button placeholders */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => openModal('app-download')}
                  className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs border border-neutral-700 flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4 text-[#76bc21]" />
                  <span>Download iOS App</span>
                </button>
                <button
                  onClick={() => openModal('app-download')}
                  className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs border border-neutral-700 flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Get Android App</span>
                </button>
              </div>

              {/* Social links placeholders */}
              <div className="flex items-center gap-3 pt-2 text-neutral-400 text-xs">
                <span className="font-semibold text-neutral-300">Follow:</span>
                <span className="hover:text-white cursor-pointer transition">LinkedIn</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition">X / Twitter</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition">Instagram</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition">YouTube</span>
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={scrollToTop} className="hover:text-white transition">
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById('services');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const el = document.getElementById('about');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal('pages-directory')} className="hover:text-white transition">
                    Pages & Sitemap
                  </button>
                </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Support & Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => openModal('contact')} className="hover:text-white transition">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal('faq')} className="hover:text-white transition">
                    FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal('privacy')} className="hover:text-white transition">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal('terms')} className="hover:text-white transition">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal('delete-account')}
                    className="hover:text-red-400 transition"
                  >
                    Delete Account
                  </button>
                </li>
              </ul>
            </div>

            {/* National Network Coverage */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Network Coverage</h4>
              <div className="space-y-3">
                <p className="text-neutral-400 text-xs">
                  Connecting Canadian vehicle owners with verified workshops and certified technicians nationwide.
                </p>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Provinces Covered</span>
                    <span className="font-bold text-[#76bc21]">10 Provinces</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Service Response</span>
                    <span className="font-bold text-white">&lt; 15 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#76bc21]" />
              <span>© 2026 CarDaddy Technologies Inc. All rights reserved. Made in Canada.</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => openModal('privacy')} className="hover:text-white">
                Privacy
              </button>
              <button onClick={() => openModal('terms')} className="hover:text-white">
                Terms
              </button>
              <button onClick={() => openModal('contact')} className="hover:text-white">
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
