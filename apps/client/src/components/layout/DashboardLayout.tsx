import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../ui/BrandLogo';
import { useApp } from '../../contexts/AppContext';
import { useToast } from '../ui/Toast';
import { UserAvatar, VerifiedBadge } from '@tiply-ng/shared';
import {
  LayoutDashboard,
  Coins,
  ArrowUpRight,
  BarChart3,
  Settings,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Shield,
  LogOut,
  ChevronDown,
  X,
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { creator } = useApp();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://tiply.ng/${creator.username}`);
    setCopied(true);
    toast('info', 'Tip link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = () => {
    setShowUserMenu(false);
    toast('info', 'Signed out successfully');
    navigate('/login');
  };

  // Close user menu on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowUserMenu(false);
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showUserMenu]);

  // Close menu on route change
  useEffect(() => {
    setShowUserMenu(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Overview', to: '/app/overview', icon: LayoutDashboard },
    { label: 'Tips', to: '/app/tips', icon: Coins },
    { label: 'Payouts', to: '/app/payouts', icon: ArrowUpRight },
    { label: 'Analytics', to: '/app/analytics', icon: BarChart3 },
    { label: 'Share', to: '/app/share', icon: Share2 },
    { label: 'Settings', to: '/app/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-zinc-900 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Topbar: Minimal Brand & Profile Header (No nav links) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand + Quick Handle Copier */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <BrandLogo size="md" />

            {/* Quick Tip Link Pill */}
            <div className="hidden sm:flex items-center gap-1.5 pl-4 border-l border-stone-200">
              <span className="text-xs text-zinc-500 font-mono">tiply.ng/{creator.username}</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-stone-100 transition-colors cursor-pointer"
                title="Copy tip link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Right: Actions & User Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick copy on small mobile */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="sm:hidden flex items-center gap-1 text-xs font-mono text-zinc-600 hover:text-zinc-950 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 transition-colors"
              title="Copy tip link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>@{creator.username}</span>
            </button>

            

            {/* User Dropdown Trigger */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer border border-transparent hover:border-stone-200 focus:outline-hidden"
              >
                <UserAvatar
                  name={creator.displayName}
                  imageUrl={creator.avatarUrl}
                  size="sm"
                  className="ring-1 ring-stone-200"
                />
                <span className="hidden sm:inline text-xs font-semibold text-zinc-800">
                  {creator.displayName.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 mr-0.5" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-zinc-950/10 backdrop-blur-2xs"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-stone-200 shadow-xl py-2 z-50 text-left text-xs divide-y divide-stone-100">
                    <div className="px-3.5 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-zinc-950 truncate">{creator.displayName}</p>
                        {creator.isVerified !== false && <VerifiedBadge size="xs" />}
                      </div>
                      <p className="text-zinc-500 font-mono text-[11px] truncate">tiply.ng/{creator.username}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to={`/${creator.username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between px-3.5 py-2 text-zinc-700 hover:bg-stone-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                          <span>View public tip page</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">↗</span>
                      </Link>

                      <Link
                        to="/app/settings"
                        className="flex items-center gap-2 px-3.5 py-2 text-zinc-700 hover:bg-stone-50 transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Account & payout settings</span>
                      </Link>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-medium text-xs cursor-pointer text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-6 pb-32">
        <Outlet />
      </main>

      {/* Unified Floating Circular Logo Navigation (Same on Mobile & Desktop) */}
      <aside
        aria-label="Application Navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-zinc-950/92 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.label}
                className={`relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-zinc-950 shadow-md scale-105 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95'
                }`}
              >
                {/* Active Indicator Pulse Dot */}
                {isActive && (
                  <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950 animate-pulse" />
                )}

                {/* Logo Icon Only (No Text) */}
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform group-hover:scale-110" />

                {/* Desktop Micro-Tooltip on Hover (Strictly no namings on the buttons) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute -top-9 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-700/80 text-white text-[11px] font-semibold tracking-wide pointer-events-none shadow-xl whitespace-nowrap hidden sm:block">
                  {item.label}
                </div>
              </NavLink>
            );
          })}

          {/* Subtle Vertical Divider */}
          <div className="h-6 w-px bg-white/15 mx-0.5" />

          {/* Quick Copy Link Circular Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy your tip link"
            className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            {copied ? (
              <Check className="w-5 h-5 text-emerald-400" />
            ) : (
              <Copy className="w-5 h-5 transition-transform group-hover:scale-110" />
            )}

            {/* Desktop Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute -top-9 px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-700/80 text-white text-[11px] font-semibold tracking-wide pointer-events-none shadow-xl whitespace-nowrap hidden sm:block">
              {copied ? 'Copied!' : 'Copy tip link'}
            </div>
          </button>
        </div>
      </aside>

      {/* Subtle Desktop Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-6 text-center text-xs text-zinc-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>tiply.ng · One link to get tipped.</span>
          {/* <span className="font-mono">Secured by Monnify</span> */}
        </div>
      </footer>
    </div>
  );
};

