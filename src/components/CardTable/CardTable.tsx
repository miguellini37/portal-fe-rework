import React, { FC, ReactNode } from 'react';
import './CardTable.css';

export interface CardTableProps {
  /** Cards to display in the grid */
  children?: ReactNode;
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Minimum card width in pixels (default: 320px) */
  minCardWidth?: number;
  /** Maximum number of columns (default: unlimited) */
  maxColumns?: number;
  /** Gap between cards in rem (default: 1rem) */
  gap?: number;
}

export const CardTable: FC<CardTableProps> = ({
  children,
  className = '',
  minCardWidth = 320,
  maxColumns,
  gap = 1,
}) => {
  const style = {
    '--card-min-width': `${minCardWidth}px`,
    '--card-gap': `${gap}rem`,
    ...(maxColumns && { '--card-max-columns': maxColumns }),
  } as React.CSSProperties;

  const maxColumnsClass = maxColumns ? `card-table-max-cols-${maxColumns}` : '';

  return (
    <div className={`card-table ${maxColumnsClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
};
