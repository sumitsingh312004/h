import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Car,
  Users,
  Calendar,
  AlertTriangle,
  Receipt,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wrench,
  Disc,
  Truck,
  Sparkles,
  ArrowRight,
  FileText,
  CreditCard,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    vehicles,
    clients,
    invoices,
    estimates,
    expenses,
    incomes,
    accounts,
    diaryNotes,
    repairShops,
    tireDeals,
    detailingBookings,
    towRequests,
    setAdminTab,
    setAdminSubTab,
    openModal,
    darkMode,
  } = useApp();

  // Current selected diary date for the overview widget
  const [selectedDate, setSelectedDate] = useState('2026-09-20');

  // Calculations
  const totalVehiclesCount = vehicles.length;
  const activeClientsCount = clients.filter((c) => c.status === 'active').length;
  const overdueVehicles = vehicles.filter((v) => v.status === 'Overdue');
  const serviceDueVehicles = vehicles.filter((v) => v.status === 'Service Due');

  const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const pendingInvoiced = invoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((acc, inv) => acc + (inv.totalAmount - (inv.paidAmount || 0)), 0);

  const totalRevenue = incomes.reduce((acc, inc) => acc + inc.amount, 0);
  const totalExpensesAmount = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netProfit = totalRevenue - totalExpensesAmount;

  // Cash in hand from cash accounts
  const cashInHand = accounts
    .filter((acc) => acc.type === 'Cash')
    .reduce((acc, a) => acc + a.currentBalance, 0);

  // Clients debt
  const clientDebtTotal = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((acc, i) => acc + (i.totalAmount - i.paidAmount), 0);

  // Notes for selected date
  const dayNotes = diaryNotes.filter((n) => n.date === selectedDate);

  const changeDateBy = (days: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Overview</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Automotive operations ledger & financial standing summary
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('new-diary-note', { date: selectedDate })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold transition"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add Note</span>
          </button>
          <button
            onClick={() => {
              setAdminTab('reports');
              setAdminSubTab('accounting');
            }}
            className="px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-neutral-700 transition"
          >
            Accounts Aging Report
          </button>
        </div>
      </div>

      {/* Row 1 matching reference video: Recent Activity & Digital Diary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Card */}
        <div className="p-5 rounded-xl bg-[#1c1c1c] border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-sm font-bold text-white">Recent Activity</h3>
            <span className="text-[11px] text-neutral-400">Live Feed</span>
          </div>

          <div className="py-6 text-center text-xs text-neutral-400 space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-neutral-800/80 flex items-center justify-center text-neutral-500">
              <Clock className="w-4 h-4" />
            </div>
            <p>You have no recent activity.</p>
            <p className="text-[11px] text-neutral-400">
              Actions you take across invoices, clients, or service records will appear here.
            </p>
          </div>
        </div>

        {/* Digital Diary Card (Exact video reproduction) */}
        <div className="p-5 rounded-xl bg-[#1c1c1c] border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <h3 className="text-sm font-bold text-white">Digital Diary</h3>
            <button
              onClick={() => {
                setAdminTab('diary');
                setAdminSubTab('diary');
              }}
              className="text-xs text-[#76bc21] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Open Full Diary</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Date Selector Banner: < 20 September 2026 > */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white">
            <button
              onClick={() => changeDateBy(-1)}
              className="p-1 hover:text-[#76bc21] text-neutral-400 transition"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-neutral-100">
              {formatDateDisplay(selectedDate)}
            </span>
            <button
              onClick={() => changeDateBy(1)}
              className="p-1 hover:text-[#76bc21] text-neutral-400 transition"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day Notes content or Empty State matching video */}
          {dayNotes.length === 0 ? (
            <div className="py-6 text-center text-xs text-neutral-400 space-y-2">
              <p>You have no note for this day</p>
              <button
                onClick={() => openModal('new-diary-note', { date: selectedDate })}
                className="text-xs text-sky-400 hover:underline"
              >
                + Create a note for this day
              </button>
            </div>
          ) : (
            <div className="space-y-2 py-2">
              {dayNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white">{note.title}</span>
                    <p className="text-neutral-400 text-[11px]">{note.content}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-sky-400 text-[10px] font-semibold">
                    {note.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row 2 matching reference video: Cash in Hand & Client Debit / Credit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash in Hand */}
        <div className="p-5 rounded-xl bg-[#1c1c1c] border border-neutral-800 space-y-2">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Cash in Hand
          </div>
          <div className="text-3xl font-extrabold text-[#76bc21]">
            $ {cashInHand.toLocaleString()}
          </div>
          <div className="text-[11px] text-neutral-400">
            Physical shop petty drawer & register cash balance
          </div>
        </div>

        {/* Client Debit / Credit */}
        <div className="p-5 rounded-xl bg-[#1c1c1c] border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Client Debit / Credit
            </div>
            <div className="text-3xl font-extrabold text-white mt-1">
              $ {clientDebtTotal.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-400">Debit (Clients owe you)</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-sky-400">$ 0</div>
            <div className="text-xs text-neutral-400">Credit</div>
          </div>
        </div>
      </div>

      {/* Row 3 matching reference video: Purchase Aging breakdown */}
      <div className="p-5 rounded-xl bg-[#1c1c1c] border border-neutral-800 space-y-4">
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
          Purchase
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 space-y-1">
            <div className="text-3xl font-extrabold text-white">$ 0</div>
            <div className="text-xs text-neutral-400">Total Outstanding (CAD)</div>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
              <div className="text-neutral-400 text-[11px]">0 - 30 days old</div>
              <div className="text-sm font-bold text-white mt-0.5">$ 0</div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
              <div className="text-neutral-400 text-[11px]">31 - 60 days old</div>
              <div className="text-sm font-bold text-white mt-0.5">$ 0</div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
              <div className="text-neutral-400 text-[11px]">61 - 90 days old</div>
              <div className="text-sm font-bold text-white mt-0.5">$ 0</div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
              <div className="text-neutral-400 text-[11px]">over 90 days old</div>
              <div className="text-sm font-bold text-white mt-0.5">$ 0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4 matching reference video: Account Standing & Final Account Standing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Standing */}
        <div className="p-5 rounded-xl bg-[#1c1c1c] border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Account Standing
            </div>
            <div className="text-3xl font-extrabold text-white mt-1">$ 0</div>
            <div className="text-xs text-neutral-400">To Pay</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-emerald-400">
              $ {pendingInvoiced.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-400">To Receive</div>
          </div>
        </div>

        {/* Final Account Standing with Accounts Aging Report link */}
        <div className="p-5 rounded-xl bg-[#1c1c1c] border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Final Account Standing
            </div>
            <div className="text-3xl font-extrabold text-[#76bc21] mt-1">
              $ {pendingInvoiced.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-400">To Receive</div>
          </div>
          <div>
            <button
              onClick={() => {
                setAdminTab('reports');
                setAdminSubTab('accounting');
              }}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold underline"
            >
              Accounts Aging Report
            </button>
          </div>
        </div>
      </div>

      {/* Extended Automotive Metric Badges (from Prompt Section 18) */}
      <div className="pt-2 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Automotive Fleet & Services Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div
            onClick={() => setAdminTab('vehicles')}
            className="p-3.5 rounded-xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 cursor-pointer transition space-y-1"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold">Total Vehicles</span>
              <Car className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl font-bold text-white">{totalVehiclesCount}</div>
            <div className="text-[10px] text-neutral-400">Managed fleet</div>
          </div>

          <div
            onClick={() => setAdminTab('people')}
            className="p-3.5 rounded-xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 cursor-pointer transition space-y-1"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold">Active Clients</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white">{activeClientsCount}</div>
            <div className="text-[10px] text-neutral-400">Companies & owners</div>
          </div>

          <div
            onClick={() => setAdminTab('vehicles')}
            className="p-3.5 rounded-xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 cursor-pointer transition space-y-1"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold">Upcoming Due</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-amber-400">
              {serviceDueVehicles.length}
            </div>
            <div className="text-[10px] text-neutral-400">Within 30 days</div>
          </div>

          <div
            onClick={() => setAdminTab('vehicles')}
            className="p-3.5 rounded-xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 cursor-pointer transition space-y-1"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold">Overdue Service</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xl font-bold text-red-400">{overdueVehicles.length}</div>
            <div className="text-[10px] text-neutral-400">Requires attention</div>
          </div>

          <div
            onClick={() => setAdminTab('repair-shops')}
            className="p-3.5 rounded-xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 cursor-pointer transition space-y-1"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold">Repair Shops</span>
              <Wrench className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-white">{repairShops.length}</div>
            <div className="text-[10px] text-neutral-400">Verified partners</div>
          </div>

          <div
            onClick={() => setAdminTab('services-dispatch')}
            className="p-3.5 rounded-xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 cursor-pointer transition space-y-1"
          >
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-[11px] font-semibold">Active Tow Requests</span>
              <Truck className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xl font-bold text-white">{towRequests.length}</div>
            <div className="text-[10px] text-neutral-400">Roadside dispatch</div>
          </div>
        </div>
      </div>
    </div>
  );
};
