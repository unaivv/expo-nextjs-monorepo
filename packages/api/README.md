# @hastee-xplat/api

Cliente HTTP genérico y módulo de autenticación para aplicaciones cross-platform (Web + React Native) usando **funciones en lugar de clases**.

## Características

- ✅ Cliente HTTP genérico con métodos GET, POST, PUT, PATCH, DELETE
- ✅ **Implementación funcional** (sin clases)
- ✅ Manejo de errores y timeouts
- ✅ Configuración de headers personalizados
- ✅ Autenticación con tokens (JWT, OAuth, etc.)
- ✅ Módulo de auth completo con ejemplos
- ✅ Compatible con Next.js y React Native
- ✅ TypeScript con tipos completos
- ✅ Sin dependencias externas

## Instalación

Este package es parte del monorepo y se instala automáticamente con pnpm workspaces.

## ✨ Uso súper simple (recomendado)

¡No necesitas crear clientes! Solo agrega tu URL del backend al `.env` y usa las funciones directamente.

### 1. Configurar .env

```bash
# En tu .env o .env.local
NEXT_PUBLIC_API_URL=https://api.tuapp.com
```

### 2. Usar directamente

```typescript
import { get, post } from '@hastee-xplat/api/client';
import { login, loginWithGoogle } from '@hastee-xplat/api/auth';

// HTTP requests - automáticamente usa la URL del .env
const users = await get('/users');
const newUser = await post('/users', {
  name: 'Juan',
  email: 'juan@ejemplo.com',
});

// Autenticación - súper simple
const response = await login({
  email: 'usuario@ejemplo.com',
  password: 'password123',
});

const googleAuth = await loginWithGoogle(googleToken);
```

## Uso tradicional (opcional)

Si prefieres crear clientes explícitamente:

```typescript
import { createApiClient, createAuthClient } from '@hastee-xplat/api';

const apiClient = createApiClient({
  baseURL: 'https://tu-api.com',
  timeout: 15000,
});

const authClient = createAuthClient(apiClient);
```

## API Reference

### createApiClient(config)

Crea una instancia del cliente API.

**Parámetros:**

- `config: ApiClientConfig` - Configuración del cliente

**Retorna:** `ApiClient`

### ApiClient Methods

- `get<T>(endpoint, options?)` - Petición GET
- `post<T>(endpoint, data?, options?)` - Petición POST
- `put<T>(endpoint, data?, options?)` - Petición PUT
- `patch<T>(endpoint, data?, options?)` - Petición PATCH
- `delete<T>(endpoint, options?)` - Petición DELETE
- `setAuthToken(token)` - Configurar token de autorización
- `removeAuthToken()` - Remover token de autorización
- `updateDefaultHeaders(headers)` - Actualizar headers por defecto

### createAuthClient(apiClient)

Crea una instancia del cliente de autenticación.

**Parámetros:**

- `apiClient: ApiClient` - Instancia del cliente API

**Retorna:** `AuthClient`

### AuthClient Methods

- `login(credentials)` - Login con email/password
- `register(userData)` - Registro de usuario
- `authenticateWithExternalToken(authData)` - Auth con token externo
- `authenticateWithToken(token)` - Auth con JWT personalizado
- `getProfile()` - Obtener perfil de usuario
- `logout()` - Cerrar sesión
- `refreshToken()` - Renovar token
- `loginWithGoogle(token)` - Login con Google
- `loginWithFacebook(token)` - Login con Facebook
- `loginWithGitHub(token)` - Login con GitHub

## Ejemplos completos

Ver [EXAMPLES.md](./EXAMPLES.md) para ejemplos detallados de uso.

## Configuración

### Variables de entorno

```bash
# Web (Next.js)
NEXT_PUBLIC_API_URL=https://api.tuapp.com

# React Native
API_URL=https://api.tuapp.com
```

### Cliente personalizado

```typescript
import { createApiClient, createAuthClient } from '@hastee-xplat/api';

// Cliente API personalizado
const customClient = createApiClient({
  baseURL: 'https://mi-api.com',
  timeout: 30000,
  headers: {
    'X-API-Version': '2.0',
  },
});

// Cliente auth personalizado
const customAuthClient = createAuthClient(customClient);
```

## Arquitectura funcional

Este package utiliza **funciones en lugar de clases** para mayor flexibilidad:

### ✅ Ventajas de la implementación funcional:

- **Menor overhead**: Sin `this` binding ni herencia compleja
- **Tree shaking**: Mejor optimización del bundle
- **Composición**: Fácil de combinar y extender
- **Testing**: Más simple de testear individualmente
- **Inmutabilidad**: Estados manejados funcionalmente

### 📦 Estructura de closures:

```typescript
// El cliente API mantiene estado en closures
const apiClient = createApiClient(config);
// config.headers se mantienen en el closure

// El auth client recibe el api client como dependencia
const authClient = createAuthClient(apiClient);
```

## Tipos TypeScript

Todos los métodos incluyen tipos TypeScript completos:

```typescript
// Tipos principales exportados
import type {
  ApiResponse,
  ApiClient,
  AuthClient,
  AuthUser,
  LoginCredentials,
} from '@hastee-xplat/api';
```

## Compatibilidad

- ✅ Next.js 13+ (App Router)
- ✅ React Native (Expo 49+)
- ✅ TypeScript 5+
- ✅ Fetch API (built-in)
- ✅ Tree shaking compatible

## Migración desde clases

Si tenías código usando las clases anteriores:

```typescript
// Antes ❌
const authClient = new AuthClient(apiClient);

// Ahora ✅
const authClient = createAuthClient(apiClient);
```

La API de métodos permanece igual, solo cambia la creación de instancias.
