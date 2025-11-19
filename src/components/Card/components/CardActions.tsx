import React, { FC, ReactNode } from 'react';

export interface CardActionsProps {
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Action buttons or content */
  children?: ReactNode;
}

export const CardActions: FC<CardActionsProps> = ({ className = '', children }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    marginTop: 'auto',
    width: '100%',
  };

  const childWrapperStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: 'flex',
  };

  return (
    <div className={className} style={containerStyle}>
      {React.Children.map(children, (child) =>
        child ? <div style={childWrapperStyle}>{child}</div> : null
      )}
    </div>
  );
};
