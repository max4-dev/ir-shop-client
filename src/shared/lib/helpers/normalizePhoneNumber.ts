import parsePhoneNumberFromString from "libphonenumber-js";

export const normalizePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber) {
    return value;
  }

  return phoneNumber.formatInternational();
};
