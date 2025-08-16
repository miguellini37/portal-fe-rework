import React from 'react';
import Select from 'react-select';
import {
  ICompanyPaylod,
  CulturePayload,
} from '../../../api/company';
import './company.css';

const VALUE_PRESETS = [
  { value: 'competitive', label: 'Competitive Excellence', icon: '🌀', description: 'We hire athletes because they understand what it takes to win and perform under pressure.' },
  { value: 'team', label: 'Team First', icon: '🧑‍🤝‍🧑', description: 'Success comes from collaboration, just like in sports. We win together.' },
  { value: 'continuous', label: 'Continuous Improvement', icon: '📈', description: "Like training for the next season, we're always getting better." },
  // ...add up to 30
];

const ENVIRONMENT_PRESETS = [
  { value: 'fast', label: 'Fast-Paced', description: 'High-energy environment' },
  { value: 'growth', label: 'Growth-Focused', description: 'Career development' },
  { value: 'collaborative', label: 'Collaborative', description: 'Team-based success' },
  { value: 'results', label: 'Results-Driven', description: 'Performance matters' },
  // ...add up to 30
];

const THRIVE_POINTS_PRESETS = [
  'Competitive sales environment rewards high performers',
  'Team-based culture mirrors sports dynamics',
  'Clear performance metrics and goals',
  'Fast career advancement for top performers',
  // ...add more as needed
];

type Props = {
  company: ICompanyPaylod;
  setCompany: React.Dispatch<React.SetStateAction<ICompanyPaylod>>;
  editMode: boolean;
};

const ensureCulture = (c?: CulturePayload) => ({
  cultureValues: c?.cultureValues ?? [],
  environmentTiles: c?.environmentTiles ?? [],
  thrivePoints: c?.thrivePoints ?? [],
});

export const CultureTab: React.FC<Props> = ({ company, setCompany, editMode }) => {
  const culture = ensureCulture(company.culture);

  // For values, allow multi-select up to 5
  const handleValuesChange = (selected: any) => {
    setCompany(a => ({
      ...a,
      culture: {
        ...a.culture,
        cultureValues: selected.map((preset: any) => ({
          icon: preset.icon,
          title: preset.label,
          description: preset.description,
        })),
      },
    }));
  };

  // For environment, allow multi-select up to 4
  const handleEnvChange = (selected: any) => {
    setCompany(a => ({
      ...a,
      culture: {
        ...a.culture,
        environmentTiles: selected.map((preset: any) => ({
          title: preset.label,
          subtitle: preset.description,
        })),
      },
    }));
  };

  // For thrive points, allow multi-select from presets
  const handleThriveChange = (selected: any) => {
    setCompany(a => ({
      ...a,
      culture: {
        ...a.culture,
        thrivePoints: selected.map((preset: any) => preset.value),
      },
    }));
  };

  return (
    <div className="culture-grid card" contentEditable={false}
      onKeyDownCapture={(e) => { if (editMode) e.stopPropagation(); }}>
      <section className="card values-card">
        <h3 className="section-title">Our Values</h3>
        <p className="section-subtitle">The principles that guide everything we do.</p>
        {editMode ? (
          <Select
            isMulti
            options={VALUE_PRESETS}
            value={VALUE_PRESETS.filter(preset =>
              culture.cultureValues?.some(v => v.title === preset.label)
            )}
            onChange={handleValuesChange}
            closeMenuOnSelect={false}
            isOptionDisabled={() =>
              (culture.cultureValues?.length ?? 0) >= 5
            }
            getOptionLabel={option => option.label}
            formatOptionLabel={option => (
              <span>
                <span style={{ marginRight: 8 }}>{option.icon}</span>
                {option.label}
                <span style={{ color: '#6b7280', marginLeft: 8, fontSize: '0.9em' }}>{option.description}</span>
              </span>
            )}
          />
        ) : (
          <ul className="values-list">
            {culture.cultureValues?.map((v, i) => (
              <li key={i} className="value-item">
                <div className="value-icon">{v.icon}</div>
                <div className="value-copy">
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.description}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card env-card">
        <h3 className="section-title">Work Environment</h3>
        <p className="section-subtitle">What it's like to work here</p>
        {editMode ? (
          <Select
            isMulti
            options={ENVIRONMENT_PRESETS}
            value={ENVIRONMENT_PRESETS.filter(preset =>
              culture.environmentTiles?.some(t => t.title === preset.label)
            )}
            onChange={handleEnvChange}
            closeMenuOnSelect={false}
            isOptionDisabled={() =>
              (culture.environmentTiles?.length ?? 0) >= 4
            }
            formatOptionLabel={option => (
              <span>
                <span style={{ fontWeight: 700 }}>{option.label}</span>
                <span style={{ color: '#6b7280', marginLeft: 8, fontSize: '0.9em' }}>{option.description}</span>
              </span>
            )}
          />
        ) : (
          <div className="env-tiles">
            {culture.environmentTiles?.map((t, i) => (
              <div key={i} className="env-tile">
                <div className="env-tile-title" style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.1em' }}>{t.title}</div>
                <div className="env-tile-sub" style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.98em' }}>{t.subtitle}</div>
              </div>
            ))}
          </div>
        )}
        <h4 className="subheader">Why Student-Athletes Thrive Here</h4>
        {editMode ? (
          <Select
            isMulti
            options={THRIVE_POINTS_PRESETS.map(p => ({ value: p, label: p }))}
            value={THRIVE_POINTS_PRESETS.filter(p =>
              culture.thrivePoints?.includes(p)
            ).map(p => ({ value: p, label: p }))}
            onChange={handleThriveChange}
            closeMenuOnSelect={false}
            isOptionDisabled={() =>
              (culture.thrivePoints?.length ?? 0) >= 6
            }
          />
        ) : (
          <ul className="thrive-list">
            {culture.thrivePoints?.map((p, i) => (
              <li key={i} style={{ listStyle: 'none', marginLeft: 0 }}>
                <span style={{ marginRight: 8 }}>🔹</span>{p}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
