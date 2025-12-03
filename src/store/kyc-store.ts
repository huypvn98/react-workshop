import type { KycData } from "../types/kyc";
import { mockKycData } from "../mock";

const KYC_KEY = "kyc_data";

export const initializeKycData = () => {
  const stored = localStorage.getItem(KYC_KEY);
  if (!stored) {
    localStorage.setItem(KYC_KEY, JSON.stringify(mockKycData));
  }
};

export const getKycData = (userId: number): KycData | null => {
  initializeKycData();
  const stored = localStorage.getItem(KYC_KEY);
  if (!stored) return null;

  const kycList: KycData[] = JSON.parse(stored);
  return kycList.find((k) => k.userId === userId) || null;
};

export const saveKycData = (kycData: KycData): void => {
  initializeKycData();
  const stored = localStorage.getItem(KYC_KEY);
  const kycList: KycData[] = stored ? JSON.parse(stored) : [];

  const existingIndex = kycList.findIndex((k) => k.userId === kycData.userId);
  if (existingIndex >= 0) {
    kycList[existingIndex] = { ...kycData, updatedAt: new Date().toISOString() };
  } else {
    kycList.push({ ...kycData, updatedAt: new Date().toISOString() });
  }

  localStorage.setItem(KYC_KEY, JSON.stringify(kycList));
};

export const calculateNetWorth = (kycData: Partial<KycData["financialStatus"]>): number => {
  const totalIncomes = (kycData.incomes || []).reduce((sum, i) => sum + i.amount, 0);
  const totalAssets = (kycData.assets || []).reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = (kycData.liabilities || []).reduce((sum, l) => sum + l.amount, 0);
  const totalWealth = (kycData.wealthSources || []).reduce((sum, w) => sum + w.amount, 0);

  return totalIncomes + totalAssets - totalLiabilities + totalWealth;
};

