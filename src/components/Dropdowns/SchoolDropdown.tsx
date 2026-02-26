import { useState, useEffect } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { customDropdownStyle } from './DropdownStyle';
import { useAuthHeader } from '../../auth/hooks';
import { getSchoolsForDropdown } from '../../api/school';

export interface SchoolOption {
  readonly value: string;
  readonly label: string;
}

interface SchoolDropdownProps {
  id?: string;
  onChange:
    | ((newValue: SingleValue<SchoolOption>, actionMeta: ActionMeta<SchoolOption>) => void)
    | undefined;
  disabled?: boolean;
  selected?: string;
  className?: string;
}

export const SchoolDropdown = ({
  id,
  onChange,
  disabled,
  selected,
  className,
}: SchoolDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<SchoolOption | null>(null);
  const authHeader = useAuthHeader();

  const loadOptions = async (inputValue: string): Promise<SchoolOption[]> => {
    const schools = await getSchoolsForDropdown(authHeader, inputValue || undefined);
    return schools.map((school) => ({
      value: school.id as string,
      label: school.schoolName as string,
    }));
  };

  useEffect(() => {
    if (selected) {
      getSchoolsForDropdown(authHeader, selected).then((schools) => {
        const match = schools.find((s) => s.id === selected);
        if (match) {
          setSelectedOption({ value: match.id as string, label: match.schoolName as string });
        }
      });
    } else {
      setSelectedOption(null);
    }
  }, [selected]);

  return (
    <AsyncSelect<SchoolOption>
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
      className={className}
    />
  );
};
