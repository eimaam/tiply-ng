import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { useToast } from '../../../components/ui/Toast';
import {
  formatNaira,
  FadeIn,
  Badge,
  VerifiedBadge,
  Button,
  Input,
  Select,
  Option,
} from '@tiply-ng/shared';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Coins,
  X,
  ShieldCheck,
} from 'lucide-react';

export default function PayoutsPage() {
  const { creator, payouts, requestPayout, updateBankAccount } = useApp();
  const { toast } = useToast();
  const [showChangeBankModal, setShowChangeBankModal] = useState(false);
  const [newBankName, setNewBankName] = useState('Access Bank');
  const [newAccountNumber, setNewAccountNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedName, setVerifiedName] = useState('');
  const [schedule, setSchedule] = useState(creator.bankAccount.payoutSchedule);

  const availableBalance = 42800;

  const nigerianBanks = [
    'GTBank',
    'Access Bank',
    'Zenith Bank',
    'Kuda Bank',
    'First Bank of Nigeria',
    'United Bank for Africa (UBA)',
    'Stanbic IBTC',
    'Opay',
    'Moniepoint',
  ];

  const handleScheduleChange = (newSched: 'daily' | 'weekly' | 'manual') => {
    setSchedule(newSched);
    updateBankAccount({ payoutSchedule: newSched });
    toast('success', `Payout schedule updated to ${newSched}`);
  };

  const handleManualPayout = () => {
    if (availableBalance <= 0) {
      toast('warning', 'No available balance to pay out');
      return;
    }
    requestPayout(availableBalance);
    toast('success', `Payout request of ${formatNaira(availableBalance)} submitted via Monnify!`);
  };

  const handleVerifyNewBank = () => {
    if (newAccountNumber.length !== 10) {
      toast('warning', 'Account number must be 10 digits');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const name = `${creator.displayName} Dan-Azumi`;
      setVerifiedName(name);
      toast('info', `Resolved account name: ${name}`);
    }, 700);
  };

  const handleConfirmChangeBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifiedName) {
      toast('warning', 'Please verify the account first');
      return;
    }
    updateBankAccount({
      bankName: newBankName,
      accountNumber: newAccountNumber,
      accountNumberMasked: `${newBankName} •••• ${newAccountNumber.slice(-4)}`,
      accountName: verifiedName,
      isVerified: true,
    });
    setShowChangeBankModal(false);
    toast('success', 'Bank account updated successfully');
  };

  return (
    <FadeIn className="space-y-6 sm:space-y-8 text-left">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950">Payouts</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Track settlements sent directly to your Nigerian bank.</p>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Available Balance Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>Available balance</span>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 font-semibold">
              Ready for payout
            </span>
          </div>

          <p className="text-3xl font-extrabold text-zinc-950 font-mono tracking-tight">
            {formatNaira(availableBalance)}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-stone-100 text-xs text-zinc-600">
            <span>Next automated payout:</span>
            <span className="font-semibold text-zinc-900">Tomorrow at 09:00 AM</span>
          </div>

          <div className="pt-1">
            <Button
              variant="default"
              fullWidth
              onClick={handleManualPayout}
              className="text-xs font-semibold gap-1.5"
            >
              <span>Trigger instant payout</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Connected Bank Account Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-sm text-zinc-900">Connected Bank</span>
            </div>
            <div className="flex items-center gap-1.5">
              <VerifiedBadge size="xs" />
              <Badge status="verified" label="Verified Bank" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-0.5">
            <p className="font-bold text-sm text-zinc-900 font-mono">
              {creator.bankAccount.accountNumberMasked}
            </p>
            <p className="text-xs text-zinc-500 font-medium">{creator.bankAccount.accountName}</p>
          </div>

          {/* Schedule Select */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
            <span className="text-zinc-500 font-medium">Payout schedule:</span>
            <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg self-start sm:self-auto">
              {(['daily', 'weekly', 'manual'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleScheduleChange(s)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors cursor-pointer ${
                    schedule === s
                      ? 'bg-white text-zinc-950 shadow-2xs font-bold'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowChangeBankModal(true)}
              className="text-xs text-zinc-600 hover:text-zinc-950 underline underline-offset-2 cursor-pointer font-medium"
            >
              Change bank account
            </button>
            <span className="text-[10px] text-zinc-400 font-mono">Monnify Rails</span>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-950">Payout history</h3>
            <p className="text-xs text-zinc-500">Record of settlements processed to your bank</p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">25+ Nigerian Banks</span>
        </div>

        {payouts.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-zinc-400">
              <Coins className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-zinc-900">No payouts yet.</p>
            <p className="text-xs text-zinc-500">
              Once you start receiving tips, your payout history will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {payouts.map((po) => (
              <div
                key={po.id}
                className="py-3.5 flex items-center justify-between gap-3 text-xs sm:text-sm hover:bg-stone-50/60 px-2 rounded-xl transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="font-bold text-zinc-950 font-mono text-xs sm:text-sm">
                    {formatNaira(po.amount)}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Paid to {po.accountNumberMasked}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <Badge status={po.status} className="text-[10px] py-0 px-2" />
                  <p className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                    {new Date(po.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Change Bank Account Modal */}
      {showChangeBankModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-base text-zinc-900">Change bank account</h3>
              <button
                type="button"
                onClick={() => setShowChangeBankModal(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Warning Banner */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Important note:</strong> Changing your bank account may temporarily pause
                payouts for up to 24 hours while our compliance team verifies your new details.
              </span>
            </div>

            <form onSubmit={handleConfirmChangeBank} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Select bank
                </label>
                <Select
                  value={newBankName}
                  onChange={(val: any) => {
                    setNewBankName(val);
                    setVerifiedName('');
                  }}
                  className="w-full"
                >
                  {nigerianBanks.map((b) => (
                    <Option key={b} value={b}>
                      {b}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Account number (10 digits)
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                    maxLength={10}
                    placeholder="0123456789"
                    value={newAccountNumber}
                    onChange={(e) => {
                      setNewAccountNumber(e.target.value.replace(/\D/g, ''));
                      setVerifiedName('');
                    }}
                    className="flex-1 font-mono"
                  />
                  <Button
                    variant="default"
                    onClick={handleVerifyNewBank}
                    disabled={isVerifying || newAccountNumber.length !== 10}
                    className="shrink-0"
                  >
                    {isVerifying ? 'Verifying…' : 'Verify'}
                  </Button>
                </div>
              </div>

              {verifiedName && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-xs text-emerald-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Name: {verifiedName}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowChangeBankModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  variant="default"
                  disabled={!verifiedName}
                  className="flex-1"
                >
                  Save & Update Bank
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </FadeIn>
  );
}
