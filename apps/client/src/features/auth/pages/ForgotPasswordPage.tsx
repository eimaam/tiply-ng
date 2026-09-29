import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50/70 text-zinc-900 font-sans flex flex-col justify-between p-4 sm:p-8 selection:bg-emerald-100 selection:text-emerald-900">
      <header className="max-w-md mx-auto w-full pt-4">
        <BrandLogo size="md" />
      </header>

      <main className="max-w-sm mx-auto w-full py-8">
        <div className="bg-white rounded-2xl border border-stone-200/90 p-7 shadow-xs space-y-6 text-left">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-zinc-950">Reset password</h1>
            <p className="text-xs text-zinc-500">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-sm font-semibold text-zinc-900">Check your inbox</p>
              <p className="text-xs text-zinc-600">
                We sent password reset instructions to <strong>{email}</strong>.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Return to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Send reset link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 border-t border-stone-100 text-center">
            <Link
              to="/login"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-zinc-400 py-4">
        © 2026 tiply.ng · One link. Get tipped.
      </footer>
    </div>
  );
}
