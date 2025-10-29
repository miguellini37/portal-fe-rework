import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import { useEffect } from 'react';
import { USER_PERMISSIONS } from '../../auth/hooks';
import { customDropdownStyle } from './DropdownStyle';

interface Option {
  readonly value: USER_PERMISSIONS;
  readonly label: string;
}

interface ProfileTypeDropdownProps {
  id?: string;
  onChange: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void;
  disabled?: boolean;
  selected?: string;
}

export const ProfileTypeDropdown = ({
  id,
  onChange,
  disabled,
  selected,
}: ProfileTypeDropdownProps) => {
  const options: Option[] = Object.values(USER_PERMISSIONS)
    .filter((value) => value !== USER_PERMISSIONS.ADMIN)
    .map((value) => ({
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
      id={id}
      value={options.find((x) => x.value === selected) || options[0]}
      options={options}
      onChange={onChange}
      styles={customDropdownStyle}
      isDisabled={disabled}
    />
  );
};
