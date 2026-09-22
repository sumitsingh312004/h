import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, ShieldCheck, Heart } from 'lucide-react';

export const AdminFooter: React.FC = () => {
  const {
    darkMode,
    toggleDarkMode,
    setAdminTab,
    setAdminSubTab,
    openModal,
  } = useApp();

  return (
    <footer className="w-full bg-[#141414] text-neutral-400 border-t border-neutral-800 text-xs py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-6">
        {/* Product */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Product</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setAdminTab('home');
                  setAdminSubTab('pricing');
                }}
                className="hover:text-white transition"
              >
                Pricing & Upgrade
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setAdminTab('home');
                  setAdminSubTab('overview');
                }}
                className="hover:text-white transition"
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setAdminTab('vehicles');
                }}
                className="hover:text-white transition"
              >
                Vehicle Tracker
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => openModal('new-invoice')}
                className="hover:text-white transition"
              >
                New Invoice
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setAdminTab('expenses');
                  setAdminSubTab('purchase-stock');
                }}
                className="hover:text-white transition"
              >
                New Purchase
              </button>
            </li>
            <li>
              <button
                onClick={() => openModal('new-expense')}
                className="hover:text-white transition"
              >
                New Expense
              </button>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Community</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => openModal('faq')} className="hover:text-white transition">
                FAQ
              </button>
            </li>
            <li>
              <button onClick={() => openModal('contact')} className="hover:text-white transition">
                Contact Us
              </button>
            </li>
            <li>
              <button onClick={() => openModal('case-study')} className="hover:text-white transition">
                Case Study
              </button>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => openModal('security')} className="hover:text-white transition">
                Security Safeguard
              </button>
            </li>
            <li>
              <button onClick={() => openModal('terms')} className="hover:text-white transition">
                Terms Of Service
              </button>
            </li>
            <li>
              <button onClick={() => openModal('privacy')} className="hover:text-white transition">
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Right Info Box matching video */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
            A DIGITAL BILL BOOK WITH QUALITY PACE OF BUSINESS
          </h4>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Cardaddy is built to save your time and money by organising expenses and invoices in a simple way.
          </p>
        </div>
      </div>

      {/* Bottom bar with Dark / light toggle button (exact match from video bottom right) */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-[#76bc21]" />
          <span>© 2026 CarDaddy Inc. Canadian Automotive Technology & Digital Bill Book.</span>
        </div>

        {/* Dark / light toggle button as shown in video bottom right corner */}
        <button
          id="dark-light-toggle-btn"
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs transition"
          title="Toggle Dark / Light Mode"
        >
          {darkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-sky-400" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </footer>
  );
};
