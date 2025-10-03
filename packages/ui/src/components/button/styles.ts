import { ButtonVariant, ButtonSize } from './types';

export const buttonStyles = {
  base: 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',

  variants: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  } as Record<ButtonVariant, string>,

  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  } as Record<ButtonSize, string>,
};

export const getButtonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string
): string => {
  return [
    buttonStyles.base,
    buttonStyles.variants[variant],
    buttonStyles.sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
};
