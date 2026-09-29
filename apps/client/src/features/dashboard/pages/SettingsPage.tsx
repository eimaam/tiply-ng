import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { useToast } from '../../../components/ui/Toast';
import {
  formatNaira,
  FadeIn,
  UserAvatar,
  Input,
  Textarea,
  Button,
  Checkbox,
  Badge,
  VerifiedBadge,
} from '@tiply-ng/shared';
import {
  User,
  Sliders,
  Building2,
  Bell,
  Shield,
  Plus,
  Trash2,
  AlertCircle,
} from 'lucide-react';

export default function SettingsPage() {
  const { creator, updateCreator } = useApp();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'tip-page' | 'bank' | 'notifications' | 'security'>('profile');

  // Profile local state
  const [displayName, setDisplayName] = useState(creator.displayName);
  const [username, setUsername] = useState(creator.username);
  const [bio, setBio] = useState(creator.bio);
  const [twitter, setTwitter] = useState(creator.socialLinks.twitter || '');
  const [github, setGithub] = useState(creator.socialLinks.github || '');
  const [website, setWebsite] = useState(creator.socialLinks.website || '');

  // Tip Page local state
  const [presets, setPresets] = useState<number[]>(creator.presetAmounts);
  const [newPresetAmount, setNewPresetAmount] = useState('');
  const [defaultAmount, setDefaultAmount] = useState<number>(creator.defaultSelectedAmount);
  const [minTip, setMinTip] = useState<number>(creator.minTipAmount);
  const [maxTip, setMaxTip] = useState<number>(creator.maxTipAmount);
  const [isAcceptingTips, setIsAcceptingTips] = useState<boolean>(creator.isAcceptingTips);
  const [allowMessages, setAllowMessages] = useState<boolean>(creator.allowMessages);
  const [allowAnonymous, setAllowAnonymous] = useState<boolean>(creator.allowAnonymousTips);
  const [showTotalReceived, setShowTotalReceived] = useState<boolean>(creator.showTotalReceived);

  // Notifications local state
  const [notifyTips, setNotifyTips] = useState(true);
  const [notifyPayouts, setNotifyPayouts] = useState(true);
  const [notifySecurity, setNotifySecurity] = useState(true);

  // Security local state
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCreator({
      displayName,
      username,
      bio,
      socialLinks: { twitter, github, website },
    });
    toast('success', 'Profile updated successfully');
  };

  const handleSaveTipSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCreator({
      presetAmounts: presets,
      defaultSelectedAmount: defaultAmount,
      minTipAmount: minTip,
      maxTipAmount: maxTip,
      isAcceptingTips,
      allowMessages,
      allowAnonymousTips: allowAnonymous,
      showTotalReceived,
    });
    toast('success', 'Tip page settings saved');
  };

  const handleAddPreset = () => {
    const val = Number(newPresetAmount);
    if (!val || val <= 0) return;
    if (presets.includes(val)) {
      toast('warning', 'This amount is already a preset');
      return;
    }
    if (presets.length >= 6) {
      toast('warning', 'Maximum 6 preset amounts allowed');
      return;
    }
    const updated = [...presets, val].sort((a, b) => a - b);
    setPresets(updated);
    setNewPresetAmount('');
  };

  const handleRemovePreset = (val: number) => {
    if (presets.length <= 1) {
      toast('warning', 'Must keep at least 1 preset amount');
      return;
    }
    setPresets(presets.filter((p) => p !== val));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'tip-page', label: 'Tip page', icon: Sliders },
    { id: 'bank', label: 'Bank account', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <FadeIn className="space-y-6 sm:space-y-8 text-left">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950">Settings</h1>
        <p className="text-xs sm:text-sm text-zinc-500">Manage your profile, tip page, and payouts.</p>
      </div>

      {/* Sub-tabs Navigation */}
      <div className="flex gap-2 border-b border-stone-200 pb-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-950 text-white shadow-2xs font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-8 shadow-2xs space-y-6 max-w-2xl"
        >
          <div className="border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base sm:text-lg text-zinc-950">Profile</h2>
              {creator.isVerified !== false && <VerifiedBadge size="sm" />}
            </div>
            <p className="text-xs text-zinc-500">
              This is what people see when they visit your public tip link.
            </p>
          </div>

          {/* Photo */}
          <div className="flex items-center gap-4">
            <UserAvatar
              name={creator.displayName}
              imageUrl={creator.avatarUrl}
              className="w-16 h-16 min-w-16 min-h-16 text-lg border-2 border-stone-200 ring-2 ring-stone-100"
            />
            <div className="space-y-1">
              <span className="text-xs font-semibold text-zinc-800">Profile photo</span>
              <p className="text-[11px] text-zinc-400">JPG or PNG, square recommended</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                Display name
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-mono z-10 select-none">
                  tiply.ng/
                </span>
                <Input
                  className="pl-20! font-mono font-semibold"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
              Bio
            </label>
            <Textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell your supporters what you build or create…"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
              Social links (optional)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-500 mb-1">X / Twitter</label>
                <Input
                  size="sm"
                  placeholder="https://x.com/username"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[11px] text-zinc-500 mb-1">GitHub</label>
                <Input
                  size="sm"
                  placeholder="https://github.com/username"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[11px] text-zinc-500 mb-1">Personal Website</label>
                <Input
                  size="sm"
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button htmlType="submit" variant="default">
              Save profile changes
            </Button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: TIP PAGE */}
      {activeTab === 'tip-page' && (
        <form
          onSubmit={handleSaveTipSettings}
          className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-8 shadow-2xs space-y-6 max-w-2xl"
        >
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-bold text-base sm:text-lg text-zinc-950">Tip page</h2>
            <p className="text-xs text-zinc-500">Customize how your tip page behaves for visitors.</p>
          </div>

          {/* Accept Tips Toggle */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/90 flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-zinc-900">Accept tips</p>
              <p className="text-xs text-zinc-500">
                When turned off, visitors see "tips are currently turned off".
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAcceptingTips(!isAcceptingTips)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                isAcceptingTips ? 'bg-emerald-600' : 'bg-zinc-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  isAcceptingTips ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Preset Amounts Manager */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider">
              Preset amounts (max 6)
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              {presets.map((amt) => (
                <div
                  key={amt}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-xl border border-stone-200 text-xs font-bold text-zinc-800 font-mono shadow-2xs"
                >
                  <span>{formatNaira(amt)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePreset(amt)}
                    className="text-zinc-400 hover:text-rose-600 p-0.5 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add preset input with shared Input and Button */}
            <div className="flex gap-2 max-w-xs items-center">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 z-10 select-none">
                  ₦
                </span>
                <Input
                  type="number"
                  size="sm"
                  className="pl-7!"
                  placeholder="e.g. 3000"
                  value={newPresetAmount}
                  onChange={(e) => setNewPresetAmount(e.target.value)}
                />
              </div>
              <Button
                size="sm"
                variant="default"
                onClick={handleAddPreset}
                className="gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </Button>
            </div>
          </div>

          {/* Min and Max Limits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                Minimum tip
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 z-10 select-none">
                  ₦
                </span>
                <Input
                  type="number"
                  className="pl-7!"
                  value={minTip}
                  onChange={(e) => setMinTip(Number(e.target.value))}
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">Useful to avoid micro spam transactions</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-1.5">
                Maximum tip
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 z-10 select-none">
                  ₦
                </span>
                <Input
                  type="number"
                  className="pl-7!"
                  value={maxTip}
                  onChange={(e) => setMaxTip(Number(e.target.value))}
                />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1">Risk and fraud controls</p>
            </div>
          </div>

          {/* Feature Toggles with shared Checkbox */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
              Supporter options
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-stone-100">
              <div>
                <p className="font-semibold text-xs text-zinc-900">Allow messages</p>
                <p className="text-[11px] text-zinc-500">Let supporters leave a message with their tip</p>
              </div>
              <Checkbox
                checked={allowMessages}
                onChange={(e) => setAllowMessages(e.target.checked)}
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-stone-100">
              <div>
                <p className="font-semibold text-xs text-zinc-900">Allow anonymous tips</p>
                <p className="text-[11px] text-zinc-500">Let supporters hide their identity on your page</p>
              </div>
              <Checkbox
                checked={allowAnonymous}
                onChange={(e) => setAllowAnonymous(e.target.checked)}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-xs text-zinc-900">Show total received</p>
                <p className="text-[11px] text-zinc-500">Show public metric banner on your page</p>
              </div>
              <Checkbox
                checked={showTotalReceived}
                onChange={(e) => setShowTotalReceived(e.target.checked)}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button htmlType="submit" variant="default">
              Save tip page settings
            </Button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: BANK ACCOUNT */}
      {activeTab === 'bank' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-8 shadow-2xs space-y-6 max-w-2xl">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-bold text-base sm:text-lg text-zinc-950">Bank account</h2>
            <p className="text-xs text-zinc-500">This is where your tips are settled via Monnify.</p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-base text-zinc-900">
                {creator.bankAccount.accountNumberMasked}
              </span>
              <Badge status="verified" label="Verified Bank" />
            </div>
            <p className="text-xs text-zinc-500 font-medium">{creator.bankAccount.accountName}</p>
          </div>

          <div className="text-xs text-zinc-500 flex items-start gap-2.5 p-3.5 bg-amber-50 rounded-xl border border-amber-200/70 text-amber-900 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Changing your bank account may temporarily pause payouts for verification to safeguard your funds.
            </span>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-8 shadow-2xs space-y-6 max-w-2xl">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-bold text-base sm:text-lg text-zinc-950">Notifications</h2>
            <p className="text-xs text-zinc-500">Choose when tiply should notify you.</p>
          </div>

          <div className="divide-y divide-stone-100">
            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-900">New tips</p>
                <p className="text-[11px] text-zinc-400">Receive an email when someone tips you</p>
              </div>
              <Checkbox
                checked={notifyTips}
                onChange={(e) => setNotifyTips(e.target.checked)}
              />
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-900">Payouts</p>
                <p className="text-[11px] text-zinc-400">Receive an email when money settles to your bank</p>
              </div>
              <Checkbox
                checked={notifyPayouts}
                onChange={(e) => setNotifyPayouts(e.target.checked)}
              />
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-900">Security alerts</p>
                <p className="text-[11px] text-zinc-400">Notifies of new logins and password updates</p>
              </div>
              <Checkbox
                checked={notifySecurity}
                onChange={(e) => setNotifySecurity(e.target.checked)}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-8 shadow-2xs space-y-6 max-w-2xl">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="font-bold text-base sm:text-lg text-zinc-950">Security</h2>
            <p className="text-xs text-zinc-500">Keep your account and payouts safe.</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                Active sessions
              </h3>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/90 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-zinc-900">macOS · Chrome · Lagos, Nigeria</p>
                  <p className="text-zinc-400 font-mono text-[11px]">Current session · Active now</p>
                </div>
                <Badge status="active" label="Active" />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-900">Two-factor authentication</p>
                <p className="text-[11px] text-zinc-400">Require an authenticator code when signing in</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTwoFactor(!twoFactor);
                  toast('info', twoFactor ? '2FA disabled' : '2FA enabled');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  twoFactor ? 'bg-emerald-600' : 'bg-zinc-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    twoFactor ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </FadeIn>
  );
}
