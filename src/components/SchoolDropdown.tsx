import { useState, useEffect } from 'react';
import { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getSchools } from '../api/school';

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
      value={
        selected
          ? options.find(
              (x) =>
                x.value == selected ||
                x.label == selected ||
                options.find((x) => (x.value as any)?.id == selected)
            )
          : null
      }
      options={options}
      onChange={onChange}
      styles={customStyles}
      isDisabled={disabled}
    />
  );
};
