import { useEffect, useRef, useState } from 'react';
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
  const [loaded, setLoaded] = useState(false);
  const prevFilterRef = useRef<string | undefined>(undefined);
  const authHeader = useAuthHeader();

  // Reset when filter changes
  const filterKey = JSON.stringify(filter);
  useEffect(() => {
    if (prevFilterRef.current !== undefined && prevFilterRef.current !== filterKey) {
      setOptions([]);
      setLoaded(false);
    }
    prevFilterRef.current = filterKey;
  }, [filterKey]);

  const fetchUsers = async (): Promise<void> => {
    if (loaded) {
      return;
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
      setLoaded(true);
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
