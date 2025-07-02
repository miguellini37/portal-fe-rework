import { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

interface CompanyOption {
  readonly value: string;
  readonly label: string;
}

const customStyles: StylesConfig<CompanyOption, false> = {
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

interface CompanyDropdownProps {
  onChange:
    | ((newValue: SingleValue<CompanyOption>, actionMeta: ActionMeta<CompanyOption>) => void)
    | undefined;
  disabled?: boolean;
  selected?: string;
}

export const CompanyDropdown = ({ onChange, disabled, selected }: CompanyDropdownProps) => {
  const options: CompanyOption[] = [{ label: 'Mastery Inc', value: 'Mastery Inc' }];

  return (
    <CreatableSelect<CompanyOption>
      value={options.find((x) => x.value == selected)}
      options={options}
      onChange={onChange}
      styles={customStyles}
      isDisabled={disabled}
    />
  );
};
