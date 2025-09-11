import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import { customDropdownStyle } from './DropdownStyle';

export enum COLLEGE_MAJORS {
  ACCOUNTING = 'Accounting',
  AGRICULTURAL_SCIENCE = 'Agricultural Science',
  ANTHROPOLOGY = 'Anthropology',
  ARCHITECTURE = 'Architecture',
  ART_HISTORY = 'Art History',
  BIOCHEMISTRY = 'Biochemistry',
  BIOLOGY = 'Biology',
  BUSINESS_ADMINISTRATION = 'Business Administration',
  CHEMICAL_ENGINEERING = 'Chemical Engineering',
  CHEMISTRY = 'Chemistry',
  CIVIL_ENGINEERING = 'Civil Engineering',
  COMMUNICATIONS = 'Communications',
  COMPUTER_ENGINEERING = 'Computer Engineering',
  COMPUTER_SCIENCE = 'Computer Science',
  CRIMINAL_JUSTICE = 'Criminal Justice',
  DENTISTRY = 'Dentistry',
  EARTH_SCIENCES = 'Earth Sciences',
  ECONOMICS = 'Economics',
  EDUCATION = 'Education',
  ELECTRICAL_ENGINEERING = 'Electrical Engineering',
  ENGLISH = 'English',
  ENVIRONMENTAL_SCIENCE = 'Environmental Science',
  ENTREPRENEURSHIP = 'Entrepreneurship',
  FILM_AND_MEDIA = 'Film & Media',
  FINANCE = 'Finance',
  FINE_ARTS = 'Fine Arts',
  HISTORY = 'History',
  HOSPITALITY_MANAGEMENT = 'Hospitality Management',
  INDUSTRIAL_ENGINEERING = 'Industrial Engineering',
  INFORMATION_TECHNOLOGY = 'Information Technology',
  INTERNATIONAL_RELATIONS = 'International Relations',
  JOURNALISM = 'Journalism',
  LAW = 'Law',
  LINGUISTICS = 'Linguistics',
  MANAGEMENT = 'Management',
  MARKETING = 'Marketing',
  MATHEMATICS = 'Mathematics',
  MECHANICAL_ENGINEERING = 'Mechanical Engineering',
  MEDICINE = 'Medicine',
  MUSIC = 'Music',
  NURSING = 'Nursing',
  NUTRITION = 'Nutrition',
  PHILOSOPHY = 'Philosophy',
  PHYSICAL_EDUCATION = 'Physical Education',
  PHYSICS = 'Physics',
  POLITICAL_SCIENCE = 'Political Science',
  PSYCHOLOGY = 'Psychology',
  PUBLIC_HEALTH = 'Public Health',
  SOCIOLOGY = 'Sociology',
  SOFTWARE_ENGINEERING = 'Software Engineering',
  SPORTS_LEADERSHIP_AND_MANAGEMENT = 'Sports Leadership & Management',
  STATISTICS = 'Statistics',
  SUPPLY_CHAIN = 'Supply Chain',
  THEATER = 'Theater',
  THEOLOGY = 'Theology',
  URBAN_PLANNING = 'Urban Planning',
  VETERINARY_MEDICINE = 'Veterinary Medicine',
}

export interface DropdownOption {
  readonly value: COLLEGE_MAJORS;
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

export const MajorDropdown = ({ id, onChange, disabled, selected, className }: DropdownProps) => {
  const options: DropdownOption[] = Object.values(COLLEGE_MAJORS).map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  return (
    <Select<DropdownOption>
      id={id}
      value={selected ? options.find((x) => x.value == selected || x.label == selected) : null}
      options={options}
      onChange={onChange}
      styles={customDropdownStyle}
      isDisabled={disabled}
      className={className}
    />
  );
};
