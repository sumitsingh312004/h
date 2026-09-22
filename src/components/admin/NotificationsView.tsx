import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCheck,
  Filter,
  Search,
  Wrench,
  AlertTriangle,
  Truck,
  CreditCard,
  Sparkles,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  Car,
  FileText,
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setAdminTab,
    showToast,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'maintenance' | 'towing' | 'billing'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    // Type filter
    if (activeFilter === 'unread' && n.read) return false;
    if (activeFilter === 'maintenance' && n.type !== 'service_due' && n.type !== 'service_overdue') return false;
    if (activeFilter === 'towing' && n.type !== 'tow_request') return false;
    if (activeFilter === 'billing' && n.type !== 'invoice_paid') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    }
    return true;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'service_overdue':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'service_due':
        return <Wrench className="w-5 h-5 text-amber-400" />;
      case 'tow_request':
        return <Truck className="w-5 h-5 text-sky-400" />;
      case 'invoice_paid':
        return <CreditCard className="w-5 h-5 text-[#76bc21]" />;
      case 'new_booking':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      default:
        return <Bell className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getBgForType = (type: string) => {
    switch (type) {
      case 'service_overdue':
        return 'bg-red-500/10 border-red-500/20';
      case 'service_due':
        return 'bg-amber-500/10 border-amber-500/20';
      case 'tow_request':
        return 'bg-sky-500/10 border-sky-500/20';
      case 'invoice_paid':
        return 'bg-emerald-500/10 border-emerald-500/20';
      case 'new_booking':
        return 'bg-purple-500/10 border-purple-500/20';
      default:
        return 'bg-neutral-800 border-neutral-700';
    }
  };

  const handleAction = (item: any) => {
    markNotificationRead(item.id);
    if (item.type === 'service_due' || item.type === 'service_overdue') {
      setAdminTab('vehicles');
      showToast('Navigated to Vehicles & Bill Book');
    } else if (item.type === 'tow_request') {
      setAdminTab('services-dispatch');
      showToast('Navigated to Roadside Towing Dispatch');
    } else if (item.type === 'invoice_paid') {
      setAdminTab('invoices');
      showToast('Navigated to Invoices & Accounting');
    } else if (item.type === 'new_booking') {
      setAdminTab('services-dispatch');
      showToast('Navigated to Detailing Bookings');
    } else {
      setAdminTab('home');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Notifications & Telemetry Alerts
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time notifications for service intervals, overdue telemetry, emergency towing, and billing receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-semibold transition"
            >
              <CheckCheck className="w-4 h-4 text-[#76bc21]" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#181818] p-3 rounded-2xl border border-neutral-800">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeFilter === 'all'
                ? 'bg-neutral-700 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveFilter('unread')}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
              activeFilter === 'unread'
                ? 'bg-red-500/20 text-red-400 font-bold border border-red-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <span>Unread</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>({unreadCount})</span>
          </button>
          <button
            onClick={() => setActiveFilter('maintenance')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeFilter === 'maintenance'
                ? 'bg-neutral-700 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Maintenance
          </button>
          <button
            onClick={() => setActiveFilter('towing')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeFilter === 'towing'
                ? 'bg-neutral-700 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Roadside Towing
          </button>
          <button
            onClick={() => setActiveFilter('billing')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeFilter === 'billing'
                ? 'bg-neutral-700 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            Billing
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#76bc21]"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#181818] border border-neutral-800/80 space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-800/80 flex items-center justify-center mx-auto text-neutral-500">
              <CheckCircle2 className="w-6 h-6 text-[#76bc21]" />
            </div>
            <h3 className="text-sm font-bold text-white">All Caught Up!</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No notifications matching your filter criteria. Your fleet telemetry and maintenance schedule are up to date.
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer ${
                item.read
                  ? 'bg-[#181818]/60 border-neutral-800/80 text-neutral-400 hover:bg-neutral-800/60 hover:border-neutral-700 hover:translate-x-0.5'
                  : 'bg-[#1c1c1c] border-neutral-700/80 text-neutral-200 shadow-lg ring-1 ring-white/5 hover:bg-[#222222] hover:border-neutral-600 hover:translate-x-0.5'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Visual Icon Badge */}
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${getBgForType(
                    item.type
                  )}`}
                >
                  {getIconForType(item.type)}
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-bold ${
                        item.read ? 'text-neutral-300' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-sky-400 ring-2 ring-sky-400/30" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-500 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleAction(item)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-semibold text-white transition"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3 text-[#76bc21]" />
                </button>
                {!item.read ? (
                  <button
                    onClick={() => markNotificationRead(item.id)}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
                    title="Mark as Read"
                  >
                    <CheckCheck className="w-4 h-4 text-neutral-400" />
                  </button>
                ) : (
                  <button
                    onClick={() => markNotificationRead(item.id)}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300 transition"
                    title="Marked as Read"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#76bc21]" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
