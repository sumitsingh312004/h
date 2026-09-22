import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PublicHomePage } from './components/public/PublicHomePage';
import { AdminLoginPage } from './components/auth/AdminLoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { CarDaddyAiAssistantModal } from './components/modals/CarDaddyAiAssistantModal';
import { ActionModals } from './components/modals/ActionModals';
import { CheckCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { view, isAdminLoggedIn, activeModal, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans antialiased selection:bg-[#76bc21] selection:text-black">
      {/* Route Switcher: Without login only public home is visible */}
      {view === 'admin-login' ? (
        <AdminLoginPage />
      ) : view === 'admin' && isAdminLoggedIn ? (
        <AdminLayout />
      ) : (
        <PublicHomePage />
      )}

      {/* Global Interactive Automotive Service Advisor */}
      {(activeModal === 'ai-assistant' || activeModal === 'chat') && (
        <CarDaddyAiAssistantModal />
      )}

      {/* Action Modals for CRUD (Vehicles, Invoices, Clients, Services, Notes, Towing) */}
      <ActionModals />

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-neutral-900 border border-[#76bc21]/60 shadow-2xl text-xs text-white animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#76bc21] shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
