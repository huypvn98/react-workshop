import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../../../components/input";
import Select from "../../../components/select";
import Button from "../../../components/button";
import { PlusIcon, TrashIcon } from "../../../components/icons";
import { AddressType, type Profile } from "../../../types/profile";
import { generateId } from "../../../utils/string";

type Props = {
  readOnly?: boolean;
};

const addressTypeOptions = [
  { value: AddressType.MAILING, label: "Mailing" },
  { value: AddressType.WORK, label: "Work" },
];

const AddressesSection = ({ readOnly = false }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Profile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactInfo.addresses",
  });

  const addAddress = () => {
    append({
      id: generateId(),
      country: "",
      city: "",
      street: "",
      postalCode: "",
      type: AddressType.MAILING,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-gray-700">Addresses</h4>
        {!readOnly && (
          <button
            type="button"
            onClick={addAddress}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Address
          </button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 italic">No addresses added yet.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Address #{index + 1}</span>
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
            <Input
              label="Country"
              placeholder="Enter country"
              disabled={readOnly}
              error={errors.contactInfo?.addresses?.[index]?.country?.message}
              {...register(`contactInfo.addresses.${index}.country`, {
                required: "Country is required",
              })}
            />
            <Input
              label="City"
              placeholder="Enter city"
              disabled={readOnly}
              error={errors.contactInfo?.addresses?.[index]?.city?.message}
              {...register(`contactInfo.addresses.${index}.city`, {
                required: "City is required",
              })}
            />
            <Input
              label="Street"
              placeholder="Enter street"
              disabled={readOnly}
              error={errors.contactInfo?.addresses?.[index]?.street?.message}
              {...register(`contactInfo.addresses.${index}.street`, {
                required: "Street is required",
              })}
            />
            <Input
              label="Postal Code"
              placeholder="Enter postal code"
              disabled={readOnly}
              {...register(`contactInfo.addresses.${index}.postalCode`)}
            />
            <Select
              label="Type"
              options={addressTypeOptions}
              disabled={readOnly}
              {...register(`contactInfo.addresses.${index}.type`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressesSection;

