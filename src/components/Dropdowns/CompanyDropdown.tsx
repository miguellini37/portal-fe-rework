import { ActionMeta, SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useEffect, useState } from 'react';
import { getCompaniesForDropdown } from '../../api/company';
import { customDropdownStyle } from './DropdownStyle';
import { useAuthHeader } from '../../auth/hooks';

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
  const [selectedOption, setSelectedOption] = useState<CompanyOption | null>(null);

  const authHeader = useAuthHeader();

  const loadOptions = async (inputValue: string): Promise<CompanyOption[]> => {
    const companies = await getCompaniesForDropdown(authHeader, inputValue || undefined);
    return companies.map((c) => ({
      value: c.id as string,
      label: c.companyName as string,
    }));
  };

  useEffect(() => {
    if (selected) {
      getCompaniesForDropdown(authHeader, selected).then((companies) => {
        const match = companies.find((c) => c.id === selected);
        if (match) {
          setSelectedOption({ value: match.id as string, label: match.companyName as string });
        }
      });
    } else {
      setSelectedOption(null);
    }
  }, [selected]);

  return (
    <AsyncSelect<CompanyOption>
      id={id}
      value={selectedOption}
      loadOptions={loadOptions}
      defaultOptions
      onChange={(newValue, actionMeta) => {
        setSelectedOption(newValue);
        onChange?.(newValue, actionMeta);
      }}
      styles={customDropdownStyle}
      isDisabled={disabled}
    />
  );
};
