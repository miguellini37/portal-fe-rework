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

  // Check if children contains a NavLink or Link component
  const hasLinkChild = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      typeof child.type !== 'string' &&
      (child.type as { name?: string }).name?.includes('Link')
  );

  // If there's a link child, render a div wrapper instead of button
  if (hasLinkChild) {
    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }

  return (
    <button type="button" className={classes} style={style} {...props}>
      {children}
    </button>
  );
};
