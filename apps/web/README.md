# Hastee Web App

A modern Next.js 15 web application with custom UI components and TypeScript.

## 🚀 Quick Start

### Development

```bash
# Start development server
pnpm dev

# Or from root directory
pnpm dev --filter=web
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom UI library
- **Package Manager**: pnpm
- **Build Tool**: Turbopack (development)

## 📁 Project Structure

```
apps/web/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Web-specific components
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Styling

### Tailwind CSS v4

This project uses Tailwind CSS v4 with the latest features:

```css
/* app/globals.css */
@import 'tailwindcss';

/* Custom styles */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}
```

### Custom UI Components

Custom components built for your specific needs:

```tsx
import { Button } from '@hastee-xplat/ui';

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Hastee</h1>
      <Button variant="primary">Get Started</Button>
    </div>
  );
}
```

## 🔧 Configuration

### Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
```

### Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... more color variables
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

## 📦 Dependencies

### Core Dependencies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS framework

### UI Dependencies

- **@hastee-xplat/ui**: Custom UI component library
- **Tailwind CSS**: Utility-first CSS framework

### Development Dependencies

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

## 🚀 Development Workflow

### Adding New Pages

1. Create a new file in the `app` directory
2. Export a default React component
3. The file path becomes the route

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
}
```

### Creating Custom Components

```bash
# Create components in the UI package
cd packages/ui/src/components
# Add your custom component files
```

### Using Shared UI Components

```tsx
import { Button } from '@hastee-xplat/ui';

// Use shared components from the monorepo
```

## 🔧 Available Scripts

| Script             | Description                             |
| ------------------ | --------------------------------------- |
| `pnpm dev`         | Start development server with Turbopack |
| `pnpm build`       | Build for production                    |
| `pnpm start`       | Start production server                 |
| `pnpm lint`        | Run ESLint                              |
| `pnpm check-types` | Run TypeScript type checking            |

## 🌐 Environment Variables

Create a `.env.local` file for local environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Acme
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## 🔍 Troubleshooting

### Common Issues

**Port 3000 already in use:**

```bash
# Change port in package.json
"dev": "next dev --port 3001"
```

**Turbopack issues:**

```bash
# Disable Turbopack temporarily
"dev": "next dev --port 3000"
```

**Build errors:**

```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Follow the monorepo development workflow
2. Ensure all tests pass
3. Follow the established code style
4. Update documentation as needed

---

Built with ❤️ using Next.js 15, Tailwind CSS v4, and custom UI components
