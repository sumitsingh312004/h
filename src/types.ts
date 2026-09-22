export interface Vehicle {
  id: string;
  ownerId?: string;
  ownerName: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  currentMileage: number;
  engine?: string;
  fuelType?: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric' | string;
  transmission?: 'Automatic' | 'Manual' | string;
  purchaseDate?: string;
  serviceIntervalKm: number;
  lastServiceDate?: string;
  lastServiceMileage?: number;
  nextServiceDate: string;
  nextServiceMileage: number;
  nextServiceType: string;
  insuranceExpiry?: string;
  notes?: string;
  status: 'Good' | 'Service Due' | 'Overdue' | 'In Shop' | string;
  serviceHistory?: any[];
}

export interface ServiceRecord {
  id: string;
  vehicleId?: string;
  vehicleName?: string;
  date: string;
  mileage: number;
  serviceType: string;
  workshopName?: string;
  shopName?: string;
  technician?: string;
  parts?: string;
  laborHours?: number;
  cost: number;
  notes?: string;
  invoiceId?: string;
  status?: 'Completed' | 'In Progress' | 'Scheduled' | string;
}

export interface Client {
  id: string;
  name?: string;
  company?: string;
  ownerName?: string;
  email: string;
  phone?: string;
  mobile?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  vehicleCount?: number;
  vehiclesCount?: number;
  totalSpent?: number;
  totalDue?: number;
  outstandingBalance?: number;
  status: 'active' | 'archived' | 'deleted' | 'inactive' | string;
  createdAt?: string;
}

export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  totalStock: number;
  unitCost: number;
  gstPercent: number;
  costWithGst: number;
  status: 'active' | 'archived' | 'deleted' | string;
}

export interface InvoiceLineItem {
  id?: string;
  itemId?: string;
  description: string;
  quantity?: number;
  unitPrice?: number;
  taxPercent?: number;
  amount?: number;
  total?: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date?: string;
  issueDate?: string;
  dueDate: string;
  clientId?: string;
  clientName: string;
  vehicleId?: string;
  vehicleName?: string;
  items: any[];
  subtotal: number;
  gst?: number;
  taxAmount?: number;
  totalAmount: number;
  paidAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partial' | 'unpaid' | string;
  recordStatus?: 'active' | 'archived' | 'deleted' | string;
  notes?: string;
}

export interface Estimate {
  id: string;
  estimateNumber: string;
  date: string;
  validUntil?: string;
  expiryDate?: string;
  clientId?: string;
  clientName: string;
  vehicleId?: string;
  vehicleName?: string;
  items: any[];
  subtotal?: number;
  hst?: number;
  otherCharges?: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined' | 'pending' | string;
  recordStatus?: 'active' | 'archived' | 'deleted' | string;
  notes?: string;
}

export interface Expense {
  id: string;
  date: string;
  vendor?: string;
  vendorName?: string;
  category: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
  description?: string;
  receiptNumber?: string;
  isTaxDeductible?: boolean;
  status?: 'active' | 'archived' | 'deleted' | string;
}

export interface Income {
  id: string;
  date: string;
  source: string;
  clientName?: string;
  invoiceId?: string;
  reference?: string;
  accountName?: string;
  amount: number;
  paymentMode?: string;
  category?: string;
  notes?: string;
  status?: 'active' | 'archived' | 'deleted' | string;
}

export interface Account {
  id: string;
  name: string;
  type: 'Bank' | 'Cash' | 'Credit Card' | 'Digital Wallet' | string;
  company?: string;
  currency?: string;
  openingBalance?: number;
  currentBalance: number;
  accountNumber?: string;
  status?: 'active' | 'archived' | 'deleted' | string;
}

export interface DiaryNote {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  content: string;
  category: 'Service' | 'Reminder' | 'Meeting' | 'Urgent' | 'General' | 'Reminders' | 'Mechanics' | 'Invoicing' | 'Towing' | string;
  completed?: boolean;
  createdTime?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  salaryMonthly: number;
  email: string;
  phone: string;
  joinDate: string;
  attendanceRate: number;
  status: 'Active' | 'On Leave' | 'Terminated' | string;
}

export interface RepairShop {
  id: string;
  name: string;
  address: string;
  city: string;
  province?: string;
  phone: string;
  email?: string;
  rating: number;
  reviewsCount?: number;
  reviewCount?: number;
  services: string[];
  isVerified?: boolean;
  isAuthorized?: boolean;
  openingHours: string;
  dealsActive?: number;
  status?: 'Verified' | 'Pending' | 'Disabled' | string;
  image?: string;
}

export interface TireDeal {
  id: string;
  brand: string;
  model: string;
  size: string;
  originalPrice: number;
  salePrice?: number;
  discountPrice?: number;
  discountPercent?: number;
  seller?: string;
  shopName?: string;
  location?: string;
  shopLocation?: string;
  contactPhone?: string;
  stock?: number;
  inStock?: boolean;
  expiryDate?: string;
  compatibility?: string[];
  status?: 'Active' | 'Low Stock' | 'Expired' | string;
}

export interface DetailingBooking {
  id: string;
  customerName: string;
  phone?: string;
  vehicle?: string;
  vehicleModel?: string;
  packageType?: string;
  serviceType?: string;
  price?: number;
  date: string;
  time?: string;
  timeSlot?: string;
  locationType?: 'Doorstep Service' | 'Shop Location' | string;
  address: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | string;
}

export interface TowRequest {
  id: string;
  customerName: string;
  phone: string;
  vehicle?: string;
  vehicleModel?: string;
  currentLocation: string;
  destination?: string;
  destinationShop?: string;
  reason?: 'Breakdown' | 'Flat Tire' | 'Accident' | 'Dead Battery' | 'Lockout' | string;
  providerName?: string;
  priceEstimate?: number;
  requestTime?: string;
  timestamp?: string;
  status: 'Dispatched' | 'En Route' | 'Completed' | 'Cancelled' | string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'service_due' | 'service_overdue' | 'invoice_paid' | 'tow_request' | 'system' | 'new_booking' | string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

export interface PayrollRecord {
  id: string;
  employeeName: string;
  role: string;
  payPeriod: string;
  hoursWorked: number;
  hourlyRate: number;
  grossPay: number;
  netPay: number;
  status: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  balance: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}
