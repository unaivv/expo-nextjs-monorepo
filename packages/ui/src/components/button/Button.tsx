import React from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button>{children}</button>;
};
