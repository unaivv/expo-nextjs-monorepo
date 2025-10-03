# expo-nextjs-monorepo - A Monorepo Skeleton

A modern monorepo skeleton for building with web and mobile applications. Built with the latest technologies and best practices.

## 🚀 Features

- **🌐 HTTP Client**: Generic API client for all backend communications
- **🔐 Authentication**: Flexible auth module with external token support (Google, Facebook, etc.)
- **📱 Cross-Platform**: Web (Next.js 15) + Mobile (Expo 53)
- **🎨 Modern UI**: Custom UI component library with modular architecture
- **⚡ Fast Development**: Turborepo for blazing-fast builds and caching
- **🔧 Type Safety**: Full TypeScript support across all packages
- **📦 Package Manager**: pnpm with efficient workspace management
- **🎯 Production Ready**: Optimized for scale and performance

## 🛠️ Tech Stack

### Core

- **[Turborepo](https://turborepo.com/)** - High-performance build system
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### Web (Next.js)

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React 19](https://react.dev/)** - Latest React with concurrent features

### Mobile (Expo)

- **[Expo 53](https://expo.dev/)** - React Native development platform
- **[NativeWind v4](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[Expo Router](https://docs.expo.dev/router/)** - File-based routing for React Native
- **[Gluestack UI](https://ui.gluestack.io/)** - Universal UI component library

## 📁 Project Structure

```
expo-nextjs-monorepo/
├── apps/
│   ├── web/                 # Next.js 15 web application
│   │   ├── app/            # App Router pages
│   │   ├── api/            # API routes (including Better Auth backend)
│   │   ├── components/     # Web-specific components
│   │   └── package.json
│   └── mobile/             # Expo 53 React Native app
│       ├── app/            # File-based routing
│       │   └── api/        # API routes (including Better Auth backend for web)
│       ├── lib/            # Auth client config (Better Auth for mobile)
│       ├── components/     # Mobile-specific components
│       └── package.json
├── packages/
│   ├── ui/                 # Custom UI component library
│   │   ├── src/
│   │   │   ├── components/ # Modular components (Button, etc.)
│   │   │   └── lib/        # Utilities and styles
│   │   └── package.json
│   └── api/                # HTTP client and auth module
│       ├── src/
│       │   ├── client.ts   # Generic HTTP client (GET, POST, etc.)
│       │   └── auth/       # Auth module with external token support
│       └── package.json
├── tooling/
│   ├── eslint/             # Shared ESLint configurations
│   ├── tailwind/           # Shared Tailwind configurations
│   └── typescript/         # Shared TypeScript configurations
├── package.json            # Root package.json
├── turbo.json              # Turborepo configuration
└── pnpm-workspace.yaml     # pnpm workspace configuration
```

> **Note:** Better Auth authentication logic and configuration can be found in:
>
> - `apps/web/app/api/auth/` (Next.js API routes for auth backend)
> - `apps/mobile/app/api/auth/` (Expo API routes for web auth)
> - `apps/mobile/lib/auth/auth-client.ts` (Better Auth client config for mobile)

## 🚀 Quick Start

> **Note:** Authentication is powered by [Better Auth](https://www.better-auth.com/) and works across both web and mobile (see details below).

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9.0.0
- **Git**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd expo-nextjs-monorepo

# Install dependencies
pnpm install

# Set up environment variables (if needed)
cp .env.example .env
```

### Development

```bash
# Start all applications in development mode
pnpm dev

# Start specific applications
pnpm dev --filter=web      # Web app only
pnpm dev --filter=mobile   # Mobile app only
```

### Building

```bash
# Build all applications and packages
pnpm build

# Build specific applications
pnpm build --filter=web
pnpm build --filter=mobile
```

## 📱 Applications

### Web App (Next.js 15)

**Features:**

- App Router with file-based routing
- Tailwind CSS v4 with JIT compilation
- Custom UI components
- TypeScript support
- Hot reload with Turbopack

**Development:**

```bash
cd apps/web
pnpm dev
```

**Build:**

```bash
pnpm build --filter=web
```

### Mobile App (Expo 53)

**Features:**

- Expo Router with file-based routing
- NativeWind v4 for styling
- Gluestack UI components
- Cross-platform (iOS, Android, Web)
- Hot reload and live reload

**Development:**

```bash
cd apps/mobile
pnpm dev
```

**Platform-specific:**

```bash
pnpm dev --filter=mobile -- --ios
pnpm dev --filter=mobile -- --android
pnpm dev --filter=mobile -- --web
```

## 🌐 API Client & Authentication

This monorepo includes a custom API client (`@hastee-xplat/api`) for all backend communications and flexible authentication.

### API Client Features

- **Generic HTTP Methods**: GET, POST, PUT, PATCH, DELETE
- **Error Handling**: Comprehensive error responses with status codes
- **Token Management**: Automatic token handling for authenticated requests
- **Timeout Control**: Configurable request timeouts
- **Cross-Platform**: Works in both Next.js and React Native

### Authentication Module

- **Traditional Login**: Email/password authentication
- **External Token Auth**: Google, Facebook, GitHub, custom providers
- **JWT Support**: Custom token validation and management
- **Session Management**: Token refresh and logout functionality

### Usage Examples

```typescript
import { apiClient } from '@hastee-xplat/api/client';
import { authClient } from '@hastee-xplat/api/auth';

// Generic API calls
const users = await apiClient.get('/users');
const newUser = await apiClient.post('/users', userData);

// Authentication
const loginResponse = await authClient.login({ email, password });
const googleAuth = await authClient.loginWithGoogle(googleToken);
```

### References

- [API Package Documentation](./packages/api/README.md)
- [Usage Examples](./packages/api/EXAMPLES.md)

---

## 🎨 UI Components

### Shared UI Package

The `packages/ui` package contains reusable components that work across web and mobile:

**Usage:**

```tsx
import { Button } from '@hastee-xplat/ui/components/button';

// Use in both web and mobile apps
```

### Creating Custom Components

Create your own components in the `packages/ui/src/components/` directory and export them for use across your apps.

## 🔧 Available Scripts

| Script             | Description                                |
| ------------------ | ------------------------------------------ |
| `pnpm dev`         | Start all applications in development mode |
| `pnpm build`       | Build all applications and packages        |
| `pnpm lint`        | Run ESLint across all packages             |
| `pnpm format`      | Format code with Prettier                  |
| `pnpm check-types` | Run TypeScript type checking               |
| `pnpm clean`       | Clean all build outputs and node_modules   |

## 📦 Package Management

### Adding Dependencies

```bash
# Add to specific app/package
pnpm add <package> --filter=web
pnpm add <package> --filter=mobile
pnpm add <package> --filter=@acme/ui

# Add dev dependency
pnpm add -D <package> --filter=web
```

### Workspace Dependencies

Use `workspace:*` for internal package dependencies:

```json
{
  "dependencies": {
    "@acme/ui": "workspace:*"
  }
}
```

## 🎯 Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/your-feature

# Develop across platforms
pnpm dev

# Test on both web and mobile
```

### 2. Adding New Components

```bash
# Create custom components in the UI package
cd packages/ui/src/components

# Use in apps
import { Component } from '@hastee-xplat/ui/components/component'
```

### 3. Environment Variables

Each app can have its own environment variables:

- `apps/web/.env.local` - Web app environment variables
- `apps/mobile/.env` - Mobile app environment variables

## 🚀 Deployment

### Web App (Next.js)

**Manual:**

```bash
pnpm build --filter=web
pnpm start --filter=web
```

### Mobile App (Expo)

**EAS Build (Recommended):**

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Build for production
eas build --platform all
```

**Expo Publish:**

```bash
expo publish
```

## 🔍 Troubleshooting

### Common Issues

**Port conflicts:**

```bash
# Change ports in package.json scripts
"dev": "next dev --port 3001"
```

**Metro bundler issues:**

```bash
# Clear Metro cache
pnpm dev --filter=mobile -- --clear
```

**Turborepo cache issues:**

```bash
# Clear Turborepo cache
pnpm turbo clean
```

## 📚 Documentation

- [Web App Documentation](./apps/web/README.md)
- [Mobile App Documentation](./apps/mobile/README.md)
- [UI Package Documentation](./packages/ui/README.md)
- [Turborepo Documentation](https://turborepo.com/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turborepo.com/) for the amazing build system
- [Expo](https://expo.dev/) for the React Native platform
