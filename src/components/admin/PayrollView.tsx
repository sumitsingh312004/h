import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PayrollRecord } from '../../types';
import {
  Banknote,
  Plus,
  Search,
  DollarSign,
  User,
  Clock,
  CheckCircle,
  Calendar,
} from 'lucide-react';

export const PayrollView: React.FC = () => {
  const { payrollRecords, openModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const totalPayroll = payrollRecords.reduce((acc, p) => acc + p.netPay, 0);

  const filtered = payrollRecords.filter((p) =>
    p.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Staff & Technician Payroll</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Automotive shop labor compensation, hourly logs & direct deposits
          </p>
        </div>

        <button
          onClick={() => openModal('new-payroll')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>+ Process Pay Run</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
          <div className="text-xs text-neutral-400 font-semibold">Total Pay Period Net</div>
          <div className="text-2xl font-bold text-white mt-1">
            $ {totalPayroll.toLocaleString()} CAD
          </div>
          <div className="text-[11px] text-neutral-400">Bi-weekly shop payroll</div>
        </div>
        <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
          <div className="text-xs text-neutral-400 font-semibold">Active Technicians</div>
          <div className="text-2xl font-bold text-sky-400 mt-1">{payrollRecords.length} Staff</div>
          <div className="text-[11px] text-neutral-400">Red Seal & Apprentice techs</div>
        </div>
        <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
          <div className="text-xs text-neutral-400 font-semibold">Direct Deposit Status</div>
          <div className="text-2xl font-bold text-[#76bc21] mt-1">100% Cleared</div>
          <div className="text-[11px] text-neutral-400">RBC Direct Business link</div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Technician / Employee</th>
                <th className="py-3 px-4">Pay Period</th>
                <th className="py-3 px-4 text-center">Hours Worked</th>
                <th className="py-3 px-4 text-right">Hourly Rate</th>
                <th className="py-3 px-4 text-right">Gross Pay</th>
                <th className="py-3 px-4 text-right">Net Take-Home</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                  <td className="py-3.5 px-4 font-bold text-white">{record.employeeName}</td>
                  <td className="py-3.5 px-4 text-neutral-400">{record.payPeriod}</td>
                  <td className="py-3.5 px-4 text-center font-mono">{record.hoursWorked} hrs</td>
                  <td className="py-3.5 px-4 text-right font-mono">${record.hourlyRate}/hr</td>
                  <td className="py-3.5 px-4 text-right font-mono">${record.grossPay}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#76bc21]">
                    $ {record.netPay.toLocaleString()} CAD
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px]">
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
