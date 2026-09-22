import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Client, Vendor, User } from '../../types';
import {
  Users,
  Building2,
  UserCheck,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Edit2,
  Trash2,
  ExternalLink,
  Car,
  MoreVertical,
} from 'lucide-react';

export const PeopleView: React.FC = () => {
  const {
    adminSubTab,
    setAdminSubTab,
    clients,
    vendors,
    users,
    deleteClient,
    deleteVendor,
    deleteUser,
    openModal,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const activeSubTab = adminSubTab || 'clients';

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const name = c.name || c.ownerName || c.company || '';
    const email = c.email || '';
    const company = c.company || '';
    const phone = c.phone || c.mobile || '';
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter vendors
  const filteredVendors = (vendors || []).filter((v: Vendor) => {
    return (
      (v.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.contactPerson || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Filter users
  const filteredUsers = (users || []).filter((u: User) => {
    return (
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.role || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Sub Tabs Navigation matching video (Clients, Vendors, Users) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-1 sm:gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
          <button
            onClick={() => setAdminSubTab('clients')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'clients'
                ? 'bg-[#198cd6] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Clients ({clients.length})</span>
          </button>
          <button
            onClick={() => setAdminSubTab('vendors')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'vendors'
                ? 'bg-[#198cd6] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Vendors ({vendors.length})</span>
          </button>
          <button
            onClick={() => setAdminSubTab('users')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold transition ${
              activeSubTab === 'users'
                ? 'bg-[#198cd6] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Staff Users ({users.length})</span>
          </button>
        </div>

        {/* Action Button */}
        <div>
          {activeSubTab === 'clients' && (
            <button
              onClick={() => openModal('new-client')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ New Client</span>
            </button>
          )}
          {activeSubTab === 'vendors' && (
            <button
              onClick={() => openModal('new-vendor')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ New Vendor</span>
            </button>
          )}
          {activeSubTab === 'users' && (
            <button
              onClick={() => openModal('new-user')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ New Staff User</span>
            </button>
          )}
        </div>
      </div>

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

        {activeSubTab === 'clients' && (
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-neutral-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="all">All Clients</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}
      </div>

      {/* Clients Table View */}
      {activeSubTab === 'clients' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Client / Company</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">City / Province</th>
                  <th className="py-3 px-4 text-center">Vehicles</th>
                  <th className="py-3 px-4 text-right">Balance Due</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-neutral-500">
                      No clients found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => {
                    const clientDisplayName = client.name || client.ownerName || client.company || 'Client';
                    const clientDisplayPhone = client.phone || client.mobile || 'N/A';
                    const clientDue = client.totalDue !== undefined ? client.totalDue : client.outstandingBalance || 0;
                    const vCount = client.vehicleCount || client.vehiclesCount || 1;
                    return (
                      <tr key={client.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{clientDisplayName}</div>
                          <div className="text-[11px] text-neutral-400">{client.company}</div>
                        </td>
                        <td className="py-3.5 px-4 space-y-0.5">
                          <div className="flex items-center gap-1.5 text-neutral-300">
                            <Mail className="w-3 h-3 text-sky-400" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-400">
                            <Phone className="w-3 h-3 text-[#76bc21]" />
                            <span>{clientDisplayPhone}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-300">
                          {client.city}, {client.province}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800 text-sky-400 font-bold">
                            <Car className="w-3 h-3" />
                            {vCount}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-white">
                          $ {clientDue.toLocaleString()} CAD
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              client.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {client.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openModal('edit-client', { client })}
                              className="p-1.5 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                              title="Edit Client"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete client "${clientDisplayName}"?`)) {
                                  deleteClient(client.id);
                                }
                              }}
                              className="p-1.5 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                              title="Delete Client"
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

      {/* Vendors Table View */}
      {activeSubTab === 'vendors' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Vendor Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Contact Person</th>
                  <th className="py-3 px-4">Phone & Email</th>
                  <th className="py-3 px-4 text-right">Outstanding Balance</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-500">
                      No vendors recorded.
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map((vendor: Vendor) => (
                    <tr key={vendor.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                      <td className="py-3.5 px-4 font-bold text-white text-sm">
                        {vendor.name}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-neutral-800 text-sky-400 font-medium">
                          {vendor.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300">
                        {vendor.contactPerson}
                      </td>
                      <td className="py-3.5 px-4 space-y-0.5 text-neutral-400">
                        <div>{vendor.phone}</div>
                        <div className="text-neutral-500">{vendor.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-white">
                        $ {vendor.balance.toLocaleString()} CAD
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openModal('edit-vendor', { vendor })}
                            className="p-1.5 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                            title="Edit Vendor"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete vendor "${vendor.name}"?`)) {
                                deleteVendor(vendor.id);
                              }
                            }}
                            className="p-1.5 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                            title="Delete Vendor"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Table View */}
      {activeSubTab === 'users' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Last Active</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {filteredUsers.map((user: User) => (
                  <tr key={user.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{user.name}</div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">{user.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-semibold text-[11px]">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">{user.lastLogin}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px]">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openModal('edit-user', { user })}
                          className="p-1.5 rounded hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                          title="Edit User"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove user "${user.name}"?`)) {
                              deleteUser(user.id);
                            }
                          }}
                          className="p-1.5 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                          title="Remove User"
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
    </div>
  );
};
