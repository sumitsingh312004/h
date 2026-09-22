import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Calendar,
  FileSpreadsheet,
  Printer,
  TrendingUp,
  Download,
  DollarSign,
  AlertTriangle,
  Clock,
  Car,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { adminSubTab, setAdminSubTab, invoices, vehicles, expenses, incomes, clients } = useApp();
  const [activeReport, setActiveReport] = useState<'aging' | 'sales' | 'fleet' | 'expenses'>('aging');

  // Total invoice receivables
  const unpaidInvoices = invoices.filter((i) => i.status !== 'paid');

  return (
    <div className="space-y-6">
      {/* Sub Tabs navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-1 sm:gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800 overflow-x-auto">
          <button
            onClick={() => setActiveReport('aging')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
              activeReport === 'aging' ? 'bg-[#198cd6] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Accounts Aging Report</span>
          </button>
          <button
            onClick={() => setActiveReport('sales')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
              activeReport === 'sales' ? 'bg-[#198cd6] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Revenue & Sales</span>
          </button>
          <button
            onClick={() => setActiveReport('fleet')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
              activeReport === 'fleet' ? 'bg-[#198cd6] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Fleet Service Compliance</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => alert('Exporting CRA-compliant CSV data...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Accounts Aging Report matching reference video */}
      {activeReport === 'aging' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#1c1c1c] border border-neutral-800 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white">Accounts Receivable Aging Report</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Breakdown of outstanding invoices by aging brackets (CAD)
              </p>
            </div>

            {/* Brackets breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[11px] text-neutral-400">Current (0-30 d)</div>
                <div className="text-lg font-bold text-white mt-1">$ 1,600</div>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[11px] text-neutral-400">31 - 60 days</div>
                <div className="text-lg font-bold text-amber-400 mt-1">$ 0</div>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[11px] text-neutral-400">61 - 90 days</div>
                <div className="text-lg font-bold text-amber-400 mt-1">$ 0</div>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[11px] text-neutral-400">Over 90 days</div>
                <div className="text-lg font-bold text-red-400 mt-1">$ 0</div>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center col-span-2 sm:col-span-1">
                <div className="text-[11px] text-neutral-400">Total Outstanding</div>
                <div className="text-lg font-extrabold text-[#76bc21] mt-1">$ 1,600</div>
              </div>
            </div>
          </div>

          {/* Aging Items Table */}
          <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4 text-right">Invoice Amount</th>
                    <th className="py-3 px-4 text-right">Amount Due</th>
                    <th className="py-3 px-4 text-center">Aging Bracket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  {unpaidInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                      <td className="py-3.5 px-4 font-bold text-white">{inv.clientName}</td>
                      <td className="py-3.5 px-4 font-mono text-sky-400">{inv.invoiceNumber}</td>
                      <td className="py-3.5 px-4 text-neutral-400">{inv.dueDate}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-white">
                        $ {inv.totalAmount.toLocaleString()} CAD
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-amber-400">
                        $ {(inv.totalAmount - (inv.paidAmount || 0)).toLocaleString()} CAD
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold uppercase text-[10px]">
                          0 - 30 days
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sales and Revenue Report */}
      {activeReport === 'sales' && (
        <div className="p-6 rounded-2xl bg-[#1c1c1c] border border-neutral-800 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Monthly Automotive Revenue</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Service labor, tire sales, roadside dispatch, and detailing income
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="text-xs text-neutral-400">Total Billed YTD</div>
              <div className="text-2xl font-bold text-white mt-1">$ 14,350 CAD</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="text-xs text-neutral-400">Collections Rate</div>
              <div className="text-2xl font-bold text-[#76bc21] mt-1">88.8%</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="text-xs text-neutral-400">Avg Repair Order Value</div>
              <div className="text-2xl font-bold text-sky-400 mt-1">$ 485 CAD</div>
            </div>
          </div>
        </div>
      )}

      {/* Fleet Service Compliance */}
      {activeReport === 'fleet' && (
        <div className="p-6 rounded-2xl bg-[#1c1c1c] border border-neutral-800 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white">Fleet Maintenance Compliance</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Status of all tracked customer and corporate commercial vehicles
            </p>
          </div>

          <div className="space-y-3">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white">
                    {v.year} {v.make} {v.model} ({v.licensePlate})
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Target: {v.nextServiceType} at {v.nextServiceMileage.toLocaleString()} km
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    v.status === 'Overdue'
                      ? 'bg-red-500/20 text-red-400'
                      : v.status === 'Service Due'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
