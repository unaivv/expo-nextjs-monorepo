import * as React from "react";

const inputStyles = {
  display: 'flex',
  height: '36px',
  width: '100%',
  minWidth: 0,
  borderRadius: '6px',
  border: '1px solid var(--input)',
  backgroundColor: 'transparent',
  padding: '4px 12px',
  fontSize: '16px',
  lineHeight: 1,
  color: 'var(--foreground)',
  transition: 'all 0.2s ease',
  outline: 'none',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

function Input({ style, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      style={{
        ...inputStyles,
        ...style,
      }}
      {...props}
    />
  );
}

export { Input };
