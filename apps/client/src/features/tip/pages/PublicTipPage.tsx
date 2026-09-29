import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../../contexts/AppContext';
import { TipCard } from '../components/TipCard';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { Globe, Heart, MessageSquare, ShieldCheck, Sparkles, Tv } from 'lucide-react';
import { formatNaira } from '@tiply-ng/shared';

export default function PublicTipPage() {
  const { username } = useParams<{ username: string }>();
  const { creator, tips, sendTip } = useApp();

  // In demo mode, fallback to creator profile
  const targetCreator = creator;

  const publicTips = tips.filter((t) => t.status === 'successful');

  return (
    <div className="min-h-screen bg-stone-50/70 text-zinc-900 font-sans flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top bar */}
      <header className="px-4 py-4 sm:px-8 max-w-4xl mx-auto w-full flex items-center justify-between">
        <BrandLogo size="sm" />
        <Link
          to="/signup"
          className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 shadow-2xs transition-colors"
        >
          Create your tip link
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-md space-y-6">
          {/* Social Links & Public Metric Banner (if enabled) */}
          <div className="flex flex-col items-center text-center space-y-3">
            {targetCreator.showTotalReceived && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs text-zinc-600 font-medium shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  <strong className="text-zinc-900 font-semibold">{formatNaira(184500)}</strong> received by{' '}
                  <strong className="text-zinc-900 font-semibold">142</strong> supporters
                </span>
              </div>
            )}

            {/* Social icons */}
            <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
              {targetCreator.socialLinks.twitter && (
                <a
                  href={targetCreator.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-900 transition-colors flex items-center gap-1"
                >
                  <span className="font-semibold">X</span>
                  <span>@{targetCreator.username}</span>
                </a>
              )}
              {targetCreator.socialLinks.twitch && (
                <a
                  href={targetCreator.socialLinks.twitch}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple-600 transition-colors flex items-center gap-1 font-medium"
                >
                  <Tv className="w-3.5 h-3.5 text-purple-600" />
                  <span>Twitch</span>
                </a>
              )}
              {targetCreator.socialLinks.github && (
                <a
                  href={targetCreator.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-900 transition-colors"
                >
                  GitHub
                </a>
              )}
              {targetCreator.socialLinks.website && (
                <a
                  href={targetCreator.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-zinc-900 transition-colors flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Interactive Tip Card */}
          <TipCard creator={targetCreator} onTipSuccess={sendTip} />

          {/* Recent Supporter Messages (if enabled by creator) */}
          {targetCreator.showSupporterMessages && publicTips.length > 0 && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                  Recent Support
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {publicTips.length} tips
                </span>
              </div>

              <div className="space-y-2">
                {publicTips.slice(0, 4).map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-xl bg-white border border-stone-200/90 text-left shadow-2xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-900">
                        {t.isAnonymous ? 'Anonymous' : t.supporterName}
                      </span>
                      <span className="font-bold text-emerald-700 font-mono">
                        {formatNaira(t.amount)}
                      </span>
                    </div>
                    {t.message && (
                      <p className="text-xs text-zinc-600 leading-snug">"{t.message}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center border-t border-stone-200/60 bg-white/50 text-xs text-zinc-500 space-y-1">
        <p className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Powered by <strong>tiply.ng</strong> · Receive tips directly in Naira</span>
        </p>
        <p>
          <Link to="/" className="text-zinc-700 hover:text-zinc-950 font-medium underline underline-offset-2">
            Get your own tip link
          </Link>
        </p>
      </footer>
    </div>
  );
}
