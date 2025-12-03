import { useFormContext, useFieldArray } from "react-hook-form";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { PlusIcon, TrashIcon } from "../../../components/icons";
import { DocumentType, type Profile } from "../../../types/profile";
import { generateId } from "../../../utils/string";

type Props = {
  readOnly?: boolean;
};

const documentTypeOptions = [
  { value: DocumentType.PASSPORT, label: "Passport" },
  { value: DocumentType.NATIONAL_ID, label: "National ID" },
  { value: DocumentType.DRIVER_LICENSE, label: "Driver License" },
];

const DocumentsSection = ({ readOnly = false }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Profile>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const addDocument = () => {
    append({
      id: generateId(),
      type: DocumentType.PASSPORT,
      expiryDate: "",
      fileName: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-blue-900">Identification Documents</h3>
        {!readOnly && (
          <button
            type="button"
            onClick={addDocument}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Identification Document
          </button>
        )}
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-500 italic">No documents added yet.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Document #{index + 1}</span>
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
            <Select
              label="Type"
              options={documentTypeOptions}
              disabled={readOnly}
              {...register(`documents.${index}.type`)}
            />
            <Input
              label="Expiry Date"
              type="date"
              disabled={readOnly}
              error={errors.documents?.[index]?.expiryDate?.message}
              {...register(`documents.${index}.expiryDate`, {
                required: "Expiry date is required",
              })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Document
              </label>
              {readOnly ? (
                <div className="px-4 py-2 bg-gray-100 rounded-md text-sm text-gray-600">
                  {field.fileName || "No file uploaded"}
                </div>
              ) : (
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  {...register(`documents.${index}.fileName`)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentsSection;

