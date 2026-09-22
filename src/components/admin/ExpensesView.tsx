import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Expense, Account } from '../../types';
import {
  CreditCard,
  Building,
  Plus,
  Search,
  DollarSign,
  TrendingDown,
  Tag,
  Receipt,
  Trash2,
  Edit2,
  Wallet,
  ArrowUpRight,
} from 'lucide-react';

export const ExpensesView: React.FC = () => {
  const {
    adminSubTab,
    setAdminSubTab,
    expenses,
    accounts,
    deleteExpense,
    deleteAccount,
    openModal,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const activeSubTab = adminSubTab || 'expenses';

  const totalExpenseVal = expenses.reduce((acc, e) => acc + e.amount, 0);

  const filteredExpenses = expenses.filter((exp) => {
    const vendor = exp.vendorName || exp.vendor || '';
    const desc = exp.description || exp.notes || '';
    const category = exp.category || '';
    const matchesSearch =
      vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Sub Tabs navigation matching video */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-1 sm:gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
          <button
            onClick={() => setAdminSubTab('expenses')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'expenses'
                ? 'bg-[#198cd6] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Operating Expenses ({expenses.length})</span>
          </button>
          <button
            onClick={() => setAdminSubTab('accounts')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'accounts'
                ? 'bg-[#198cd6] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Chart of Accounts ({accounts.length})</span>
          </button>
        </div>

        {/* Action Button */}
        <div>
          {activeSubTab === 'expenses' ? (
            <button
              onClick={() => openModal('new-expense')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Record Expense</span>
            </button>
          ) : (
            <button
              onClick={() => openModal('new-account')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ New Account</span>
            </button>
          )}
        </div>
      </div>

      {/* Expenses Overview Banner */}
      {activeSubTab === 'expenses' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
            <div className="text-xs text-neutral-400 font-semibold">Total Expenses Recorded</div>
            <div className="text-2xl font-bold text-red-400 mt-1">
              $ {totalExpenseVal.toLocaleString()} CAD
            </div>
            <div className="text-[11px] text-neutral-400">Parts, inventory & operations</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
            <div className="text-xs text-neutral-400 font-semibold">Tax-Deductible Proportion</div>
            <div className="text-2xl font-bold text-[#76bc21] mt-1">94.8%</div>
            <div className="text-[11px] text-neutral-400">CRA automotive business write-offs</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1c1c1c] border border-neutral-800">
            <div className="text-xs text-neutral-400 font-semibold">Primary Expense Driver</div>
            <div className="text-2xl font-bold text-white mt-1">OEM Parts & Tools</div>
            <div className="text-[11px] text-neutral-400">Brembo, Michelin & Castrol purchases</div>
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

        {activeSubTab === 'expenses' && (
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-neutral-400">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Parts & Inventory">Parts & Inventory</option>
              <option value="Equipment & Tools">Equipment & Tools</option>
              <option value="Shop Supplies">Shop Supplies</option>
              <option value="Software & Cloud">Software & Cloud</option>
            </select>
          </div>
        )}
      </div>

      {/* Expenses Table */}
      {activeSubTab === 'expenses' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Vendor</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description / Reference</th>
                  <th className="py-3 px-4">Paid Via</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                    <td className="py-3.5 px-4 font-mono text-neutral-400">{exp.date}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{exp.vendorName || exp.vendor || 'Vendor'}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-sky-400 font-medium">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300">{exp.description || exp.notes || '-'}</td>
                    <td className="py-3.5 px-4 text-neutral-400">{exp.paymentMethod}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-red-400">
                      - $ {exp.amount.toLocaleString()} CAD
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openModal('edit-expense', { expense: exp })}
                          className="p-1 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                          title="Edit Expense"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this expense?')) {
                              deleteExpense(exp.id);
                            }
                          }}
                          className="p-1 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                          title="Delete Expense"
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

      {/* Chart of Accounts Grid */}
      {activeSubTab === 'accounts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="p-5 rounded-xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-sky-400 text-[10px] font-bold uppercase tracking-wider">
                    {acc.type}
                  </span>
                  <span className="text-neutral-500 font-mono text-[11px]">#{acc.accountNumber}</span>
                </div>
                <h4 className="text-base font-bold text-white">{acc.name}</h4>
              </div>

              <div>
                <div className="text-xs text-neutral-400 font-semibold">Current Balance</div>
                <div className="text-2xl font-black text-[#76bc21] mt-0.5">
                  $ {acc.currentBalance.toLocaleString()} {acc.currency}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Direct Ledger</span>
                <button
                  onClick={() => openModal('transfer-funds', { fromAccount: acc })}
                  className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Transfer</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
