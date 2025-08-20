import { StylesConfig } from 'react-select';

export const customDropdownStyle: StylesConfig<any> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--background)',
    borderColor: 'var(--border)',
    borderRadius: '0.375rem',
    padding: '0px',
    minHeight: '3rem',
    height: '3rem',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
    '&:hover': {
      borderColor: 'var(--border)',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 0.75rem',
    color: 'var(--foreground)',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    padding: '0 0.75rem',
    height: '100%',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--foreground)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--foreground)',
    margin: '0px',
    padding: '0px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--muted-foreground)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--muted)' : 'transparent',
    color: 'var(--foreground)',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--card)',
    color: 'var(--card-foreground)',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 20,
  }),
};
