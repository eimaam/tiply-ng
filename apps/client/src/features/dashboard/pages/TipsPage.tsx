import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { useToast } from '../../../components/ui/Toast';
import { formatNaira, FadeIn, UserAvatar, Badge, Button, Input } from '@tiply-ng/shared';
import type { Tip } from '@tiply-ng/shared/types';
import {
  Search,
  Copy,
  Check,
  X,
  Coins,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function TipsPage() {
  const { creator, tips } = useApp();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'named' | 'anonymous'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const filteredTips = tips.filter((tip) => {
    if (filter === 'named' && tip.isAnonymous) return false;
    if (filter === 'anonymous' && !tip.isAnonymous) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      tip.supporterName.toLowerCase().includes(q) ||
      tip.reference.toLowerCase().includes(q) ||
      (tip.message && tip.message.toLowerCase().includes(q)) ||
      tip.amount.toString().includes(q)
    );
  });

  const handleCopyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    toast('info', 'Reference copied to clipboard');
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCopyTipLink = () => {
    navigator.clipboard.writeText(`https://tiply.ng/${creator.username}`);
    toast('success', 'Tip link copied to clipboard');
  };

  return (
    <FadeIn className="space-y-6 text-left">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950">Tips</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Every tip you've received, all in one place.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs font-semibold self-start">
          {[
            { id: 'all', label: `All (${tips.length})` },
            { id: 'named', label: `Named (${tips.filter((t) => !t.isAnonymous).length})` },
            { id: 'anonymous', label: `Anonymous (${tips.filter((t) => t.isAnonymous).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-white text-zinc-950 shadow-2xs font-bold'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
          <Input
            size="sm"
            placeholder="Search tips…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9!"
          />
        </div>
      </div>

      {/* Tips Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {filteredTips.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-zinc-400">
              <Coins className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-zinc-900 text-base">No tips yet.</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Once someone sends you a tip, it'll show up here. Share your tip link and your first
                one could be on the way.
              </p>
            </div>
            <Button
              variant="default"
              onClick={handleCopyTipLink}
            >
              Copy your tip link
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                onClick={() => setSelectedTip(tip)}
                className="p-3.5 sm:px-6 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 hover:bg-stone-50/70 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <UserAvatar
                    name={tip.isAnonymous ? 'Supporter' : tip.supporterName}
                    size="sm"
                    className="shrink-0"
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 text-xs sm:text-sm truncate">
                        {tip.isAnonymous ? 'Anonymous' : tip.supporterName}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 hidden sm:inline">
                        {tip.reference}
                      </span>
                      <Badge status={tip.status} className="text-[10px] py-0 px-1.5 hidden md:inline-flex" />
                    </div>

                    {tip.message ? (
                      <p className="text-xs text-zinc-600 truncate max-w-xs sm:max-w-md mt-0.5">
                        "{tip.message}"
                      </p>
                    ) : (
                      <p className="text-xs text-zinc-400 italic mt-0.5">No message</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <div className="text-right">
                    <p className="font-bold text-zinc-950 font-mono text-xs sm:text-base">
                      {formatNaira(tip.amount)}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                      {new Date(tip.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tip Details Slide-over / Modal */}
      {selectedTip && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Tip details
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedTip(null);
                  setShowTechnicalDetails(false);
                }}
                className="text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Amount & Supporter */}
            <div className="text-center py-2 space-y-1.5">
              <p className="text-3xl font-extrabold text-zinc-950 font-mono">
                {formatNaira(selectedTip.amount)}
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-semibold text-zinc-800">
                  {selectedTip.isAnonymous ? 'Anonymous supporter' : selectedTip.supporterName}
                </span>
                <Badge status={selectedTip.status} className="text-[10px] py-0 px-2" />
              </div>
            </div>

            {/* Message if any */}
            {selectedTip.message && (
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-zinc-700 italic">
                "{selectedTip.message}"
              </div>
            )}

            {/* Timestamps and State Details */}
            <div className="p-4 rounded-2xl border border-stone-200/90 space-y-2.5 text-xs bg-stone-50/50">
              <div className="flex justify-between">
                <span className="text-zinc-500">Date & Time</span>
                <span className="font-medium text-zinc-900">
                  {new Date(selectedTip.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  ·{' '}
                  {new Date(selectedTip.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Payment</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Successful (Monnify)
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Reference</span>
                <span className="flex items-center gap-1 font-mono font-medium text-zinc-800">
                  <span>{selectedTip.reference}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyRef(selectedTip.reference)}
                    className="text-zinc-400 hover:text-zinc-800 p-0.5 cursor-pointer"
                  >
                    {copiedRef ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Settlement</span>
                <Badge status={selectedTip.settlementStatus} className="text-[10px] py-0 px-2" />
              </div>
            </div>

            {/* Technical Payment Details Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className="text-xs text-zinc-500 hover:text-zinc-800 underline underline-offset-2 cursor-pointer"
              >
                {showTechnicalDetails ? 'Hide payment details' : 'View payment details'}
              </button>

              {showTechnicalDetails && (
                <div className="mt-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] font-mono text-zinc-600 space-y-1">
                  <p>Provider: Monnify (NGN Virtual Account / Card Channel)</p>
                  <p>Provider Ref: {selectedTip.providerReference || 'MNFY_REF_0091823'}</p>
                  <p>Settlement Batch: MNFY_BATCH_20260921_01</p>
                  <p>Idempotency: IDEM_TPLY_{selectedTip.id}</p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Button
                variant="default"
                fullWidth
                onClick={() => {
                  setSelectedTip(null);
                  setShowTechnicalDetails(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </FadeIn>
  );
}

