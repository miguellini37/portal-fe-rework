import { useState } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import { customDropdownStyle } from './DropdownStyle';
import { useAuthHeader } from '../../auth/hooks';
import { getAllUsers, User, IGetAllUsersInput } from '../../api/admin';
import { getFullName } from '../../util/name';

export interface UserOption {
  readonly value: string;
  readonly label: string;
}

interface UserDropdownProps {
  id?: string;
  onChange:
    | ((newValue: SingleValue<UserOption>, actionMeta: ActionMeta<UserOption>) => void)
    | undefined;
  disabled?: boolean;
  selected?: string;
  className?: string;
  filter?: IGetAllUsersInput;
}

export const UserDropdown = ({
  id,
  onChange,
  disabled,
  selected,
  className,
  filter,
}: UserDropdownProps) => {
  const [options, setOptions] = useState<UserOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const authHeader = useAuthHeader();

  const fetchUsers = async (): Promise<void> => {
    if (options.length > 0) {
      return; // Don't fetch if already loaded
    }

    setIsLoading(true);
    try {
      const users = await getAllUsers(authHeader, filter);
      setOptions(
        users.map((user: User) => {
          const label = `${getFullName(user)} (${user.email})`;
          return {
            value: user.id,
            label,
          };
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuOpen = () => {
    fetchUsers();
  };

  return (
    <Select<UserOption>
      id={id}
      value={options.find((x) => x.value === selected)}
      options={options}
      onChange={onChange}
      onMenuOpen={handleMenuOpen}
      isLoading={isLoading}
      styles={customDropdownStyle}
      isDisabled={disabled}
      className={className}
    />
  );
};
