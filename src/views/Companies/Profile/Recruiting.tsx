import { FC, useCallback, useMemo, useState } from 'react';
import { ICompanyPaylod, RecruitingCategory, IRecruitingPayload } from '../../../api/company';
import { IUpdateCompanyEmployeePayload } from '../../../api/companyEmployee';
import { getFullName, getInitials } from '../../../util/name';

interface Props {
  company: ICompanyPaylod;
  editMode: boolean;
  setCompany: React.Dispatch<React.SetStateAction<ICompanyPaylod>>;
}

const STRATEGY_PRESETS: RecruitingCategory[] = [
  { icon: '🎯', title: 'Target Sports', description: 'Football, Basketball, Baseball, Soccer' },
  { icon: '🎓', title: 'Preferred Majors', description: 'Business, Communications, Supply Chain' },
  { icon: '🏫', title: 'Target Universities', description: 'Big Ten, SEC, ACC, Big 12' },
  { icon: '🧭', title: 'Entry Roles', description: 'Sales, Operations, Account Management' },
  { icon: '🤝', title: 'NIL Programs', description: 'Internship + Brand partnerships' },
  { icon: '⭐', title: 'Success Metrics', description: 'Performance, Leadership, Retention' },
];

const ensureRecruiting = (r?: IRecruitingPayload | null): Required<IRecruitingPayload> => {
  if (r && r.strategy && r.processSteps && r.recruiterIds) return r as Required<IRecruitingPayload>;
  return {
    strategy: r?.strategy ?? [],
    processSteps: r?.processSteps ?? [],
    recruiterIds: r?.recruiterIds ?? [],
  };
};

const upsert = <T extends object>(a: T[], i: number, patch: Partial<T>): T[] =>
  a.map((x, k) => (k === i ? ({ ...x, ...patch } as T) : x));
const setAt = <T,>(a: T[], i: number, v: T): T[] => a.map((x, k) => (k === i ? v : x));
const removeAt = <T,>(a: T[], i: number): T[] => a.filter((_, k) => k !== i);

export const RecruitingTab: FC<Props> = ({ company, editMode, setCompany }) => {
  const r = useMemo<Required<IRecruitingPayload>>(
    () => ensureRecruiting(company.recruiting),
    [company.recruiting]
  );
  const employees = (company.companyEmployees ?? []) as IUpdateCompanyEmployeePayload[];
  const recruiters = useMemo(
    () => employees.filter((e) => e.id && r.recruiterIds.includes(e.id)),
    [employees, r.recruiterIds]
  );

  const setR = useCallback(
    (fn: (curr: Required<IRecruitingPayload>) => Required<IRecruitingPayload>) =>
      setCompany((prev) => {
        const prevR = ensureRecruiting(prev.recruiting);
        const nextR = fn(prevR);
        // Bail if nothing changed
        if (nextR === prevR) return prev;
        return { ...prev, recruiting: nextR };
      }),
    [setCompany]
  );

  // Strategy
  const addPreset = (p: RecruitingCategory) =>
    setR((curr) =>
      curr.strategy.some((s) => s.title === p.title)
        ? curr
        : { ...curr, strategy: [...curr.strategy, p] }
    );
  const addStrategy = () =>
    setR((curr) => ({
      ...curr,
      strategy: [...curr.strategy, { icon: '🧩', title: '', description: '' }],
    }));
  const updateStrategy = (i: number, patch: Partial<RecruitingCategory>) =>
    setR((curr) => ({ ...curr, strategy: upsert(curr.strategy, i, patch) }));
  const removeStrategy = (i: number) =>
    setR((curr) => ({ ...curr, strategy: removeAt(curr.strategy, i) }));

  // Process
  const addStep = () => setR((curr) => ({ ...curr, processSteps: [...curr.processSteps, ''] }));
  const updateStep = (i: number, value: string) =>
    setR((curr) => ({ ...curr, processSteps: setAt(curr.processSteps, i, value) }));
  const removeStep = (i: number) =>
    setR((curr) => ({ ...curr, processSteps: removeAt(curr.processSteps, i) }));

  // Recruiters
  const [showAddRecruiter, setShowAddRecruiter] = useState(false);
  const [search, setSearch] = useState('');
  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();
    return employees.filter(
      (e) =>
        e.id &&
        !r.recruiterIds.includes(e.id) &&
        getFullName(e ?? { firstName: '', lastName: '' })
          .toLowerCase()
          .includes(term)
    );
  }, [employees, r.recruiterIds, search]);

  const addRecruiter = (id: string) => {
    setR((curr) => ({ ...curr, recruiterIds: [...curr.recruiterIds, id] }));
    setShowAddRecruiter(false);
    setSearch('');
  };
  const removeRecruiter = (id: string) =>
    setR((curr) => ({ ...curr, recruiterIds: curr.recruiterIds.filter((rid) => rid !== id) }));

  return (
    <div className="recruiting-grid">
      <div className="card">
        <h2 className="section-title">Recruiting Strategy</h2>
        <p className="section-subtitle">How we identify and attract top student-athlete talent</p>
        {editMode && (
          <div className="preset-row">
            <span className="preset-label">Presets:</span>
            {STRATEGY_PRESETS.map((p) => (
              <button
                key={p.title}
                className="preset-chip"
                type="button"
                onClick={() => addPreset(p)}
              >
                <span className="preset-chip-icon" aria-hidden="true">
                  {p.icon}
                </span>
                {p.title}
              </button>
            ))}
            <button className="preset-chip" type="button" onClick={addStrategy}>
              + Custom
            </button>
          </div>
        )}

        <ul className={`strategy-list${editMode ? ' strategy-list-1col' : ' strategy-list-2col'}`}>
          {!editMode && r.strategy.length === 0 && <li className="muted">No strategy defined.</li>}
          {r.strategy.map((s, i) => (
            <li key={i} className="strategy-item">
              {editMode ? (
                <>
                  <input
                    className="strategy-icon-input"
                    value={s.icon ?? ''}
                    maxLength={2}
                    onChange={(e) => updateStrategy(i, { icon: e.target.value })}
                    aria-label="Icon"
                  />
                  <input
                    className="strategy-title-input"
                    value={s.title}
                    onChange={(e) => updateStrategy(i, { title: e.target.value })}
                    aria-label="Title"
                  />
                  <textarea
                    className="strategy-desc-input"
                    value={s.description ?? ''}
                    onChange={(e) => updateStrategy(i, { description: e.target.value })}
                    rows={2}
                    aria-label="Description"
                  />
                  <button
                    className="btn btn-tertiary"
                    type="button"
                    onClick={() => removeStrategy(i)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <div className="value-item">
                  <div className="value-icon" aria-hidden="true">
                    {s.icon ?? '🧩'}
                  </div>
                  <div>
                    <div className="value-title">{s.title}</div>
                    {s.description && <div className="value-desc">{s.description}</div>}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <h3 className="subheader">Recruiting Process</h3>
        {editMode ? (
          <div className="process-editor">
            {r.processSteps.map((step, i) => (
              <div key={i} className="process-row">
                <span className="process-index">{i + 1}</span>
                <input
                  className="process-input"
                  value={step}
                  onChange={(e) => updateStep(i, e.target.value)}
                  aria-label={`Step ${i + 1}`}
                />
                <button className="btn btn-tertiary" type="button" onClick={() => removeStep(i)}>
                  Remove
                </button>
              </div>
            ))}
            <button className="btn btn-secondary" type="button" onClick={addStep}>
              Add step
            </button>
          </div>
        ) : (
          <ol className="process-list process-list-numbered">
            {r.processSteps.length === 0 && <li className="muted">No process steps yet.</li>}
            {r.processSteps.map((step, i) => (
              <li key={i} className="process-list-item">
                <span className="process-number">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="card">
        <h2 className="section-title">Recruiting Team</h2>
        {editMode && (
          <>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setShowAddRecruiter(true)}
            >
              + Add Recruiter
            </button>
            {showAddRecruiter && (
              <div className="recruiter-search-modal">
                <input
                  className="recruiter-search-input"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employees..."
                  autoFocus
                />
                <ul className="recruiter-search-list">
                  {filteredEmployees.length === 0 && <li className="muted">No employees found.</li>}
                  {filteredEmployees.map((e) => (
                    <li key={e.id} className="recruiter-search-item">
                      <button
                        type="button"
                        className="recruiter-search-btn recruiter-search-btn-noicon"
                        onClick={() => e.id && addRecruiter(e.id)}
                      >
                        <span className="recruiter-search-name">
                          {getFullName(e ?? { firstName: '', lastName: '' })}
                        </span>
                        <span className="recruiter-search-position">{e.position ?? ''}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-tertiary"
                  type="button"
                  onClick={() => setShowAddRecruiter(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}

        <ul className="employee-list">
          {recruiters.length === 0 && <li className="muted">No recruiters selected.</li>}
          {recruiters.map((emp) => (
            <li key={emp.id} className="employee-item">
              {!editMode && (
                <>
                  <div className="employee-avatar" aria-hidden="true">
                    {getInitials(emp ?? { firstName: '', lastName: '' })}
                  </div>
                  <div className="employee-name" style={{ textAlign: 'center' }}>
                    {getFullName(emp ?? { firstName: '', lastName: '' })}
                  </div>
                  <div className="employee-position" style={{ textAlign: 'center' }}>
                    {emp.position?.trim() ? emp.position : 'Recruiter'}
                  </div>
                </>
              )}
              {editMode && (
                <>
                  <div className="employee-name">
                    {getFullName(emp ?? { firstName: '', lastName: '' })}
                  </div>
                  <div className="employee-position">{emp.position ?? ''}</div>
                  <button
                    className="btn btn-tertiary"
                    type="button"
                    onClick={() => emp.id && removeRecruiter(emp.id)}
                    aria-label="Remove recruiter"
                  >
                    Remove
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
