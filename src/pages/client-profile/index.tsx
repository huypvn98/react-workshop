import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Card from "../../components/card";
import { useAuthContext } from "../../contexts";
import { getSubmissionById, getSubmissions } from "../../store/submission-store";
import { ADMIN_URL } from "../../constant/url";
import type { Profile } from "../../types/profile";
import type { KycData } from "../../types/kyc";
import { formatCurrency } from "../../utils/string";
import Input from "../../components/input";
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

type ClientData = Profile & KycData;

const ClientProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { isOfficer } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [clientName, setClientName] = useState("");

  const methods = useForm<ClientData>();
  const { reset } = methods;

  useEffect(() => {
    if (!isOfficer) {
      navigate(ADMIN_URL.PROFILE);
      return;
    }

    if (userId) {
      const submissions = getSubmissions();
      const clientSubmission = submissions.find(
        (s) => s.userId === parseInt(userId)
      );

      if (clientSubmission) {
        const formData: ClientData = {
          ...clientSubmission.profile,
          ...clientSubmission.kycData,
        };
        reset(formData);
        setClientName(clientSubmission.userName);
      }
      setIsLoading(false);
    }
  }, [userId, isOfficer, navigate, reset]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const netWorth = methods.watch("financialStatus.netWorth") || 0;
  const totalLiabilities = (methods.watch("financialStatus.liabilities") || []).reduce(
    (sum, l) => sum + (l?.amount || 0),
    0
  );
  const totalWealth = (methods.watch("financialStatus.wealthSources") || []).reduce(
    (sum, w) => sum + (w?.amount || 0),
    0
  );

  return (
    <div>
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <HomeIcon className="w-4 h-4" />
        <ChevronRightIcon className="w-4 h-4 mx-2" />
        <span>Clients</span>
        <ChevronRightIcon className="w-4 h-4 mx-2" />
        <span className="text-blue-600">{clientName}</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Client Profile - {clientName}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      <FormProvider {...methods}>
        <div className="space-y-6">
          <Card title="Personal Information">
            <div className="space-y-6">
              <BasicInfoSection readOnly />

              <hr className="border-gray-200" />

              <h3 className="text-lg font-semibold text-blue-900">Contact Information</h3>
              <AddressesSection readOnly />
              <EmailsSection readOnly />
              <PhonesSection readOnly />

              <hr className="border-gray-200" />

              <DocumentsSection readOnly />

              <hr className="border-gray-200" />

              <EmploymentSection readOnly />
            </div>
          </Card>

          <Card title="Financial Status">
            <div className="space-y-6">
              <IncomesSection readOnly />

              <hr className="border-gray-200" />

              <AssetsSection readOnly />

              <hr className="border-gray-200" />

              <LiabilitiesSection readOnly />

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

              <WealthSourcesSection readOnly />

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

              <InvestmentSection readOnly />
            </div>
          </Card>
        </div>
      </FormProvider>
    </div>
  );
};

export default ClientProfile;

