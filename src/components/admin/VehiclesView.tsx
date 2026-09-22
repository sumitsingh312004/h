import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Vehicle, ServiceRecord } from '../../types';
import {
  Car,
  Wrench,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Clock,
  Gauge,
  FileText,
  Trash2,
  Edit2,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const VehiclesView: React.FC = () => {
  const { vehicles, deleteVehicle, openModal, updateVehicleOdometer } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(vehicles[0] || null);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Vehicles & Service Tracker</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Digital Bill Book telemetry, next due service interval forecasting & verified maintenance logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('new-vehicle')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold shadow transition"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#1c1c1c] p-3 rounded-xl border border-neutral-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search VIN, license plate, model, owner..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#76bc21]"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
          <span className="text-neutral-400">Health Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="all">All Vehicles</option>
            <option value="Service Due">Service Due (Yellow)</option>
            <option value="Overdue">Overdue (Red Alert)</option>
            <option value="Good">Good Standing</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Vehicles Grid/Table & Selected Vehicle Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vehicles List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredVehicles.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#1c1c1c] border border-neutral-800 text-center text-xs text-neutral-400">
              No vehicles found matching filters.
            </div>
          ) : (
            filteredVehicles.map((vehicle) => {
              const isSelected = selectedVehicle?.id === vehicle.id;
              const kmToNext = vehicle.nextServiceMileage - vehicle.currentMileage;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`p-4 rounded-xl border transition-all duration-150 ease-in-out cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-neutral-900 border-[#198cd6] shadow-lg ring-1 ring-[#198cd6]/40 translate-x-1'
                      : 'bg-[#1c1c1c] border-neutral-800 hover:bg-neutral-800/60 hover:border-neutral-700 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0">
                      <Car className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-base">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            vehicle.status === 'Overdue'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                              : vehicle.status === 'Service Due'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5 flex flex-wrap items-center gap-3">
                        <span>Plate: <strong className="text-neutral-200">{vehicle.licensePlate}</strong></span>
                        <span>•</span>
                        <span>Owner: <strong className="text-neutral-200">{vehicle.ownerName}</strong></span>
                        <span>•</span>
                        <span>Odometer: <strong className="text-white">{vehicle.currentMileage.toLocaleString()} km</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Next Due Service Pill */}
                  <div className="text-left sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-neutral-800">
                    <div className="text-[11px] text-neutral-400 font-semibold uppercase">
                      Next Due Service
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {vehicle.nextServiceType}
                    </div>
                    <div
                      className={`text-[11px] font-semibold ${
                        kmToNext < 0 ? 'text-red-400' : kmToNext < 1500 ? 'text-amber-400' : 'text-[#76bc21]'
                      }`}
                    >
                      {kmToNext < 0
                        ? `Overdue by ${Math.abs(kmToNext).toLocaleString()} km`
                        : `${kmToNext.toLocaleString()} km remaining`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Vehicle Detail Dossier (5 cols) */}
        <div className="lg:col-span-5">
          {selectedVehicle ? (
            <div className="p-6 rounded-2xl bg-[#1c1c1c] border border-neutral-800 shadow-xl space-y-6 sticky top-20">
              {/* Dossier Header */}
              <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
                <div>
                  <div className="text-[10px] text-[#76bc21] font-bold uppercase tracking-wider">
                    Digital Bill Book Profile
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </h3>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">
                    VIN: {selectedVehicle.vin}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openModal('edit-vehicle', { vehicle: selectedVehicle })}
                    className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
                    title="Edit Vehicle"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove vehicle ${selectedVehicle.model}?`)) {
                        deleteVehicle(selectedVehicle.id);
                        setSelectedVehicle(vehicles[0] || null);
                      }
                    }}
                    className="p-1.5 rounded hover:bg-red-950/60 text-neutral-400 hover:text-red-400 transition"
                    title="Delete Vehicle"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openModal('new-service-record', { vehicle: selectedVehicle })}
                  className="py-2.5 px-3 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Log Service Record</span>
                </button>
                <button
                  onClick={() => openModal('update-odometer', { vehicle: selectedVehicle })}
                  className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-700 transition"
                >
                  <Gauge className="w-3.5 h-3.5 text-sky-400" />
                  <span>Update Odometer</span>
                </button>
              </div>

              {/* Maintenance Interval Forecast Status */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    Target Date: {selectedVehicle.nextServiceDate}
                  </span>
                  <span className="text-neutral-400 font-mono">
                    {selectedVehicle.nextServiceMileage.toLocaleString()} km
                  </span>
                </div>
                <div className="text-xs text-neutral-300">
                  Required: <strong className="text-white">{selectedVehicle.nextServiceType}</strong>
                </div>
                <div className="text-[11px] text-neutral-400">
                  Configured interval: Every {selectedVehicle.serviceIntervalKm.toLocaleString()} km
                </div>
              </div>

              {/* Verified Service Records History */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Service History ({(selectedVehicle.serviceHistory || []).length})
                  </span>
                  <span className="text-[10px] text-[#76bc21] font-semibold">Resale Ready</span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {(selectedVehicle.serviceHistory || []).length === 0 ? (
                    <div className="text-xs text-neutral-500 py-3 text-center">
                      No service records logged yet.
                    </div>
                  ) : (
                    (selectedVehicle.serviceHistory || []).map((rec) => (
                      <div
                        key={rec.id}
                        className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80 space-y-1 text-xs transition-all duration-150 ease-in-out hover:bg-neutral-800/80 hover:border-neutral-700 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{rec.serviceType}</span>
                          <span className="font-bold text-[#76bc21]">$ {rec.cost} CAD</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-neutral-400">
                          <span>{rec.date} • {rec.mileage.toLocaleString()} km</span>
                          <span className="text-sky-400">{rec.workshopName}</span>
                        </div>
                        {rec.notes && (
                          <div className="text-[10px] text-neutral-400 italic pt-0.5">
                            "{rec.notes}"
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-[#1c1c1c] border border-neutral-800 text-center text-xs text-neutral-400">
              Select a vehicle to inspect its full Digital Bill Book.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
