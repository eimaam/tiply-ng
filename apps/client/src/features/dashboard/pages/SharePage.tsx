import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { QRCode } from 'antd';
import html2canvas from 'html2canvas';
import { useApp } from '../../../contexts/AppContext';
import { useToast } from '../../../components/ui/Toast';
import {
  formatNaira,
  FadeIn,
  UserAvatar,
  Button,
  VerifiedBadge,
} from '@tiply-ng/shared';
import {
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  QrCode,
  Sparkles,
  Heart,
  MessageCircle,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';

const XIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function SharePage() {
  const { creator } = useApp();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isDownloadingCard, setIsDownloadingCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const fullUrl = `https://tiply.ng/${creator.username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast('success', 'Tip link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareOnX = () => {
    const text = encodeURIComponent(
      `Support my work and say thanks directly in Naira: ${fullUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! You can support my work directly in Naira on tiply.ng: ${fullUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${creator.displayName} on tiply.ng`,
          text: `Support my work and say thanks directly in Naira on tiply:`,
          url: fullUrl,
        });
        toast('success', 'Shared successfully!');
        return;
      } catch (err) {
        // user cancelled or share failed, fallback
      }
    }
    handleCopyLink();
  };

  const handleDownloadQr = () => {
    const canvas = qrContainerRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `tiply-${creator.username}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast('success', 'QR code downloaded as PNG');
      return;
    }

    // Fallback: svg if rendered as svg
    const svg = qrContainerRef.current?.querySelector('svg');
    if (svg) {
      const svgString = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tiply-${creator.username}-qr.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast('success', 'QR code downloaded as SVG');
    }
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setIsDownloadingCard(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#18181b',
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `tiply-${creator.username}-share-card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast('success', 'Share card downloaded as image!');
    } catch (err) {
      toast('error', 'Failed to generate share card image');
    } finally {
      setIsDownloadingCard(false);
    }
  };

  return (
    <FadeIn className="space-y-6 sm:space-y-8 text-left max-w-4xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950">Share tools</h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Ready-made tools, real scannable QR codes, and cards to share your tip link.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Link & Social Share */}
        <div className="space-y-6">
          {/* Quick Copy Link Box */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-zinc-950">Your tip link</h3>
            <p className="text-xs text-zinc-500">
              Put this in your social bios, YouTube descriptions, or send via WhatsApp.
            </p>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-zinc-900 truncate">
                {fullUrl}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ml-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Quick Share Buttons */}
            <div className="pt-1 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleShareOnX}
                  className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <XIcon className="w-3.5 h-3.5 text-zinc-900" />
                  <span>Share on X</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleShareOnWhatsApp}
                  className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={handleNativeShare}
                  className="flex-1 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Share via…</span>
                </Button>

                <Link
                  to={`/${creator.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-semibold text-zinc-800 transition-colors"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-zinc-950">Interactive QR code</h3>
                
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Real, high-precision QR code. Perfect for slides, video overlays, and physical flyers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-stone-50/70 rounded-xl border border-stone-200/80">
              <div
                ref={qrContainerRef}
                id="tiply-qr-code"
                className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-2xs flex items-center justify-center"
              >
                <QRCode
                  value={fullUrl}
                  size={140}
                  errorLevel="H"
                  color="#09090b"
                  bgColor="#ffffff"
                  bordered={false}
                />
              </div>

              <div className="space-y-2.5 text-center sm:text-left flex-1 min-w-0">
                <div className="space-y-0.5">
                  <span className="font-mono text-[11px] text-zinc-400 block uppercase tracking-wider">
                    Instant scan link
                  </span>
                  <p className="text-sm font-bold text-zinc-950 font-mono truncate">
                    tiply.ng/{creator.username}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Directs supporters straight to your tipping page with zero signups required.
                  </p>
                </div>

                <div className="pt-1">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleDownloadQr}
                    className="text-xs font-semibold flex items-center gap-1.5 mx-auto sm:mx-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download QR (PNG)</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tip Card Generator Section & Downloadable Image */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-zinc-950">Social share card</h3>
              <p className="text-xs text-zinc-500">
                Rendered with verified checkmark and embedded QR code.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase">1080 × 1080</span>
          </div>

          {/* Formatted Social Media Share Card (Ref captured by html2canvas) */}
          <div
            ref={cardRef}
            id="social-share-card"
            className="p-6 rounded-2xl bg-zinc-950 text-white space-y-5 shadow-lg relative overflow-hidden border border-zinc-800"
          >
            {/* Ambient emerald backlight glow */}
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Card Brand Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <span className="text-xs font-bold font-mono tracking-tight text-white flex items-center gap-1">
                tiply<span className="text-emerald-400">.ng</span>
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                Official Tip Link
              </span>
            </div>

            {/* Creator Profile with Custom Verified Check */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <UserAvatar
                  name={creator.displayName}
                  imageUrl={creator.avatarUrl}
                  size="md"
                  className="w-12 h-12 min-w-12 min-h-12 border-2 border-zinc-700 ring-2 ring-emerald-500/30"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-base text-white truncate">
                      {creator.displayName}
                    </h4>
                    {creator.isVerified !== false && <VerifiedBadge size="sm" />}
                  </div>
                  <p className="text-xs text-emerald-400 font-mono">
                    tiply.ng/{creator.username}
                  </p>
                </div>
              </div>

              {/* Scannable Mini QR Code on the Card */}
              <div className="bg-white p-1.5 rounded-xl border border-zinc-700 shadow-md shrink-0">
                <QRCode
                  value={fullUrl}
                  size={58}
                  errorLevel="M"
                  color="#09090b"
                  bgColor="#ffffff"
                  bordered={false}
                />
              </div>
            </div>

            {/* Creator Bio */}
            <p className="text-xs text-zinc-300 leading-relaxed italic line-clamp-3">
              "{creator.bio}"
            </p>

            {/* Preset Amount Pills */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-center font-mono text-xs">
              {creator.presetAmounts.map((amt) => (
                <div
                  key={amt}
                  className="py-1.5 bg-zinc-900/90 rounded-lg border border-zinc-800 font-semibold text-zinc-200"
                >
                  {formatNaira(amt)}
                </div>
              ))}
            </div>

            {/* Card Footer Trust Marks */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800/80">
              <span className="flex items-center gap-1">
                <span>Direct Naira settlement</span>
              </span>
              <span className="text-emerald-400 font-medium">Secured by Monnify</span>
            </div>
          </div>

          {/* Working Actions for Share Card */}
          <div className="space-y-2 pt-1">
            <Button
              variant="default"
              fullWidth
              onClick={handleDownloadCard}
              disabled={isDownloadingCard}
              className="text-xs font-semibold flex items-center justify-center gap-2"
            >
              {isDownloadingCard ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating high-res image…</span>
                </>
              ) : (
                <div className='flex items-center gap-2'>
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Download share card (PNG)</span>
                </div>
              )}
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleShareOnX}
                className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <XIcon className="w-3.5 h-3.5 text-zinc-900" />
                <span>Tweet card link</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleShareOnWhatsApp}
                className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Send WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
