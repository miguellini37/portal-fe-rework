import { useState, useEffect } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getSchools } from '../../api/school';
import { customDropdownStyle } from './DropdownStyle';

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
  const [options, setOptions] = useState<SchoolOption[]>([]);

  const fetchSchools = async (): Promise<void> => {
    const schools = await getSchools();
    setOptions(
      schools.map((school) => ({
        value: school.id as string,
        label: school.schoolName as string,
      }))
    );
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <CreatableSelect<SchoolOption>
      id={id}
      value={options.find((x) => x.value == selected)}
      options={options}
      onChange={onChange}
      styles={customDropdownStyle}
      isDisabled={disabled}
      className={className}
    />
  );
};
