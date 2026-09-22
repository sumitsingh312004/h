import React from 'react';
import { useApp } from '../../context/AppContext';
import { CarDaddyLogo } from './CarDaddyLogo';
import { MessageSquare, Bell, User, HelpCircle, LogOut, ArrowLeft } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  const {
    logoutAdmin,
    setView,
    openModal,
    notifications,
    darkMode,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="w-full bg-[#181818] border-b border-neutral-800 text-white select-none">
      {/* Top tiny window bar / title matching video: "Cardaddy - Digital Bill Book" */}
      <div className="px-4 py-1 bg-[#121212] text-xs text-neutral-400 border-b border-neutral-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium tracking-wide">Cardaddy - Digital Bill Book</span>
          <span className="text-neutral-600">|</span>
          <span className="text-[11px] text-neutral-400">Canadian Automotive Cloud Platform</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('public')}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
            title="Preview Public Website"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </button>
        </div>
      </div>

      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <CarDaddyLogo size="lg" />
        </div>

        {/* Right utility buttons: Chat, Notifications, My Account, Help, Log out */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          {/* Live Chat / Assistant badge */}
          <button
            id="admin-chat-btn"
            onClick={() => openModal('chat')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#76bc21]" />
            <span className="font-medium">Chat</span>
            <span className="w-2 h-2 rounded-full bg-[#76bc21]" />
          </button>

          {/* Notifications */}
          <button
            id="admin-notif-btn"
            onClick={() => openModal('notifications')}
            className="relative p-1.5 text-neutral-300 hover:text-white transition rounded-lg hover:bg-neutral-800"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* My Account */}
          <button
            id="admin-account-btn"
            onClick={() => openModal('profile')}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white px-2 py-1 rounded transition hover:bg-neutral-800"
          >
            <User className="w-3.5 h-3.5 text-neutral-400" />
            <span>My Account</span>
          </button>

          {/* Help */}
          <button
            id="admin-help-btn"
            onClick={() => openModal('help')}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white px-2 py-1 rounded transition hover:bg-neutral-800"
          >
            <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span>Help</span>
          </button>

          {/* Log Out */}
          <button
            id="admin-logout-btn"
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-red-400 px-2 py-1 rounded transition hover:bg-neutral-800"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
