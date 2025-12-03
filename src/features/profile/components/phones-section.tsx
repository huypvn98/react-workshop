import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { PlusIcon, TrashIcon } from "../../../components/icons";
import { ContactType, type Profile } from "../../../types/profile";
import { generateId } from "../../../utils/string";

type Props = {
  readOnly?: boolean;
};

const phoneTypeOptions = [
  { value: ContactType.PERSONAL, label: "Personal" },
  { value: ContactType.WORK, label: "Work" },
];

const preferredOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const PhonesSection = ({ readOnly = false }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Profile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactInfo.phones",
  });

  const addPhone = () => {
    append({
      id: generateId(),
      number: "",
      type: ContactType.PERSONAL,
      preferred: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-gray-700">Phones</h4>
        {!readOnly && (
          <button
            type="button"
            onClick={addPhone}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Phone
          </button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 italic">No phones added yet.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Phone #{index + 1}</span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              disabled={readOnly}
              error={errors.contactInfo?.phones?.[index]?.number?.message}
              {...register(`contactInfo.phones.${index}.number`, {
                required: "Phone number is required",
              })}
            />
            <Select
              label="Type"
              options={phoneTypeOptions}
              disabled={readOnly}
              {...register(`contactInfo.phones.${index}.type`)}
            />
            <Select
              label="Preferred"
              options={preferredOptions}
              disabled={readOnly}
              {...register(`contactInfo.phones.${index}.preferred`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhonesSection;

