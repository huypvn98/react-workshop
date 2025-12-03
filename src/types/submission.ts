import type { Profile } from "./profile";
import type { KycData } from "./kyc";

export enum SubmissionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type KycSubmission = {
  id: string;
  userId: number;
  userName: string;
  profile: Profile;
  kycData: KycData;
  status: SubmissionStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: number;
};

export type SubmissionListItem = {
  id: string;
  userId: number;
  userName: string;
  status: SubmissionStatus;
  submittedAt: string;
  reviewedAt?: string;
};

