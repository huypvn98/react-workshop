import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import Input from "../../../components/input";
import { calculateAge } from "../../../utils/date";
import type { Profile } from "../../../types/profile";

type Props = {
  readOnly?: boolean;
};

const BasicInfoSection = ({ readOnly = false }: Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Profile>();

  const dob = watch("basicInfo.dateOfBirth");

  useEffect(() => {
    if (dob) {
      const age = calculateAge(dob);
      setValue("basicInfo.age", age);
    }
  }, [dob, setValue]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-900">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="Enter first name"
          disabled={readOnly}
          error={errors.basicInfo?.firstName?.message}
          {...register("basicInfo.firstName", { required: "First name is required" })}
        />
        <Input
          label="Last Name"
          placeholder="Enter last name"
          disabled={readOnly}
          error={errors.basicInfo?.lastName?.message}
          {...register("basicInfo.lastName", { required: "Last name is required" })}
        />
        <Input
          label="Middle Name"
          placeholder="Enter middle name"
          disabled={readOnly}
          {...register("basicInfo.middleName")}
        />
        <Input
          label="Date of Birth"
          type="date"
          disabled={readOnly}
          error={errors.basicInfo?.dateOfBirth?.message}
          {...register("basicInfo.dateOfBirth", { required: "Date of birth is required" })}
        />
        <Input
          label="Age"
          type="number"
          disabled
          {...register("basicInfo.age")}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;

