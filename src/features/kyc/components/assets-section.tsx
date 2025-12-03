import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { PlusIcon, TrashIcon } from "../../../components/icons";
import { AssetType } from "../../../types/kyc";
import { generateId } from "../../../utils/string";

type Props = {
  readOnly?: boolean;
};

const assetTypeOptions = [
  { value: AssetType.BOND, label: "Bond" },
  { value: AssetType.LIQUIDITY, label: "Liquidity" },
  { value: AssetType.REAL_ESTATE, label: "Real Estate" },
  { value: AssetType.OTHERS, label: "Others" },
];

const AssetsSection = ({ readOnly = false }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "financialStatus.assets",
  });

  const addAsset = () => {
    append({
      id: generateId(),
      type: AssetType.LIQUIDITY,
      amount: 0,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-900">Assets (B)</h3>
        {!readOnly && (
          <button
            type="button"
            onClick={addAsset}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Asset
          </button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 italic">No assets added yet.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Asset #{index + 1}</span>
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
              options={assetTypeOptions}
              disabled={readOnly}
              {...register(`financialStatus.assets.${index}.type`)}
            />
            <Input
              label="Amount (Currency)"
              type="number"
              placeholder="Enter amount"
              disabled={readOnly}
              error={(errors as any).financialStatus?.assets?.[index]?.amount?.message}
              {...register(`financialStatus.assets.${index}.amount`, {
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

export default AssetsSection;

