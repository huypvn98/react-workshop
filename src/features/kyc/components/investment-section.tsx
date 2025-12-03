import { useFormContext } from "react-hook-form";
import Select from "../../../components/select";
import { InvestmentExperience, RiskTolerance } from "../../../types/kyc";

type Props = {
  readOnly?: boolean;
};

const experienceOptions = [
  { value: InvestmentExperience.LESS_THAN_5, label: "< 5 years" },
  { value: InvestmentExperience.BETWEEN_5_AND_10, label: "> 5 and < 10 years" },
  { value: InvestmentExperience.MORE_THAN_10, label: "> 10 years" },
];

const riskToleranceOptions = [
  { value: RiskTolerance.TEN_PERCENT, label: "10%" },
  { value: RiskTolerance.THIRTY_PERCENT, label: "30%" },
  { value: RiskTolerance.ALL_IN, label: "All-in" },
];

const InvestmentSection = ({ readOnly = false }: Props) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-900">Investment Experience and Objectives</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Experience in Financial Markets"
          options={experienceOptions}
          disabled={readOnly}
          {...register("investmentObjectives.experience")}
        />
        <Select
          label="Risk Tolerance"
          options={riskToleranceOptions}
          disabled={readOnly}
          {...register("investmentObjectives.riskTolerance")}
        />
      </div>
    </div>
  );
};

export default InvestmentSection;

