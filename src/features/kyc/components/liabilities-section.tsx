import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { PlusIcon, TrashIcon } from "../../../components/icons";
import { LiabilityType } from "../../../types/kyc";
import { generateId } from "../../../utils/string";

type Props = {
  readOnly?: boolean;
};

const liabilityTypeOptions = [
  { value: LiabilityType.PERSONAL_LOAN, label: "Personal Loan" },
  { value: LiabilityType.REAL_ESTATE_LOAN, label: "Real Estate Loan" },
  { value: LiabilityType.OTHERS, label: "Others" },
];

const LiabilitiesSection = ({ readOnly = false }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "financialStatus.liabilities",
  });

  const addLiability = () => {
    append({
      id: generateId(),
      type: LiabilityType.PERSONAL_LOAN,
      amount: 0,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-900">Liabilities (C)</h3>
        {!readOnly && (
          <button
            type="button"
            onClick={addLiability}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Liability
          </button>
        )}
      </div>

      <p className="text-sm text-gray-600">
        Liabilities are any outstanding debts or obligations you may have. These can include loans such as personal loans, mortgages, or other forms of debt.
      </p>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 italic">No liabilities added yet.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Liability #{index + 1}</span>
            {!readOnly && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Type"
              options={liabilityTypeOptions}
              disabled={readOnly}
              {...register(`financialStatus.liabilities.${index}.type`)}
            />
            <Input
              label="Amount (Currency)"
              type="number"
              placeholder="Enter amount"
              disabled={readOnly}
              error={(errors as any).financialStatus?.liabilities?.[index]?.amount?.message}
              {...register(`financialStatus.liabilities.${index}.amount`, {
                required: "Amount is required",
                valueAsNumber: true,
                min: { value: 0, message: "Amount must be positive" },
              })}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiabilitiesSection;

