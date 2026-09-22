import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminHeader } from '../common/AdminHeader';
import { AdminNav } from '../common/AdminNav';
import { AdminFooter } from '../common/AdminFooter';
import { AdminDashboard } from './AdminDashboard';
import { PeopleView } from './PeopleView';
import { InvoicesView } from './InvoicesView';
import { ExpensesView } from './ExpensesView';
import { VehiclesView } from './VehiclesView';
import { AutomotiveServicesView } from './AutomotiveServicesView';
import { ReportsView } from './ReportsView';
import { PayrollView } from './PayrollView';
import { DigitalDiaryView } from './DigitalDiaryView';
import { SettingsView } from './SettingsView';
import { NotificationsView } from './NotificationsView';

export const AdminLayout: React.FC = () => {
  const { adminTab, isAdminLoggedIn } = useApp();

  if (!isAdminLoggedIn) {
    return null;
  }

  const renderContent = () => {
    switch (adminTab) {
      case 'home':
        return <AdminDashboard />;
      case 'people':
        return <PeopleView />;
      case 'invoices':
        return <InvoicesView />;
      case 'expenses':
      case 'accounts':
        return <ExpensesView />;
      case 'vehicles':
        return <VehiclesView />;
      case 'repair-shops':
      case 'tire-deals':
      case 'services-dispatch':
        return <AutomotiveServicesView />;
      case 'reports':
        return <ReportsView />;
      case 'payroll':
        return <PayrollView />;
      case 'diary':
        return <DigitalDiaryView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col selection:bg-[#76bc21] selection:text-black">
      {/* Top Header */}
      <AdminHeader />

      {/* Primary Blue Navigation Bar matching Reference Video */}
      <AdminNav />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {renderContent()}
      </main>

      {/* Footer matching reference video */}
      <AdminFooter />
    </div>
  );
};
