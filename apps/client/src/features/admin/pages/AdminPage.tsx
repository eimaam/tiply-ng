import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { useApp } from '../../../contexts/AppContext';
import { formatNaira } from '@tiply-ng/shared';
import {
  Shield,
  Users,
  Coins,
  ArrowUpRight,
  AlertTriangle,
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Lock,
} from 'lucide-react';

export default function AdminPage() {
  const { adminStats, auditLogs, tips, payouts, creator } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'transactions' | 'payouts' | 'audit'>('overview');
  const [userSearch, setUserSearch] = useState('');

  const mockUsers = [
    {
      id: 'usr_imam',
      username: 'imam',
      name: 'Imam Dahir',
      email: 'imam@tiply.ng',
      bank: 'GTBank •••• 4821',
      status: 'active',
      tipsCount: 142,
      volume: 184500,
    },
    {
      id: 'usr_fola',
      username: 'fola_writes',
      name: 'Fola Adebayo',
      email: 'fola@example.com',
      bank: 'Zenith Bank •••• 1092',
      status: 'active',
      tipsCount: 88,
      volume: 112000,
    },
    {
      id: 'usr_chidi',
      username: 'chidi_codes',
      name: 'Chidi Okeke',
      email: 'chidi@example.com',
      bank: 'Access Bank •••• 9921',
      status: 'active',
      tipsCount: 204,
      volume: 340000,
    },
    {
      id: 'usr_xyz',
      username: 'xyz_spam',
      name: 'Suspicious Bot',
      email: 'bot@spam.io',
      bank: 'Opay •••• 0012',
      status: 'suspended',
      tipsCount: 0,
      volume: 0,
    },
  ];

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-900 font-sans text-left">
      {/* Admin Topbar */}
      <header className="bg-zinc-950 text-white px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold font-mono tracking-tight text-white">
            <span className="w-5 h-5 rounded-md bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
              ₦
            </span>
            <span>tiply.ng</span>
            <span className="px-1.5 py-0.5 rounded-sm bg-zinc-800 text-[10px] uppercase tracking-wider text-emerald-400 font-mono">
              Admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link to="/app/overview" className="text-zinc-400 hover:text-white transition-colors">
            Exit to creator app
          </Link>
          <span className="font-mono text-zinc-500">Admin: Imam</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-stone-200 pb-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Admin Overview', icon: Shield },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'transactions', label: 'Transactions', icon: Coins },
            { id: 'payouts', label: 'Payouts Queue', icon: ArrowUpRight },
            { id: 'audit', label: 'Audit Logs', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-stone-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                <span className="text-xs text-zinc-500 font-medium">Total platform volume</span>
                <p className="text-2xl font-bold text-zinc-950 font-mono">
                  {formatNaira(adminStats.totalVolume)}
                </p>
                <span className="text-[11px] text-emerald-700 font-semibold">Processed Naira</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                <span className="text-xs text-zinc-500 font-medium">Platform revenue (3%)</span>
                <p className="text-2xl font-bold text-zinc-950 font-mono">
                  {formatNaira(adminStats.platformRevenue)}
                </p>
                <span className="text-[11px] text-zinc-400">Net platform fees</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                <span className="text-xs text-zinc-500 font-medium">Active creators</span>
                <p className="text-2xl font-bold text-zinc-950 font-mono">
                  {adminStats.activeUsers} / {adminStats.totalUsers}
                </p>
                <span className="text-[11px] text-zinc-400">68% active this week</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                <span className="text-xs text-zinc-500 font-medium">Pending payouts</span>
                <p className="text-2xl font-bold text-zinc-950 font-mono">
                  {adminStats.pendingPayoutsCount}
                </p>
                <span className="text-[11px] text-amber-700 font-semibold font-mono">
                  {formatNaira(adminStats.pendingPayoutsVolume)} in queue
                </span>
              </div>
            </div>

            {/* System Queue Health (Section 22: BullMQ Queues) */}
            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <h3 className="font-bold text-base text-zinc-950">Queue & Infrastructure Health</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-zinc-500">payments queue</span>
                  <p className="font-bold text-emerald-700 mt-1">● Active (0 backlog)</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-zinc-500">payouts queue</span>
                  <p className="font-bold text-emerald-700 mt-1">● Active (14 pending)</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-zinc-500">notifications</span>
                  <p className="font-bold text-emerald-700 mt-1">● Active (100% delivered)</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-zinc-500">reconciliation</span>
                  <p className="font-bold text-emerald-700 mt-1">● Synced (0 anomalies)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: USERS */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-bold text-base text-zinc-950">Creators directory</h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search creators…"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-stone-200 bg-white"
                />
              </div>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-stone-50/50 px-2 rounded-lg"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900">{u.name}</span>
                      <span className="font-mono text-zinc-400">@{u.username}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-sm text-[10px] uppercase font-semibold ${
                          u.status === 'active'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-rose-50 text-rose-800'
                        }`}
                      >
                        {u.status}
                      </span>
                    </div>
                    <p className="text-zinc-500">{u.bank}</p>
                  </div>

                  <div className="text-right font-mono">
                    <p className="font-bold text-zinc-900">{formatNaira(u.volume)}</p>
                    <p className="text-zinc-400">{u.tipsCount} tips</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-6 space-y-4">
            <h3 className="font-bold text-base text-zinc-950">Global transactions log</h3>
            <div className="divide-y divide-stone-100 text-xs font-mono">
              {tips.map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-zinc-900">{t.reference}</span>
                    <span className="text-zinc-400 pl-2">→ to @{t.creatorUsername}</span>
                    <p className="text-[11px] text-zinc-500">
                      from {t.isAnonymous ? 'Anonymous' : t.supporterName} · {t.providerReference}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-zinc-950">{formatNaira(t.amount)}</span>
                    <p className="text-[11px] text-emerald-700 font-semibold uppercase">
                      {t.status} · {t.settlementStatus}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PAYOUTS QUEUE */}
        {activeTab === 'payouts' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-6 space-y-4">
            <h3 className="font-bold text-base text-zinc-950">Settlement queue</h3>
            <div className="divide-y divide-stone-100 text-xs font-mono">
              {payouts.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-zinc-900">{p.reference}</span>
                    <p className="text-zinc-500 text-[11px]">{p.accountNumberMasked} · {p.accountName}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-zinc-900">{formatNaira(p.amount)}</span>
                    <span className="block text-[11px] text-emerald-700 uppercase font-bold">
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: AUDIT LOGS (Section 23) */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-6 space-y-4">
            <h3 className="font-bold text-base text-zinc-950">Administrative audit trail</h3>
            <div className="divide-y divide-stone-100 text-xs font-mono">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-zinc-900">{log.actor}</span>
                    <span className="text-zinc-600 pl-2">{log.action}:</span>
                    <p className="text-zinc-700 font-sans mt-0.5">{log.target}</p>
                  </div>
                  <span className="text-zinc-400 text-[11px] shrink-0">
                    {new Date(log.createdAt).toLocaleString('en-US')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
