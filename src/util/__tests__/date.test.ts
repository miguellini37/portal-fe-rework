import { isoToLocalInputValue, localInputValueToISO, formatDateTime } from '../date';

describe('isoToLocalInputValue', () => {
  it('returns empty for undefined', () => {
    expect(isoToLocalInputValue(undefined)).toBe('');
  });

  it('returns empty for invalid date', () => {
    expect(isoToLocalInputValue('not-a-date' as unknown as Date)).toBe('');
  });

  it('converts a Date to YYYY-MM-DDTHH:mm format', () => {
    const d = new Date(2025, 0, 15, 9, 5); // Jan 15 2025 09:05 local
    const result = isoToLocalInputValue(d);
    expect(result).toBe('2025-01-15T09:05');
  });
});

describe('localInputValueToISO', () => {
  it('returns empty for empty string', () => {
    expect(localInputValueToISO('')).toBe('');
  });

  it('returns empty for malformed input', () => {
    expect(localInputValueToISO('garbage')).toBe('');
  });

  it('converts local datetime to ISO string', () => {
    const result = localInputValueToISO('2025-06-15T14:30');
    const parsed = new Date(result);
    expect(parsed.getFullYear()).toBe(2025);
    expect(parsed.getMonth()).toBe(5); // June = 5
    expect(parsed.getDate()).toBe(15);
    expect(parsed.getHours()).toBe(14);
    expect(parsed.getMinutes()).toBe(30);
  });
});

describe('formatDateTime', () => {
  it('returns empty for undefined', () => {
    expect(formatDateTime(undefined)).toBe('');
  });

  it('returns empty for invalid date string', () => {
    expect(formatDateTime('not-a-date')).toBe('');
  });

  it('formats a valid date', () => {
    const result = formatDateTime(new Date(2025, 8, 15, 14, 30)); // Sep 15 2025 2:30 PM
    expect(result).toContain('Sep');
    expect(result).toContain('15');
    expect(result).toContain('2025');
  });
});
