export enum AddressType {
  MAILING = "mailing",
  WORK = "work",
}

export enum ContactType {
  PERSONAL = "personal",
  WORK = "work",
}

export enum DocumentType {
  PASSPORT = "passport",
  NATIONAL_ID = "national_id",
  DRIVER_LICENSE = "driver_license",
}

export type Address = {
  id: string;
  country: string;
  city: string;
  street: string;
  postalCode?: string;
  type: AddressType;
};

export type Email = {
  id: string;
  email: string;
  type: ContactType;
  preferred: boolean;
};

export type Phone = {
  id: string;
  number: string;
  type: ContactType;
  preferred: boolean;
};

export type IdentificationDocument = {
  id: string;
  type: DocumentType;
  file?: File | null;
  fileName?: string;
  expiryDate: string;
};

export type Employment = {
  id: string;
  name: string;
  fromYear: number;
  toYear?: number;
};

export type BasicInfo = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  age?: number;
};

export type ContactInfo = {
  addresses: Address[];
  emails: Email[];
  phones: Phone[];
};

export type Profile = {
  userId: number;
  basicInfo: BasicInfo;
  contactInfo: ContactInfo;
  documents: IdentificationDocument[];
  employments: Employment[];
  updatedAt?: string;
};

