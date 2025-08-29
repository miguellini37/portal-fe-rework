import React, { FC, useMemo, useCallback, ReactNode, useState } from 'react';
import { ICompanyPaylod, AnalyticsNumbers, CustomAnalytic } from '../../../api/company';
import './company.css';
import { PlusCircle, XCircle } from 'lucide-react';

interface Props {
  company: ICompanyPaylod;
  editMode: boolean;
  setCompany: React.Dispatch<React.SetStateAction<ICompanyPaylod>>;
}

/** ---------- Config & Helpers ---------- */
const AVAILABLE_CUSTOM_ANALYTICS = [
  { id: 'cost_per_hire_usd', label: 'Cost Per Hire ($)' },
  { id: 'time_to_fill_days', label: 'Time to Fill (days)' },
  { id: 'offer_acceptance_rate_pct', label: 'Offer Acceptance Rate (%)' },
  { id: 'sourcing_channel_effectiveness_pct', label: 'Sourcing Channel Effectiveness (%)' },
];

const MOCK_DATA: AnalyticsNumbers = {
  hiring: {
    totalHires: 342,
    totalHiresDeltaPct: 18.2,
    totalInternships: 91,
    totalInternshipsDelta: 3,
    conversionToFullTimePct: 67,
    conversionToFullTimeDeltaPct: 2.3,
    timeToFirstSaleDays: 52,
    timeToFirstSaleDeltaDays: -4,
  },
  nil: { totalInvestmentUSD: 2_100_000, activePartnerships: 89 },
  custom: [
    { id: 'cost_per_hire_usd', label: 'Cost Per Hire ($)', value: 4120 },
    { id: 'offer_acceptance_rate_pct', label: 'Offer Acceptance Rate (%)', value: 88 },
  ],
};

const ensure = (a?: AnalyticsNumbers | null): AnalyticsNumbers => ({
  hiring: { ...MOCK_DATA.hiring, ...(a?.hiring ?? {}) },
  nil: { ...MOCK_DATA.nil, ...(a?.nil ?? {}) },
  custom: a?.custom ?? [],
});

const fmtPct = (n: number) => `${Number.isFinite(n) ? n.toFixed(n % 1 ? 1 : 0) : '0'}%`;
const fmtDelta = (n: number, unit: '%' | 'd' = '%') => {
  const sign = n >= 0 ? '+' : '';
  if (unit === '%') return `${sign}${fmtPct(n)}`;
  return `${sign}${n.toFixed(0)}${unit}`;
};
const fmtMoneyShort = (usd: number) => {
  if (!Number.isFinite(usd)) return '$0';
  if (Math.abs(usd) >= 1_000_000) return `$${(usd / 1_000_000).toFixed(1)}M`;
  if (Math.abs(usd) >= 1_000) return `$${(usd / 1_000).toFixed(0)}K`;
  return `$${usd.toFixed(0)}`;
};
const formatCustomValue = (metric: CustomAnalytic) => {
  if (!metric.id || !metric.value) return null;
  if (metric.id.endsWith('_pct')) return fmtPct(metric.value);
  if (metric.id.endsWith('_usd')) return fmtMoneyShort(metric.value);
  if (metric.id.endsWith('_days')) return `${metric.value}d`;
  return metric.value;
};

/** ---------- Reusable Child Components ---------- */
const StatTile: FC<{
  title: string;
  value: string;
  delta: string;
  context: string;
  color: string;
  deltaTone?: 'good' | 'bad';
}> = ({ title, value, delta, context, color, deltaTone = 'good' }) => (
  <div className={`tile tile-${color}`}>
    <div className="v">{value}</div>
    <div className="l">{title}</div>
    <div className={`d ${deltaTone}`}>{delta}</div>
    <div className="c">{context}</div>
  </div>
);

const CustomListItem: FC<{ label: string; value: ReactNode }> = ({ label, value }) => (
  <li className="aside-row">
    <span className="aside-label">{label}</span>
    <span className="aside-value">{value}</span>
  </li>
);

const HiringPerformanceCard: FC<{ hiring: AnalyticsNumbers['hiring'] }> = ({ hiring }) => (
  <section className="card analytics-card">
    <h2 className="section-title">Hiring Performance</h2>
    <div className="tiles">
      <StatTile
        color="indigo"
        title="Total Hires YTD"
        value={String(hiring.totalHires)}
        delta={fmtDelta(hiring.totalHiresDeltaPct ?? 0)}
        context="Δ vs last year"
        deltaTone={(hiring.totalHiresDeltaPct ?? 0 >= 0) ? 'good' : 'bad'}
      />
      <StatTile
        color="green"
        title="Internships"
        value={String(hiring.totalInternships)}
        delta={fmtDelta(hiring.totalInternshipsDelta ?? 0, 'd')}
        context="Δ vs last year"
        deltaTone={(hiring.totalInternshipsDelta ?? 0 >= 0) ? 'good' : 'bad'}
      />
      <StatTile
        color="purple"
        title="Conversion to Full-Time"
        value={fmtPct(hiring.conversionToFullTimePct ?? 0)}
        delta={fmtDelta(hiring.conversionToFullTimeDeltaPct ?? 0)}
        context="Δ vs last year"
        deltaTone={(hiring.conversionToFullTimeDeltaPct ?? 0 >= 0) ? 'good' : 'bad'}
      />
      <StatTile
        color="amber"
        title="Time to First Sale"
        value={`${hiring.timeToFirstSaleDays}d`}
        delta={fmtDelta(hiring.timeToFirstSaleDeltaDays ?? 0, 'd')}
        context="Δ"
        deltaTone={(hiring.timeToFirstSaleDeltaDays ?? 0 < 0) ? 'good' : 'bad'}
      />
    </div>
  </section>
);

const NilInvestmentCard: FC<{ nil: AnalyticsNumbers['nil'] }> = ({ nil }) => (
  <section className="card analytics-card">
    <h2 className="section-title">NIL Investment</h2>
    <aside className="aside">
      <ul className="aside-list">
        <CustomListItem
          label="Total NIL Investment"
          value={fmtMoneyShort(nil.totalInvestmentUSD ?? 0)}
        />
        <CustomListItem label="Active Partnerships" value={nil.activePartnerships ?? 0} />
      </ul>
    </aside>
  </section>
);

/** ---------- Main Analytics Tab Component ---------- */
export const AnalyticsTab: FC<Props> = ({ company, editMode, setCompany }) => {
  const numbers = useMemo(() => ensure((company as ICompanyPaylod).analytics), [company]);

  const upCustom = useCallback(
    (newList: CustomAnalytic[]) =>
      setCompany((prev) => ({
        ...prev,
        analyticsNumbers: { ...ensure((prev as ICompanyPaylod).analytics), custom: newList },
      })),
    [setCompany]
  );

  if (editMode) {
    return <AnalyticsEditor numbers={numbers} upCustom={upCustom} />;
  }

  return (
    <div className="analytics-grid">
      {/* --- View Mode: Hiring Performance --- */}
      <HiringPerformanceCard hiring={numbers.hiring} />

      {/* --- View Mode: NIL Investment --- */}
      <NilInvestmentCard nil={numbers.nil} />

      {/* --- View Mode: Company Specific Analytics (conditional) --- */}
      {(numbers.custom ?? []).length > 0 && (
        <section className="card analytics-card">
          <h2 className="section-title">Company Specific Analytics</h2>
          <aside className="aside">
            <ul className="aside-list">
              {(ensure(numbers).custom ?? []).map((metric) => (
                <CustomListItem
                  key={metric.id}
                  label={metric.label ?? ''}
                  value={formatCustomValue(metric)}
                />
              ))}
            </ul>
          </aside>
        </section>
      )}
    </div>
  );
};

/** ---------- Edit Mode Component ---------- */
const AnalyticsEditor: FC<{
  numbers: AnalyticsNumbers;
  upCustom: (p: CustomAnalytic[]) => void;
}> = ({ numbers, upCustom }) => {
  const [selectedMetric, setSelectedMetric] = useState('');

  const availableOptions = useMemo(
    () =>
      AVAILABLE_CUSTOM_ANALYTICS.filter(
        (opt) => !(numbers.custom ?? []).some((m) => m.id === opt.id)
      ),
    [numbers.custom]
  );

  const handleAddCustom = (metricId: string) => {
    if (!metricId) return;

    const newMetricFromBackend = AVAILABLE_CUSTOM_ANALYTICS.find((opt) => opt.id === metricId);
    if (!newMetricFromBackend) return;

    const mockValue = MOCK_DATA.custom?.find((m) => m.id === newMetricFromBackend.id)?.value ?? 0;
    const newMetric = { ...newMetricFromBackend, value: mockValue };

    upCustom([...(numbers.custom ?? []), newMetric]);
    setSelectedMetric(''); // Reset dropdown
  };

  const handleRemoveCustom = (index: number) => {
    upCustom((numbers.custom ?? []).filter((_, i) => i !== index));
  };

  return (
    <div className="analytics-grid">
      {/* --- Hiring Performance (Visible in Edit Mode) --- */}
      <HiringPerformanceCard hiring={numbers.hiring} />

      {/* --- NIL Investment (Visible in Edit Mode) --- */}
      <NilInvestmentCard nil={numbers.nil} />

      {/* --- Edit Mode: Company Specific Analytics --- */}
      <section className="card analytics-card">
        <h2 className="section-title">Company Specific Analytics</h2>
        <aside className="aside">
          <ul className="aside-list">
            {(ensure(numbers).custom ?? []).map((metric, i) => (
              <li key={i} className="aside-row edit custom">
                <span className="aside-label">{metric.label}</span>
                <span className="aside-value">{formatCustomValue(metric)}</span>
                <button
                  onClick={() => handleRemoveCustom(i)}
                  className="btn-icon"
                  aria-label="Remove metric"
                >
                  <XCircle size={20} />
                </button>
              </li>
            ))}
          </ul>
          {availableOptions.length > 0 && (
            <div className="add-metric-control">
              <PlusCircle size={16} className="add-metric-icon" />
              <select
                value={selectedMetric}
                onChange={(e) => handleAddCustom(e.target.value)}
                className="add-metric-select"
              >
                <option value="">Add Metric...</option>
                {availableOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};
