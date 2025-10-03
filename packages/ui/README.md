# @hastee-xplat/ui

Custom UI component library for the Hastee cross-platform monorepo.

## Overview

This package contains reusable UI components that work across both web (Next.js) and mobile (React Native/Expo) applications.

## Components

### Button

A customizable button component with multiple variants and sizes.

```tsx
import { Button } from '@hastee-xplat/ui';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Custom styling
<Button className="custom-class">Custom Button</Button>
```

## Adding New Components

1. Create your component in `src/components/`
2. Export it from `src/components/index.ts`
3. Update this README with documentation

Example component structure:

```tsx
// src/components/my-component.tsx
import React from 'react';
import { cn } from '../lib/utils';

interface MyComponentProps {
  // Define your props here
  children: React.ReactNode;
  variant?: 'default' | 'custom';
}

export const MyComponent: React.FC<MyComponentProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  // Component implementation
  return (
    <div className={cn('base-styles', variant === 'custom' && 'custom-styles')}>
      {children}
    </div>
  );
};
```

## Utilities

### cn (Class Names)

A utility function for combining CSS classes:

```tsx
import { cn } from '@hastee-xplat/ui';

const className = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

## Global Styles

Import the global CSS file in your app:

```tsx
import '@hastee-xplat/ui/globals.css';
```

## Development

### Scripts

- `pnpm lint` - Run ESLint
- `pnpm check-types` - Run TypeScript type checking

### Project Structure

```
src/
├── components/           # UI components
│   ├── button.tsx       # Button component
│   └── index.ts         # Export all components
├── lib/                 # Utilities and helpers
│   ├── utils.ts         # Utility functions
│   └── globals.css      # Global styles
└── index.ts             # Main entry point
```

## Usage in Apps

### Web App (Next.js)

```tsx
import { Button } from '@hastee-xplat/ui';
import '@hastee-xplat/ui/globals.css'; // Import global styles

export default function Page() {
  return (
    <div>
      <Button variant="primary">Get Started</Button>
    </div>
  );
}
```

### Mobile App (Expo)

For React Native compatibility, you may need to create platform-specific versions of components or use styling solutions like NativeWind.

## License

MIT
