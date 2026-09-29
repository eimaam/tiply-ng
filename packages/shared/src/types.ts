// Core domain types for tiply.ng

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'successful'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'reversed';

export type SettlementStatus =
  | 'unsettled'
  | 'available'
  | 'processing'
  | 'paid'
  | 'failed'
  | 'reversed';

export type PayoutSchedule = 'daily' | 'weekly' | 'manual';

export interface BankAccount {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountNumberMasked: string;
  accountName: string;
  isVerified: boolean;
  payoutSchedule: PayoutSchedule;
}

export interface CreatorProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  email: string;
  isVerified?: boolean;
  isAcceptingTips: boolean;
  showTotalReceived: boolean;
  showSupporterMessages: boolean;
  allowAnonymousTips: boolean;
  allowMessages: boolean;
  presetAmounts: number[];
  defaultSelectedAmount: number;
  minTipAmount: number;
  maxTipAmount: number;
  socialLinks: {
    twitter?: string;
    twitch?: string;
    instagram?: string;
    website?: string;
    github?: string;
    youtube?: string;
  };
  bankAccount: BankAccount;
  createdAt: string;
}

export interface Tip {
  id: string;
  creatorId: string;
  creatorUsername: string;
  creatorDisplayName: string;
  supporterName: string;
  isAnonymous: boolean;
  message?: string;
  amount: number;
  currency: 'NGN';
  status: PaymentStatus;
  settlementStatus: SettlementStatus;
  reference: string;
  providerReference?: string;
  supporterEmail?: string;
  createdAt: string;
  paidAt?: string;
}

export interface Payout {
  id: string;
  creatorId: string;
  amount: number;
  currency: 'NGN';
  bankName: string;
  accountNumberMasked: string;
  accountName: string;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'reversed';
  reference: string;
  schedule: PayoutSchedule;
  createdAt: string;
  paidAt?: string;
}

export interface AnalyticsData {
  profileViews: number;
  tipsCount: number;
  conversionRate: number;
  averageTip: number;
  largestTip: number;
  totalReceived: number;
  thisMonthReceived: number;
  growthPercentage: number;
  funnel: {
    visits: number;
    startedTipping: number;
    completed: number;
  };
  topAmounts: { amount: number; count: number }[];
  namedVsAnonymous: {
    named: number;
    anonymous: number;
  };
  dailyActivity: {
    date: string;
    views: number;
    tips: number;
    amount: number;
  }[];
}

export interface AdminStats {
  totalVolume: number;
  platformRevenue: number;
  totalUsers: number;
  activeUsers: number;
  tipsToday: number;
  failedPayments: number;
  pendingPayoutsCount: number;
  pendingPayoutsVolume: number;
  failedPayouts: number;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  metadata?: Record<string, any>;
  createdAt: string;
}
