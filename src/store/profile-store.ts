import type { Profile } from "../types/profile";
import { mockProfiles } from "../mock";

const PROFILES_KEY = "kyc_profiles";

export const initializeProfiles = () => {
  const stored = localStorage.getItem(PROFILES_KEY);
  if (!stored) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(mockProfiles));
  }
};

export const getProfile = (userId: number): Profile | null => {
  initializeProfiles();
  const stored = localStorage.getItem(PROFILES_KEY);
  if (!stored) return null;

  const profiles: Profile[] = JSON.parse(stored);
  return profiles.find((p) => p.userId === userId) || null;
};

export const saveProfile = (profile: Profile): void => {
  initializeProfiles();
  const stored = localStorage.getItem(PROFILES_KEY);
  const profiles: Profile[] = stored ? JSON.parse(stored) : [];

  const existingIndex = profiles.findIndex((p) => p.userId === profile.userId);
  if (existingIndex >= 0) {
    profiles[existingIndex] = { ...profile, updatedAt: new Date().toISOString() };
  } else {
    profiles.push({ ...profile, updatedAt: new Date().toISOString() });
  }

  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
};

export const getAllProfiles = (): Profile[] => {
  initializeProfiles();
  const stored = localStorage.getItem(PROFILES_KEY);
  return stored ? JSON.parse(stored) : [];
};

