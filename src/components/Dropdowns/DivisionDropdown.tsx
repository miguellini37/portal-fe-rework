import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import { customDropdownStyle } from './DropdownStyle';

export enum DIVISION {
  NCAA_DIVISION_I = 'NCAA Division I',
  NCAA_DIVISION_II = 'NCAA Division II',
  NCAA_DIVISION_III = 'NCAA Division III',
  NAIA = 'NAIA',
  NJCAA = 'NJCAA',
  OTHER = 'Other',
}

export interface DropdownOption {
  readonly value: DIVISION;
  readonly label: string;
}

interface DropdownProps {
  id?: string;
  onChange:
    | ((newValue: SingleValue<DropdownOption>, actionMeta: ActionMeta<DropdownOption>) => void)
    | undefined;
  disabled?: boolean;
  selected?: string;
  className?: string;
}

export const DivisionDropdown = ({
  id,
  onChange,
  disabled,
  selected,
  className,
}: DropdownProps) => {
  const options: DropdownOption[] = Object.values(DIVISION).map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  return (
    <Select<DropdownOption>
      id={id}
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
      styles={customDropdownStyle}
      isDisabled={disabled}
      className={className}
    />
  );
};
