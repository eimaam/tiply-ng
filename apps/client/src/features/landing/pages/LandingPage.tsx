import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Shield,
  ExternalLink,
  Verified,
} from 'lucide-react';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { useApp } from '../../../contexts/AppContext';
import { formatNaira, VerifiedBadge } from '@tiply-ng/shared';

export default function LandingPage() {
  const { creator } = useApp();
  const navigate = useNavigate();
  const [claimInput, setClaimInput] = useState('');
  const [previewAmount, setPreviewAmount] = useState<number>(1000);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const handle = claimInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (handle) {
      navigate(`/signup?username=${encodeURIComponent(handle)}`);
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Navigation (Stupidly simple: Logo + Sign in) */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <BrandLogo size="md" />

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-800 hover:text-zinc-950 hover:bg-stone-100 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section (Single-Column, Approved Copy) */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-stone-50/80 via-white to-white border-b border-stone-200/70 text-center">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-emerald-100/40 via-stone-100/20 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          

          {/* Core Tagline (User Approved) */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 leading-[1.08] max-w-4xl"
          >
            People appreciate your work.
            <br />
            <span className="bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-500 bg-clip-text text-transparent">
              Give them one link to say thanks.
            </span>
          </motion.h1>

          {/* Subtitle (User Approved) */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed mt-6"
          >
            A single, timeless handle. Money lands straight in your Nigerian bank account without signups, apps, or friction.
          </motion.p>

          {/* Interactive Handle Claim Form */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleClaimSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md"
          >
            <div className="relative flex items-center w-full bg-white rounded-xl border border-stone-300 shadow-xs focus-within:border-zinc-950 focus-within:ring-1 focus-within:ring-zinc-950 transition-all p-1">
              <span className="pl-3.5 pr-1 text-sm sm:text-base font-mono font-medium text-zinc-400 select-none">
                tiply.ng/
              </span>
              <input
                type="text"
                placeholder="yourname"
                value={claimInput}
                onChange={(e) => setClaimInput(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                className="w-full py-2 text-sm sm:text-base font-mono font-semibold text-zinc-900 placeholder:text-zinc-300 bg-transparent focus:outline-hidden"
              />
              <button
                type="submit"
                className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
              >
                Claim link →
              </button>
            </div>
            <button
              type="submit"
              className="sm:hidden w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Claim your tip link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>

          {/* Quick Demo Preview Link */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs sm:text-sm text-zinc-500">
            <span>Or test how it works:</span>
            <Link
              to={`/${creator.username}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group underline underline-offset-2"
            >
              <span>See live sample</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Interactive Live Sample Teaser Card (Responsive & Interactive) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 sm:mt-12 w-full max-w-xl text-left"
          >
            <div className="relative rounded-2xl bg-white border border-stone-200/90 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.displayName}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-stone-200 object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm sm:text-base text-zinc-950 truncate">
                        {creator.displayName}
                      </h3>
                      {creator.isVerified !== false && <VerifiedBadge size="xs" />}
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/50 shrink-0">
                        LIVE
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-mono truncate">tiply.ng/{creator.username}</p>
                  </div>
                </div>

                {/* <Link
                  to={`/${creator.username}?amount=${previewAmount}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/60 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shrink-0"
                >
                  <span>Open live page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link> */}
              </div>

              {/* Bio & Interactive Presets */}
              <div className="py-4 space-y-3">
                <p className="text-xs sm:text-sm text-zinc-600 italic">
                  "{creator.bio}"
                </p>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-zinc-400">Choose test amount:</span>
                    <span className="font-mono font-bold text-emerald-700">{formatNaira(previewAmount)}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {creator.presetAmounts.map((amt) => {
                      const isSelected = previewAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setPreviewAmount(amt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-zinc-950 text-white shadow-xs scale-[1.02]'
                              : 'bg-stone-100 hover:bg-stone-200/80 text-zinc-800'
                          }`}
                        >
                          {formatNaira(amt)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button & Monnify simulated link */}
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Simulated live checkout preview</span>
                </span>

                <Link
                  to={`/${creator.username}?amount=${previewAmount}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-medium transition-colors text-xs cursor-pointer shadow-2xs"
                >
                  <span>Test tipping {formatNaira(previewAmount)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Monnify Trust Signal Section */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100/90 border border-stone-200 text-xs font-semibold text-zinc-800 shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured by <strong>Monnify</strong> </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Instant Naira transfer & card checkout
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                PCI-DSS Level 1 compliant security
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Zero supporter account or app needed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How it works (Commented out - already covered in hero) */}
      {/*
      <section className="py-16 md:py-24 border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
              Fast & Direct
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              How it works in 30 seconds.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-lg mx-auto">
              Zero signup walls for supporters. Zero international currency gymnastics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <span className="w-8 h-8 rounded-lg bg-stone-100 text-zinc-900 font-mono text-xs font-bold flex items-center justify-center">
                01
              </span>
              <h3 className="font-bold text-base text-zinc-900">Claim your handle</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Choose <code className="font-mono text-zinc-900 font-semibold bg-stone-100 px-1 py-0.5 rounded">tiply.ng/you</code> and connect your Nigerian bank account once. Ready in seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-mono text-xs font-bold flex items-center justify-center border border-emerald-200/60">
                02
              </span>
              <h3 className="font-bold text-base text-zinc-900">Supporters say thanks</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Drop your link on X, Twitch, YouTube, or your code. Supporters tap and pay via Card or Transfer in 10 seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <span className="w-8 h-8 rounded-lg bg-stone-100 text-zinc-900 font-mono text-xs font-bold flex items-center justify-center">
                03
              </span>
              <h3 className="font-bold text-base text-zinc-900">Money lands in your bank</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Tips settle straight to your connected bank account according to your schedule. No conversion fees.
              </p>
            </div>
          </div>
        </div>
      </section>
      */}

      <section className="py-20 md:py-28 border-b border-stone-200/80 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-3">
            
            <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
              Your dashboard shows everything that matters - the appreciation, the messages, and the funds.
            </p>
          </div>

          {/* Product Dashboard Showcase Preview Window */}
          <div className="rounded-3xl border border-stone-200/90 bg-stone-50/80 p-4 sm:p-6 md:p-8 shadow-sm space-y-5 sm:space-y-6">
            {/* Browser-style Chrome Bar */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-stone-200/80 gap-3">
              {/* Window Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-stone-300" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-stone-300" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-stone-300" />
              </div>

              {/* URL Pill */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200/80 text-[11px] font-mono text-zinc-500 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>tiply.ng/app/overview</span>
              </div>

              {/* Live Activity Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-semibold text-emerald-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live activity stream</span>
              </div>
            </div>

            {/* Top Bar of Dashboard Preview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200/70">
              <div className="flex items-center gap-3">
                <img
                  src={creator.avatarUrl}
                  alt={creator.displayName}
                  className="w-10 h-10 rounded-full border border-stone-200 object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 flex items-center gap-1">
                    <span>{creator.displayName}</span>
                    <Verified className="w-4 h-4 text-emerald-500" />
                  </h4>
                  <p className="text-xs text-zinc-500 font-mono">tiply.ng/{creator.username}</p>
                </div>
              </div>

              <Link
                to="/app/overview"
                className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 self-start sm:self-auto flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 transition-colors shadow-2xs"
              >
                <span>Explore creator app</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Metrics Showcase (Uniform & Responsive) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-[11px] sm:text-xs text-zinc-500 font-medium">Total received</span>
                <p className="text-lg sm:text-2xl font-bold text-zinc-950 mt-1 font-sans">₦184,500</p>
                <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  All-time volume
                </span>
              </div>
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-[11px] sm:text-xs text-zinc-500 font-medium">This month</span>
                <p className="text-lg sm:text-2xl font-bold text-zinc-950 mt-1 font-sans">₦74,500</p>
                <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
                  ↑ 28% from last month
                </span>
              </div>
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-[11px] sm:text-xs text-zinc-500 font-medium">Supporters</span>
                <p className="text-lg sm:text-2xl font-bold text-zinc-950 mt-1 font-sans">142</p>
                <span className="text-[10px] sm:text-[11px] text-zinc-500 font-medium mt-1 inline-block">
                  Tipped creators
                </span>
              </div>
              <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-[11px] sm:text-xs text-zinc-500 font-medium">Average tip</span>
                <p className="text-lg sm:text-2xl font-bold text-zinc-950 mt-1 font-sans">₦1,299</p>
                <span className="text-[10px] sm:text-[11px] text-zinc-500 font-medium mt-1 inline-block">
                  Largest: ₦10,000
                </span>
              </div>
            </div>

            {/* Live Supporter Wall */}
            <div className="space-y-3 pt-2 text-left">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium md:font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                  Recent Supporter Messages
                </span>
                <span className="text-xs text-zinc-400 font-mono">Real-time</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 hover:border-stone-300 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900">Abdul</span>
                    <span className="font-bold text-emerald-700 font-mono">₦5,000</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-snug">
                    "Keep building! Loved your latest open-source project."
                  </p>
                  <span className="text-[10px] text-zinc-400 block pt-0.5">2 hours ago</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 hover:border-stone-300 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900">Sarah Ahmed</span>
                    <span className="font-bold text-emerald-700 font-mono">₦2,000</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-snug">
                    "Loved what you're building. Keep it up!"
                  </p>
                  <span className="text-[10px] text-zinc-400 block pt-0.5">Yesterday</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 hover:border-stone-300 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900">Fola</span>
                    <span className="font-bold text-emerald-700 font-mono">₦2,500</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-snug">
                    "Your tech thread on microservices was pure gold."
                  </p>
                  <span className="text-[10px] text-zinc-400 block pt-0.5">3 days ago</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 hover:border-stone-300 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-500 italic">Anonymous</span>
                    <span className="font-bold text-emerald-700 font-mono">₦1,000</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-snug">
                    "Coffee on me! Thanks for the live stream tutorials."
                  </p>
                  <span className="text-[10px] text-zinc-400 block pt-0.5">4 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why creators switch to tiply (Commented out - already covered by hero trust points) */}
      {/*
      <section className="py-20 md:py-28 border-b border-stone-200/80 bg-stone-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 text-center">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
              Designed For Frictionless Giving
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Why creators switch to tiply.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto">
              Everything you need to accept support, without awkward bank details or foreign apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-zinc-900 text-base">Zero Supporter Friction</h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Supporters don't need to create accounts, remember passwords, or download apps. They tap your link and pay in 10 seconds via local Card, USSD, or Bank Transfer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-zinc-800 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-bold text-zinc-900 text-base">Direct Bank Settlement</h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Works with all Nigerian commercial banks (GTBank, Access, Zenith) and digital fintechs (Kuda, Moniepoint). Daily or weekly automated settlement straight to your account.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-zinc-800 flex items-center justify-center">
                <Heart className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-bold text-zinc-900 text-base">Supporter Notes & Privacy</h4>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Supporters can leave personalized messages of encouragement or tip anonymously with 1 tap. You get direct appreciation without publishing your personal bank details.
              </p>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* 6. Final Minimal CTA */}
      <section className="py-20 md:py-28 bg-white text-center border-b border-stone-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
            One link. That's it.
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 max-w-md mx-auto">
            Create your tiply.ng link and start receiving appreciatio or fund raise today.
          </p>
          <div className="pt-2">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-base shadow-sm transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>Get started in 30 seconds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Giant Typographic Footer (Ultra-minimal) */}
      <footer className="bg-stone-50 pt-14 pb-8 overflow-hidden border-t border-stone-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Minimal branding and essential links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10 border-b border-stone-200/60">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <BrandLogo size="md" />
              <p className="text-xs text-zinc-500">The direct tip link for the Nigerian internet.</p>
            </div>

            <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-600">
              <Link to="/faq" className="hover:text-zinc-950 transition-colors">
                FAQ
              </Link>
              <span>·</span>
              <a
                href="https://x.com/eimaam"
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-950 transition-colors"
              >
                Twitter/X
              </a>
              <span>·</span>
              <a
                href="mailto:hello@tiply.ng"
                className="hover:text-zinc-950 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Copyright line */}
          <div className="pt-6 text-center text-xs text-zinc-400 font-mono">
            <p>© 2026 tiply.ng · Made for the Nigerian internet</p>
          </div>

          {/* Giant low-contrast product watermark typography */}
          <div className="mt-10 select-none text-center pointer-events-none">
            <span className="text-[14vw] font-black tracking-tighter text-stone-200/80 leading-none block">
              tiply.ng
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
