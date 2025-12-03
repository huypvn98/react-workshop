import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../../../components/input";
import { PlusIcon, TrashIcon } from "../../../components/icons";
import type { Profile } from "../../../types/profile";
import { generateId } from "../../../utils/string";

type Props = {
  readOnly?: boolean;
};

const EmploymentSection = ({ readOnly = false }: Props) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<Profile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employments",
  });

  const addEmployment = () => {
    append({
      id: generateId(),
      name: "",
      fromYear: new Date().getFullYear(),
      toYear: undefined,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-900">Occupations</h3>
        {!readOnly && (
          <button
            type="button"
            onClick={addEmployment}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Occupation
          </button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 italic">No occupations added yet.</p>
      )}

      {fields.map((field, index) => {
        const fromYear = watch(`employments.${index}.fromYear`);

        return (
          <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Occupation #{index + 1}
              </span>
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
                label="Occupation"
                placeholder="Enter company/occupation name"
                disabled={readOnly}
                error={errors.employments?.[index]?.name?.message}
                {...register(`employments.${index}.name`, {
                  required: "Occupation name is required",
                })}
              />
              <Input
                label="From Date"
                type="date"
                disabled={readOnly}
                error={errors.employments?.[index]?.fromYear?.message}
                {...register(`employments.${index}.fromYear`, {
                  required: "From date is required",
                })}
              />
              <Input
                label="To Date"
                type="date"
                placeholder="mm/dd/yyyy"
                disabled={readOnly}
                error={errors.employments?.[index]?.toYear?.message}
                {...register(`employments.${index}.toYear`, {
                  validate: (value) => {
                    if (value && fromYear && value < fromYear) {
                      return "To date must be after from date";
                    }
                    return true;
                  },
                })}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmploymentSection;

