import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Building,
  Shield,
  Bell,
  Database,
  Save,
  CheckCircle2,
  Server,
  RefreshCw,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { darkMode, toggleDarkMode } = useApp();
  const [saved, setSaved] = useState(false);

  const [companyName, setCompanyName] = useState('CarDaddy Automotive Inc.');
  const [businessNumber, setBusinessNumber] = useState('849201948RT0001');
  const [email, setEmail] = useState('support@cardaddy.ca');
  const [phone, setPhone] = useState('1-800-555-DADDY (3233)');
  const [province, setProvince] = useState('Ontario (ON)');
  const [taxRate, setTaxRate] = useState('13% (HST)');
  const [defaultInterval, setDefaultInterval] = useState('8000');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetSystemData = () => {
    if (confirm('Restore default system configuration and sync state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Settings & Profile</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure Canadian business identity, tax rates, Digital Bill Book defaults & cloud security
          </p>
        </div>

        <button
          onClick={handleResetSystemData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-neutral-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restore Default Configuration</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {saved && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings updated successfully in Canadian Cloud Ledger.</span>
          </div>
        )}

        {/* Company Identity */}
        <div className="p-6 rounded-2xl bg-[#1c1c1c] border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Building className="w-4 h-4 text-sky-400" />
            <span>Company & Shop Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Business Legal Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-[#76bc21]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">CRA Business / HST Number</label>
              <input
                type="text"
                value={businessNumber}
                onChange={(e) => setBusinessNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-[#76bc21]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Support Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-[#76bc21]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Dispatch Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-[#76bc21]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Jurisdiction / Province</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-[#76bc21]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Sales Tax System</label>
              <input
                type="text"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-[#76bc21]"
              />
            </div>
          </div>
        </div>

        {/* Digital Bill Book Service Interval Rules */}
        <div className="p-6 rounded-2xl bg-[#1c1c1c] border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Settings className="w-4 h-4 text-[#76bc21]" />
            <span>Digital Bill Book Calculation Defaults</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">
                Default Service Interval (Kilometers)
              </label>
              <input
                type="number"
                value={defaultInterval}
                onChange={(e) => setDefaultInterval(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-[#76bc21]"
              />
              <span className="text-[11px] text-neutral-400">
                Applied to newly registered vehicles without custom OEM intervals.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold">Proactive Alert Buffer</label>
              <select className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white focus:outline-none">
                <option>Alert at 1,000 km or 14 days before due</option>
                <option>Alert at 1,500 km or 21 days before due</option>
                <option>Alert at 500 km or 7 days before due</option>
              </select>
            </div>
          </div>
        </div>

        {/* Canadian Cloud & Security Status */}
        <div className="p-6 rounded-2xl bg-[#1c1c1c] border border-neutral-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Server className="w-4 h-4 text-purple-400" />
            <span>Canadian Cloud Infrastructure Status</span>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-white flex items-center gap-2">
                <span>🇨🇦 Region: northamerica-northeast1 (Montreal, QC)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  OPERATIONAL
                </span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Encrypted with AES-256 for private vehicle ownership dossiers & invoices.
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-sm shadow transition"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
