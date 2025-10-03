"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

const labelStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  lineHeight: 1,
  fontWeight: '500',
  userSelect: 'none' as const,
  color: 'var(--foreground)',
};

function Label({
  style,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      style={{
        ...labelStyles,
        ...style,
      }}
      {...props}
    />
  );
}

export { Label };
