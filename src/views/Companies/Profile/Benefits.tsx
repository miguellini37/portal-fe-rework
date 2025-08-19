import React, { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import type { MultiValue } from 'react-select';
import { ICompanyPaylod, BenefitsPayload, SpecificBenefits } from '../../../api/company';
import './company.css';

type Props = { company: ICompanyPaylod; setCompany: React.Dispatch<React.SetStateAction<ICompanyPaylod>>; editMode: boolean };
type Option = { value: string; label: string };

const PRESETS = [
  { id: 'health', title: 'Health & Wellness', icon: '💚', suggestions: ['Medical, Dental, Vision Insurance', 'On-site fitness center', 'Mental health support', 'Wellness programs'] },
  { id: 'flex', title: 'Flexible Scheduling', icon: '🗓️', suggestions: ['Training schedule accommodation', 'Competition time off', 'Flexible work arrangements'] },
  { id: 'career', title: 'Career Development', icon: '🚀', suggestions: ['Athlete mentorship program', 'Leadership development track', 'Fast-track promotion opportunities', 'Tuition reimbursement'] },
  { id: 'nil', title: 'NIL Opportunities', icon: '💼', suggestions: ['Brand partnership opportunities', 'Social media collaboration', 'Event appearances'] },
];

// utils
const asRange = (v: unknown): number[] =>
  Array.isArray(v) ? v.map(Number).filter(n => Number.isFinite(n) && n >= 0).slice(0, 2)
  : v == null || v === '' ? [] : Number.isFinite(+v) && +v >= 0 ? [+v] : [];

const money = (n?: number) => typeof n === 'number' && n > 0 ? `$${Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)}` : '—';
const moneyRange = (arr?: number[]) => {
  const v = asRange(arr);
  return v.length === 0 ? '—' : v.length === 1 ? money(v[0]) : `${money(Math.min(...v))} - ${money(Math.max(...v))}`;
};
const color = (i: number) => ['pill-blue', 'pill-orange', 'pill-purple', 'pill-green'][i % 4];

// small UI piece
const RangeField = ({ label, value, onChange }: { label: string; value: number[]; onChange: (a: number[]) => void }) => {
  const v = asRange(value), two = v.length > 1;
  return (
    <>
      <label className="comp-label">{label}</label>
      {two ? (
        <div className="range-group">
          <input type="number" placeholder="Min" value={v[0] ?? ''} onChange={e => onChange([e.target.value === '' ? 0 : +e.target.value, v[1] ?? 0])} />
          <span className="range-sep">—</span>
          <input type="number" placeholder="Max" value={v[1] ?? ''} onChange={e => onChange([v[0] ?? 0, e.target.value === '' ? 0 : +e.target.value])} />
          <button className="btn btn-secondary" type="button" onClick={() => onChange([Math.max(...(v.length ? v : [0]))])}>Use single</button>
        </div>
      ) : (
        <div className="range-group">
          <input type="number" placeholder="Amount $USD" value={v[0] ?? ''} onChange={e => onChange(e.target.value === '' ? [] : [+e.target.value])} />
          <button className="btn btn-secondary" type="button" onClick={() => onChange([v[0] ?? 0, v[0] ?? 0])}>Add range</button>
        </div>
      )}
    </>
  );
};

export const BenefitsTab: React.FC<Props> = ({ company, setCompany, editMode }) => {
  // sanitize incoming props
  const b = useMemo<BenefitsPayload>(() => ({
    baseSalary: asRange((company.benefits as any)?.baseSalary),
    commission: asRange((company.benefits as any)?.commission),
    totalComp: asRange((company.benefits as any)?.totalComp),
    specficBenefits: (company.benefits?.specficBenefits as SpecificBenefits[] | undefined) ?? [],
  }), [company.benefits]);

  const cats = b.specficBenefits ?? [];
  const usedPresetIds = useMemo(
    () => new Set(cats.map(c => PRESETS.find(p => p.title.toLowerCase() === (c.title ?? '').toLowerCase())?.id).filter(Boolean) as string[]),
    [cats]
  );

  const setBenefits = (partial: Partial<BenefitsPayload>) =>
    setCompany(prev => {
      const cur = (prev.benefits ?? {}) as Partial<BenefitsPayload>;
      const next: any = { ...cur, ...partial };
      next.baseSalary = asRange(next.baseSalary);
      next.commission = asRange(next.commission);
      next.totalComp = asRange(next.totalComp);
      next.specficBenefits = next.specficBenefits ?? cur.specficBenefits ?? [];
      return { ...prev, benefits: next as any };
    });

  const updateCats = (fn: (cats: SpecificBenefits[]) => SpecificBenefits[]) =>
    setCompany(prev => {
      const cur = (prev.benefits ?? {}) as Partial<BenefitsPayload>;
      const nextCats = fn((cur.specficBenefits as SpecificBenefits[] | undefined) ?? []);
      const next: any = {
        ...cur,
        baseSalary: asRange(cur.baseSalary),
        commission: asRange(cur.commission),
        totalComp: asRange(cur.totalComp),
        specficBenefits: nextCats,
      };
      return { ...prev, benefits: next };
    });

  const updCat = (i: number, f: (c: SpecificBenefits) => SpecificBenefits) => updateCats(cs => cs.map((c, idx) => (idx === i ? f(c) : c)));
  const addCat = (presetId?: string) =>
    updateCats(cs => {
      const p = PRESETS.find(x => x.id === presetId);
      return [...cs, p ? { title: p.title, icon: p.icon, description: p.suggestions } : { title: 'New Category', icon: '', description: [] }];
    });
  const removeCat = (i: number) => updateCats(cs => cs.filter((_, idx) => idx !== i));
  const applyPreset = (i: number, id: string) =>
    updateCats(cs => {
      const p = PRESETS.find(x => x.id === id); if (!p) return cs;
      return cs.map((c, idx) => (idx === i ? { ...c, title: p.title, icon: p.icon, description: [...p.suggestions] } : c));
    });

  const renderCat = (c: SpecificBenefits, i: number) => {
    const preset = PRESETS.find(p => p.title === c.title);
    const suggestions = preset?.suggestions ?? [];
    const currentId = PRESETS.find(p => p.title.toLowerCase() === (c.title ?? '').toLowerCase())?.id;
    const available = PRESETS.filter(p => !usedPresetIds.has(p.id) || p.id === currentId);

    const onItems = (mv: MultiValue<Option>) =>
      updateCats(cs => cs.map((c2, idx) => (idx === i ? { ...c2, description: mv.map(o => o.value) } : c2)));

    return (
      <div key={`SpecificBenefits-${i}`} style={{ marginBottom: 16 }}>
        {editMode ? (
          <>
            <div className="cat-header">
              <input type="text" value={c.title ?? ''} placeholder="Category title" onChange={e => updCat(i, x => ({ ...x, title: e.target.value }))} />
              <input type="text" value={c.icon ?? ''} placeholder="Icon (emoji)" className="cat-icon-input" onChange={e => updCat(i, x => ({ ...x, icon: e.target.value }))} />
              <button className="btn btn-secondary" type="button" onClick={() => removeCat(i)}>Remove</button>
            </div>
            <div className="preset-row">
              <span className="preset-label">Quick presets:</span>
              {available.map(p => (
                <button key={p.id} type="button" className="preset-chip" onClick={() => applyPreset(i, p.id)}>
                  <span className="preset-chip-icon">{p.icon}</span>{p.title}
                </button>
              ))}
            </div>
          </>
        ) : (
          <h4 style={{ marginBottom: 8 }}>{c.icon ? `${c.icon} ` : ''}{c.title}</h4>
        )}

        {editMode ? (
          <CreatableSelect<Option, true>
            isMulti
            options={Array.from(new Set([...(suggestions ?? []), ...(c.description ?? [])])).map(v => ({ value: v, label: v }))}
            value={(c.description ?? []).map(v => ({ value: v, label: v }))}
            onChange={onItems}
            onCreateOption={v => {
              const t = v.trim(); if (!t) return;
              updateCats(cs => cs.map((c2, idx) => idx === i ? { ...c2, description: Array.from(new Set([...(c.description ?? []), t])) } : c2));
            }}
            closeMenuOnSelect={false}
            styles={{
              control: (s: any) => ({ ...s, minHeight: 40 }),
              multiValue: (s: any) => ({ ...s, background: 'transparent', margin: '4px 8px 4px 0', borderRadius: 999 }),
              multiValueLabel: (s: any) => ({ ...s, padding: 0 }),
              multiValueRemove: (s: any) => ({ ...s, padding: '0 8px', ':hover': { background: 'transparent' } }),
            }}
            components={{ MultiValueContainer: (p: any) => <span className={`pill ${color(i)} pill-edit`}>{p.children}</span> }}
            placeholder="Type and press Enter…"
          />
        ) : (
          <div className="pill-list">{(c.description ?? []).map((it, j) => <span key={`${it}-${j}`} className={`pill ${color(i)}`}>{it}</span>)}</div>
        )}
      </div>
    );
  };

  const left = (i: number) => i % 2 === 1;
  const right = (i: number) => i % 2 === 0;

  return (
    <div className="culture-grid card" contentEditable={false} onKeyDownCapture={e => editMode && e.stopPropagation()}>
      {/* LEFT: Compensation and left-side categories */}
      <section className="card values-card">
        <div className="comp-box">
          <h3 className="section-title" style={{ marginTop: 0 }}>Compensation & Benefits</h3>
          {editMode ? (
            <div className="comp-inputs">
              <RangeField label="Base Salary" value={b.baseSalary ?? []} onChange={a => setBenefits({ baseSalary: a })} />
              <RangeField label="Commission" value={b.commission ?? []} onChange={a => setBenefits({ commission: a })} />
              <RangeField label="Total Comp (Avg)" value={b.totalComp ?? []} onChange={a => setBenefits({ totalComp: a })} />
            </div>
          ) : (
            <>
              <div className="benefit-card green"><span>Base Salary</span><strong style={{ color: '#000' }}>{moneyRange(b.baseSalary)}</strong></div>
              <div className="benefit-card blue"><span>Commission</span><strong style={{ color: '#000' }}>{moneyRange(b.commission)}</strong></div>
              <div className="benefit-card purple"><span>Total Comp (Avg)</span><strong style={{ color: '#000' }}>{moneyRange(b.totalComp)}</strong></div>
            </>
          )}
        </div>
        {cats.map((c, i) => left(i) && renderCat(c, i))}
        {editMode && (
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="btn btn-primary" type="button" onClick={() => addCat()}>+ Add Category</button>
          </div>
        )}
      </section>

      {/* RIGHT: header + right-side categories */}
      <section className="card env-card">
        <h3 className="section-title" style={{ marginTop: 0 }}>Student-Athlete Specific Benefits</h3>
        {editMode && <p className="muted" style={{ marginBottom: 12 }}>Tip: Use presets, then add your own items (Enter). Icons accept emoji.</p>}
        {cats.map((c, i) => right(i) && renderCat(c, i))}
      </section>
    </div>
  );
};
