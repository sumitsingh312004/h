import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RepairShop, TireDeal } from '../../types';
import {
  Wrench,
  Disc,
  Sparkles,
  Truck,
  Plus,
  Search,
  MapPin,
  Star,
  Phone,
  Clock,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  Tag,
} from 'lucide-react';

export const AutomotiveServicesView: React.FC = () => {
  const {
    repairShops,
    tireDeals,
    detailingBookings,
    towRequests,
    deleteRepairShop,
    deleteTireDeal,
    updateTowStatus,
    openModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'shops' | 'tires' | 'detailing' | 'towing'>('shops');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = repairShops.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.services.some((srv) => srv.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredTires = tireDeals.filter(
    (t) =>
      t.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.size.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Service Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-1 sm:gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('shops')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'shops' ? 'bg-[#198cd6] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Repair Shops ({repairShops.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('tires')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'tires' ? 'bg-[#198cd6] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Tire Deals ({tireDeals.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('detailing')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'detailing' ? 'bg-[#198cd6] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Detailing Bookings ({detailingBookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('towing')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap ${
              activeTab === 'towing' ? 'bg-[#198cd6] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Tow Dispatch ({towRequests.length})</span>
          </button>
        </div>

        <div>
          {activeTab === 'shops' && (
            <button
              onClick={() => openModal('new-repair-shop')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Register Repair Shop</span>
            </button>
          )}
          {activeTab === 'tires' && (
            <button
              onClick={() => openModal('new-tire-deal')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Post Tire Deal</span>
            </button>
          )}
          {activeTab === 'detailing' && (
            <button
              onClick={() => openModal('detailing-booking-modal')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Schedule Detailing</span>
            </button>
          )}
          {activeTab === 'towing' && (
            <button
              onClick={() => openModal('emergency-tow')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow transition"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Manual Tow Dispatch</span>
            </button>
          )}
        </div>
      </div>

      {/* Repair Shops Tab */}
      {activeTab === 'shops' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="p-5 rounded-2xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base">{shop.name}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{shop.address}, {shop.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{shop.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-300 pt-1 border-t border-neutral-800">
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Phone className="w-3 h-3 text-[#76bc21]" />
                      {shop.phone}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <Clock className="w-3 h-3 text-sky-400" />
                      {shop.openingHours}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {shop.services.map((srv, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300 font-medium"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#76bc21] font-bold">
                    ✓ Verified Red Seal
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openModal('edit-repair-shop', { shop })}
                      className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
                      title="Edit Shop"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${shop.name}?`)) {
                          deleteRepairShop(shop.id);
                        }
                      }}
                      className="p-1.5 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                      title="Delete Shop"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tire Deals Tab */}
      {activeTab === 'tires' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTires.map((deal) => (
              <div
                key={deal.id}
                className="p-5 rounded-2xl bg-[#1c1c1c] border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                        {deal.brand}
                      </span>
                      <h4 className="font-bold text-white text-base">{deal.model}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#76bc21]/20 text-[#76bc21] text-[10px] font-bold uppercase">
                      In Stock
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-1">
                    <div className="flex justify-between text-neutral-400">
                      <span>Size Fitment:</span>
                      <strong className="text-white font-mono">{deal.size}</strong>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Dealer Location:</span>
                      <span className="text-neutral-200">{deal.shopName}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-white">
                      ${deal.discountPrice || deal.salePrice || deal.originalPrice}
                    </span>
                    <span className="text-sm text-neutral-500 line-through">
                      ${deal.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-[#76bc21] ml-auto">
                      Save ${(deal.originalPrice - (deal.discountPrice || deal.salePrice || deal.originalPrice))} CAD
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-400">Contact: {deal.contactPhone}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openModal('edit-tire-deal', { deal })}
                      className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white"
                      title="Edit Tire Deal"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this tire promotion?')) {
                          deleteTireDeal(deal.id);
                        }
                      }}
                      className="p-1.5 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400"
                      title="Delete Tire Deal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailing Bookings Tab */}
      {activeTab === 'detailing' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Service Package</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Doorstep Location</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {detailingBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                    <td className="py-3.5 px-4 font-bold text-white">{booking.customerName}</td>
                    <td className="py-3.5 px-4 text-neutral-300">{booking.vehicleModel}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-purple-900/30 text-purple-300 font-semibold">
                        {booking.serviceType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300">
                      {booking.date} at {booking.time}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">{booking.address}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px]">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tow Dispatch Tab */}
      {activeTab === 'towing' && (
        <div className="rounded-xl bg-[#1c1c1c] border border-neutral-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="py-3 px-4">Requested At</th>
                  <th className="py-3 px-4">Driver / Contact</th>
                  <th className="py-3 px-4">Vehicle Model</th>
                  <th className="py-3 px-4">Current GPS Location</th>
                  <th className="py-3 px-4">Destination Shop</th>
                  <th className="py-3 px-4 text-center">Dispatch Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {towRequests.map((tow) => (
                  <tr key={tow.id} className="hover:bg-neutral-800/75 transition-colors duration-150 ease-in-out cursor-pointer">
                    <td className="py-3.5 px-4 font-mono text-neutral-400">{tow.timestamp}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{tow.customerName}</div>
                      <div className="text-[11px] text-neutral-400">{tow.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300">{tow.vehicleModel}</td>
                    <td className="py-3.5 px-4 text-neutral-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{tow.currentLocation}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">{tow.destinationShop}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          tow.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : tow.status === 'En Route'
                            ? 'bg-amber-500/20 text-amber-400 animate-pulse'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {tow.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {tow.status !== 'Completed' && (
                        <button
                          onClick={() => updateTowStatus(tow.id, 'Completed')}
                          className="px-2.5 py-1 rounded bg-[#76bc21]/20 hover:bg-[#76bc21]/30 text-[#76bc21] text-[10px] font-bold transition"
                        >
                          Mark Completed
                        </button>
                      )}
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
