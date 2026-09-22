import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice, Estimate, Income } from '../../types';
import {
  FileText,
  FileCheck,
  TrendingUp,
  Plus,
  Search,
  Filter,
  DollarSign,
  Calendar,
  User,
  Printer,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const InvoicesView: React.FC = () => {
  const {
    adminSubTab,
    setAdminSubTab,
    invoices,
    estimates,
    incomes,
    deleteInvoice,
    deleteEstimate,
    deleteIncome,
    openModal,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const activeSubTab = adminSubTab || 'invoices';

  // Metrics
  const totalInvoiced = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalPaid = invoices.reduce((acc, i) => acc + (i.paidAmount || 0), 0);
  const totalDue = totalInvoiced - totalPaid;

  const totalEstimatesVal = estimates.reduce((acc, e) => acc + e.totalAmount, 0);
  const totalIncomeVal = incomes.reduce((acc, inc) => acc + inc.amount, 0);

  // Filter Invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter Estimates
  const filteredEstimates = estimates.filter((est) => {
    const matchesSearch =
      est.estimateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || est.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter Income
  const filteredIncomes = incomes.filter((inc) => {
    const cat = inc.category || '';
    const ref = inc.reference || inc.source || '';
    const acc = inc.accountName || inc.clientName || '';
    return (
      cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Sub Tabs navigation matching video */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-1 sm:gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
          <button
            onClick={() => setAdminSubTab('invoices')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'invoices'
                ? 'bg-[#198cd6] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Invoices ({invoices.length})</span>
          </button>
          <button
            onClick={() => setAdminSubTab('estimates')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'estimates'
                ? 'bg-[#198cd6] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Estimates ({estimates.length})</span>
          </button>
          <button
            onClick={() => setAdminSubTab('income')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'income'
                ? 'bg-[#198cd6] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Income Logs ({incomes.length})</span>
          </button>
        </div>

        {/* Action Button */}
        <div>
          {activeSubTab === 'invoices' && (
            <button
              onClick={() => openModal('new-invoice')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Create Invoice</span>
            </button>
          )}
          {activeSubTab === 'estimates' && (
            <button
              onClick={() => openModal('new-estimate')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Create Estimate</span>
            </button>
          )}
          {activeSubTab === 'income' && (
            <button
              onClick={() => openModal('new-income')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Record Income</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Banner */}
      {activeSubTab === 'invoices' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
            <div className="text-xs text-neutral-400 font-semibold">Total Invoiced</div>
            <div className="text-2xl font-bold text-white mt-1">
              $ {totalInvoiced.toLocaleString()} CAD
            </div>
            <div className="text-[11px] text-neutral-400">All bill book records</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
            <div className="text-xs text-neutral-400 font-semibold">Settled & Paid</div>
            <div className="text-2xl font-bold text-[#76bc21] mt-1">
              $ {totalPaid.toLocaleString()} CAD
            </div>
            <div className="text-[11px] text-neutral-400">Directly cleared to bank/cash</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
            <div className="text-xs text-neutral-400 font-semibold">Outstanding Balance</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">
              $ {totalDue.toLocaleString()} CAD
            </div>
            <div className="text-[11px] text-neutral-400">Client receivables</div>
          </div>
        </div>
      )}

      {/* Search and Filters toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#1c1c1c] p-3 rounded-xl border border-neutral-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeSubTab}...`}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#76bc21]"
          />
        </div>

        {activeSubTab === 'invoices' && (
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-neutral-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="unpaid">Unpaid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        )}
      </div>

      {/* Invoices List Table */}
      {activeSubTab === 'invoices' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4 text-right">Total Amount</th>
                  <th className="py-3 px-4 text-right">Balance Due</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-neutral-500">
                      No invoices found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => {
                    const balance = inv.totalAmount - (inv.paidAmount || 0);
                    return (
                      <tr key={inv.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                        <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{inv.clientName}</div>
                          <div className="text-[11px] text-neutral-400">
                            {inv.items.length} billable items
                          </div>
                        </td>
                        <td className="py-3.5 px-4 space-y-0.5 text-neutral-400">
                          <div>Issued: {inv.issueDate}</div>
                          <div className="text-neutral-500">Due: {inv.dueDate}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-white">
                          $ {inv.totalAmount.toLocaleString()} CAD
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold">
                          <span className={balance > 0 ? 'text-amber-400' : 'text-[#76bc21]'}>
                            $ {balance.toLocaleString()} CAD
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              inv.status === 'paid'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : inv.status === 'partial'
                                ? 'bg-sky-500/20 text-sky-400'
                                : inv.status === 'overdue'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openModal('view-invoice-pdf', { invoice: inv })}
                              className="p-1.5 rounded hover:bg-neutral-700 text-sky-400 hover:text-sky-300 transition"
                              title="Print / PDF Invoice"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openModal('record-payment', { invoice: inv })}
                              className="px-2 py-1 rounded bg-[#76bc21]/20 hover:bg-[#76bc21]/30 text-[#76bc21] text-[10px] font-bold transition"
                            >
                              Pay
                            </button>
                            <button
                              onClick={() => openModal('edit-invoice', { invoice: inv })}
                              className="p-1.5 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                              title="Edit Invoice"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete invoice ${inv.invoiceNumber}?`)) {
                                  deleteInvoice(inv.id);
                                }
                              }}
                              className="p-1.5 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                              title="Delete Invoice"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Estimates List Table */}
      {activeSubTab === 'estimates' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Estimate #</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Date / Expiry</th>
                  <th className="py-3 px-4 text-right">Estimated Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {filteredEstimates.map((est) => (
                  <tr key={est.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                      {est.estimateNumber}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">{est.clientName}</td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      <div>Issued: {est.date}</div>
                      <div className="text-neutral-500">Expires: {est.expiryDate}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-white">
                      $ {est.totalAmount.toLocaleString()} CAD
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          est.status === 'accepted'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : est.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {est.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal('convert-estimate-to-invoice', { estimate: est })}
                          className="px-2 py-1 rounded bg-[#198cd6]/20 hover:bg-[#198cd6]/30 text-sky-400 text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          <span>Convert to Invoice</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete estimate ${est.estimateNumber}?`)) {
                              deleteEstimate(est.id);
                            }
                          }}
                          className="p-1 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Income List Table */}
      {activeSubTab === 'income' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Reference / Memo</th>
                  <th className="py-3 px-4">Deposited Into</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {filteredIncomes.map((inc) => (
                  <tr key={inc.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                    <td className="py-3.5 px-4 font-mono text-neutral-400">{inc.date}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{inc.category || inc.source || 'General'}</td>
                    <td className="py-3.5 px-4 text-neutral-300">{inc.reference || inc.source || '-'}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-sky-400 font-medium">
                        {inc.accountName || 'Operating Account'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#76bc21]">
                      + $ {inc.amount.toLocaleString()} CAD
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm('Delete this income record?')) {
                            deleteIncome(inc.id);
                          }
                        }}
                        className="p-1 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
