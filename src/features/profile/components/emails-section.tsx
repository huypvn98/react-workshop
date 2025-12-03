import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { PlusIcon, TrashIcon } from "../../../components/icons";
import { ContactType, type Profile } from "../../../types/profile";
import { generateId } from "../../../utils/string";
import { emailValidation } from "../../../utils/validation";

type Props = {
  readOnly?: boolean;
};

const emailTypeOptions = [
  { value: ContactType.PERSONAL, label: "Personal" },
  { value: ContactType.WORK, label: "Work" },
];

const preferredOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const EmailsSection = ({ readOnly = false }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Profile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactInfo.emails",
  });

  const addEmail = () => {
    append({
      id: generateId(),
      email: "",
      type: ContactType.PERSONAL,
      preferred: false,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-gray-700">Emails</h4>
        {!readOnly && (
          <button
            type="button"
            onClick={addEmail}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Email
          </button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 italic">No emails added yet.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Email #{index + 1}</span>
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
              label="Email Address"
              type="email"
              placeholder="Enter email"
              disabled={readOnly}
              error={errors.contactInfo?.emails?.[index]?.email?.message}
              {...register(`contactInfo.emails.${index}.email`, emailValidation)}
            />
            <Select
              label="Type"
              options={emailTypeOptions}
              disabled={readOnly}
              {...register(`contactInfo.emails.${index}.type`)}
            />
            <Select
              label="Preferred"
              options={preferredOptions}
              disabled={readOnly}
              {...register(`contactInfo.emails.${index}.preferred`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmailsSection;

