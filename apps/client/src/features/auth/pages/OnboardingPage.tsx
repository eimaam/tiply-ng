import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { useApp } from '../../../contexts/AppContext';
import { useToast } from '../../../components/ui/Toast';
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Building2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { creator, updateCreator, updateBankAccount } = useApp();
  const { toast } = useToast();

  const [step, setStep] = useState<number>(1);
  const [displayName, setDisplayName] = useState(creator.displayName || '');
  const [bio, setBio] = useState(creator.bio || '');
  const [bankName, setBankName] = useState(creator.bankAccount.bankName || 'GTBank');
  const [accountNumber, setAccountNumber] = useState(creator.bankAccount.accountNumber || '');
  const [isVerifyingBank, setIsVerifyingBank] = useState(false);
  const [isBankVerified, setIsBankVerified] = useState(creator.bankAccount.isVerified);
  const [verifiedName, setVerifiedName] = useState(creator.bankAccount.accountName || '');
  const [copied, setCopied] = useState(false);

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

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast('warning', 'Please enter your display name');
      return;
    }
    updateCreator({ displayName: displayName.trim() });
    setStep(2);
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    updateCreator({ bio: bio.trim() });
    setStep(3);
  };

  const handleVerifyBank = () => {
    if (accountNumber.length !== 10) {
      toast('warning', 'Nigerian account numbers must be 10 digits');
      return;
    }
    setIsVerifyingBank(true);
    setTimeout(() => {
      setIsVerifyingBank(false);
      setIsBankVerified(true);
      const resolved = displayName ? `${displayName} Dan-Azumi` : 'Imam Dahir Dan-Azumi';
      setVerifiedName(resolved);
      updateBankAccount({
        bankName,
        accountNumber,
        accountNumberMasked: `${bankName} •••• ${accountNumber.slice(-4)}`,
        accountName: resolved,
        isVerified: true,
      });
      toast('success', `Bank account verified: ${resolved}`);
    }, 800);
  };

  const handleStep3Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBankVerified) {
      toast('warning', 'Please verify your bank account first');
      return;
    }
    setStep(4);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`tiply.ng/${creator.username}`);
    setCopied(true);
    toast('info', 'Tip link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    toast('success', 'Your tip page is live!');
    navigate('/app/overview');
  };

  return (
    <div className="min-h-screen bg-stone-50/70 text-zinc-900 font-sans flex flex-col justify-between p-4 sm:p-8 selection:bg-emerald-100 selection:text-emerald-900">
      <header className="max-w-md mx-auto w-full pt-4 flex items-center justify-between">
        <BrandLogo size="md" />
        <span className="text-xs font-mono text-zinc-500">Step {step} of 4</span>
      </header>

      <main className="max-w-md mx-auto w-full py-8">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-7 sm:p-8 shadow-xs space-y-6 text-left">
          {/* Step Progress Bar */}
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1Next} className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Step 1
                </span>
                <h1 className="text-2xl font-bold text-zinc-950">What's your name?</h1>
                <p className="text-xs text-zinc-500">
                  This will be shown at the top of your public tip page.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Display name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Imam Dahir"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-base rounded-xl border border-stone-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleStep2Next} className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Step 2
                </span>
                <h1 className="text-2xl font-bold text-zinc-950">
                  Tell people a little about yourself.
                </h1>
                <p className="text-xs text-zinc-500">
                  A short bio letting your supporters know what you create.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Bio
                </label>
                <textarea
                  rows={3}
                  placeholder="Software engineer building useful things on the internet."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-zinc-700 text-sm font-medium hover:bg-stone-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={handleStep3Next} className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Step 3
                </span>
                <h1 className="text-2xl font-bold text-zinc-950">Where should your tips go?</h1>
                <p className="text-xs text-zinc-500">
                  Connect your Nigerian bank account for automated payouts.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                    Select bank
                  </label>
                  <select
                    value={bankName}
                    onChange={(e) => {
                      setBankName(e.target.value);
                      setIsBankVerified(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-zinc-900 focus:outline-hidden focus:border-zinc-900 cursor-pointer"
                  >
                    {nigerianBanks.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                    Account number (10 digits)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={10}
                      inputMode="numeric"
                      placeholder="0123456789"
                      value={accountNumber}
                      onChange={(e) => {
                        setAccountNumber(e.target.value.replace(/\D/g, ''));
                        setIsBankVerified(false);
                      }}
                      className="flex-1 px-3.5 py-2.5 text-sm font-mono rounded-xl border border-stone-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyBank}
                      disabled={isVerifyingBank || accountNumber.length !== 10}
                      className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isVerifyingBank ? 'Verifying…' : 'Verify'}
                    </button>
                  </div>
                </div>

                {isBankVerified && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-xs text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Account Name: <strong>{verifiedName}</strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-zinc-700 text-sm font-medium hover:bg-stone-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!isBankVerified}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 disabled:opacity-40 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Sparkles className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  You're all set!
                </span>
                <h1 className="text-2xl font-bold text-zinc-950">Your tip link is ready.</h1>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Share this link anywhere you have an audience to start receiving tips in Naira.
                </p>
              </div>

              {/* Link Box */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-800 text-base">
                  tiply.ng/{creator.username}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-white border border-stone-200 hover:border-stone-300 text-zinc-700 hover:text-zinc-950 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy link'}</span>
                </button>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  to={`/${creator.username}`}
                  target="_blank"
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-white text-zinc-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open my page</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleComplete}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Go to dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center text-xs text-zinc-400 py-4">
        © 2026 tiply.ng · One link. Get tipped.
      </footer>
    </div>
  );
}
