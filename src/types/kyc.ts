export enum IncomeType {
  SALARY = "salary",
  INVESTMENT = "investment",
  OTHERS = "others",
}

export enum AssetType {
  BOND = "bond",
  LIQUIDITY = "liquidity",
  REAL_ESTATE = "real_estate",
  OTHERS = "others",
}

export enum LiabilityType {
  PERSONAL_LOAN = "personal_loan",
  REAL_ESTATE_LOAN = "real_estate_loan",
  OTHERS = "others",
}

export enum WealthSourceType {
  INHERITANCE = "inheritance",
  DONATION = "donation",
}

export enum InvestmentExperience {
  LESS_THAN_5 = "less_than_5",
  BETWEEN_5_AND_10 = "between_5_and_10",
  MORE_THAN_10 = "more_than_10",
}

export enum RiskTolerance {
  TEN_PERCENT = "10%",
  THIRTY_PERCENT = "30%",
  ALL_IN = "all_in",
}

export type Income = {
  id: string;
  type: IncomeType;
  amount: number;
};

export type Asset = {
  id: string;
  type: AssetType;
  amount: number;
};

export type Liability = {
  id: string;
  type: LiabilityType;
  amount: number;
};

export type WealthSource = {
  id: string;
  type: WealthSourceType;
  amount: number;
};

export type FinancialStatus = {
  incomes: Income[];
  assets: Asset[];
  liabilities: Liability[];
  wealthSources: WealthSource[];
  netWorth: number;
};

export type InvestmentObjectives = {
  experience: InvestmentExperience;
  riskTolerance: RiskTolerance;
};

export type KycData = {
  id: string;
  userId: number;
  financialStatus: FinancialStatus;
  investmentObjectives: InvestmentObjectives;
  createdAt: string;
  updatedAt: string;
};

