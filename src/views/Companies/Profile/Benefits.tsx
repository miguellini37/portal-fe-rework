import React, { useEffect, useMemo, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import type { MultiValue } from 'react-select';
import { ICompanyPaylod, BenefitsPayload, SpecificBenefits } from '../../../api/company';
import './company.css';

type Props = { company: ICompanyPaylod; setCompany: React.Dispatch<React.SetStateAction<ICompanyPaylod>>; editMode: boolean };
type Option = { value: string; label: string };

const color = (i: number) => ['pill-green', 'pill-blue', 'pill-orange', 'pill-purple'][i % 4];
const num = (v: unknown) => { const n = Number(v); return Number.isFinite(n) && n >= 0 ? n : undefined; };
const money = (n?: number) => typeof n === 'number' && n > 0 ? `$${Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)}` : '—';
const moneyPair = (a?: number, b?: number) => (a = num(a), b = num(b), a==null && b==null ? '—' : a!=null && b!=null ? (a===b? money(a) : `${money(Math.min(a,b))} - ${money(Math.max(a,b))}`) : money(a ?? b));

const PRESETS = [
  { id: 'health', title: 'Health & Wellness', icon: '💚', suggestions: ['Medical, Dental, Vision Insurance', 'On-site fitness center', 'Mental health support', 'Wellness programs'] },
  { id: 'flex',   title: 'Flexible Scheduling', icon: '🗓️', suggestions: ['Training schedule accommodation', 'Competition time off', 'Flexible work arrangements'] },
  { id: 'career', title: 'Career Development', icon: '🚀', suggestions: ['Athlete mentorship program', 'Leadership development track', 'Fast-track promotion opportunities', 'Tuition reimbursement'] },
  { id: 'nil',    title: 'NIL Opportunities',  icon: '💼', suggestions: ['Brand partnership opportunities', 'Social media collaboration', 'Event appearances'] },
];
const byId = Object.fromEntries(PRESETS.map(p => [p.id, p]));
const byTitle = Object.fromEntries(PRESETS.map(p => [p.title.toLowerCase(), p]));

const RangeField: React.FC<{ label: string; min?: number; max?: number; onChange: (min?: number, max?: number) => void; }> = ({ label, min, max, onChange }) => {
  const realRange = min!=null && max!=null && min!==max;
  const [two, setTwo] = useState(realRange);
  useEffect(() => setTwo(t => t || realRange), [realRange]);
  const p = (s: string) => (s==='' ? undefined : num(s));
  return (
    <>
      <label className="comp-label">{label}</label>
      {two ? (
        <div className="range-group">
          <input type="number" placeholder="Min" value={min ?? ''} onChange={e => onChange(p(e.target.value), max)} />
          <span className="range-sep">—</span>
          <input type="number" placeholder="Max" value={max ?? ''} onChange={e => onChange(min, p(e.target.value))} />
          <button className="btn btn-secondary" type="button" onClick={() => { const v = min ?? max; setTwo(false); onChange(v, v); }}>Use single</button>
        </div>
      ) : (
        <div className="range-group">
          <input type="number" placeholder="Amount $USD" value={min ?? max ?? ''} onChange={e => { const v = p(e.target.value); onChange(v, v); }} />
          <button className="btn btn-secondary" type="button" onClick={() => { const v = min ?? max; setTwo(true); onChange(v, v); }}>Add range</button>
        </div>
      )}
    </>
  );
};

export const BenefitsTab: React.FC<Props> = ({ company, setCompany, editMode }) => {
  const base = company.benefits as Partial<BenefitsPayload> | undefined;
  const b = useMemo<BenefitsPayload>(() => ({
    baseSalaryMin: num(base?.baseSalaryMin), baseSalaryMax: num(base?.baseSalaryMax),
    commissionMin: num(base?.commissionMin), commissionMax: num(base?.commissionMax),
    totalCompMin: num(base?.totalCompMin),   totalCompMax: num(base?.totalCompMax),
    specificBenefits: (base?.specificBenefits as SpecificBenefits[] | undefined) ?? [],
  }), [company.benefits]); // keep stable against outer changes only

  const cats = b.specificBenefits ?? [];
  const usedIds = new Set(cats.map(c => byTitle[(c.title ?? '').toLowerCase()]?.id).filter(Boolean) as string[]);

  const setBenefits = (patch: Partial<BenefitsPayload> | ((cur: BenefitsPayload) => Partial<BenefitsPayload>)) =>
    setCompany(prev => {
      const curRaw = (prev.benefits ?? {}) as Partial<BenefitsPayload>;
      const cur: BenefitsPayload = {
        baseSalaryMin: num(curRaw.baseSalaryMin), baseSalaryMax: num(curRaw.baseSalaryMax),
        commissionMin: num(curRaw.commissionMin), commissionMax: num(curRaw.commissionMax),
        totalCompMin: num(curRaw.totalCompMin),   totalCompMax: num(curRaw.totalCompMax),
        specificBenefits: (curRaw.specificBenefits as SpecificBenefits[] | undefined) ?? [],
      };
      const next = { ...cur, ...(typeof patch === 'function' ? patch(cur) : patch) };
      return { ...prev, benefits: next as any };
    });

  const upCats = (f: (x: SpecificBenefits[]) => SpecificBenefits[]) => setBenefits(cur => ({ specificBenefits: f(cur.specificBenefits ?? []) }));
  const updCat = (i: number, f: (c: SpecificBenefits) => SpecificBenefits) => upCats(cs => cs.map((c, j) => j === i ? f(c) : c));
  const addCat = (presetId?: string) => upCats(cs => {
    const p = presetId ? byId[presetId] : undefined;
    return [...cs, p ? { title: p.title, icon: p.icon, description: p.suggestions } : { title: 'New Category', icon: '', description: [] }];
  });
  const removeCat = (i: number) => upCats(cs => cs.filter((_, j) => j !== i));
  const applyPreset = (i: number, id: string) => upCats(cs => {
    const p = byId[id]; if (!p) return cs;
    return cs.map((c, j) => j === i ? { ...c, title: p.title, icon: p.icon, description: [...p.suggestions] } : c);
  });

  const renderCat = (c: SpecificBenefits, i: number) => {
    const preset = byTitle[(c.title ?? '').toLowerCase()];
    const opts = Array.from(new Set([...(preset?.suggestions ?? []), ...(c.description ?? [])])).map(v => ({ value: v, label: v }));
    const currentId = preset?.id;
    const available = PRESETS.filter(p => !usedIds.has(p.id) || p.id === currentId);
    const onItems = (mv: MultiValue<Option>) => upCats(cs => cs.map((c2, j) => j === i ? ({ ...c2, description: mv.map(o => o.value) }) : c2));
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
        ) : (<h4 style={{ marginBottom: 8 }}>{c.icon ? `${c.icon} ` : ''}{c.title}</h4>)}

        {editMode ? (
          <CreatableSelect<Option, true>
            isMulti options={opts} value={(c.description ?? []).map(v => ({ value: v, label: v }))}
            onChange={onItems}
            onCreateOption={v => { const t = v.trim(); if (t) updCat(i, x => ({ ...x, description: Array.from(new Set([...(x.description ?? []), t])) })); }}
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

  const FIELDS = [
    { k: 'baseSalary', label: 'Base Salary', cls: 'black' },
    { k: 'commission', label: 'Commission', cls: 'black' },
    { k: 'totalComp', label: 'Total Comp (Avg)', cls: 'black' },
  ] as const;

  return (
    <div className="culture-grid card" contentEditable={false} onKeyDownCapture={e => editMode && e.stopPropagation()}>
      <section className="card values-card">
        <div className="comp-box">
          <h3 className="section-title" style={{ marginTop: 0 }}>Compensation & Benefits</h3>
          {editMode ? (
            <div className="comp-inputs">
              {FIELDS.map(f => {
                const min = (b as any)[`${f.k}Min`] as number | undefined;
                const max = (b as any)[`${f.k}Max`] as number | undefined;
                return (
                  <RangeField key={f.k} label={f.label} min={min} max={max}
                    onChange={(mn, mx) => setBenefits({ [`${f.k}Min`]: mn, [`${f.k}Max`]: mx } as any)} />
                );
              })}
            </div>
          ) : (
            FIELDS.map(f => {
              const min = (b as any)[`${f.k}Min`]; const max = (b as any)[`${f.k}Max`];
              return (
                <div key={f.k} className={`benefit-card ${f.cls}`}>
                  <span>{f.label}</span><strong style={{ color: '#000' }}>{moneyPair(min, max)}</strong>
                </div>
              );
            })
          )}
        </div>
        {cats.map((c, i) => i % 2 === 1 && renderCat(c, i))}
        {editMode && <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn btn-primary" type="button" onClick={() => addCat()}>+ Add Category</button>
        </div>}
      </section>

      <section className="card env-card">
        <h3 className="section-title" style={{ marginTop: 0 }}>Student-Athlete Specific Benefits</h3>
        {editMode && <p className="muted" style={{ marginBottom: 12 }}>Tip: Use presets, then add your own items (Enter). Icons accept emoji.</p>}
        {cats.map((c, i) => i % 2 === 0 && renderCat(c, i))}
      </section>
    </div>
  );
};
