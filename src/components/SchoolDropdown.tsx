import { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

export interface SchoolOption {
  readonly value: string;
  readonly label: string;
}

const customStyles: StylesConfig<SchoolOption, false> = {
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

interface SchoolDropdownProps {
  onChange:
    | ((newValue: SingleValue<SchoolOption>, actionMeta: ActionMeta<SchoolOption>) => void)
    | undefined;
  disabled?: boolean;
  selected?: string;
}

export const SchoolDropdown = ({ onChange, disabled, selected }: SchoolDropdownProps) => {
  const options: SchoolOption[] = [{ label: 'SMU', value: 'SMU' }];

  return (
    <CreatableSelect<SchoolOption>
      value={options.find((x) => x.value == selected)}
      options={options}
      onChange={onChange}
      styles={customStyles}
      isDisabled={disabled}
    />
  );
};
