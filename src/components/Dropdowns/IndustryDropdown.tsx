import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import { customDropdownStyle } from './DropdownStyle';

export enum INDUSTRIES {
  ACCOUNTING = 'Accounting',
  ADVERTISING_MARKETING = 'Advertising & Marketing',
  AEROSPACE = 'Aerospace',
  AGRICULTURE = 'Agriculture',
  APPAREL_FASHION = 'Apparel & Fashion',
  AUTOMOTIVE = 'Automotive',
  BIOTECHNOLOGY = 'Biotechnology',
  BROADCAST_MEDIA = 'Broadcast Media',
  BUILDING_MATERIALS = 'Building Materials',
  CHEMICALS = 'Chemicals',
  COMPUTER_HARDWARE = 'Computer Hardware',
  COMPUTER_SOFTWARE = 'Computer Software',
  CONSTRUCTION = 'Construction',
  CONSULTING = 'Consulting',
  CONSUMER_GOODS = 'Consumer Goods',
  EDUCATION = 'Education',
  ENERGY = 'Energy',
  ENTERTAINMENT = 'Entertainment',
  ENVIRONMENTAL_SERVICES = 'Environmental Services',
  FINANCIAL_SERVICES = 'Financial Services',
  FOOD_BEVERAGE = 'Food & Beverage',
  GOVERNMENT = 'Government',
  HEALTHCARE = 'Healthcare',
  HOSPITALITY = 'Hospitality',
  INFORMATION_TECHNOLOGY = 'Information Technology',
  INSURANCE = 'Insurance',
  LEGAL_SERVICES = 'Legal Services',
  LOGISTICS_SUPPLY_CHAIN = 'Logistics & Supply Chain',
  MANUFACTURING = 'Manufacturing',
  MEDIA_PUBLISHING = 'Media & Publishing',
  MINING_METALS = 'Mining & Metals',
  NON_PROFIT = 'Non-Profit',
  OIL_GAS = 'Oil & Gas',
  PHARMACEUTICALS = 'Pharmaceuticals',
  REAL_ESTATE = 'Real Estate',
  RECREATION_SPORTS = 'Recreation & Sports',
  RETAIL = 'Retail',
  TELECOMMUNICATIONS = 'Telecommunications',
  TRANSPORTATION = 'Transportation',
  UTILITIES = 'Utilities',
}

export interface DropdownOption {
  readonly value: INDUSTRIES;
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
  required?: boolean;
}

export const IndustryDropdown = ({
  id,
  onChange,
  disabled,
  selected,
  className,
  required = false,
}: DropdownProps) => {
  const options: DropdownOption[] = Object.values(INDUSTRIES).map((value) => ({
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
      required={required}
    />
  );
};
