import { getFullName, getInitials, toTitleCase } from '../name';

describe('getFullName', () => {
  it('joins first and last name', () => {
    expect(getFullName({ firstName: 'John', lastName: 'Doe' })).toBe('John Doe');
  });
});

describe('getInitials', () => {
  it('returns first letter of each name', () => {
    expect(getInitials({ firstName: 'John', lastName: 'Doe' })).toBe('JD');
  });

  it('handles missing last name', () => {
    expect(getInitials({ firstName: 'John', lastName: '' })).toBe('J');
  });
});

describe('toTitleCase', () => {
  it('capitalizes first letter of each word', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
  });

  it('replaces underscores with spaces', () => {
    expect(toTitleCase('some_enum_value')).toBe('Some Enum Value');
  });

  it('handles undefined', () => {
    expect(toTitleCase(undefined)).toBe('');
  });

  it('handles empty string', () => {
    expect(toTitleCase('')).toBe('');
  });
});
