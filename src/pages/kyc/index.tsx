import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router";
import Card from "../../components/card";
import Button from "../../components/button";
import Input from "../../components/input";
import { useAuthContext } from "../../contexts";
import { getProfile, saveProfile } from "../../store/profile-store";
import { getKycData, saveKycData, calculateNetWorth } from "../../store/kyc-store";
import { createSubmission } from "../../store/submission-store";
import { ADMIN_URL } from "../../constant/url";
import type { Profile } from "../../types/profile";
import type { KycData } from "../../types/kyc";
import { InvestmentExperience, RiskTolerance } from "../../types/kyc";
import { SubmissionStatus, type KycSubmission } from "../../types/submission";
import { generateId, getFullName, formatCurrency } from "../../utils/string";
import {
  BasicInfoSection,
  AddressesSection,
  EmailsSection,
  PhonesSection,
  DocumentsSection,
  EmploymentSection,
} from "../../features/profile/components";
import {
  IncomesSection,
  AssetsSection,
  LiabilitiesSection,
  WealthSourcesSection,
  InvestmentSection,
} from "../../features/kyc/components";
import { ChevronRightIcon, HomeIcon } from "../../components/icons";

type KycFormData = Profile & KycData;

const defaultKycData: Omit<KycData, "id" | "userId" | "createdAt" | "updatedAt"> = {
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
};

const KycForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const methods = useForm<KycFormData>();
  const { handleSubmit, reset, watch } = methods;

  const watchIncomes = watch("financialStatus.incomes") || [];
  const watchAssets = watch("financialStatus.assets") || [];
  const watchLiabilities = watch("financialStatus.liabilities") || [];
  const watchWealthSources = watch("financialStatus.wealthSources") || [];

  const netWorth = useMemo(() => {
    return calculateNetWorth({
      incomes: watchIncomes,
      assets: watchAssets,
      liabilities: watchLiabilities,
      wealthSources: watchWealthSources,
    });
  }, [watchIncomes, watchAssets, watchLiabilities, watchWealthSources]);

  const totalLiabilities = useMemo(() => {
    return watchLiabilities.reduce((sum, l) => sum + (l?.amount || 0), 0);
  }, [watchLiabilities]);

  const totalWealth = useMemo(() => {
    return watchWealthSources.reduce((sum, w) => sum + (w?.amount || 0), 0);
  }, [watchWealthSources]);

  useEffect(() => {
    if (user?.id) {
      const profileData = getProfile(user.id);
      const kycData = getKycData(user.id);

      const formData: Partial<KycFormData> = {
        userId: user.id,
        basicInfo: profileData?.basicInfo || {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          middleName: "",
          dateOfBirth: "",
        },
        contactInfo: profileData?.contactInfo || {
          addresses: [],
          emails: [],
          phones: [],
        },
        documents: profileData?.documents || [],
        employments: profileData?.employments || [],
        financialStatus: kycData?.financialStatus || defaultKycData.financialStatus,
        investmentObjectives: kycData?.investmentObjectives || defaultKycData.investmentObjectives,
      };

      reset(formData as KycFormData);
      setIsLoading(false);
    }
  }, [user, reset]);

  const onSubmit = (data: KycFormData) => {
    if (!user?.id) return;

    const profile: Profile = {
      userId: user.id,
      basicInfo: data.basicInfo,
      contactInfo: data.contactInfo,
      documents: data.documents,
      employments: data.employments,
    };
    saveProfile(profile);

    const kycData: KycData = {
      id: generateId(),
      userId: user.id,
      financialStatus: {
        ...data.financialStatus,
        netWorth,
      },
      investmentObjectives: data.investmentObjectives,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveKycData(kycData);

    const submission: KycSubmission = {
      id: generateId(),
      userId: user.id,
      userName: getFullName(data.basicInfo.firstName, data.basicInfo.lastName, data.basicInfo.middleName),
      profile,
      kycData,
      status: SubmissionStatus.PENDING,
      submittedAt: new Date().toISOString(),
    };
    createSubmission(submission);

    navigate(ADMIN_URL.RESULTS);
  };

  const handleCancel = () => {
    navigate(ADMIN_URL.PROFILE);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <HomeIcon className="w-4 h-4" />
        <ChevronRightIcon className="w-4 h-4 mx-2" />
        <span>KYC</span>
        <ChevronRightIcon className="w-4 h-4 mx-2" />
        <span className="text-blue-600">Financial Status</span>
      </nav>

      <h1 className="text-2xl font-bold text-blue-900 mb-6">Financial Status</h1>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Card>
              <div className="space-y-6">
                <BasicInfoSection />

                <hr className="border-gray-200" />

                <h3 className="text-lg font-semibold text-blue-900">Contact Information</h3>
                <AddressesSection />
                <EmailsSection />
                <PhonesSection />

                <hr className="border-gray-200" />

                <DocumentsSection />

                <hr className="border-gray-200" />

                <EmploymentSection />
              </div>
            </Card>

            <Card>
              <div className="space-y-6">
                <IncomesSection />

                <hr className="border-gray-200" />

                <AssetsSection />

                <hr className="border-gray-200" />

                <LiabilitiesSection />

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Liabilities
                  </label>
                  <Input
                    value={formatCurrency(totalLiabilities)}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <hr className="border-gray-200" />

                <WealthSourcesSection />

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Source of Wealth
                  </label>
                  <Input
                    value={formatCurrency(totalWealth)}
                    disabled
                    className="bg-gray-100"
                  />
                </div>

                <hr className="border-gray-200" />

                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Net Worth</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                    <Input
                      value={formatCurrency(netWorth)}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>

                <hr className="border-gray-200" />

                <InvestmentSection />
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default KycForm;

