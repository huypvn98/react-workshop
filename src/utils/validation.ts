export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MAX_LENGTH = 20;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 20;

export const usernameValidation = {
  required: "Username is required",
  minLength: {
    value: USERNAME_MIN_LENGTH,
    message: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
  },
  maxLength: {
    value: USERNAME_MAX_LENGTH,
    message: `Username must be at most ${USERNAME_MAX_LENGTH} characters`,
  },
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: PASSWORD_MIN_LENGTH,
    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  },
  maxLength: {
    value: PASSWORD_MAX_LENGTH,
    message: `Password must be at most ${PASSWORD_MAX_LENGTH} characters`,
  },
};

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
};

export const requiredValidation = (fieldName: string) => ({
  required: `${fieldName} is required`,
});

export const phoneValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^[\d\s+\-()]+$/,
    message: "Invalid phone number format",
  },
};

export const yearValidation = {
  required: "Year is required",
  min: {
    value: 1900,
    message: "Year must be after 1900",
  },
  max: {
    value: new Date().getFullYear(),
    message: `Year cannot be in the future`,
  },
};

export const amountValidation = {
  required: "Amount is required",
  min: {
    value: 0,
    message: "Amount must be positive",
  },
};

