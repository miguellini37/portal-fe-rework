import React, { FC, ReactNode } from 'react';

export interface CardTag {
  /** Tag label */
  label: string;
  /** Tag variant/color */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** Optional icon */
  icon?: ReactNode;
}

export interface CardTagsProps {
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Array of tags to display */
  tags?: CardTag[];
  /** Custom children (alternative to tags prop) */
  children?: ReactNode;
}

const getTagStyles = (variant: string): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.025em',
    border: '1px solid',
  };

  switch (variant) {
    case 'default':
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
        color: '#374151',
        borderColor: '#e5e7eb',
      };
    case 'primary':
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        color: '#1e40af',
        borderColor: '#93c5fd',
      };
    case 'success':
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
        color: '#065f46',
        borderColor: '#6ee7b7',
      };
    case 'warning':
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        color: '#92400e',
        borderColor: '#fcd34d',
      };
    case 'danger':
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
        color: '#991b1b',
        borderColor: '#fca5a5',
      };
    case 'info':
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
        color: '#7c3aed',
        borderColor: '#c4b5fd',
      };
    default:
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
        color: '#374151',
        borderColor: '#e5e7eb',
      };
  }
};

export const CardTags: FC<CardTagsProps> = ({ className = '', tags, children }) => {
  if (children) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    );
  }

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        alignItems: 'center',
      }}
    >
      {tags.map((tag, index) => (
        <span key={index} style={getTagStyles(tag.variant || 'default')}>
          {tag.icon && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {tag.icon}
            </span>
          )}
          {tag.label}
        </span>
      ))}
    </div>
  );
};
