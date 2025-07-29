import { ActionMeta, SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { getCompanies } from '../../api/company';
import { customDropdownStyle } from './DropdownStyle';

interface CompanyOption {
  readonly value: string;
  readonly label: string;
}

interface CompanyDropdownProps {
  id?: string;
  onChange:
    | ((newValue: SingleValue<CompanyOption>, actionMeta: ActionMeta<CompanyOption>) => void)
    | undefined;
  disabled?: boolean;
  selected?: string;
}

export const CompanyDropdown = ({ id, onChange, disabled, selected }: CompanyDropdownProps) => {
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
      id={id}
      value={options.find((x) => x.value == selected)}
      options={options}
      onChange={onChange}
      styles={customDropdownStyle}
      isDisabled={disabled}
    />
  );
};
