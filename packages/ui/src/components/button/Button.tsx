import React from 'react';
import { cn } from '../../lib/utils';
import { ButtonProps } from './types';
import { getButtonClasses } from './styles';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(getButtonClasses(variant, size, className))}
      {...props}
    >
      {children}
    </button>
  );
};