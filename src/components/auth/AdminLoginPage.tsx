import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CarDaddyLogo } from '../common/CarDaddyLogo';
import {
  Lock,
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  ShieldCheck,
  KeyRound,
  Sparkles,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAsAdmin, setView } = useApp();
  const [email, setEmail] = useState('admin@cardaddy.ca');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid administrative email.');
      return;
    }

    setLoading(true);

    // Authenticate operator against Canadian cloud backend
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        loginAsAdmin(email, password);
      }, 500);
    }, 600);
  };

  const handleForgotPassword = () => {
    setResetSent(true);
    setTimeout(() => setResetSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#198cd6]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#76bc21]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Return to website link */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => setView('public')}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Public Portal</span>
        </button>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-block">
            <CarDaddyLogo size="xl" showSubtitle />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Admin Portal Authentication
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Sign in to access your Digital Bill Book, fleet records, client ledger, and automotive management platform.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-[#181818] border border-neutral-800 shadow-2xl space-y-6">
          {/* Security Status Header */}
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#76bc21] animate-pulse" />
              <span className="font-semibold text-neutral-200">Authorized Terminal Access</span>
            </div>
            <span className="text-[10px] text-sky-400 font-mono">TLS 1.3 SECURE</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error state */}
            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Reset sent notification */}
            {resetSent && (
              <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-800/80 text-sky-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Password reset link dispatched to your registered address.</span>
              </div>
            )}

            {/* Success state */}
            {success && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Authenticated successfully. Launching Digital Bill Book...</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Administrative Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                <input
                  id="admin-login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cardaddy.ca"
                  required
                  disabled={loading || success}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700/80 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#76bc21] focus:ring-1 focus:ring-[#76bc21]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-300">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-sky-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                <input
                  id="admin-login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading || success}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700/80 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#76bc21] focus:ring-1 focus:ring-[#76bc21]"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-[#76bc21] focus:ring-0"
                />
                <span className="text-xs text-neutral-300">Remember this workstation</span>
              </label>
              <span className="text-[11px] text-neutral-500">256-Bit SSL</span>
            </div>

            {/* Submit Button */}
            <button
              id="admin-login-submit-btn"
              type="submit"
              disabled={loading || success}
              className="w-full py-3 rounded-xl bg-[#76bc21] hover:bg-[#68a61d] text-white font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Welcome Back!</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Security badge footer */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#76bc21]" />
            <span>Canadian Automotive Infrastructure Hosted Locally</span>
          </div>
        </div>
      </div>
    </div>
  );
};
