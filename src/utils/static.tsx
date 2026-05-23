
export const ErrorMessage = {
  REQUIRED: "This field is mandatory",
  INVALID_EMAIL: "Invalid email address",
  INVALID_PHONE: "Please enter a valid number",
  NO_SPECIAL_CHARACTERS: "Cannot have special characters",
  MAX_15_CHAR: "Please enter at most 15 characters",
  MIN_2_CHAR: "Please enter at least 2 characters",
};
export const Regex = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$|^$/,
  NAME: /^[a-zA-Z ]+$/,
  PHONE: /^[0-9]\d{9}$|^$/,
  AT_LEAST_EIGHT_CHAR: /^.{8,}$/,
  AT_LEAST_ONE_UPPER_CHAR: /.*[A-Z].*/,
  AT_LEAST_ONE_NUMBER: /^(?=.*\d)/,
  AT_LEAST_ONE_SPECIAL_CHAR: /^(?=.*[#?!@$%^&*-]).*$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};
