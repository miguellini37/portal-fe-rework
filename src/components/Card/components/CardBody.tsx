import React, { FC, ReactNode } from 'react';

export interface CardBodyProps {
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Body content */
  children?: ReactNode;
}

export const CardBody: FC<CardBodyProps> = ({ className = '', children }) => {
  return (
    <div
      className={className}
      style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {children}
    </div>
  );
};
