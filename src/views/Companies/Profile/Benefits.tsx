import React from 'react';
import CreatableSelect from 'react-select/creatable'; // Use CreatableSelect for custom options
import {
  ICompanyPaylod,
  BenefitsPayload,
} from '../../../api/company';
import './company.css';

type Props = {
  company: ICompanyPaylod;
  setCompany: React.Dispatch<React.SetStateAction<ICompanyPaylod>>;
  editMode: boolean;
};

const HEALTH_WELLNESS_PRESETS = [
  'Medical, Dental, Vision Insurance',
  'On-site fitness center',
  'Mental health support',
  'Wellness programs',
];

const FLEXIBLE_SCHEDULING_PRESETS = [
  'Training schedule accommodation',
  'Competition time off',
  'Flexible work arrangements',
];

const CAREER_DEV_PRESETS = [
  'Athlete mentorship program',
  'Leadership development track',
  'Fast-track promotion opportunities',
  'Tuition reimbursement',
];

const NIL_OPPORTUNITIES_PRESETS = [
  'Brand partnership opportunities',
  'Social media collaboration',
  'Event appearances',
];

const ensureBenefits = (b?: BenefitsPayload) => ({
  baseSalary: b?.baseSalary ?? '',
  commission: b?.commission ?? '',
  totalComp: b?.totalComp ?? '',
  healthWellness: b?.healthWellness ?? [],
  flexibleScheduling: b?.flexibleScheduling ?? [],
  careerDevelopment: b?.careerDevelopment ?? [],
  nilOpportunities: b?.nilOpportunities ?? [],
});

// Helper for colored bullets
const bullet = (color: string) => (
  <span style={{
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: color,
    marginRight: 8,
    verticalAlign: 'middle'
  }} />
);

export const BenefitsTab: React.FC<Props> = ({ company, setCompany, editMode }) => {
  const benefits = ensureBenefits(company.benefits);

  const handleInputChange = (field: keyof BenefitsPayload, value: string) => {
    setCompany(a => ({
      ...a,
      benefits: {
        ...benefits,
        [field]: value,
      },
    }));
  };

  const handleListChange = (field: keyof BenefitsPayload, selected: any) => {
    setCompany(a => ({
      ...a,
      benefits: {
        ...benefits,
        [field]: selected.map((s: any) => s.value),
      },
    }));
  };

  // CreatableSelect allows custom options
  const getCreatableProps = (presets: string[], value: string[], color: string) => ({
    isMulti: true,
    options: presets.map(p => ({ value: p, label: p })),
    value: value.map(p => ({ value: p, label: p })),
    onChange: (selected: any) => handleListChange(
      presets === HEALTH_WELLNESS_PRESETS ? 'healthWellness' :
      presets === FLEXIBLE_SCHEDULING_PRESETS ? 'flexibleScheduling' :
      presets === CAREER_DEV_PRESETS ? 'careerDevelopment' : 'nilOpportunities',
      selected
    ),
    closeMenuOnSelect: false,
    formatOptionLabel: (option: any) => (
      <span>
        {bullet(color)}
        {option.label}
      </span>
    ),
    placeholder: "Select or type to add...",
  });

  return (
    <div className="culture-grid card" contentEditable={false}
      onKeyDownCapture={(e) => { if (editMode) e.stopPropagation(); }}>

      {/* Left Column */}
      <section className="card values-card">
        <h3 className="section-title">Compensation & Benefits</h3>

        {editMode ? (
          <div className="comp-inputs">
            <label>Base Salary Range</label>
            <input
              type="text"
              value={benefits.baseSalary}
              onChange={(e) => handleInputChange('baseSalary', e.target.value)}
              placeholder="$55K - $85K"
            />
            <label>Commission Potential</label>
            <input
              type="text"
              value={benefits.commission}
              onChange={(e) => handleInputChange('commission', e.target.value)}
              placeholder="$20K - $50K+"
            />
            <label>Total Comp (Avg)</label>
            <input
              type="text"
              value={benefits.totalComp}
              onChange={(e) => handleInputChange('totalComp', e.target.value)}
              placeholder="$78K"
            />
          </div>
        ) : (
          <>
            <div className="benefit-card green">
              <span>Base Salary Range</span>
              <strong style={{ color: '#22c55e', fontWeight: 700 }}>{benefits.baseSalary}</strong>
            </div>
            <div className="benefit-card blue">
              <span>Commission Potential</span>
              <strong style={{ color: '#2563eb', fontWeight: 700 }}>{benefits.commission}</strong>
            </div>
            <div className="benefit-card purple">
              <span>Total Comp (Avg)</span>
              <strong style={{ color: '#a78bfa', fontWeight: 700 }}>{benefits.totalComp}</strong>
            </div>
          </>
        )}

        <h3>Health & Wellness</h3>
        {!editMode ? (
          <div className="pill-list">
            {benefits.healthWellness.map((item, idx) => (
              <span className="pill pill-green" key={idx}>{item}</span>
            ))}
          </div>
        ) : (
          <CreatableSelect {...getCreatableProps(HEALTH_WELLNESS_PRESETS, benefits.healthWellness, '#22c55e')} />
        )}
      </section>

      {/* Right Column */}
      <section className="card env-card">
        <h3 className="section-title">Student-Athlete Specific Benefits</h3>

        <h4>Flexible Scheduling</h4>
        {!editMode ? (
          <div className="pill-list">
            {benefits.flexibleScheduling.map((item, idx) => (
              <span className="pill pill-blue" key={idx}>{item}</span>
            ))}
          </div>
        ) : (
          <CreatableSelect {...getCreatableProps(FLEXIBLE_SCHEDULING_PRESETS, benefits.flexibleScheduling, '#2563eb')} />
        )}

        <h4>Career Development</h4>
        {!editMode ? (
          <div className="pill-list">
            {benefits.careerDevelopment.map((item, idx) => (
              <span className="pill pill-orange" key={idx}>{item}</span>
            ))}
          </div>
        ) : (
          <CreatableSelect {...getCreatableProps(CAREER_DEV_PRESETS, benefits.careerDevelopment, '#f59e42')} />
        )}

        <h4>NIL Opportunities</h4>
        {!editMode ? (
          <div className="pill-list">
            {benefits.nilOpportunities.map((item, idx) => (
              <span className="pill pill-purple" key={idx}>{item}</span>
            ))}
          </div>
        ) : (
          <CreatableSelect {...getCreatableProps(NIL_OPPORTUNITIES_PRESETS, benefits.nilOpportunities, '#a78bfa')} />
        )}
      </section>
    </div>
  );
};
