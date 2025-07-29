import { StylesConfig } from 'react-select';

export const customDropdownStyle: StylesConfig<any> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--input)',
    borderColor: 'var(--border)',
    borderRadius: '0.5rem',
    padding: '2px',
    boxShadow: state.isFocused ? '0 0 0 3px hsla(221, 83%, 53%, 0.3)' : 'none',
    '&:hover': {
      borderColor: 'var(--ring)',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '4px 8px',
    color: 'var(--foreground)',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--muted)',
    borderRadius: '0.375rem',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--foreground)',
    fontSize: '0.95rem',
    padding: '2px 4px',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'var(--muted-foreground)',
    ':hover': {
      backgroundColor: 'var(--destructive)',
      color: 'var(--destructive-foreground)',
    },
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--foreground)',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--muted-foreground)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--foreground)',
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
