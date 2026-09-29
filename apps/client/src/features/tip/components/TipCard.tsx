import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Heart, Copy, CheckCircle2, ArrowRight, X } from 'lucide-react';
import type { CreatorProfile, Tip } from '@tiply-ng/shared/types';
import { formatNaira, VerifiedBadge } from '@tiply-ng/shared';
import { useToast } from '../../../components/ui/Toast';

interface TipCardProps {
  creator: CreatorProfile;
  onTipSuccess?: (tip: Tip) => void;
  className?: string;
  isHeroPreview?: boolean;
}

export const TipCard: React.FC<TipCardProps> = ({
  creator,
  onTipSuccess,
  className = '',
  isHeroPreview = false,
}) => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number>(creator.defaultSelectedAmount || 2000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [supporterName, setSupporterName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [completedTip, setCompletedTip] = useState<Tip | null>(null);
  const [receiptEmail, setReceiptEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  const activeAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;
  const minTip = creator.minTipAmount || 100;
  const isAmountValid = activeAmount >= minTip;

  const handleSelectPreset = (amt: number) => {
    setIsCustom(false);
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomFocus = () => {
    setIsCustom(true);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) {
      setSelectedAmount(Number(val));
    }
  };

  const handleStartTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAmountValid) {
      toast('warning', `Minimum tip is ${formatNaira(minTip)}`);
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleExecutePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckoutModal(false);

      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const reference = `TPLY-${randomSuffix}`;

      const newTip: Tip = {
        id: `tip_${Date.now()}`,
        creatorId: creator.id,
        creatorUsername: creator.username,
        creatorDisplayName: creator.displayName,
        supporterName: isAnonymous ? 'Anonymous' : (supporterName.trim() || 'Supporter'),
        isAnonymous,
        message: message.trim() || undefined,
        amount: activeAmount,
        currency: 'NGN',
        status: 'successful',
        settlementStatus: 'available',
        reference,
        providerReference: `PAYSTACK_${Date.now().toString().slice(-8)}`,
        supporterEmail: receiptEmail || undefined,
        createdAt: new Date().toISOString(),
        paidAt: new Date().toISOString(),
      };

      setCompletedTip(newTip);
      onTipSuccess?.(newTip);
      toast('success', `Tip of ${formatNaira(activeAmount)} sent successfully!`);
    }, 1100);
  };

  const handleCopyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    toast('info', 'Reference copied to clipboard');
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleSendReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptEmail) return;
    setEmailSent(true);
    toast('success', `Receipt sent to ${receiptEmail}`);
  };

  const handleReset = () => {
    setCompletedTip(null);
    setSupporterName('');
    setMessage('');
    setIsAnonymous(false);
    setEmailSent(false);
    setReceiptEmail('');
  };

  return (
    <div
      className={`relative w-full max-w-[420px] mx-auto bg-white rounded-2xl border border-stone-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Subtle top indicator bar */}
      <div className="h-1 w-full bg-emerald-600" />

      {/* Hero Badge Tag (if preview mode) */}
      {isHeroPreview && (
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          Interactive Demo
        </div>
      )}

      <div className="p-6 md:p-7">
        <AnimatePresence mode="wait">
          {completedTip ? (
            /* Section 20: Emotional Creator Thank-you Screen */
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="text-center py-4 space-y-5"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-zinc-900 flex items-center justify-center gap-1.5">
                  Thanks for the tip <Heart className="w-5 h-5 text-rose-500 fill-rose-500 inline" />
                </h3>
                <p className="text-sm text-zinc-600 mt-1">
                  Your <strong className="text-zinc-900 font-semibold">{formatNaira(completedTip.amount)}</strong> tip was sent to{' '}
                  <strong className="text-zinc-900 font-semibold inline-flex items-center gap-1">
                    {creator.displayName}
                    {creator.isVerified !== false && <VerifiedBadge size="xs" />}
                  </strong>.
                </p>
              </div>

              {/* Creator personal quote note */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-sm text-zinc-700 italic">
                "Your support genuinely helps. Thank you for making my work possible!"
              </div>

              {/* Reference */}
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-600">
                <span>Ref: {completedTip.reference}</span>
                <button
                  type="button"
                  onClick={() => handleCopyRef(completedTip.reference)}
                  className="hover:text-zinc-900 transition-colors p-1 cursor-pointer"
                  title="Copy reference"
                >
                  {copiedRef ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Send Receipt Form */}
              {!emailSent ? (
                <form onSubmit={handleSendReceipt} className="flex gap-2 text-left">
                  <input
                    type="email"
                    placeholder="Enter email for receipt"
                    value={receiptEmail}
                    onChange={(e) => setReceiptEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-hidden focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              ) : (
                <p className="text-xs text-emerald-700 font-medium">✓ Receipt emailed to {receiptEmail}</p>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl bg-zinc-950 text-white font-medium text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          ) : !creator.isAcceptingTips ? (
            /* Section 14: Public Profile Controls (Disabled State) */
            <motion.div
              key="disabled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 space-y-3"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-zinc-400">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-zinc-900 flex items-center justify-center gap-1.5">
                <span>{creator.displayName}</span>
                {creator.isVerified !== false && <VerifiedBadge size="sm" />}
              </h3>
              <p className="text-sm text-zinc-500">
                Tips are currently turned off. Check back later!
              </p>
            </motion.div>
          ) : (
            /* Active Tipping Interface */
            <motion.div
              key="active-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {/* Creator Profile Header */}
              <div className="flex items-center gap-3.5 pb-2 border-b border-stone-100">
                <img
                  src={creator.avatarUrl}
                  alt={creator.displayName}
                  className="w-12 h-12 rounded-full object-cover border border-stone-200 ring-2 ring-stone-100/80"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-zinc-900 text-base truncate">
                      {creator.displayName}
                    </h3>
                    {creator.isVerified !== false && <VerifiedBadge size="sm" />}
                  </div>
                  <p className="text-xs text-zinc-500 font-mono">@{creator.username}</p>
                  <p className="text-xs text-zinc-600 line-clamp-2 mt-0.5 leading-snug">
                    {creator.bio}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleStartTip} className="space-y-4">
                {/* Amount Selector */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                    Choose tip amount
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {creator.presetAmounts.map((amt) => {
                      const isSelected = !isCustom && selectedAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleSelectPreset(amt)}
                          className={`relative py-2.5 px-3 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-600'
                              : 'border-stone-200 bg-white text-zinc-800 hover:border-stone-300 hover:bg-stone-50/50'
                          }`}
                        >
                          {formatNaira(amt)}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="mt-2.5">
                    <div
                      className={`relative flex items-center rounded-xl border transition-all duration-200 bg-white ${
                        isCustom
                          ? 'border-emerald-600 ring-1 ring-emerald-600'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <span className="pl-3.5 pr-1 text-sm font-bold text-zinc-500 select-none">
                        ₦
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="or enter custom amount"
                        value={customAmount}
                        onFocus={handleCustomFocus}
                        onChange={handleCustomChange}
                        className="w-full py-2.5 pr-3 text-sm font-medium text-zinc-900 bg-transparent placeholder:text-zinc-400 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Supporter Name (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                    Your name <span className="text-zinc-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={supporterName}
                    disabled={isAnonymous}
                    onChange={(e) => setSupporterName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 disabled:opacity-50 disabled:bg-stone-100 transition-colors"
                  />
                </div>

                {/* Message (280 chars) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                      Message <span className="text-zinc-400 font-normal lowercase">(optional)</span>
                    </label>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {message.length}/280
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    maxLength={280}
                    placeholder="say something nice…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 resize-none transition-colors"
                  />
                </div>

                {/* Anonymous Checkbox */}
                <div className="flex items-center gap-2.5 pt-0.5">
                  <input
                    id={`anon-${creator.id}-${isHeroPreview ? 'hero' : 'page'}`}
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded-sm border-stone-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                  />
                  <label
                    htmlFor={`anon-${creator.id}-${isHeroPreview ? 'hero' : 'page'}`}
                    className="text-xs font-medium text-zinc-700 select-none cursor-pointer"
                  >
                    Give anonymously
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isAmountValid}
                    className="w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Tip {formatNaira(activeAmount || selectedAmount)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Trust Subtext */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[12px] text-zinc-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>No account needed. Powered by tiply.ng</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simulated Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 8 }}
              className="w-full max-w-sm bg-white rounded-2xl p-6 border border-stone-200 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-600 text-white text-[10px] font-mono flex items-center justify-center font-bold">₦</span>
                  <span className="text-sm font-bold text-zinc-900 lowercase">tiply.ng checkout</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center py-2 space-y-1">
                <p className="text-xs text-zinc-500">You are tipping {creator.displayName}</p>
                <p className="text-2xl font-bold text-zinc-950">{formatNaira(activeAmount)}</p>
                {isAnonymous ? (
                  <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-stone-100 text-zinc-600">
                    Anonymous supporter
                  </span>
                ) : supporterName ? (
                  <span className="text-xs text-zinc-600">from {supporterName}</span>
                ) : null}
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-zinc-600 space-y-1.5">
                <div className="flex justify-between">
                  <span>Payment method:</span>
                  <span className="font-medium text-zinc-900">Card / Bank Transfer</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee:</span>
                  <span className="font-medium text-emerald-700">₦0 (Supporter pays zero fee)</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleExecutePayment}
                  disabled={isProcessing}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isProcessing ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Processing payment…
                    </span>
                  ) : (
                    <span>Confirm & Pay {formatNaira(activeAmount)}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCheckoutModal(false)}
                  disabled={isProcessing}
                  className="w-full py-2 text-xs text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
