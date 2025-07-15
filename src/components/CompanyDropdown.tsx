import { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { getCompanies } from '../api/company';

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
  const [options, setOptions] = useState<CompanyOption[]>([]);

  const fetchCompanies = async (): Promise<void> => {
    const companies = await getCompanies();
    setOptions(
      companies.map((c) => ({
        value: c.id as string,
        label: c.companyName as string,
      }))
    );
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

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
