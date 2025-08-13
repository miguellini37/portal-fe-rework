import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import { customDropdownStyle } from './DropdownStyle';

export enum SPORTS {
  BASEBALL = 'Baseball',
  BASKETBALL = 'Basketball',
  CROSS_COUNTRY = 'Cross Country',
  FENCING = 'Fencing',
  FIELD_HOCKEY = 'Field Hockey',
  FOOTBALL = 'Football',
  GOLF = 'Golf',
  GYMNASTICS = 'Gymnastics',
  ICE_HOCKEY = 'Ice Hockey',
  LACROSSE = 'Lacrosse',
  RIFLE = 'Rifle',
  RODEO = 'Rodeo',
  ROWING = 'Rowing',
  RUGBY = 'Rugby',
  SKIING = 'Skiing',
  SOCCER = 'Soccer',
  SOFTBALL = 'Softball',
  STRENGTH_AND_CONDITIONING = 'Strength & Conditioning',
  SWIMMING_AND_DIVING = 'Swimming & Diving',
  TENNIS = 'Tennis',
  TRACK_AND_FIELD = 'Track & Field',
  VOLLEYBALL = 'Volleyball',
  WATER_POLO = 'Water Polo',
  WRESTLING = 'Wrestling',
}

export interface DropdownOption {
  readonly value: SPORTS;
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

export const SportsDropdown = ({ id, onChange, disabled, selected, className }: DropdownProps) => {
  const options: DropdownOption[] = Object.values(SPORTS).map((value) => ({
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
