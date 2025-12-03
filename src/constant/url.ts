const AUTH_BASE = "/auth";

export const AUTH_URL = {
  BASE: AUTH_BASE,
  LOGIN: `${AUTH_BASE}/login`,
};

const ADMIN_BASE = "/admin";

export const ADMIN_URL = {
  BASE: ADMIN_BASE,
  DASHBOARD: `${ADMIN_BASE}/dashboard`,
  PROFILE: `${ADMIN_BASE}/profile`,
  KYC: `${ADMIN_BASE}/kyc`,
  SUBMISSIONS: `${ADMIN_BASE}/submissions`,
  RESULTS: `${ADMIN_BASE}/results`,
  CLIENT_PROFILE: `${ADMIN_BASE}/clients/:userId`,
};
