# Button Component

A modular button component with separated concerns for types, styles, and rendering.

## Structure

```
button/
├── types.ts       # Type definitions
├── styles.ts      # Styling logic and variants
├── Button.tsx     # Main component
└── index.ts       # Exports
```

## Types (types.ts)

Defines the component's TypeScript interfaces and type unions:

- `ButtonVariant`: 'primary' | 'secondary' | 'outline'
- `ButtonSize`: 'sm' | 'md' | 'lg'
- `ButtonProps`: Extends React button props with variant and size

## Styles (styles.ts)

Contains all styling logic:

- `buttonStyles`: Object with base styles, variants, and sizes
- `getButtonClasses()`: Function to combine styles based on props

## Component (Button.tsx)

The main React component that brings everything together:

- Uses types from `types.ts`
- Uses styling logic from `styles.ts`
- Renders the button element

## Usage

```tsx
import { Button } from '@hastee-xplat/ui';

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="lg">
  Large primary button
</Button>

// With custom className
<Button variant="outline" className="my-custom-class">
  Custom button
</Button>
```

## Type Usage

```tsx
import type { ButtonProps, ButtonVariant, ButtonSize } from "@hastee-xplat/ui";

// Use types in your own components
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Extending

To add new variants or sizes:

1. Update the type definitions in `types.ts`
2. Add the new styles in `styles.ts`
3. The component will automatically support the new options

Example adding a new variant:

```tsx
// types.ts
export type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

// styles.ts
variants: {
  // ... existing variants
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
}
```
