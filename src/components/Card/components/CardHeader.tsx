import React, { FC, ReactNode } from 'react';

export interface CardHeaderProps {
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Header content */
  children?: ReactNode;
  /** Title text */
  title?: string;
  /** Subtitle or description text */
  subtitle?: string;
  /** Right-aligned content (e.g., status badge, icon) */
  rightContent?: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({
  className = '',
  children,
  title,
  subtitle,
  rightContent,
}) => {
  if (children) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '1rem',
        width: '100%',
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {title && (
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#111827',
              margin: '0 0 0.5rem 0',
              lineHeight: 1.3,
              letterSpacing: '-0.025em',
            }}
          >
            {title}
          </h3>
        )}
        {subtitle && (
          <div
            style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginTop: '0.25rem',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      {rightContent && (
        <div
          style={{
            flexShrink: 0,
          }}
        >
          {rightContent}
        </div>
      )}
    </div>
  );
};
