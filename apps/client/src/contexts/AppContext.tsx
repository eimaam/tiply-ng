import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  CreatorProfile,
  Tip,
  Payout,
  AnalyticsData,
  AdminStats,
  AuditLog,
} from '@tiply-ng/shared/types';
import {
  initialCreator,
  initialTips,
  initialPayouts,
  initialAnalytics,
  initialAdminStats,
  initialAuditLogs,
} from '../lib/mockData';

interface AppContextType {
  creator: CreatorProfile;
  tips: Tip[];
  payouts: Payout[];
  analytics: AnalyticsData;
  adminStats: AdminStats;
  auditLogs: AuditLog[];
  updateCreator: (updates: Partial<CreatorProfile>) => void;
  updateBankAccount: (bank: Partial<CreatorProfile['bankAccount']>) => void;
  sendTip: (tipData: {
    supporterName?: string;
    isAnonymous: boolean;
    message?: string;
    amount: number;
    email?: string;
  }) => Tip;
  requestPayout: (amount: number) => Payout;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'tiply_ng_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [creator, setCreator] = useState<CreatorProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_creator`);
      return saved ? JSON.parse(saved) : initialCreator;
    } catch {
      return initialCreator;
    }
  });

  const [tips, setTips] = useState<Tip[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tips`);
      return saved ? JSON.parse(saved) : initialTips;
    } catch {
      return initialTips;
    }
  });

  const [payouts, setPayouts] = useState<Payout[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_payouts`);
      return saved ? JSON.parse(saved) : initialPayouts;
    } catch {
      return initialPayouts;
    }
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_analytics`);
      return saved ? JSON.parse(saved) : initialAnalytics;
    } catch {
      return initialAnalytics;
    }
  });

  const [adminStats, setAdminStats] = useState<AdminStats>(() => initialAdminStats);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => initialAuditLogs);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_creator`, JSON.stringify(creator));
  }, [creator]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tips`, JSON.stringify(tips));
  }, [tips]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_payouts`, JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_analytics`, JSON.stringify(analytics));
  }, [analytics]);

  const updateCreator = (updates: Partial<CreatorProfile>) => {
    setCreator((prev) => ({ ...prev, ...updates }));
  };

  const updateBankAccount = (bank: Partial<CreatorProfile['bankAccount']>) => {
    setCreator((prev) => ({
      ...prev,
      bankAccount: { ...prev.bankAccount, ...bank },
    }));
  };

  const sendTip = (tipData: {
    supporterName?: string;
    isAnonymous: boolean;
    message?: string;
    amount: number;
    email?: string;
  }): Tip => {
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const reference = `TPLY-${randomSuffix}`;

    const newTip: Tip = {
      id: `tip_${Date.now()}`,
      creatorId: creator.id,
      creatorUsername: creator.username,
      creatorDisplayName: creator.displayName,
      supporterName: tipData.isAnonymous ? 'Anonymous' : (tipData.supporterName?.trim() || 'Supporter'),
      isAnonymous: tipData.isAnonymous,
      message: tipData.message?.trim() || undefined,
      amount: tipData.amount,
      currency: 'NGN',
      status: 'successful',
      settlementStatus: 'available',
      reference,
      providerReference: `PAYSTACK_REF_${Date.now().toString().slice(-8)}`,
      supporterEmail: tipData.email,
      createdAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
    };

    setTips((prev) => [newTip, ...prev]);

    // Update analytics & totals dynamically
    setAnalytics((prev) => {
      const newTotal = prev.totalReceived + tipData.amount;
      const newMonth = prev.thisMonthReceived + tipData.amount;
      const newCount = prev.tipsCount + 1;
      const newAvg = Math.round(newTotal / newCount);
      const newLargest = Math.max(prev.largestTip, tipData.amount);

      return {
        ...prev,
        totalReceived: newTotal,
        thisMonthReceived: newMonth,
        tipsCount: newCount,
        averageTip: newAvg,
        largestTip: newLargest,
        funnel: {
          ...prev.funnel,
          completed: prev.funnel.completed + 1,
        },
        namedVsAnonymous: {
          named: tipData.isAnonymous ? prev.namedVsAnonymous.named : prev.namedVsAnonymous.named + 1,
          anonymous: tipData.isAnonymous ? prev.namedVsAnonymous.anonymous + 1 : prev.namedVsAnonymous.anonymous,
        },
      };
    });

    setAdminStats((prev) => ({
      ...prev,
      totalVolume: prev.totalVolume + tipData.amount,
      platformRevenue: prev.platformRevenue + Math.round(tipData.amount * 0.03),
      tipsToday: prev.tipsToday + 1,
    }));

    return newTip;
  };

  const requestPayout = (amount: number): Payout => {
    const newPayout: Payout = {
      id: `po_${Date.now()}`,
      creatorId: creator.id,
      amount,
      currency: 'NGN',
      bankName: creator.bankAccount.bankName,
      accountNumberMasked: creator.bankAccount.accountNumberMasked,
      accountName: creator.bankAccount.accountName,
      status: 'processing',
      reference: `PO-${Date.now().toString().slice(-8)}`,
      schedule: creator.bankAccount.payoutSchedule,
      createdAt: new Date().toISOString(),
    };

    setPayouts((prev) => [newPayout, ...prev]);
    return newPayout;
  };

  return (
    <AppContext.Provider
      value={{
        creator,
        tips,
        payouts,
        analytics,
        adminStats,
        auditLogs,
        updateCreator,
        updateBankAccount,
        sendTip,
        requestPayout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
