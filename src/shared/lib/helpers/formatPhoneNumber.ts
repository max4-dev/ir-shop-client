import parsePhoneNumberFromString from "libphonenumber-js";

export const formatPhoneNumber = (phone: string): string => {
  return parsePhoneNumberFromString(phone, "RU")?.number || phone;
};
