import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Plus,
  Car,
  User,
  FileText,
  CreditCard,
  Building,
  CheckCircle,
  Truck,
  Sparkles,
  Printer,
  Calendar,
  Wrench,
  Disc,
  MapPin,
  Star,
  Phone,
  AlertTriangle,
  Lock,
} from 'lucide-react';

export const ActionModals: React.FC = () => {
  const {
    modalState,
    closeModal,
    addVehicle,
    updateVehicle,
    addClient,
    updateClient,
    addInvoice,
    updateInvoice,
    recordPayment,
    addEstimate,
    addExpense,
    addAccount,
    addVendor,
    addRepairShop,
    addTireDeal,
    addDiaryNote,
    addServiceRecord,
    updateVehicleOdometer,
    addTowRequest,
    addDetailingBooking,
    clients,
    vehicles,
    accounts,
    repairShops,
    tireDeals,
  } = useApp();

  if (!modalState.isOpen) return null;

  const { type, data } = modalState;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-[#181818] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Render specific modal content by type */}
        {type === 'new-vehicle' && <NewVehicleModalForm onClose={closeModal} onSubmit={addVehicle} />}
        {type === 'edit-vehicle' && (
          <EditVehicleModalForm
            vehicle={data.vehicle}
            onClose={closeModal}
            onSubmit={(v) => {
              updateVehicle(v.id || data.vehicle?.id, v);
              closeModal();
            }}
          />
        )}
        {type === 'new-service-record' && (
          <NewServiceRecordForm
            vehicle={data.vehicle}
            onClose={closeModal}
            onSubmit={(rec, newOdo) => {
              addServiceRecord({
                ...rec,
                vehicleId: data.vehicle?.id,
                vehicleName: data.vehicle ? `${data.vehicle.year} ${data.vehicle.make} ${data.vehicle.model}` : rec.vehicleName,
              });
              if (newOdo && data.vehicle?.id) {
                updateVehicleOdometer(data.vehicle.id, newOdo);
              }
              closeModal();
            }}
          />
        )}
        {type === 'update-odometer' && (
          <UpdateOdometerForm
            vehicle={data.vehicle}
            onClose={closeModal}
            onSubmit={(odo) => {
              updateVehicleOdometer(data.vehicle.id, odo);
              closeModal();
            }}
          />
        )}
        {type === 'new-client' && <NewClientForm onClose={closeModal} onSubmit={addClient} />}
        {type === 'edit-client' && (
          <EditClientForm
            client={data.client}
            onClose={closeModal}
            onSubmit={(c) => {
              updateClient(c.id || data.client?.id, c);
              closeModal();
            }}
          />
        )}
        {type === 'new-invoice' && (
          <NewInvoiceForm
            clients={clients}
            onClose={closeModal}
            onSubmit={(inv) => {
              addInvoice(inv);
              closeModal();
            }}
          />
        )}
        {type === 'edit-invoice' && (
          <EditInvoiceForm
            invoice={data.invoice}
            onClose={closeModal}
            onSubmit={(inv) => {
              updateInvoice(inv.id || data.invoice?.id, inv);
              closeModal();
            }}
          />
        )}
        {type === 'record-payment' && (
          <RecordPaymentForm
            invoice={data.invoice}
            accounts={accounts}
            onClose={closeModal}
            onSubmit={(invId, amt) => {
              recordPayment(invId, amt);
              closeModal();
            }}
          />
        )}
        {type === 'view-invoice-pdf' && (
          <InvoicePdfViewer invoice={data.invoice} onClose={closeModal} />
        )}
        {type === 'new-estimate' && (
          <NewEstimateForm
            clients={clients}
            onClose={closeModal}
            onSubmit={(est) => {
              addEstimate(est);
              closeModal();
            }}
          />
        )}
        {type === 'convert-estimate-to-invoice' && (
          <ConvertEstimateForm
            estimate={data.estimate}
            onClose={closeModal}
            onSubmit={(inv) => {
              addInvoice(inv);
              closeModal();
            }}
          />
        )}
        {type === 'new-expense' && (
          <NewExpenseForm
            accounts={accounts}
            onClose={closeModal}
            onSubmit={(exp) => {
              addExpense(exp);
              closeModal();
            }}
          />
        )}
        {type === 'new-account' && <NewAccountForm onClose={closeModal} onSubmit={addAccount} />}
        {type === 'new-vendor' && <NewVendorForm onClose={closeModal} onSubmit={addVendor} />}
        {type === 'new-repair-shop' && (
          <NewRepairShopForm onClose={closeModal} onSubmit={addRepairShop} />
        )}
        {type === 'new-tire-deal' && <NewTireDealForm onClose={closeModal} onSubmit={addTireDeal} />}
        {type === 'new-diary-note' && (
          <NewDiaryNoteForm
            date={data?.date || '2026-09-20'}
            onClose={closeModal}
            onSubmit={(n) => {
              addDiaryNote(n);
              closeModal();
            }}
          />
        )}
        {type === 'emergency-tow' && (
          <EmergencyTowForm
            onClose={closeModal}
            onSubmit={(tow) => {
              addTowRequest(tow);
              closeModal();
            }}
          />
        )}
        {type === 'detailing-booking-modal' && (
          <DetailingBookingForm
            onClose={closeModal}
            onSubmit={(b) => {
              addDetailingBooking(b);
              closeModal();
            }}
          />
        )}
        {type === 'tire-deals-modal' && (
          <TireDealsBrowser deals={tireDeals} onClose={closeModal} />
        )}
        {type === 'repair-shop-finder' && (
          <RepairShopFinder shops={repairShops} onClose={closeModal} />
        )}
        {type === 'join-network' && <JoinNetworkForm onClose={closeModal} />}
        {type === 'faq' && <FaqModal onClose={closeModal} />}
        {type === 'privacy' && <PrivacyModal onClose={closeModal} />}
        {type === 'terms' && <TermsModal onClose={closeModal} />}
        {type === 'delete-account' && <DeleteAccountModal onClose={closeModal} />}
        {type === 'autobody-modal' && <AutoBodyModal onClose={closeModal} />}
        {type === 'digital-history-preview' && <DigitalHistoryPreviewModal onClose={closeModal} />}
        {type === 'invoicing-preview' && <InvoicingPreviewModal onClose={closeModal} />}
        {type === 'app-download' && <AppDownloadModal onClose={closeModal} />}
        {type === 'pages-directory' && <PagesDirectoryModal onClose={closeModal} />}
        {type === 'contact' && <ContactModal onClose={closeModal} />}
        {type === 'notifications' && <NotificationsModal onClose={closeModal} />}
        {type === 'profile' && <ProfileModal onClose={closeModal} />}
        {type === 'help' && <HelpModal onClose={closeModal} />}
        {type === 'edit-vendor' && <EditVendorModal vendor={data?.vendor} onClose={closeModal} />}
        {type === 'edit-tire-deal' && <EditTireDealModal deal={data?.deal} onClose={closeModal} />}
      </div>
    </div>
  );
};

// ----------------- SUB-COMPONENTS FOR EACH MODAL -----------------

// 1. New Vehicle
const NewVehicleModalForm: React.FC<{ onClose: () => void; onSubmit: (v: any) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [vin, setVin] = useState('2C3CDZFJ8NH' + Math.floor(100000 + Math.random() * 900000));
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState('RAV4 Hybrid');
  const [year, setYear] = useState(2023);
  const [plate, setPlate] = useState('CAR-902');
  const [owner, setOwner] = useState('Marcus Vance');
  const [mileage, setMileage] = useState(34200);
  const [interval, setInterval] = useState(8000);
  const [nextType, setNextType] = useState('Synthetic Oil & Filter');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      vin,
      make,
      model,
      year: Number(year),
      licensePlate: plate,
      ownerName: owner,
      currentMileage: Number(mileage),
      lastServiceMileage: Number(mileage) - 7200,
      lastServiceDate: '2026-06-15',
      nextServiceMileage: Number(mileage) + 800,
      nextServiceDate: '2026-10-15',
      nextServiceType: nextType,
      serviceIntervalKm: Number(interval),
      status: 'Service Due',
      serviceHistory: [
        {
          id: 'srv-init',
          date: '2026-06-15',
          mileage: Number(mileage) - 7200,
          serviceType: 'Initial Inspection & Synthetic Oil',
          workshopName: 'CarDaddy Certified Service',
          cost: 145,
          notes: 'Pre-delivery inspection passed',
        },
      ],
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Car className="w-5 h-5 text-[#76bc21]" />
          <span>Add New Vehicle to Digital Bill Book</span>
        </h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="col-span-2">
          <label className="text-neutral-300 font-semibold">17-Digit VIN</label>
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Make</label>
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">License Plate</label>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div className="col-span-2">
          <label className="text-neutral-300 font-semibold">Owner / Fleet Name</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Current Odometer (km)</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Interval Target (km)</label>
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Save Vehicle
        </button>
      </div>
    </form>
  );
};

// 2. Edit Vehicle
const EditVehicleModalForm: React.FC<{
  vehicle: any;
  onClose: () => void;
  onSubmit: (v: any) => void;
}> = ({ vehicle, onClose, onSubmit }) => {
  const [model, setModel] = useState(vehicle.model);
  const [plate, setPlate] = useState(vehicle.licensePlate);
  const [owner, setOwner] = useState(vehicle.ownerName);
  const [mileage, setMileage] = useState(vehicle.currentMileage);
  const [status, setStatus] = useState(vehicle.status);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          ...vehicle,
          model,
          licensePlate: plate,
          ownerName: owner,
          currentMileage: Number(mileage),
          status,
        });
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white">Edit Vehicle Details</h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Model Name</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">License Plate</label>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Owner Name</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Current Odometer (km)</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          >
            <option value="Good">Good Standing</option>
            <option value="Service Due">Service Due</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Update Vehicle
        </button>
      </div>
    </form>
  );
};

// 3. New Service Record
const NewServiceRecordForm: React.FC<{
  vehicle: any;
  onClose: () => void;
  onSubmit: (record: any, newOdo: number) => void;
}> = ({ vehicle, onClose, onSubmit }) => {
  const [serviceType, setServiceType] = useState('Full Synthetic Oil & Filter Replacement');
  const [workshop, setWorkshop] = useState('Apex Precision Auto Service');
  const [cost, setCost] = useState(165);
  const [mileage, setMileage] = useState(vehicle.currentMileage + 300);
  const [date, setDate] = useState('2026-09-21');
  const [notes, setNotes] = useState('Replaced oil, multi-point digital inspection passed');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(
          {
            id: 'rec-' + Date.now(),
            date,
            mileage: Number(mileage),
            serviceType,
            workshopName: workshop,
            cost: Number(cost),
            notes,
          },
          Number(mileage)
        );
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#76bc21]" />
            <span>Log Service to Digital Bill Book</span>
          </h3>
          <p className="text-xs text-neutral-400">
            For {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
          </p>
        </div>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Service Performed</label>
          <input
            type="text"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Service Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Odometer at Service (km)</label>
            <input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Workshop / Facility</label>
            <input
              type="text"
              value={workshop}
              onChange={(e) => setWorkshop(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Cost (CAD)</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Technician Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Commit to Digital Bill Book
        </button>
      </div>
    </form>
  );
};

// 4. Update Odometer
const UpdateOdometerForm: React.FC<{
  vehicle: any;
  onClose: () => void;
  onSubmit: (odo: number) => void;
}> = ({ vehicle, onClose, onSubmit }) => {
  const [odometer, setOdometer] = useState(vehicle.currentMileage + 250);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(Number(odometer));
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white">Update Odometer Reading</h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <p className="text-neutral-300">
          Updating the mileage for {vehicle.year} {vehicle.make} {vehicle.model} will recalculate
          service due milestones and warranty triggers.
        </p>
        <div>
          <label className="text-neutral-300 font-semibold">New Reading (km)</label>
          <input
            type="number"
            value={odometer}
            onChange={(e) => setOdometer(Number(e.target.value))}
            min={vehicle.currentMileage}
            required
            className="w-full mt-1 px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-base"
          />
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Previous recorded: {vehicle.currentMileage.toLocaleString()} km
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#198cd6] hover:bg-[#1479bb] text-white text-xs font-bold"
        >
          Update Odometer
        </button>
      </div>
    </form>
  );
};

// 5. New Client
const NewClientForm: React.FC<{ onClose: () => void; onSubmit: (c: any) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Toronto');
  const [province, setProvince] = useState('ON');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      company: company || name,
      email,
      phone,
      city,
      province,
      totalDue: 0,
      status: 'active',
      vehicleCount: 1,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-sky-400" />
          <span>Add New Client / Fleet Owner</span>
        </h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Company / Fleet (Optional)</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Maple Logistics Inc."
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="client@cardaddy.ca"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="(416) 555-0192"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Province</label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Save Client
        </button>
      </div>
    </form>
  );
};

// 6. Edit Client
const EditClientForm: React.FC<{ client: any; onClose: () => void; onSubmit: (c: any) => void }> =
  ({ client, onClose, onSubmit }) => {
    const [name, setName] = useState(client.name);
    const [company, setCompany] = useState(client.company);
    const [email, setEmail] = useState(client.email);
    const [phone, setPhone] = useState(client.phone);
    const [status, setStatus] = useState(client.status);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...client, name, company, email, phone, status });
        }}
        className="p-6 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-lg font-bold text-white">Edit Client</h3>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-neutral-300 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-neutral-300 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-300 font-semibold">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  };

// 7. New Invoice Form
const NewInvoiceForm: React.FC<{
  clients: any[];
  onClose: () => void;
  onSubmit: (inv: any) => void;
}> = ({ clients, onClose, onSubmit }) => {
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [items, setItems] = useState<any[]>([
    { description: 'Synthetic Motor Oil 0W-20 & OEM Filter', quantity: 1, unitPrice: 120, total: 120 },
    { description: 'Standard Brake Inspection & Labor', quantity: 1, unitPrice: 95, total: 95 },
  ]);

  const selectedClient = clients.find((c) => c.id === clientId) || clients[0];
  const subtotal = items.reduce((acc, i) => acc + i.total, 0);
  const tax = Math.round(subtotal * 0.13);
  const total = subtotal + tax;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          invoiceNumber: 'INV-2026-' + Math.floor(100 + Math.random() * 900),
          clientId: selectedClient.id,
          clientName: selectedClient.name,
          issueDate: '2026-09-20',
          dueDate: '2026-10-05',
          items,
          subtotal,
          taxAmount: tax,
          totalAmount: total,
          paidAmount: 0,
          status: 'unpaid',
          notes: 'Payable via e-Transfer or direct credit card. Thank you for using CarDaddy!',
        });
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Create Digital Invoice</span>
        </h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Select Client</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.company})
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-neutral-300 font-semibold">Billable Items</label>
            <button
              type="button"
              onClick={() =>
                setItems([
                  ...items,
                  { description: 'Automotive Labor / Parts', quantity: 1, unitPrice: 75, total: 75 },
                ])
              }
              className="text-[#76bc21] hover:underline"
            >
              + Add Item
            </button>
          </div>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx].description = e.target.value;
                    setItems(newItems);
                  }}
                  className="flex-1 px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
                />
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx].unitPrice = Number(e.target.value);
                    newItems[idx].total = newItems[idx].unitPrice * newItems[idx].quantity;
                    setItems(newItems);
                  }}
                  className="w-20 px-2 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-white"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1 text-right">
          <div>Subtotal: ${subtotal} CAD</div>
          <div>Ontario HST (13%): ${tax} CAD</div>
          <div className="text-base font-bold text-white">Total: ${total} CAD</div>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Issue Invoice
        </button>
      </div>
    </form>
  );
};

// 8. Edit Invoice Form
const EditInvoiceForm: React.FC<{ invoice: any; onClose: () => void; onSubmit: (inv: any) => void }> =
  ({ invoice, onClose, onSubmit }) => {
    const [status, setStatus] = useState(invoice.status);
    const [dueDate, setDueDate] = useState(invoice.dueDate);

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...invoice, status, dueDate });
        }}
        className="p-6 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-lg font-bold text-white">Edit Invoice {invoice.invoiceNumber}</h3>
          <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-neutral-300 font-semibold">Payment Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            >
              <option value="unpaid">Unpaid</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
          >
            Update Invoice
          </button>
        </div>
      </form>
    );
  };

// 9. Record Payment Form
const RecordPaymentForm: React.FC<{
  invoice: any;
  accounts: any[];
  onClose: () => void;
  onSubmit: (id: string, amt: number) => void;
}> = ({ invoice, accounts, onClose, onSubmit }) => {
  const remaining = invoice.totalAmount - (invoice.paidAmount || 0);
  const [amount, setAmount] = useState(remaining);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(invoice.id, Number(amount));
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#76bc21]" />
          <span>Record Payment for {invoice.invoiceNumber}</span>
        </h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <p className="text-neutral-400">
          Client: <strong className="text-white">{invoice.clientName}</strong>
        </p>
        <div>
          <label className="text-neutral-300 font-semibold">Payment Amount (CAD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            max={remaining}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-base"
          />
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Max balance due: ${remaining} CAD
          </span>
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Deposit Account</label>
          <select className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white">
            {accounts.map((a) => (
              <option key={a.id}>{a.name} ({a.type})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Confirm Payment
        </button>
      </div>
    </form>
  );
};

// 10. Printable CRA-Compliant Invoice PDF Viewer
const InvoicePdfViewer: React.FC<{ invoice: any; onClose: () => void }> = ({
  invoice,
  onClose,
}) => {
  return (
    <div className="p-6 bg-white text-neutral-900 space-y-6 max-h-[85vh] overflow-y-auto">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="text-2xl font-black tracking-tight text-neutral-950">
            CAR<span className="text-[#198cd6]">DADDY</span>
          </div>
          <p className="text-xs text-neutral-500">Canadian Automotive Digital Bill Book</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold font-mono text-neutral-900">{invoice.invoiceNumber}</div>
          <div className="text-xs text-neutral-500">HST # 849201948RT0001</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="font-bold uppercase text-neutral-400">Billed To:</span>
          <div className="font-bold text-neutral-900 text-sm mt-0.5">{invoice.clientName}</div>
          <div className="text-neutral-600">Automotive Service Client</div>
        </div>
        <div className="text-right space-y-1">
          <div>Issue Date: <strong>{invoice.issueDate}</strong></div>
          <div>Due Date: <strong>{invoice.dueDate}</strong></div>
          <div>Status: <strong className="uppercase text-emerald-600">{invoice.status}</strong></div>
        </div>
      </div>

      <table className="w-full text-xs text-left border-t border-b">
        <thead>
          <tr className="bg-neutral-100 font-bold">
            <th className="py-2 px-3">Description</th>
            <th className="py-2 px-3 text-center">Qty</th>
            <th className="py-2 px-3 text-right">Price</th>
            <th className="py-2 px-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {invoice.items.map((item: any, idx: number) => (
            <tr key={idx}>
              <td className="py-2 px-3">{item.description}</td>
              <td className="py-2 px-3 text-center">{item.quantity}</td>
              <td className="py-2 px-3 text-right">${item.unitPrice}</td>
              <td className="py-2 px-3 text-right font-bold">${item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end text-xs space-y-1">
        <div className="w-48 text-right space-y-1">
          <div>Subtotal: ${invoice.subtotal} CAD</div>
          <div>Ontario HST (13%): ${invoice.taxAmount} CAD</div>
          <div className="text-sm font-bold border-t pt-1">
            Total Due: ${invoice.totalAmount} CAD
          </div>
        </div>
      </div>

      <div className="pt-4 border-t text-[11px] text-neutral-500 flex items-center justify-between">
        <span>Payment instruction: Interac e-Transfer to payments@cardaddy.ca</span>
        <button
          onClick={() => window.print()}
          className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white font-bold flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </div>
    </div>
  );
};

// 11. New Estimate Form
const NewEstimateForm: React.FC<{
  clients: any[];
  onClose: () => void;
  onSubmit: (est: any) => void;
}> = ({ clients, onClose, onSubmit }) => {
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [clientName, setClientName] = useState(clients[0]?.name || '');
  const [total, setTotal] = useState(850);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          estimateNumber: 'EST-2026-' + Math.floor(100 + Math.random() * 900),
          clientName,
          date: '2026-09-20',
          expiryDate: '2026-10-20',
          totalAmount: Number(total),
          status: 'pending',
          items: [{ description: 'Brake Pads & Rotors Overhaul', total: Number(total) }],
        });
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white">Create Repair Estimate</h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Client</label>
          <select
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Total Estimated Cost (CAD)</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Generate Estimate
        </button>
      </div>
    </form>
  );
};

// 12. Convert Estimate to Invoice
const ConvertEstimateForm: React.FC<{
  estimate: any;
  onClose: () => void;
  onSubmit: (inv: any) => void;
}> = ({ estimate, onClose, onSubmit }) => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white">Convert Estimate to Invoice</h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-xs text-neutral-300">
        Convert {estimate.estimateNumber} for <strong>{estimate.clientName}</strong> (${estimate.totalAmount} CAD) into an active, billable CRA invoice.
      </p>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onSubmit({
              invoiceNumber: 'INV-2026-' + Math.floor(100 + Math.random() * 900),
              clientName: estimate.clientName,
              issueDate: '2026-09-20',
              dueDate: '2026-10-05',
              items: estimate.items || [{ description: 'Converted Work Order', total: estimate.totalAmount }],
              subtotal: Math.round(estimate.totalAmount / 1.13),
              taxAmount: Math.round(estimate.totalAmount - estimate.totalAmount / 1.13),
              totalAmount: estimate.totalAmount,
              paidAmount: 0,
              status: 'unpaid',
            });
          }}
          className="px-5 py-2 rounded-xl bg-[#198cd6] hover:bg-[#1479bb] text-white text-xs font-bold"
        >
          Confirm & Create Invoice
        </button>
      </div>
    </div>
  );
};

// 13. New Expense
const NewExpenseForm: React.FC<{
  accounts: any[];
  onClose: () => void;
  onSubmit: (exp: any) => void;
}> = ({ accounts, onClose, onSubmit }) => {
  const [vendor, setVendor] = useState('Brembo North America');
  const [category, setCategory] = useState('Parts & Inventory');
  const [desc, setDesc] = useState('Ceramic brake disc stock & pads');
  const [amount, setAmount] = useState(840);
  const [method, setMethod] = useState('Operating Visa');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          vendorName: vendor,
          category,
          description: desc,
          amount: Number(amount),
          date: '2026-09-20',
          paymentMethod: method,
          isTaxDeductible: true,
        });
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-red-400" />
          <span>Record Business Expense</span>
        </h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Vendor / Supplier</label>
          <input
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            >
              <option value="Parts & Inventory">Parts & Inventory</option>
              <option value="Equipment & Tools">Equipment & Tools</option>
              <option value="Shop Supplies">Shop Supplies</option>
              <option value="Software & Cloud">Software & Cloud</option>
            </select>
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Amount (CAD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono"
            />
          </div>
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
        >
          Record Expense
        </button>
      </div>
    </form>
  );
};

// 14. New Account
const NewAccountForm: React.FC<{ onClose: () => void; onSubmit: (a: any) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('TD Commercial Operating');
  const [type, setType] = useState('Bank');
  const [balance, setBalance] = useState(12500);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          name,
          type,
          accountNumber: String(Math.floor(1000 + Math.random() * 9000)),
          currentBalance: Number(balance),
          currency: 'CAD',
        });
        onClose();
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white">Add Ledger Account</h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Account Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Account Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            >
              <option value="Cash">Cash in Hand</option>
              <option value="Bank">Chequing / Savings Bank</option>
              <option value="Credit Card">Credit Card</option>
            </select>
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Initial Balance (CAD)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono"
            />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

// 15. New Vendor
const NewVendorForm: React.FC<{ onClose: () => void; onSubmit: (v: any) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Parts Supplier');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          name,
          category,
          contactPerson: contact,
          phone,
          email,
          balance: 0,
        });
        onClose();
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white">Add Automotive Vendor</h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Vendor Business Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Contact Person</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Save Vendor
        </button>
      </div>
    </form>
  );
};

// 16. New Repair Shop
const NewRepairShopForm: React.FC<{ onClose: () => void; onSubmit: (s: any) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Toronto');
  const [phone, setPhone] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          name,
          address,
          city,
          province: 'ON',
          rating: 4.8,
          reviewCount: 34,
          phone,
          openingHours: 'Mon - Fri 8:00 AM - 6:00 PM',
          services: ['General Maintenance', 'Brakes', 'Diagnostics'],
          isAuthorized: true,
        });
        onClose();
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white">Register Partner Repair Shop</h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Shop Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Street Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Add Shop
        </button>
      </div>
    </form>
  );
};

// 17. New Tire Deal
const NewTireDealForm: React.FC<{ onClose: () => void; onSubmit: (t: any) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [brand, setBrand] = useState('Michelin');
  const [model, setModel] = useState('Pilot Sport All Season 4');
  const [size, setSize] = useState('245/45R19');
  const [originalPrice, setOriginalPrice] = useState(340);
  const [discountPrice, setDiscountPrice] = useState(285);
  const [shopName, setShopName] = useState('National Tire & Auto Hub');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          brand,
          model,
          size,
          originalPrice: Number(originalPrice),
          discountPrice: Number(discountPrice),
          shopName,
          shopLocation: 'Toronto, ON',
          contactPhone: '(416) 555-TIRE',
          inStock: true,
        });
        onClose();
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Disc className="w-5 h-5 text-[#76bc21]" />
          <span>Post Tire Deal to Marketplace</span>
        </h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Tire Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Tire Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Fitment Size</label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Regular MSRP ($)</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Promo Deal ($)</label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono"
            />
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Publish Deal
        </button>
      </div>
    </form>
  );
};

// 18. New Diary Note (Matching the video "+ Add Note" in Digital Diary)
const NewDiaryNoteForm: React.FC<{
  date: string;
  onClose: () => void;
  onSubmit: (note: any) => void;
}> = ({ date, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Reminders' | 'Mechanics' | 'Invoicing' | 'Towing' | 'General'>('Reminders');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          date,
          title,
          content,
          category,
          createdTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#76bc21]" />
            <span>Digital Diary Note</span>
          </h3>
          <p className="text-xs text-neutral-400">Scheduled for {date}</p>
        </div>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Title / Subject</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Follow up with Ford F-150 brake caliper delivery"
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          >
            <option value="Reminders">Reminders</option>
            <option value="Mechanics">Mechanics & Diagnostics</option>
            <option value="Invoicing">Invoicing & Collections</option>
            <option value="Towing">Towing Dispatch</option>
            <option value="General">General Operation</option>
          </select>
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Details / Instructions</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={3}
            placeholder="Notes or operational instructions for this day..."
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white text-xs font-bold"
        >
          Save to Digital Diary
        </button>
      </div>
    </form>
  );
};

// 19. 24/7 Emergency Tow Request
const EmergencyTowForm: React.FC<{
  onClose: () => void;
  onSubmit: (tow: any) => void;
}> = ({ onClose, onSubmit }) => {
  const [customer, setCustomer] = useState('David Miller');
  const [phone, setPhone] = useState('(647) 555-8910');
  const [vehicle, setVehicle] = useState('2024 Ford F-150');
  const [location, setLocation] = useState('Hwy 401 Eastbound near Keele St');
  const [destination, setDestination] = useState('Apex Precision Auto Service');
  const [dispatched, setDispatched] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDispatched(true);
        setTimeout(() => {
          onSubmit({
            customerName: customer,
            phone,
            vehicleModel: vehicle,
            currentLocation: location,
            destinationShop: destination,
            status: 'En Route',
            timestamp: 'Just now',
          });
        }, 1000);
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-red-500" />
          <span>24/7 Emergency Roadside & Tow Dispatch</span>
        </h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {dispatched ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-600/20 text-red-500 flex items-center justify-center animate-pulse">
            <Truck className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-white">Tow Truck Dispatched!</h4>
          <p className="text-xs text-neutral-300">
            Flatbed Unit #402 is en route to {location}. Estimated arrival: 18 minutes. Driver will call {phone}.
          </p>
        </div>
      ) : (
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-neutral-300 font-semibold">Driver / Customer Name</label>
            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-neutral-300 font-semibold">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
            <div>
              <label className="text-neutral-300 font-semibold">Vehicle</label>
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                required
                className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Current Breakdown Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Drop-off Repair Facility</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>

          <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg"
            >
              Request Rapid Dispatch
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

// 20. Detailing Booking
const DetailingBookingForm: React.FC<{
  onClose: () => void;
  onSubmit: (b: any) => void;
}> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('Elena Rostova');
  const [vehicle, setVehicle] = useState('2023 Tesla Model Y');
  const [pkg, setPkg] = useState('Executive Full Interior Steam + Exterior Foam');
  const [date, setDate] = useState('2026-09-23');
  const [time, setTime] = useState('11:00 AM');
  const [address, setAddress] = useState('100 King St West, Toronto (Doorstep)');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          customerName: name,
          vehicleModel: vehicle,
          serviceType: pkg,
          date,
          time,
          address,
          status: 'Confirmed',
        });
      }}
      className="p-6 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span>Book Car Detailing Presto</span>
        </h3>
        <button type="button" onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <label className="text-neutral-300 font-semibold">Customer Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Vehicle Make & Model</label>
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Service Package</label>
          <select
            value={pkg}
            onChange={(e) => setPkg(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          >
            <option value="Executive Full Interior Steam + Exterior Foam">
              Executive Full Interior Steam + Exterior Foam ($220 CAD)
            </option>
            <option value="Interior Steam Sanitation & Leather Conditioning">
              Interior Steam Sanitation & Leather Conditioning ($160 CAD)
            </option>
            <option value="Exterior Hand Foam & Ceramic Wax">
              Exterior Hand Foam & Ceramic Wax ($95 CAD)
            </option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-neutral-300 font-semibold">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Time Slot</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
        </div>
        <div>
          <label className="text-neutral-300 font-semibold">Doorstep Service Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold"
        >
          Confirm Detailing Appointment
        </button>
      </div>
    </form>
  );
};

// 21. Tire Deals Browser
const TireDealsBrowser: React.FC<{ deals: any[]; onClose: () => void }> = ({ deals, onClose }) => {
  return (
    <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Disc className="w-5 h-5 text-[#76bc21]" />
            <span>National Tire Deals & Promotions</span>
          </h3>
          <p className="text-xs text-neutral-400">Exclusive Canadian promotional pricing</p>
        </div>
        <button onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {deals.map((d) => (
          <div
            key={d.id}
            className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs"
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-sky-400">{d.brand}</span>
              <h4 className="font-bold text-white text-sm">{d.model}</h4>
              <div className="text-neutral-400 font-mono mt-0.5">{d.size} • {d.shopName}</div>
            </div>
            <div className="text-right">
              <div className="text-base font-black text-[#76bc21]">${d.discountPrice} CAD</div>
              <div className="text-neutral-500 line-through text-[11px]">${d.originalPrice}</div>
              <div className="text-[10px] text-sky-400 font-semibold">Call: {d.contactPhone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 22. Repair Shop Finder
const RepairShopFinder: React.FC<{ shops: any[]; onClose: () => void }> = ({ shops, onClose }) => {
  return (
    <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>Find Certified Repair Facilities</span>
          </h3>
          <p className="text-xs text-neutral-400">Precision mapping & Red Seal ratings</p>
        </div>
        <button onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {shops.map((s) => (
          <div
            key={s.id}
            className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 text-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">{s.name}</h4>
                <div className="text-neutral-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{s.address}, {s.city}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{s.rating}</span>
              </div>
            </div>
            <div className="text-neutral-300 flex items-center justify-between text-[11px] pt-1 border-t border-neutral-800">
              <span>{s.phone}</span>
              <span className="text-[#76bc21] font-semibold">{s.openingHours}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 23. Join National Network
const JoinNetworkForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [joined, setJoined] = useState(false);

  return (
    <div className="p-6 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-lg font-bold text-white">Join the CarDaddy National Network</h3>
        <button onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {joined ? (
        <div className="py-6 text-center space-y-2">
          <CheckCircle className="w-10 h-10 text-[#76bc21] mx-auto" />
          <h4 className="text-sm font-bold text-white">Application Received!</h4>
          <p className="text-neutral-400">
            Our automotive network onboarding team will verify your shop license and contact you within 24 hours.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-neutral-300 leading-relaxed">
            Expand your garage footprint across Canada. List surplus parts, tires, and certified repair capabilities directly to verified drivers.
          </p>
          <div>
            <label className="text-neutral-300 font-semibold">Business Name</label>
            <input
              type="text"
              placeholder="e.g. Metro Auto Specialists"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <div>
            <label className="text-neutral-300 font-semibold">Business Email</label>
            <input
              type="email"
              placeholder="shop@example.ca"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
            />
          </div>
          <button
            onClick={() => setJoined(true)}
            className="w-full py-2.5 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-sm"
          >
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
};

// 24. Modals for FAQ, Privacy, Terms, Delete Account, AutoBody, Digital History, Invoicing Preview
const FaqModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <div className="space-y-3">
      <div>
        <h4 className="font-bold text-white text-sm">How does the Digital Bill Book calculate next due service?</h4>
        <p className="mt-1 text-neutral-400">
          CarDaddy algorithms combine your historical daily driving distance with OEM mileage thresholds (e.g. 8,000 km oil intervals) to alert you via push/SMS before deadlines.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">Is my vehicle data kept in Canada?</h4>
        <p className="mt-1 text-neutral-400">
          Yes. All CarDaddy database clusters and encryption keys reside strictly in Canadian cloud data centers (Montreal & Toronto).
        </p>
      </div>
    </div>
  </div>
);

const PrivacyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-3 text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <p>CarDaddy respects PIPEDA and Canadian privacy standards. We never sell your vehicle telemetry or owner contact information to unauthorized brokers.</p>
  </div>
);

const TermsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-3 text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-white">Terms of Service</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <p>Use of CarDaddy Digital Bill Book and dispatch networks are governed by Canadian commercial laws.</p>
  </div>
);

const DeleteAccountModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 text-xs">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <span>Delete CarDaddy Account</span>
      </h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <p className="text-neutral-300">
      Warning: Deleting your account permanently purges all registered vehicles, Digital Bill Book service histories, invoices, and diagnostic records.
    </p>
    <div className="flex justify-end gap-2">
      <button onClick={onClose} className="px-4 py-2 bg-neutral-800 rounded-xl text-neutral-300">Cancel</button>
      <button onClick={() => { alert('Account deletion scheduled in accordance with PIPEDA.'); onClose(); }} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl">Permanently Delete</button>
    </div>
  </div>
);

const AutoBodyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-white">CarDaddy AutoBody Specialist Network</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <p>Certified partner body shops offering paintless dent repair (PDR), factory laser color matching, and aluminum structural restoration across Canada.</p>
  </div>
);

const DigitalHistoryPreviewModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-white">Digital Service History Verified Registry</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
      <div className="text-sm font-bold text-white">2024 Ford F-150 SuperCrew (VIN: 1FTFW1ED4PFA29104)</div>
      <div className="text-neutral-400">• 12,450 km - Synthetic Oil & Tire Rotation ($165 CAD)</div>
      <div className="text-neutral-400">• 24,900 km - Brake Inspection & Cabin Filter ($240 CAD)</div>
      <div className="text-emerald-400 font-bold mt-2">✓ 100% Verified Digital Bill Book</div>
    </div>
  </div>
);

const InvoicingPreviewModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-white">Digital Invoicing Preview</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <p>CRA-compliant invoicing with automatic HST/PST calculations, line-item labor breakdowns, and printable PDF exports.</p>
  </div>
);

const AppDownloadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 text-center text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-left">
      <h3 className="text-lg font-bold text-white">Download CarDaddy Mobile</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <p>Experience one-tap emergency towing, sitting inventory parts listing, and digital service diary reminders on iOS & Android.</p>
    <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 font-mono text-sm text-[#76bc21]">
      Available on App Store & Google Play Canada
    </div>
  </div>
);

const PagesDirectoryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-white">CarDaddy Site Directory</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="p-2.5 rounded bg-neutral-900">• Public Marketing Home</div>
      <div className="p-2.5 rounded bg-neutral-900">• Admin Portal Login</div>
      <div className="p-2.5 rounded bg-neutral-900">• Overview & Aging Reports</div>
      <div className="p-2.5 rounded bg-neutral-900">• People & Fleet Clients</div>
      <div className="p-2.5 rounded bg-neutral-900">• Invoices & Estimates</div>
      <div className="p-2.5 rounded bg-neutral-900">• Expenses & Accounts</div>
      <div className="p-2.5 rounded bg-neutral-900">• Vehicles & Digital Bill Book</div>
      <div className="p-2.5 rounded bg-neutral-900">• 24/7 Roadside Towing</div>
    </div>
  </div>
);

const ContactModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-lg font-bold text-white">Contact CarDaddy Support</h3>
      <button onClick={onClose}><X className="w-5 h-5" /></button>
    </div>
    <div className="space-y-2">
      <div>Dispatch: <strong>1-800-555-DADDY (3233)</strong></div>
      <div>Email: <strong>support@cardaddy.ca</strong></div>
      <div>Headquarters: <strong>Toronto, Ontario, Canada</strong></div>
    </div>
  </div>
);

const NotificationsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setAdminTab } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 space-y-4 text-xs text-neutral-300">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-white">Recent Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">
              {unreadCount} new
            </span>
          )}
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <div className="py-6 text-center text-neutral-500">No notifications.</div>
        ) : (
          notifications.slice(0, 5).map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-3 rounded-xl border transition cursor-pointer ${
                n.read
                  ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                  : 'bg-neutral-800/80 border-neutral-700 text-white font-medium'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">{n.title}</span>
                <span className="text-[10px] text-neutral-500">{n.time}</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">{n.message}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-neutral-400 hover:text-white transition"
          >
            Mark all as read
          </button>
        )}
        <button
          onClick={() => {
            setAdminTab('notifications');
            onClose();
          }}
          className="ml-auto px-3 py-1.5 rounded-lg bg-[#76bc21] text-black font-bold hover:bg-[#68a61d] transition"
        >
          Open Notifications Center
        </button>
      </div>
    </div>
  );
};

const ProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { users, showToast } = useApp();
  const currentUser = users && users.length > 0 ? users[0] : null;
  const [name, setName] = useState(currentUser?.name || 'Alexander Vance');
  const [email, setEmail] = useState(currentUser?.email || 'admin@cardaddy.ca');

  return (
    <div className="p-6 space-y-4 text-xs text-neutral-300">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-base font-bold text-white">Administrator Account</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
        <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-lg text-white">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-white text-sm">{name}</div>
          <div className="text-sky-400 text-[11px]">Master Fleet Admin & Operator</div>
          <div className="text-neutral-500 text-[10px]">CRA Canadian Business Account #849201948RT0001</div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-neutral-400 mb-1">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-neutral-400 mb-1">Contact Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
          <div>Region: <strong>Canada (Eastern)</strong></div>
          <div>Hosting: <strong>Canadian Sovereign Cloud</strong></div>
          <div>Currency: <strong>CAD ($)</strong></div>
          <div>Tax: <strong>Auto HST/GST (13% ON)</strong></div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white">
          Cancel
        </button>
        <button
          onClick={() => {
            showToast('Account profile preferences updated.');
            onClose();
          }}
          className="px-4 py-2 rounded-lg bg-[#76bc21] text-black font-bold hover:bg-[#68a61d]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="p-6 space-y-4 text-xs text-neutral-300">
    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
      <h3 className="text-base font-bold text-white">CarDaddy Help & Documentation</h3>
      <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white">
        <X className="w-5 h-5" />
      </button>
    </div>

    <div className="space-y-3">
      <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
        <div className="font-bold text-white">📖 How does the Digital Bill Book work?</div>
        <div className="text-neutral-400">
          Every oil change, brake service, tire swap, or inspection logged creates a permanent, tamper-resistant record. When selling your vehicle or managing fleet compliance, these records verify complete maintenance.
        </div>
      </div>

      <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
        <div className="font-bold text-white">🔔 Smart Next-Due Reminders</div>
        <div className="text-neutral-400">
          CarDaddy automatically estimates odometer progression and sends push/email alerts at -1,000 km, -250 km, and when overdue for synthetic oil, transmission, or coolant flushes.
        </div>
      </div>

      <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
        <div className="font-bold text-white">🚨 24/7 Roadside Towing Dispatch</div>
        <div className="text-neutral-400">
          In an emergency, click the Roadside Towing button or dial 1-800-555-DADDY for rapid flatbed dispatch anywhere in major Canadian metro corridors.
        </div>
      </div>
    </div>

    <div className="pt-2 border-t border-neutral-800 flex justify-end">
      <button onClick={onClose} className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium">
        Close Help
      </button>
    </div>
  </div>
);

const EditVendorModal: React.FC<{ vendor: any; onClose: () => void }> = ({ vendor, onClose }) => {
  const { showToast } = useApp();
  const [name, setName] = useState(vendor?.name || '');
  const [category, setCategory] = useState(vendor?.category || 'OEM Parts');
  const [contactPerson, setContactPerson] = useState(vendor?.contactPerson || '');
  const [phone, setPhone] = useState(vendor?.phone || '');
  const [email, setEmail] = useState(vendor?.email || '');

  return (
    <div className="p-6 space-y-4 text-xs text-neutral-300">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-base font-bold text-white">Edit Vendor: {vendor?.name}</h3>
        <button onClick={onClose}><X className="w-5 h-5" /></button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-neutral-400 mb-1">Company / Vendor Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-neutral-400 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-neutral-400 mb-1">Contact Person</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-neutral-400 mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-neutral-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-neutral-800 text-white">Cancel</button>
        <button
          onClick={() => {
            showToast(`Vendor ${name} updated successfully.`);
            onClose();
          }}
          className="px-4 py-2 rounded-lg bg-[#76bc21] text-black font-bold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const EditTireDealModal: React.FC<{ deal: any; onClose: () => void }> = ({ deal, onClose }) => {
  const { showToast } = useApp();
  const [brand, setBrand] = useState(deal?.brand || '');
  const [model, setModel] = useState(deal?.model || '');
  const [size, setSize] = useState(deal?.size || '');
  const [price, setPrice] = useState(deal?.salePrice || deal?.discountPrice || deal?.originalPrice || 0);

  return (
    <div className="p-6 space-y-4 text-xs text-neutral-300">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <h3 className="text-base font-bold text-white">Edit Tire Deal</h3>
        <button onClick={onClose}><X className="w-5 h-5" /></button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-neutral-400 mb-1">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-neutral-400 mb-1">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-neutral-400 mb-1">Tire Size</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-neutral-400 mb-1">Sale Price ($ CAD)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-neutral-800 text-white">Cancel</button>
        <button
          onClick={() => {
            showToast(`Tire promotion updated.`);
            onClose();
          }}
          className="px-4 py-2 rounded-lg bg-[#76bc21] text-black font-bold"
        >
          Save Promotion
        </button>
      </div>
    </div>
  );
};

