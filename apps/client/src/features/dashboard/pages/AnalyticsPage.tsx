import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { formatNaira, FadeIn } from '@tiply-ng/shared';
import {
  Users,
  Coins,
  TrendingUp,
  Percent,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function AnalyticsPage() {
  const { analytics } = useApp();
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const totalNamedAndAnon =
    analytics.namedVsAnonymous.named + analytics.namedVsAnonymous.anonymous;
  const namedPct = Math.round((analytics.namedVsAnonymous.named / totalNamedAndAnon) * 100);
  const anonPct = 100 - namedPct;

  return (
    <FadeIn className="space-y-6 sm:space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950">Analytics</h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Understand how people interact with your tip page. Is my tip link working?
          </p>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
          {(['7d', '30d', '90d', 'all'] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer uppercase ${
                timeframe === tf
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {tf === 'all' ? 'All time' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Profile views</span>
            <Eye className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">
            {analytics.profileViews.toLocaleString()}
          </p>
          <span className="text-[11px] text-zinc-400 font-mono">Page visits</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Tips received</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">
            {analytics.tipsCount}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold font-mono">
            Completed tips
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Tip conversion</span>
            <Percent className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">
            {analytics.conversionRate}%
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold">
            Visits → Completed tip
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Average tip</span>
            <TrendingUp className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-mono">
            {formatNaira(analytics.averageTip)}
          </p>
          <span className="text-[11px] text-zinc-400 font-mono">
            Largest: {formatNaira(analytics.largestTip)}
          </span>
        </div>
      </div>

      {/* Public Page Conversion Funnel (Section 18) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-5">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-zinc-950">Tip conversion funnel</h3>
          <p className="text-xs text-zinc-500">
            How visitors move from opening your tip link to completing a payment
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Step 1: Visits */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-zinc-700">
              <span>1. Profile viewed</span>
              <span className="font-mono">{analytics.funnel.visits.toLocaleString()} visits (100%)</span>
            </div>
            <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
              <div className="bg-zinc-900 h-full rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Step 2: Started Tipping */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-zinc-700">
              <span>2. Started tipping (amount chosen)</span>
              <span className="font-mono">
                {analytics.funnel.startedTipping} supporters (
                {((analytics.funnel.startedTipping / analytics.funnel.visits) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{
                  width: `${(analytics.funnel.startedTipping / analytics.funnel.visits) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Step 3: Payment Success */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-zinc-700">
              <span>3. Payment completed</span>
              <span className="font-mono text-emerald-700">
                {analytics.funnel.completed} successful tips (
                {((analytics.funnel.completed / analytics.funnel.visits) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full"
                style={{
                  width: `${(analytics.funnel.completed / analytics.funnel.visits) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Top Amounts & Supporter Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Tip Amounts */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-base text-zinc-950">Top tip amounts</h3>
          <div className="space-y-3">
            {analytics.topAmounts.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="font-bold font-mono text-zinc-900">
                  {formatNaira(item.amount)}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500">{item.count} tips</span>
                  <div className="w-24 bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${(item.count / 54) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Named vs Anonymous Breakdown */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-base text-zinc-950">Supporter preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-700 font-medium">Named tips</span>
              <span className="font-mono font-bold text-zinc-900">
                {analytics.namedVsAnonymous.named} ({namedPct}%)
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-700 font-medium">Anonymous tips</span>
              <span className="font-mono font-bold text-zinc-900">
                {analytics.namedVsAnonymous.anonymous} ({anonPct}%)
              </span>
            </div>

            {/* Visual Ratio Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex pt-2">
              <div
                className="bg-emerald-600 h-full"
                style={{ width: `${namedPct}%` }}
                title={`Named: ${namedPct}%`}
              />
              <div
                className="bg-stone-300 h-full"
                style={{ width: `${anonPct}%` }}
                title={`Anonymous: ${anonPct}%`}
              />
            </div>
            <div className="flex justify-between text-[11px] text-zinc-400 font-mono pt-1">
              <span>● Named ({namedPct}%)</span>
              <span>● Anonymous ({anonPct}%)</span>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
