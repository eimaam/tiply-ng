import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext';
import { useToast } from '../../../components/ui/Toast';
import { formatNaira, FadeIn, UserAvatar, Badge, VerifiedBadge, PageHeader } from '@tiply-ng/shared';
import {
  Copy,
  Check,
  QrCode,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { InteractiveTipChart } from '../components/InteractiveTipChart';

export default function OverviewPage() {
  const { creator, tips, analytics } = useApp();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://tiply.ng/${creator.username}`);
    setCopied(true);
    toast('info', 'Tip link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const recentTips = tips.slice(0, 5);

  return (
    <FadeIn className="space-y-6 sm:space-y-8 text-left">
      {/* Header */}
      <PageHeader 
      extra={
<div className="flex items-center gap-2 p-1.5 sm:p-2 bg-white rounded-2xl border border-stone-200/90 shadow-2xs self-start sm:self-auto">
          <span className="text-xs font-mono text-zinc-700 pl-2">
            tiply.ng/{creator.username}
          </span>
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <Link
            to="/app/share"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-stone-50 transition-colors"
            title="QR Code & Share"
          >
            <QrCode className="w-4 h-4" />
          </Link>
        </div>
      }
      description="Here's how your tip page is doing."
      title={
        <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950">
              Good morning, {creator.displayName.split(' ')[0]}.
            </h1>
            {creator.isVerified !== false && <VerifiedBadge size="md" />}
          </div>
        }
      />
      

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Total Received */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-1 sm:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Total received</span>
            
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-sans tracking-tight">
            {formatNaira(analytics.totalReceived)}
          </p>
          <p className="text-xs text-zinc-400 pt-0.5">All-time contributions from supporters</p>
        </div>

        {/* This Month */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-zinc-500 font-medium">This month</span>
          <p className="text-xl sm:text-2xl font-bold text-zinc-950 font-sans">
            {formatNaira(analytics.thisMonthReceived)}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>↑ {analytics.growthPercentage}%</span>
          </span>
        </div>

        {/* Tips Count */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-zinc-500 font-medium">Tips count</span>
          <p className="text-xl sm:text-2xl font-bold text-zinc-950 font-sans">{analytics.tipsCount}</p>
          <span className="text-[11px] text-zinc-400">Total supporters</span>
        </div>

        {/* Average Tip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-1">
          <span className="text-xs text-zinc-500 font-medium">Average tip</span>
          <p className="text-xl sm:text-2xl font-bold text-zinc-950 font-sans">
            {formatNaira(analytics.averageTip)}
          </p>
          <span className="text-[11px] text-zinc-400">
            Largest: {formatNaira(analytics.largestTip)}
          </span>
        </div>
      </div>

      {/* Interactive Tip Activity Chart */}
      <InteractiveTipChart />

      {/* Recent Tips Table Preview */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-950">Recent tips</h3>
            <p className="text-xs text-zinc-500">Latest support received through your link</p>
          </div>
          <Link
            to="/app/tips"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View all tips</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-stone-100">
          {recentTips.map((tip) => (
            <div
              key={tip.id}
              className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm hover:bg-stone-50/60 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <UserAvatar
                  name={tip.isAnonymous ? 'Supporter' : tip.supporterName}
                  size="sm"
                  className="shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-zinc-900 truncate">
                      {tip.isAnonymous ? 'Anonymous Supporter' : tip.supporterName}
                    </p>
                    <Badge status={tip.status} className="text-[10px] py-0 px-1.5 hidden sm:inline-flex" />
                  </div>
                  {tip.message ? (
                    <p className="text-xs text-zinc-500 truncate max-w-xs sm:max-w-md">
                      "{tip.message}"
                    </p>
                  ) : (
                    <p className="text-xs text-zinc-400 italic">No message attached</p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-zinc-950 font-mono text-xs sm:text-sm">
                  {formatNaira(tip.amount)}
                </p>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                  {new Date(tip.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

