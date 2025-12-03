import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router";
import Card from "../../components/card";
import Button from "../../components/button";
import { useAuthContext } from "../../contexts";
import { getProfile, saveProfile } from "../../store/profile-store";
import { ADMIN_URL } from "../../constant/url";
import type { Profile as ProfileType } from "../../types/profile";
import {
  BasicInfoSection,
  AddressesSection,
  EmailsSection,
  PhonesSection,
  DocumentsSection,
  EmploymentSection,
} from "../../features/profile/components";
import { ChevronRightIcon, HomeIcon } from "../../components/icons";

const defaultProfile: ProfileType = {
  userId: 0,
  basicInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
  },
  contactInfo: {
    addresses: [],
    emails: [],
    phones: [],
  },
  documents: [],
  employments: [],
};

const Profile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const methods = useForm<ProfileType>({
    defaultValues: defaultProfile,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (user?.id) {
      const profileData = getProfile(user.id);
      if (profileData) {
        reset(profileData);
      } else {
        reset({
          ...defaultProfile,
          userId: user.id,
          basicInfo: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            middleName: "",
            dateOfBirth: "",
          },
          contactInfo: {
            addresses: [],
            emails: user.email
              ? [
                  {
                    id: `email-${Date.now()}`,
                    email: user.email,
                    type: "personal" as const,
                    preferred: true,
                  },
                ]
              : [],
            phones: [],
          },
        });
      }
      setIsLoading(false);
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileType) => {
    if (user?.id) {
      saveProfile({ ...data, userId: user.id });
      setIsEditMode(false);
    }
  };

  const handleCancel = () => {
    if (user?.id) {
      const profileData = getProfile(user.id);
      if (profileData) {
        reset(profileData);
      }
    }
    setIsEditMode(false);
  };

  const goToKyc = () => {
    navigate(ADMIN_URL.KYC);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <HomeIcon className="w-4 h-4" />
        <ChevronRightIcon className="w-4 h-4 mx-2" />
        <span>Users</span>
        <ChevronRightIcon className="w-4 h-4 mx-2" />
        <span className="text-blue-600">Personal Information</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h1>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Card title="Profile Picture">
              <div className="flex items-center gap-4">
                <img
                  src={user?.image || "https://ui-avatars.com/api/?name=User&background=random"}
                  alt="Profile"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">Profile picture</p>
                  <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 800KB</p>
                  {!isEditMode ? null : (
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Upload picture
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <Card title="General information">
              <div className="space-y-6">
                <BasicInfoSection readOnly={!isEditMode} />

                <hr className="border-gray-200" />

                <h3 className="text-lg font-semibold text-blue-900">Contact Information</h3>
                <AddressesSection readOnly={!isEditMode} />
                <EmailsSection readOnly={!isEditMode} />
                <PhonesSection readOnly={!isEditMode} />

                <hr className="border-gray-200" />

                <DocumentsSection readOnly={!isEditMode} />

                <hr className="border-gray-200" />

                <EmploymentSection readOnly={!isEditMode} />
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                {isEditMode ? (
                  <>
                    <Button type="submit">Save Changes</Button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditMode(true)}
                      className="px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={goToKyc}
                      className="px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-800"
                    >
                      KYC
                    </button>
                  </>
                )}
              </div>
            </Card>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Profile;

