export const formatPhoneNumber = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length === 0) return "";
  let formattedNumber = "";

  if (digitsOnly.startsWith("8")) {
    formattedNumber = `+7${digitsOnly.substring(1)}`;
  } else if (digitsOnly.startsWith("7")) {
    formattedNumber = `+${digitsOnly}`;
  } else if (digitsOnly.length === 10) {
    formattedNumber = `+7${digitsOnly}`;
  } else {
    formattedNumber = `+${digitsOnly}`;
  }

  return formattedNumber;
};
