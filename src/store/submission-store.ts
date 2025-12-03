import type { KycSubmission } from "../types/submission";
import { SubmissionStatus } from "../types/submission";
import { mockSubmissions } from "../mock";

const SUBMISSIONS_KEY = "kyc_submissions";

export const initializeSubmissions = () => {
  const stored = localStorage.getItem(SUBMISSIONS_KEY);
  if (!stored) {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(mockSubmissions));
  }
};

export const getSubmissions = (): KycSubmission[] => {
  initializeSubmissions();
  const stored = localStorage.getItem(SUBMISSIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getPendingSubmissions = (): KycSubmission[] => {
  const submissions = getSubmissions();
  return submissions.filter((s) => s.status === SubmissionStatus.PENDING);
};

export const getReviewedSubmissions = (): KycSubmission[] => {
  const submissions = getSubmissions();
  return submissions.filter((s) => s.status !== SubmissionStatus.PENDING);
};

export const getUserSubmissions = (userId: number): KycSubmission[] => {
  const submissions = getSubmissions();
  return submissions.filter((s) => s.userId === userId);
};

export const getSubmissionById = (id: string): KycSubmission | null => {
  const submissions = getSubmissions();
  return submissions.find((s) => s.id === id) || null;
};

export const approveSubmission = (id: string, reviewerId: number): void => {
  const submissions = getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index >= 0) {
    submissions[index] = {
      ...submissions[index],
      status: SubmissionStatus.APPROVED,
      reviewedAt: new Date().toISOString(),
      reviewedBy: reviewerId,
    };
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  }
};

export const rejectSubmission = (id: string, reviewerId: number): void => {
  const submissions = getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index >= 0) {
    submissions[index] = {
      ...submissions[index],
      status: SubmissionStatus.REJECTED,
      reviewedAt: new Date().toISOString(),
      reviewedBy: reviewerId,
    };
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  }
};

export const createSubmission = (submission: KycSubmission): void => {
  const submissions = getSubmissions();
  submissions.push(submission);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
};

