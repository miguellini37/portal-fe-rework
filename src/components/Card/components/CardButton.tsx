import React, { FC, ButtonHTMLAttributes } from 'react';
import './CardButton.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const CardButton: FC<Props> = ({
  variant = 'primary',
  children,
  className,
  style,
  ...props
}) => {
  const variantClass = `card-button-${variant}`;
  const classes = `card-button ${variantClass} ${className || ''}`.trim();

  return (
    <button type="button" className={classes} style={style} {...props}>
      {children}
    </button>
  );
};
