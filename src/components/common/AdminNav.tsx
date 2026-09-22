import React, { useState, useRef, useEffect } from 'react';
import { useApp, AdminPrimaryTab } from '../../context/AppContext';
import {
  Plus,
  ChevronDown,
  Car,
  Wrench,
  Disc,
  Truck,
  Settings as SettingsIcon,
} from 'lucide-react';

export const AdminNav: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    adminSubTab,
    setAdminSubTab,
    openModal,
    darkMode,
  } = useApp();

  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const newMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (newMenuRef.current && !newMenuRef.current.contains(e.target as Node)) {
        setNewMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary Tabs matching video
  const primaryTabs: { id: AdminPrimaryTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'diary', label: 'Digital Diary' },
    { id: 'people', label: 'People' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'expenses', label: 'Expenses' },
    { id: 'reports', label: 'Reports' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'repair-shops', label: 'Repair Shops' },
    { id: 'tire-deals', label: 'Tire Deals' },
    { id: 'services-dispatch', label: 'Detailing & Towing' },
    { id: 'notifications', label: 'Alerts' },
    { id: 'settings', label: 'Settings' },
  ];

  // Secondary subtabs configuration
  const getSubTabs = () => {
    switch (adminTab) {
      case 'home':
        return [
          { id: 'overview', label: 'Overview' },
        ];
      case 'diary':
        return [{ id: 'diary', label: 'Digital Diary' }];
      case 'people':
        return [
          { id: 'clients', label: 'Clients' },
          { id: 'sent-emails', label: 'Sent Emails' },
        ];
      case 'invoices':
      case 'estimates':
      case 'incomes':
        return [
          { id: 'invoices', label: 'Invoices' },
          { id: 'estimates', label: 'Estimates' },
          { id: 'invoice-payment', label: 'Invoice Payment' },
          { id: 'incomes', label: 'Incomes' },
          { id: 'items', label: 'Items' },
        ];
      case 'expenses':
      case 'accounts':
        return [
          { id: 'expenses', label: 'Expenses' },
          { id: 'accounts', label: 'Accounts' },
          { id: 'purchase-stock', label: 'Purchase Stock' },
          { id: 'purchase-payment', label: 'Purchase Payment' },
        ];
      case 'reports':
        return [
          { id: 'popular', label: 'Most Popular Reports' },
          { id: 'accounting', label: 'Accounting Reports' },
          { id: 'client', label: 'Client Reports' },
          { id: 'invoice', label: 'Invoice Reports' },
        ];
      case 'payroll':
        return [
          { id: 'team', label: 'Team' },
          { id: 'attendance', label: 'Attendance' },
          { id: 'wages', label: 'Outstanding Wages' },
        ];
      case 'vehicles':
        return [
          { id: 'all', label: 'Fleet & Personal Vehicles' },
          { id: 'service-history', label: 'Digital Service History' },
          { id: 'reminders', label: 'Service Reminders' },
        ];
      case 'repair-shops':
        return [
          { id: 'shops', label: 'Certified Repair Shops' },
          { id: 'verify', label: 'Verification Queue' },
        ];
      case 'tire-deals':
        return [
          { id: 'deals', label: 'National Tire Deals' },
          { id: 'inventory', label: 'Parts & Stock Inventory' },
        ];
      case 'services-dispatch':
        return [
          { id: 'detailing', label: 'Car Detailing Presto' },
          { id: 'towing', label: 'Emergency Tow Requests' },
        ];
      case 'notifications':
        return [
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: 'Unread Only' },
          { id: 'maintenance', label: 'Maintenance Due' },
          { id: 'towing', label: 'Roadside Towing' },
        ];
      case 'settings':
        return [
          { id: 'general', label: 'General' },
          { id: 'company', label: 'Company' },
          { id: 'notifications', label: 'Notifications' },
          { id: 'security', label: 'Security' },
          { id: 'roles', label: 'Roles & Permissions' },
        ];
      default:
        return [];
    }
  };

  const subTabs = getSubTabs();

  return (
    <div className="w-full bg-[#181818] border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3">
        {/* Top Blue Primary Nav Bar (matches video rounded blue strip) */}
        <nav
          aria-label="Admin Navigation"
          className="flex items-center gap-0.5 overflow-x-auto no-scrollbar rounded-lg bg-[#198cd6] p-1 shadow-md text-white text-xs sm:text-sm font-medium"
        >
          {primaryTabs.map((tab) => {
            const isActive =
              adminTab === tab.id ||
              (tab.id === 'invoices' && (adminTab === 'estimates' || adminTab === 'incomes')) ||
              (tab.id === 'expenses' && adminTab === 'accounts');
            return (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => setAdminTab(tab.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-md transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0f67a3] text-white font-semibold shadow-inner'
                    : 'text-sky-100 hover:bg-[#1479bb] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Sub-navigation bar + Global '+ New' action button */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2.5">
          {/* Subtabs matching video (Overview, Pricing, Clients, Sent Emails, etc.) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {subTabs.map((sub) => {
              const isActive = adminSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  id={`admin-subtab-${sub.id}`}
                  onClick={() => setAdminSubTab(sub.id)}
                  className={`text-xs sm:text-sm font-medium px-3 py-1 rounded transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-800 text-white font-semibold border-b-2 border-[#76bc21]'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* '+ New' Lime Green Action Button with Dropdown (exact match from video) */}
          <div className="relative ml-auto" ref={newMenuRef}>
            <button
              id="admin-new-action-btn"
              onClick={() => setNewMenuOpen(!newMenuOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>New</span>
              <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Dropdown Menu */}
            {newMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-56 rounded-lg bg-[#222222] border border-neutral-700 shadow-xl py-1.5 z-50 text-xs sm:text-sm text-neutral-200">
                <div className="px-3 py-1 text-[11px] uppercase font-bold text-neutral-400 border-b border-neutral-800">
                  Quick Actions
                </div>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-invoice');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#76bc21]" />
                  <span>+ New Invoice</span>
                </button>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-client');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>+ New Client</span>
                </button>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-vehicle');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>+ New Vehicle</span>
                </button>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-service-record');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+ Record Vehicle Service</span>
                </button>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-estimate');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>+ New Estimate</span>
                </button>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-expense');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span>+ New Expense</span>
                </button>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-income');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>+ New Income</span>
                </button>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-item');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <Disc className="w-3.5 h-3.5 text-blue-400" />
                  <span>+ New Catalog Item / Part</span>
                </button>
                <button
                  onClick={() => {
                    setNewMenuOpen(false);
                    openModal('new-diary-note');
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-neutral-800 hover:text-white transition flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>+ New Note in Digital Diary</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
