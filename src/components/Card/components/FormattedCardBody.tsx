import React, { FC, ReactNode } from 'react';

export interface FormattedCardRow {
  /** Label text displayed on the left */
  label: string;
  /** Value content displayed on the right */
  value: ReactNode;
  /** Whether to hide the bottom border for this row */
  noBorder?: boolean;
}

export interface FormattedCardBodyProps {
  /** Array of rows to display */
  rows: FormattedCardRow[];
  /** Optional CSS class name */
  className?: string;
}

export const FormattedCardBody: FC<FormattedCardBodyProps> = ({ rows, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0',
            borderBottom: row.noBorder || index === rows.length - 1 ? 'none' : '1px solid #f3f4f6',
            marginBottom: 0,
          }}
        >
          <span
            style={{
              fontWeight: 600,
              color: '#374151',
              fontSize: '0.875rem',
            }}
          >
            {row.label}
          </span>
          <span
            style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              textAlign: 'right',
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
};
