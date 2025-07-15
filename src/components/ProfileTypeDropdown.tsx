import { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import Select from 'react-select';
import { useEffect } from 'react';
import { USER_PERMISSIONS } from '../auth/store';

interface Option {
  readonly value: USER_PERMISSIONS;
  readonly label: string;
}

const customStyles: StylesConfig<Option, false> = {
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'black',
  }),
  input: (provided) => ({
    ...provided,
    color: 'black',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'black',
  }),
  option: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

interface ProfileTypeDropdownProps {
  onChange: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
  disabled?: boolean;
  selected?: string;
}

export const ProfileTypeDropdown = ({ onChange, disabled, selected }: ProfileTypeDropdownProps) => {
  const options: Option[] = Object.values(USER_PERMISSIONS).map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  // Ensure default selection on mount
  useEffect(() => {
    if (!selected) {
      onChange(options[0], { action: 'select-option' } as ActionMeta<Option>);
    }
  }, [selected, onChange]);

  return (
    <Select<Option>
      value={options.find((x) => x.value === selected) || options[0]}
      options={options}
      onChange={onChange}
      styles={customStyles}
      isDisabled={disabled}
    />
  );
};
