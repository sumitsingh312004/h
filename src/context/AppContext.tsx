import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Vehicle,
  ServiceRecord,
  Client,
  InvoiceItem,
  Invoice,
  Estimate,
  Expense,
  Income,
  Account,
  DiaryNote,
  TeamMember,
  RepairShop,
  TireDeal,
  DetailingBooking,
  TowRequest,
  NotificationItem,
  Vendor,
  User,
} from '../types';
import {
  initialClients,
  initialVehicles,
  initialServiceRecords,
  initialInvoiceItems,
  initialInvoices,
  initialEstimates,
  initialExpenses,
  initialIncomes,
  initialAccounts,
  initialDiaryNotes,
  initialTeamMembers,
  initialRepairShops,
  initialTireDeals,
  initialDetailingBookings,
  initialTowRequests,
  initialNotifications,
} from '../data/initialData';

export type AppView = 'public' | 'admin-login' | 'admin';
export type AdminPrimaryTab =
  | 'home'
  | 'diary'
  | 'people'
  | 'invoices'
  | 'estimates'
  | 'expenses'
  | 'incomes'
  | 'accounts'
  | 'reports'
  | 'payroll'
  | 'invite'
  | 'vehicles'
  | 'repair-shops'
  | 'tire-deals'
  | 'services-dispatch'
  | 'notifications'
  | 'settings';

interface AppContextType {
  // Navigation & View
  view: AppView;
  setView: (view: AppView) => void;
  adminTab: AdminPrimaryTab;
  setAdminTab: (tab: AdminPrimaryTab) => void;
  adminSubTab: string;
  setAdminSubTab: (subTab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Authentication
  isAdminLoggedIn: boolean;
  loginAsAdmin: (email?: string, password?: string) => boolean;
  logoutAdmin: () => void;

  // Data Collections
  vehicles: Vehicle[];
  serviceRecords: ServiceRecord[];
  clients: Client[];
  invoiceItems: InvoiceItem[];
  invoices: Invoice[];
  estimates: Estimate[];
  expenses: Expense[];
  incomes: Income[];
  accounts: Account[];
  diaryNotes: DiaryNote[];
  teamMembers: TeamMember[];
  repairShops: RepairShop[];
  tireDeals: TireDeal[];
  detailingBookings: DetailingBooking[];
  towRequests: TowRequest[];
  notifications: NotificationItem[];
  vendors: Vendor[];
  users: User[];

  // Mutators
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  archiveClient: (id: string) => void;

  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;

  addServiceRecord: (record: Omit<ServiceRecord, 'id'>) => void;
  deleteServiceRecord: (id: string) => void;

  addInvoiceItem: (item: Omit<InvoiceItem, 'id' | 'costWithGst'>) => void;
  updateInvoiceItem: (id: string, item: Partial<InvoiceItem>) => void;
  deleteInvoiceItem: (id: string) => void;

  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  markInvoicePaid: (id: string) => void;

  addEstimate: (estimate: Omit<Estimate, 'id'>) => void;
  updateEstimate: (id: string, estimate: Partial<Estimate>) => void;
  deleteEstimate: (id: string) => void;
  convertEstimateToInvoice: (estimateId: string) => void;

  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;

  addIncome: (income: Omit<Income, 'id'>) => void;
  deleteIncome: (id: string) => void;

  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;

  addDiaryNote: (note: Omit<DiaryNote, 'id'>) => void;
  toggleDiaryNoteCompleted: (id: string) => void;
  deleteDiaryNote: (id: string) => void;

  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  deleteTeamMember: (id: string) => void;

  addDetailingBooking: (booking: Omit<DetailingBooking, 'id'>) => void;
  updateDetailingStatus: (id: string, status: DetailingBooking['status']) => void;

  addTowRequest: (request: Omit<TowRequest, 'id'>) => void;
  updateTowStatus: (id: string, status: TowRequest['status']) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (title: string, message: string, type: NotificationItem['type']) => void;

  // Automotive Network & Accounting helpers
  addRepairShop: (shop: any) => void;
  deleteRepairShop: (id: string) => void;
  addTireDeal: (deal: any) => void;
  deleteTireDeal: (id: string) => void;
  addVendor: (vendor: any) => void;
  deleteVendor: (id: string) => void;
  deleteUser: (id: string) => void;
  updateVehicleOdometer: (vehicleId: string, odo: number) => void;
  recordPayment: (invoiceId: string, amount: number) => void;
  payrollRecords: any[];

  // Modals & Panels
  activeModal: string | null;
  openModal: (modalName: string, modalProps?: any) => void;
  closeModal: () => void;
  modalProps: any;
  modalState: { isOpen: boolean; type: string | null; data: any };

  // Search & Global state
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Theme
  const [view, setView] = useState<AppView>('public');
  const [adminTab, setAdminTabState] = useState<AdminPrimaryTab>('home');
  const [adminSubTab, setAdminSubTab] = useState<string>('overview');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cd_dark_mode');
    return saved !== null ? saved === 'true' : false;
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Data Collections with initial state
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('cd_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('cd_vehicles');
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(() => {
    const saved = localStorage.getItem('cd_service_records');
    return saved ? JSON.parse(saved) : initialServiceRecords;
  });

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>(() => {
    const saved = localStorage.getItem('cd_invoice_items');
    return saved ? JSON.parse(saved) : initialInvoiceItems;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('cd_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [estimates, setEstimates] = useState<Estimate[]>(() => {
    const saved = localStorage.getItem('cd_estimates');
    return saved ? JSON.parse(saved) : initialEstimates;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('cd_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [incomes, setIncomes] = useState<Income[]>(() => {
    const saved = localStorage.getItem('cd_incomes');
    return saved ? JSON.parse(saved) : initialIncomes;
  });

  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('cd_accounts');
    return saved ? JSON.parse(saved) : initialAccounts;
  });

  const [diaryNotes, setDiaryNotes] = useState<DiaryNote[]>(() => {
    const saved = localStorage.getItem('cd_diary_notes');
    return saved ? JSON.parse(saved) : initialDiaryNotes;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('cd_team_members');
    return saved ? JSON.parse(saved) : initialTeamMembers;
  });

  const [repairShops, setRepairShops] = useState<RepairShop[]>(initialRepairShops);
  const [tireDeals, setTireDeals] = useState<TireDeal[]>(initialTireDeals);
  const [detailingBookings, setDetailingBookings] = useState<DetailingBooking[]>(initialDetailingBookings);
  const [towRequests, setTowRequests] = useState<TowRequest[]>(initialTowRequests);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 'ven-1',
      name: 'NAPA Auto Parts Canada',
      category: 'OEM Parts & Consumables',
      contactPerson: 'David Miller',
      phone: '+1 (416) 555-8822',
      email: 'orders@napacanada.com',
      balance: 1420,
    },
    {
      id: 'ven-2',
      name: 'Kal Tire Fleet Supply',
      category: 'Tires & Wheels Distribution',
      contactPerson: 'Elena Rostova',
      phone: '+1 (604) 555-3911',
      email: 'commercial@kaltire.com',
      balance: 2850,
    },
    {
      id: 'ven-3',
      name: 'Castrol Industrial Lubricants',
      category: 'Fluids & Filters',
      contactPerson: 'Markus Chen',
      phone: '+1 (514) 555-7744',
      email: 'support@castrol.ca',
      balance: 890,
    },
  ]);
  const [users, setUsers] = useState<User[]>([
    {
      id: 'usr-1',
      name: 'Alexander Vance',
      email: 'alex@cardaddy.ca',
      role: 'Master Administrator & Owner',
      status: 'Active',
      lastLogin: 'Today, 09:42 AM',
    },
    {
      id: 'usr-2',
      name: 'Jean-Marc Tremblay',
      email: 'tech.lead@cardaddy.ca',
      role: 'Red Seal Lead Mechanic',
      status: 'Active',
      lastLogin: 'Today, 08:15 AM',
    },
    {
      id: 'usr-3',
      name: 'Sarah Kowalski',
      email: 'advisor@cardaddy.ca',
      role: 'Senior Service Advisor',
      status: 'Active',
      lastLogin: 'Yesterday, 05:30 PM',
    },
  ]);

  // Modals & Notifications
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalProps, setModalProps] = useState<any>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cd_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('cd_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('cd_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('cd_estimates', JSON.stringify(estimates));
  }, [estimates]);

  useEffect(() => {
    localStorage.setItem('cd_invoice_items', JSON.stringify(invoiceItems));
  }, [invoiceItems]);

  useEffect(() => {
    localStorage.setItem('cd_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('cd_incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('cd_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('cd_diary_notes', JSON.stringify(diaryNotes));
  }, [diaryNotes]);

  // Tab switcher with smart default subtabs
  const setAdminTab = (tab: AdminPrimaryTab) => {
    setAdminTabState(tab);
    switch (tab) {
      case 'home':
        setAdminSubTab('overview');
        break;
      case 'people':
        setAdminSubTab('clients');
        break;
      case 'invoices':
        setAdminSubTab('invoices');
        break;
      case 'estimates':
        setAdminSubTab('estimates');
        break;
      case 'expenses':
        setAdminSubTab('expenses');
        break;
      case 'incomes':
        setAdminSubTab('incomes');
        break;
      case 'accounts':
        setAdminSubTab('accounts');
        break;
      case 'reports':
        setAdminSubTab('popular');
        break;
      case 'payroll':
        setAdminSubTab('team');
        break;
      case 'vehicles':
        setAdminSubTab('all');
        break;
      case 'repair-shops':
        setAdminSubTab('shops');
        break;
      case 'tire-deals':
        setAdminSubTab('deals');
        break;
      case 'services-dispatch':
        setAdminSubTab('detailing');
        break;
      case 'settings':
        setAdminSubTab('general');
        break;
      default:
        setAdminSubTab('default');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem('cd_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth
  const loginAsAdmin = (email = 'admin@cardaddy.ca', password = '') => {
    setIsAdminLoggedIn(true);
    setView('admin');
    showToast('Signed in successfully as Administrator.');
    return true;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setView('public');
    showToast('Logged out of Admin Portal.');
  };

  const openModal = (modalName: string, props: any = null) => {
    setActiveModal(modalName);
    setModalProps(props);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalProps(null);
  };

  // Helper notification adder
  const addNotification = (title: string, message: string, type: NotificationItem['type']) => {
    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title,
      message,
      type,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Mutators
  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: 'c_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      vehiclesCount: clientData.vehiclesCount || 0,
      totalSpent: clientData.totalSpent || 0,
      outstandingBalance: clientData.outstandingBalance || 0,
    };
    setClients((prev) => [newClient, ...prev]);
    showToast(`Client ${newClient.company || newClient.ownerName} added successfully.`);
    addNotification('New Client Added', `${newClient.company || newClient.ownerName} was registered.`, 'system');
  };

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...clientData } : c)));
    showToast('Client updated successfully.');
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast('Client removed.');
  };

  const archiveClient = (id: string) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'archived' ? 'active' : 'archived' } : c))
    );
    showToast('Client archive status updated.');
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: 'v_' + Date.now(),
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    showToast(`Vehicle ${newVehicle.year} ${newVehicle.make} ${newVehicle.model} added.`);
    addNotification('Vehicle Registered', `${newVehicle.make} ${newVehicle.model} added to fleet.`, 'system');
  };

  const updateVehicle = (id: string, vehicleData: Partial<Vehicle>) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...vehicleData } : v)));
    showToast('Vehicle updated successfully.');
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    showToast('Vehicle removed from system.');
  };

  const addServiceRecord = (recordData: Omit<ServiceRecord, 'id'>) => {
    const newRecord: ServiceRecord = {
      ...recordData,
      id: 'sr_' + Date.now(),
    };
    setServiceRecords((prev) => [newRecord, ...prev]);
    showToast(`Service record added for ${newRecord.vehicleName}.`);
    addNotification('Service Recorded', `${newRecord.serviceType} recorded for ${newRecord.vehicleName}.`, 'system');
  };

  const deleteServiceRecord = (id: string) => {
    setServiceRecords((prev) => prev.filter((s) => s.id !== id));
    showToast('Service record removed.');
  };

  const addInvoiceItem = (itemData: Omit<InvoiceItem, 'id' | 'costWithGst'>) => {
    const costWithGst = Number(
      (itemData.unitCost * (1 + (itemData.gstPercent || 0) / 100)).toFixed(2)
    );
    const newItem: InvoiceItem = {
      ...itemData,
      id: 'item_' + Date.now(),
      costWithGst,
      status: 'active',
    };
    setInvoiceItems((prev) => [newItem, ...prev]);
    showToast(`Item "${newItem.name}" saved to catalog.`);
  };

  const updateInvoiceItem = (id: string, itemData: Partial<InvoiceItem>) => {
    setInvoiceItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...itemData };
          updated.costWithGst = Number(
            (updated.unitCost * (1 + (updated.gstPercent || 0) / 100)).toFixed(2)
          );
          return updated;
        }
        return item;
      })
    );
    showToast('Item updated successfully.');
  };

  const deleteInvoiceItem = (id: string) => {
    setInvoiceItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed.');
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: 'inv_' + Date.now(),
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    showToast(`Invoice ${newInvoice.invoiceNumber} generated.`);
    addNotification('New Invoice Created', `${newInvoice.invoiceNumber} for ${newInvoice.clientName} created.`, 'system');
  };

  const updateInvoice = (id: string, invoiceData: Partial<Invoice>) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, ...invoiceData } : inv)));
    showToast('Invoice updated.');
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    showToast('Invoice deleted.');
  };

  const markInvoicePaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          return {
            ...inv,
            status: 'paid',
            paidAmount: inv.totalAmount,
          };
        }
        return inv;
      })
    );
    showToast('Invoice marked as Paid.');
    addNotification('Payment Settled', 'An invoice has been marked as fully paid.', 'invoice_paid');
  };

  const addEstimate = (estimateData: Omit<Estimate, 'id'>) => {
    const newEst: Estimate = {
      ...estimateData,
      id: 'est_' + Date.now(),
    };
    setEstimates((prev) => [newEst, ...prev]);
    showToast(`Estimate ${newEst.estimateNumber} generated.`);
  };

  const updateEstimate = (id: string, estimateData: Partial<Estimate>) => {
    setEstimates((prev) => prev.map((est) => (est.id === id ? { ...est, ...estimateData } : est)));
    showToast('Estimate updated.');
  };

  const deleteEstimate = (id: string) => {
    setEstimates((prev) => prev.filter((est) => est.id !== id));
    showToast('Estimate removed.');
  };

  const convertEstimateToInvoice = (estimateId: string) => {
    const est = estimates.find((e) => e.id === estimateId);
    if (!est) return;

    const newInvoice: Invoice = {
      id: 'inv_' + Date.now(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      clientId: est.clientId,
      clientName: est.clientName,
      vehicleId: est.vehicleId,
      vehicleName: est.vehicleName,
      items: est.items,
      subtotal: est.subtotal || 0,
      gst: est.hst || 0,
      totalAmount: est.totalAmount,
      paidAmount: 0,
      status: 'sent',
      recordStatus: 'active',
      notes: `Converted from Estimate ${est.estimateNumber}.`,
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    setEstimates((prev) => prev.map((e) => (e.id === estimateId ? { ...e, status: 'accepted' } : e)));
    showToast(`Estimate converted to Invoice ${newInvoice.invoiceNumber}.`);
    setAdminTab('invoices');
    setAdminSubTab('invoices');
  };

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExp: Expense = {
      ...expenseData,
      id: 'exp_' + Date.now(),
    };
    setExpenses((prev) => [newExp, ...prev]);
    showToast(`Expense for ${newExp.vendor} recorded.`);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    showToast('Expense removed.');
  };

  const addIncome = (incomeData: Omit<Income, 'id'>) => {
    const newInc: Income = {
      ...incomeData,
      id: 'inc_' + Date.now(),
    };
    setIncomes((prev) => [newInc, ...prev]);
    showToast(`Income from ${newInc.source} recorded.`);
  };

  const deleteIncome = (id: string) => {
    setIncomes((prev) => prev.filter((inc) => inc.id !== id));
    showToast('Income record removed.');
  };

  const addAccount = (accData: Omit<Account, 'id'>) => {
    const newAcc: Account = {
      ...accData,
      id: 'acc_' + Date.now(),
    };
    setAccounts((prev) => [newAcc, ...prev]);
    showToast(`Account ${newAcc.name} created.`);
  };

  const updateAccount = (id: string, accData: Partial<Account>) => {
    setAccounts((prev) => prev.map((acc) => (acc.id === id ? { ...acc, ...accData } : acc)));
    showToast('Account updated.');
  };

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    showToast('Account deleted.');
  };

  const addDiaryNote = (noteData: Omit<DiaryNote, 'id'>) => {
    const newNote: DiaryNote = {
      ...noteData,
      id: 'note_' + Date.now(),
    };
    setDiaryNotes((prev) => [newNote, ...prev]);
    showToast('Note added to Digital Diary.');
  };

  const toggleDiaryNoteCompleted = (id: string) => {
    setDiaryNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  };

  const deleteDiaryNote = (id: string) => {
    setDiaryNotes((prev) => prev.filter((n) => n.id !== id));
    showToast('Diary note removed.');
  };

  const addTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...memberData,
      id: 'tm_' + Date.now(),
    };
    setTeamMembers((prev) => [newMember, ...prev]);
    showToast(`Team member ${newMember.name} added.`);
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((tm) => tm.id !== id));
    showToast('Team member removed.');
  };

  const addDetailingBooking = (bookingData: Omit<DetailingBooking, 'id'>) => {
    const newBooking: DetailingBooking = {
      ...bookingData,
      id: 'db_' + Date.now(),
    };
    setDetailingBookings((prev) => [newBooking, ...prev]);
    showToast(`Detailing scheduled for ${newBooking.customerName}!`);
    addNotification('Detailing Booking Confirmed', `${newBooking.customerName} booked ${newBooking.packageType}.`, 'new_booking');
  };

  const updateDetailingStatus = (id: string, status: DetailingBooking['status']) => {
    setDetailingBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    showToast(`Booking status updated to ${status}.`);
  };

  const addTowRequest = (requestData: Omit<TowRequest, 'id'>) => {
    const newReq: TowRequest = {
      ...requestData,
      id: 'tow_' + Date.now(),
    };
    setTowRequests((prev) => [newReq, ...prev]);
    showToast('Emergency towing dispatch requested! Help is on the way.');
    addNotification('Emergency Tow Requested', `Tow dispatched for ${newReq.vehicle} at ${newReq.currentLocation}.`, 'tow_request');
  };

  const updateTowStatus = (id: string, status: TowRequest['status']) => {
    setTowRequests((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    showToast(`Tow status updated to ${status}.`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const addRepairShop = (shopData: any) => {
    const newShop = {
      ...shopData,
      id: 'rs_' + Date.now(),
      rating: shopData.rating || 4.9,
      reviewsCount: shopData.reviewsCount || 12,
      isVerified: true,
      dealsActive: 2,
      status: 'Verified' as const,
    };
    setRepairShops((prev) => [newShop, ...prev]);
    showToast(`Repair shop ${newShop.name} registered.`);
    addNotification('Shop Registered', `${newShop.name} added to CarDaddy certified network.`, 'system');
  };

  const deleteRepairShop = (id: string) => {
    setRepairShops((prev) => prev.filter((s) => s.id !== id));
    showToast('Repair shop removed.');
  };

  const addTireDeal = (dealData: any) => {
    const newDeal = {
      ...dealData,
      id: 'td_' + Date.now(),
      discountPercent: Math.round(
        ((dealData.originalPrice - (dealData.salePrice || dealData.discountPrice)) /
          dealData.originalPrice) *
          100
      ),
      salePrice: dealData.discountPrice || dealData.salePrice,
      status: 'Active' as const,
    };
    setTireDeals((prev) => [newDeal, ...prev]);
    showToast(`Tire promotion for ${newDeal.brand} ${newDeal.model} published.`);
    addNotification('Tire Deal Published', `${newDeal.brand} ${newDeal.size} is now live on marketplace.`, 'system');
  };

  const deleteTireDeal = (id: string) => {
    setTireDeals((prev) => prev.filter((d) => d.id !== id));
    showToast('Tire promotion deleted.');
  };

  const addVendor = (vendorData: any) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: 'ven-' + Date.now(),
      balance: vendorData.balance || 0,
    };
    setVendors((prev) => [newVendor, ...prev]);
    showToast(`Vendor ${newVendor.name} saved.`);
  };

  const deleteVendor = (id: string) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
    showToast('Vendor removed.');
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast('User removed.');
  };

  const updateVehicleOdometer = (vehicleId: string, odo: number) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId) {
          const isOverdue = odo >= v.nextServiceMileage;
          const isDue = odo >= v.nextServiceMileage - 1000;
          return {
            ...v,
            currentMileage: odo,
            status: isOverdue ? 'Overdue' : isDue ? 'Service Due' : 'Good',
          };
        }
        return v;
      })
    );
    showToast(`Odometer updated to ${odo.toLocaleString()} km.`);
  };

  const recordPayment = (invoiceId: string, amount: number) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const newPaid = (inv.paidAmount || 0) + amount;
          const isPaid = newPaid >= inv.totalAmount;
          return {
            ...inv,
            paidAmount: newPaid,
            status: isPaid ? 'paid' : 'sent',
          };
        }
        return inv;
      })
    );
    showToast(`Payment of $${amount} recorded.`);
    addNotification('Payment Received', `$${amount} CAD payment recorded for invoice.`, 'invoice_paid');
  };

  const payrollRecords = [
    {
      id: 'pr-1',
      employeeName: 'Jean-Marc Tremblay',
      role: 'Red Seal Lead Diagnostic Tech',
      payPeriod: 'Sep 01 - Sep 15, 2026',
      hoursWorked: 80,
      hourlyRate: 46,
      grossPay: 3680,
      netPay: 2840,
      status: 'Paid Direct Deposit',
    },
    {
      id: 'pr-2',
      employeeName: 'Sarah Kowalski',
      role: 'Service Advisor & Parts Specialist',
      payPeriod: 'Sep 01 - Sep 15, 2026',
      hoursWorked: 75,
      hourlyRate: 34,
      grossPay: 2550,
      netPay: 2010,
      status: 'Paid Direct Deposit',
    },
    {
      id: 'pr-3',
      employeeName: 'Harpreet Singh',
      role: 'Towing & Flatbed Specialist',
      payPeriod: 'Sep 01 - Sep 15, 2026',
      hoursWorked: 84,
      hourlyRate: 38,
      grossPay: 3192,
      netPay: 2470,
      status: 'Paid Direct Deposit',
    },
  ];

  const modalState = {
    isOpen: Boolean(activeModal),
    type: activeModal,
    data: modalProps || {},
  };

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        adminTab,
        setAdminTab,
        adminSubTab,
        setAdminSubTab,
        darkMode,
        toggleDarkMode,
        isAdminLoggedIn,
        loginAsAdmin,
        logoutAdmin,
        vehicles,
        serviceRecords,
        clients,
        invoiceItems,
        invoices,
        estimates,
        expenses,
        incomes,
        accounts,
        diaryNotes,
        teamMembers,
        repairShops,
        tireDeals,
        detailingBookings,
        towRequests,
        notifications,
        addClient,
        updateClient,
        deleteClient,
        archiveClient,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addServiceRecord,
        deleteServiceRecord,
        addInvoiceItem,
        updateInvoiceItem,
        deleteInvoiceItem,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        markInvoicePaid,
        addEstimate,
        updateEstimate,
        deleteEstimate,
        convertEstimateToInvoice,
        addExpense,
        deleteExpense,
        addIncome,
        deleteIncome,
        addAccount,
        updateAccount,
        deleteAccount,
        addDiaryNote,
        toggleDiaryNoteCompleted,
        deleteDiaryNote,
        addTeamMember,
        deleteTeamMember,
        addDetailingBooking,
        updateDetailingStatus,
        addTowRequest,
        updateTowStatus,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        addRepairShop,
        deleteRepairShop,
        addTireDeal,
        deleteTireDeal,
        addVendor,
        updateVehicleOdometer,
        recordPayment,
        payrollRecords,
        vendors,
        users,
        deleteVendor,
        deleteUser,
        activeModal,
        openModal,
        closeModal,
        modalProps,
        modalState,
        globalSearchQuery,
        setGlobalSearchQuery,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
