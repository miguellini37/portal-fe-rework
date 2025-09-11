// Phone utilities: format and normalize US phone numbers (digits only)

export const normalizePhoneDigits = (value: string): string => {
  return (value || '').replace(/\D/g, '').slice(0, 10);
};

export const formatPhone = (value: string): string => {
  const digits = normalizePhoneDigits(value);
  const len = digits.length;
  if (len === 0) {
    return '';
  }
  if (len <= 3) {
    return digits;
  }
  if (len <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};
