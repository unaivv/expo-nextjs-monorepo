import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
  asChild?: boolean;
}

const getBadgeStyles = (variant?: BadgeVariant) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    border: '1px solid',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: '500',
    width: 'fit-content',
    whiteSpace: 'nowrap' as const,
    gap: '4px',
    transition: 'all 0.2s ease',
    overflow: 'hidden',
  };

  const variantStyles = {
    default: {
      borderColor: 'transparent',
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
    },
    secondary: {
      borderColor: 'transparent',
      backgroundColor: 'var(--secondary)',
      color: 'var(--secondary-foreground)',
    },
    destructive: {
      borderColor: 'transparent',
      backgroundColor: 'var(--destructive)',
      color: 'white',
    },
    outline: {
      borderColor: 'var(--border)',
      backgroundColor: 'transparent',
      color: 'var(--foreground)',
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant || "default"],
  };
};

function Badge({
  variant,
  asChild = false,
  style,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      style={{
        ...getBadgeStyles(variant),
        ...style,
      }}
      {...props}
    />
  );
}

export { Badge };
