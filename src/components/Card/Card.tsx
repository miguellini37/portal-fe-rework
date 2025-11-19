import React, { FC, ReactNode } from 'react';

export interface CardProps {
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Header content - typically title and metadata */
  header?: ReactNode;
  /** Main body content */
  children?: ReactNode;
  /** Footer content - typically action buttons */
  actions?: ReactNode;
  /** Color variant for the top border gradient */
  variant?: 'blue' | 'purple' | 'orange' | 'gradient';
  /** Click handler for the entire card */
  onClick?: () => void;
  /** Make the card clickable with hover cursor */
  clickable?: boolean;
  /** Accessibility label */
  ariaLabel?: string;
}

const getVariantGradient = (variant: string): string => {
  switch (variant) {
    case 'blue':
      return 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
    case 'purple':
      return 'linear-gradient(90deg, #8b5cf6, #ec4899)';
    case 'orange':
      return 'linear-gradient(90deg, #ff6b35, #f59e0b)';
    case 'gradient':
      return 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
    default:
      return 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
  }
};

export const Card: FC<CardProps> = ({
  className = '',
  header,
  children,
  actions,
  variant = 'blue',
  onClick,
  clickable = false,
  ariaLabel,
}) => {
  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '0.75rem',
    padding: '1.25rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f3f4f6',
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transform: 'translateY(0)',
    cursor: clickable || onClick ? 'pointer' : 'default',
  };

  const borderStyle: React.CSSProperties = {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: getVariantGradient(variant),
  };

  return (
    <div
      className={className}
      style={cardStyle}
      onClick={onClick}
      tabIndex={clickable || onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
    >
      <div style={borderStyle} />
      {header && <div style={{ paddingTop: '0.25rem' }}>{header}</div>}
      {children && (
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {children}
        </div>
      )}
      {actions && (
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            marginTop: 'auto',
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
};
