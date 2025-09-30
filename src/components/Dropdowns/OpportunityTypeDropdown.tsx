import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import { customDropdownStyle } from './DropdownStyle';

export enum OPPORTUNITY_TYPES {
  TRADITIONAL_NIL_SPONSORSHIP = 'Traditional NIL Sponsorship',
  SOCIAL_MEDIA_CAMPAIGN = 'Social Media Campaign',
  APPEARANCE_EVENT = 'Appearance/Event',
  CAREER_BASED_NIL = 'Career-Based NIL',
}

interface DropdownOption {
  readonly value: string;
  readonly label: string;
}

interface OpportunityTypeDropdownProps {
  id?: string;
  onChange:
    | ((newValue: SingleValue<DropdownOption>, actionMeta: ActionMeta<DropdownOption>) => void)
    | undefined;
  disabled?: boolean;
  selected?: string;
  className?: string;
  required?: boolean;
}

export const OpportunityTypeDropdown = ({
  id,
  onChange,
  disabled,
  selected,
  className,
  required = false,
}: OpportunityTypeDropdownProps) => {
  const options: DropdownOption[] = Object.values(OPPORTUNITY_TYPES).map((value) => ({
    value,
    label: value,
  }));

  return (
    <Select<DropdownOption>
      id={id}
      value={selected ? options.find((x) => x.value === selected || x.label === selected) : null}
      options={options}
      onChange={onChange}
      styles={customDropdownStyle}
      isDisabled={disabled}
      className={className}
      required={required}
      isClearable
    />
  );
};
