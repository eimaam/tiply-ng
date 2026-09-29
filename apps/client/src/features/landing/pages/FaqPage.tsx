import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Search, HelpCircle } from 'lucide-react';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { useApp } from '../../../contexts/AppContext';

export default function FaqPage() {
  const { creator } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Tipping & Supporters',
      q: 'Does the person tipping need a tiply account?',
      a: 'No. They just open your link, pick or enter an amount, and pay with their card or bank transfer. Zero supporter account needed.',
    },
    {
      category: 'Tipping & Supporters',
      q: 'Can people tip anonymously?',
      a: 'Yes. Supporters can simply check "Give anonymously" before paying. You will see "Anonymous" on your dashboard, while our compliance records retain necessary transaction reconciliation.',
    },
    {
      category: 'Tipping & Supporters',
      q: 'Can someone enter a custom amount?',
      a: 'Yes. Preset amounts (₦500, ₦1,000, ₦2,000, ₦5,000) are there for quick convenience, but supporters can enter whatever amount feels right to them.',
    },
    {
      category: 'Tipping & Supporters',
      q: 'Can I see who tipped me?',
      a: 'Yes, unless the supporter chose to tip anonymously. You can see their name, their personal message, and transaction details in your dashboard in real-time.',
    },
    {
      category: 'Payouts & Banking',
      q: 'Where does the money go?',
      a: 'Your tips settle directly to your connected Nigerian bank account according to your payout schedule (daily, weekly, or manual trigger).',
    },
    {
      category: 'Payouts & Banking',
      q: 'Which Nigerian banks are supported?',
      a: 'All licensed Nigerian commercial banks (GTBank, Access Bank, Zenith Bank, First Bank, etc.) and licensed digital fintechs (Kuda Bank, OPay, Moniepoint) are supported.',
    },
    {
      category: 'Getting Started',
      q: 'Do I need a website?',
      a: 'No. Your tiply.ng link is all you need. You can paste it into your bio, Twitch or YouTube video stream description, WhatsApp status, or project README.',
    },
    {
      category: 'Pricing & Fees',
      q: 'What does it cost to use tiply.ng?',
      a: 'Creating your link is completely free. There are no setup fees and no monthly subscriptions. We charge a standard 5% platform fee only when you successfully receive a tip.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50/60 text-zinc-900 font-sans flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <BrandLogo size="md" />

          <div className="flex items-center gap-3">
            <Link
              to={`/${creator.username}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/70 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Live Demo (@{creator.username})</span>
            </Link>
            <Link
              to="/"
              className="px-3.5 py-1.5 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
            >
              Get your tip link
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium text-zinc-700">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Help & FAQ</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
            Everything you need to know about getting tipped in Naira through tiply.ng.
          </p>

          {/* Search box */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g. anonymous, banks, fees)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-950 transition-colors shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Questions Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-2">
              <p className="text-sm font-semibold text-zinc-900">No questions found</p>
              <p className="text-xs text-zinc-500">
                Try searching for something else like "account", "transfer", or "fees".
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-semibold text-sm sm:text-base text-zinc-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? 'rotate-180 text-zinc-950' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-sm text-zinc-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Callout box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <h3 className="font-bold text-lg">Ready to start receiving tips?</h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Create your handle in under 30 seconds. No setup fee.
            </p>
          </div>
          <Link
            to="/signup"
            className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-stone-100 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Get your tip link</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BrandLogo size="sm" />
          <p>© 2026 tiply.ng · Made for the Nigerian internet</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-zinc-900 transition-colors">
              Home
            </Link>
            <Link to={`/${creator.username}`} className="hover:text-zinc-900 transition-colors">
              Sample Page
            </Link>
            <Link to="/login" className="hover:text-zinc-900 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
