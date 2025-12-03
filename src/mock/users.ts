import type { Profile } from "../types/profile";
import {
  AddressType,
  ContactType,
  DocumentType,
} from "../types/profile";
import type { KycData } from "../types/kyc";
import {
  IncomeType,
  AssetType,
  LiabilityType,
  WealthSourceType,
  InvestmentExperience,
  RiskTolerance,
} from "../types/kyc";
import type { KycSubmission } from "../types/submission";
import { SubmissionStatus } from "../types/submission";
import { generateId } from "../utils/string";

export const mockProfiles: Profile[] = [
  {
    userId: 1,
    basicInfo: {
      firstName: "Emily",
      middleName: "Rose",
      lastName: "Smith",
      dateOfBirth: "1990-05-15",
    },
    contactInfo: {
      addresses: [
        {
          id: generateId(),
          country: "United States",
          city: "San Francisco",
          street: "123 Market Street",
          postalCode: "94102",
          type: AddressType.MAILING,
        },
      ],
      emails: [
        {
          id: generateId(),
          email: "emily.smith@gmail.com",
          type: ContactType.PERSONAL,
          preferred: true,
        },
      ],
      phones: [
        {
          id: generateId(),
          number: "+1 (555) 123-4567",
          type: ContactType.PERSONAL,
          preferred: true,
        },
      ],
    },
    documents: [
      {
        id: generateId(),
        type: DocumentType.PASSPORT,
        expiryDate: "2028-06-15",
        fileName: "passport.pdf",
      },
    ],
    employments: [
      {
        id: generateId(),
        name: "Tech Corp Inc.",
        fromYear: 2018,
        toYear: undefined,
      },
    ],
    updatedAt: new Date().toISOString(),
  },
];

export const mockKycData: KycData[] = [
  {
    id: generateId(),
    userId: 1,
    financialStatus: {
      incomes: [
        { id: generateId(), type: IncomeType.SALARY, amount: 120000 },
        { id: generateId(), type: IncomeType.INVESTMENT, amount: 15000 },
      ],
      assets: [
        { id: generateId(), type: AssetType.LIQUIDITY, amount: 50000 },
        { id: generateId(), type: AssetType.REAL_ESTATE, amount: 350000 },
      ],
      liabilities: [
        { id: generateId(), type: LiabilityType.REAL_ESTATE_LOAN, amount: 200000 },
      ],
      wealthSources: [
        { id: generateId(), type: WealthSourceType.INHERITANCE, amount: 100000 },
      ],
      netWorth: 435000,
    },
    investmentObjectives: {
      experience: InvestmentExperience.BETWEEN_5_AND_10,
      riskTolerance: RiskTolerance.THIRTY_PERCENT,
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export const mockSubmissions: KycSubmission[] = [
  {
    id: "sub-001",
    userId: 2,
    userName: "John Doe",
    profile: {
      userId: 2,
      basicInfo: {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1985-03-20",
      },
      contactInfo: {
        addresses: [
          {
            id: "addr-001",
            country: "United States",
            city: "New York",
            street: "456 Broadway",
            postalCode: "10001",
            type: AddressType.WORK,
          },
        ],
        emails: [
          {
            id: "email-001",
            email: "john.doe@company.com",
            type: ContactType.WORK,
            preferred: true,
          },
        ],
        phones: [
          {
            id: "phone-001",
            number: "+1 (555) 987-6543",
            type: ContactType.WORK,
            preferred: true,
          },
        ],
      },
      documents: [],
      employments: [
        {
          id: "emp-001",
          name: "Finance Corp",
          fromYear: 2015,
        },
      ],
    },
    kycData: {
      id: "kyc-001",
      userId: 2,
      financialStatus: {
        incomes: [{ id: "inc-001", type: IncomeType.SALARY, amount: 150000 }],
        assets: [{ id: "asset-001", type: AssetType.BOND, amount: 75000 }],
        liabilities: [],
        wealthSources: [],
        netWorth: 225000,
      },
      investmentObjectives: {
        experience: InvestmentExperience.MORE_THAN_10,
        riskTolerance: RiskTolerance.ALL_IN,
      },
      createdAt: "2024-12-01T08:00:00Z",
      updatedAt: "2024-12-01T08:00:00Z",
    },
    status: SubmissionStatus.PENDING,
    submittedAt: "2024-12-01T08:00:00Z",
  },
  {
    id: "sub-002",
    userId: 3,
    userName: "Jane Smith",
    profile: {
      userId: 3,
      basicInfo: {
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1992-07-10",
      },
      contactInfo: {
        addresses: [
          {
            id: "addr-002",
            country: "United States",
            city: "Los Angeles",
            street: "789 Sunset Blvd",
            type: AddressType.MAILING,
          },
        ],
        emails: [
          {
            id: "email-002",
            email: "jane.smith@email.com",
            type: ContactType.PERSONAL,
            preferred: true,
          },
        ],
        phones: [
          {
            id: "phone-002",
            number: "+1 (555) 456-7890",
            type: ContactType.PERSONAL,
            preferred: true,
          },
        ],
      },
      documents: [],
      employments: [],
    },
    kycData: {
      id: "kyc-002",
      userId: 3,
      financialStatus: {
        incomes: [{ id: "inc-002", type: IncomeType.SALARY, amount: 85000 }],
        assets: [{ id: "asset-002", type: AssetType.LIQUIDITY, amount: 25000 }],
        liabilities: [{ id: "liab-002", type: LiabilityType.PERSONAL_LOAN, amount: 10000 }],
        wealthSources: [],
        netWorth: 100000,
      },
      investmentObjectives: {
        experience: InvestmentExperience.LESS_THAN_5,
        riskTolerance: RiskTolerance.TEN_PERCENT,
      },
      createdAt: "2024-12-05T14:30:00Z",
      updatedAt: "2024-12-05T14:30:00Z",
    },
    status: SubmissionStatus.PENDING,
    submittedAt: "2024-12-05T14:30:00Z",
  },
  {
    id: "sub-003",
    userId: 4,
    userName: "Michael Johnson",
    profile: {
      userId: 4,
      basicInfo: {
        firstName: "Michael",
        lastName: "Johnson",
        dateOfBirth: "1980-11-25",
      },
      contactInfo: {
        addresses: [],
        emails: [
          {
            id: "email-003",
            email: "m.johnson@work.com",
            type: ContactType.WORK,
            preferred: true,
          },
        ],
        phones: [],
      },
      documents: [],
      employments: [],
    },
    kycData: {
      id: "kyc-003",
      userId: 4,
      financialStatus: {
        incomes: [],
        assets: [],
        liabilities: [],
        wealthSources: [],
        netWorth: 0,
      },
      investmentObjectives: {
        experience: InvestmentExperience.LESS_THAN_5,
        riskTolerance: RiskTolerance.TEN_PERCENT,
      },
      createdAt: "2024-11-20T09:15:00Z",
      updatedAt: "2024-11-20T09:15:00Z",
    },
    status: SubmissionStatus.APPROVED,
    submittedAt: "2024-11-20T09:15:00Z",
    reviewedAt: "2024-11-21T10:00:00Z",
    reviewedBy: 100,
  },
  {
    id: "sub-004",
    userId: 5,
    userName: "Sarah Williams",
    profile: {
      userId: 5,
      basicInfo: {
        firstName: "Sarah",
        lastName: "Williams",
        dateOfBirth: "1995-02-14",
      },
      contactInfo: {
        addresses: [],
        emails: [],
        phones: [],
      },
      documents: [],
      employments: [],
    },
    kycData: {
      id: "kyc-004",
      userId: 5,
      financialStatus: {
        incomes: [],
        assets: [],
        liabilities: [],
        wealthSources: [],
        netWorth: 0,
      },
      investmentObjectives: {
        experience: InvestmentExperience.LESS_THAN_5,
        riskTolerance: RiskTolerance.TEN_PERCENT,
      },
      createdAt: "2024-11-18T16:45:00Z",
      updatedAt: "2024-11-18T16:45:00Z",
    },
    status: SubmissionStatus.REJECTED,
    submittedAt: "2024-11-18T16:45:00Z",
    reviewedAt: "2024-11-19T11:30:00Z",
    reviewedBy: 100,
  },
];

