import { normalizePhoneDigits, formatPhone } from '../phone';

describe('normalizePhoneDigits', () => {
  it('strips non-digit characters', () => {
    expect(normalizePhoneDigits('(555) 123-4567')).toBe('5551234567');
  });

  it('limits to 10 digits', () => {
    expect(normalizePhoneDigits('123456789012345')).toBe('1234567890');
  });

  it('returns empty string for empty input', () => {
    expect(normalizePhoneDigits('')).toBe('');
  });

  it('handles undefined-ish input', () => {
    expect(normalizePhoneDigits(undefined as unknown as string)).toBe('');
  });
});

describe('formatPhone', () => {
  it('formats a full 10-digit number', () => {
    expect(formatPhone('5551234567')).toBe('(555) 123-4567');
  });

  it('formats partial number with 3 digits', () => {
    expect(formatPhone('555')).toBe('555');
  });

  it('formats partial number with 5 digits', () => {
    expect(formatPhone('55512')).toBe('(555) 12');
  });

  it('returns empty for empty input', () => {
    expect(formatPhone('')).toBe('');
  });

  it('strips formatting before re-formatting', () => {
    expect(formatPhone('(555) 123-4567')).toBe('(555) 123-4567');
  });
});
