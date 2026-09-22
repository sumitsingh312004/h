import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CarDaddyLogo } from '../common/CarDaddyLogo';
import {
  LogIn,
  Search,
  Wrench,
  Disc,
  Sparkles,
  Truck,
  Shield,
  Menu,
  X,
  PhoneCall,
  Sun,
  Moon,
} from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const { setView, openModal, darkMode, toggleDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#121212]/95 backdrop-blur-md border-b border-neutral-800 text-white select-none">
      {/* Top Banner Notice */}
      <div className="bg-[#198cd6] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="hidden sm:inline">🇨🇦 Canadian Automotive Technology:</span>
        <span>Smart reminders for your next due service & digital bill book.</span>
        <button
          onClick={() => openModal('ai-assistant', { initialQuery: 'When is my next service due?' })}
          className="underline font-bold hover:text-sky-100 ml-1 flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Service Support</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <button onClick={() => scrollToSection('hero')} className="text-left">
            <CarDaddyLogo size="lg" showSubtitle />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 text-sm text-neutral-300">
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-white transition hover:underline"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('platform')}
              className="hover:text-white transition hover:underline"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToSection('next-service')}
              className="hover:text-white transition hover:underline"
            >
              Next Due Service
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="hover:text-white transition hover:underline"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection('mobile-app')}
              className="hover:text-white transition hover:underline"
            >
              Mobile App
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition hover:underline"
            >
              About Us
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="emergency-tow-btn"
            onClick={() => openModal('emergency-tow')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>24/7 Towing</span>
          </button>

          <button
            id="public-ai-btn"
            onClick={() => openModal('ai-assistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-medium transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#76bc21]" />
            <span>Service Concierge</span>
          </button>

          {/* Discreet carDaddy.com link in red */}
          <button
            id="nav-cardaddy-secret-btn"
            onClick={() => setView('admin-login')}
            className="text-red-500 hover:text-red-400 font-semibold text-xs sm:text-sm tracking-wide px-2 py-1 transition-colors select-none focus:outline-none"
          >
            carDaddy.com
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#181818] border-b border-neutral-800 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left p-2 rounded hover:bg-neutral-800"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('platform')}
              className="text-left p-2 rounded hover:bg-neutral-800"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToSection('next-service')}
              className="text-left p-2 rounded hover:bg-neutral-800"
            >
              Next Due Service
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="text-left p-2 rounded hover:bg-neutral-800"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection('mobile-app')}
              className="text-left p-2 rounded hover:bg-neutral-800"
            >
              Mobile App
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left p-2 rounded hover:bg-neutral-800"
            >
              About Us
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('emergency-tow');
              }}
              className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-center flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Emergency Tow Request</span>
            </button>
            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setView('admin-login');
                }}
                className="text-xs font-semibold text-red-500 hover:text-red-400 py-1 transition select-none tracking-wide"
              >
                carDaddy.com
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
