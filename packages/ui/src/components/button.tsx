import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const getButtonStyles = (variant?: ButtonVariant, size?: ButtonSize) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    whiteSpace: 'nowrap' as const,
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    outline: 'none',
    cursor: 'pointer',
    border: 'none',
  };

  const variantStyles = {
    default: {
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    destructive: {
      backgroundColor: 'var(--destructive)',
      color: 'white',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    outline: {
      border: '1px solid var(--border)',
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    secondary: {
      backgroundColor: 'var(--secondary)',
      color: 'var(--secondary-foreground)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--foreground)',
    },
    link: {
      backgroundColor: 'transparent',
      color: 'var(--primary)',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  };

  const sizeStyles = {
    default: {
      height: '36px',
      padding: '8px 16px',
    },
    sm: {
      height: '32px',
      padding: '4px 12px',
      gap: '6px',
    },
    lg: {
      height: '40px',
      padding: '8px 24px',
    },
    icon: {
      width: '36px',
      height: '36px',
      padding: '0',
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant || "default"],
    ...sizeStyles[size || "default"],
  };
};

function Button({
  variant,
  size,
  asChild = false,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      style={{
        ...getButtonStyles(variant, size),
        ...style,
      }}
      {...props}
    />
  );
}

export { Button };
