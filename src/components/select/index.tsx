import { forwardRef, type SelectHTMLAttributes } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  options: Option[];
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { label, options, error, className = "", ...rest } = props;

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <small className="text-red-600 mt-1 block">{error}</small>}
    </div>
  );
});

Select.displayName = "Select";

export default Select;

