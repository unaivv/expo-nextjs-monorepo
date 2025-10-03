"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";



const checkboxStyles = {
  root: {
    width: '16px',
    height: '16px',
    flexShrink: 0,
    borderRadius: '4px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--background)',
    transition: 'all 0.2s',
    outline: 'none',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '&[data-state="checked"]': {
      backgroundColor: 'var(--primary)',
      borderColor: 'var(--primary)',
      color: 'var(--primary-foreground)',
    },
    '&:focus-visible': {
      borderColor: 'var(--ring)',
      boxShadow: '0 0 0 3px var(--ring)',
    },
  },
  indicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'currentColor',
  },
  icon: {
    width: '14px',
    height: '14px',
  },
};

function Checkbox({
  className,
  style,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      style={{ ...checkboxStyles.root, ...style }}
      className={className}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        style={checkboxStyles.indicator}
      >
        <CheckIcon style={checkboxStyles.icon} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
