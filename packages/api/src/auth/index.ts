export type {
  AuthError,
  AuthResponse,
  AuthState,
  AuthUser,
  ExternalTokenAuth,
  LoginCredentials,
  RegisterData,
} from './types';

export { createAuthClient } from './client';
export type { AuthClient } from './client';

import { apiClient } from '../client';
import { createAuthClient } from './client';

// Cliente de auth por defecto (para compatibilidad)
export const authClient = createAuthClient(apiClient);

// Funciones directas de auth - no necesitas crear clientes
const getAuthClient = () => authClient;

/**
 * Login con email y password
 */
export async function login(
  credentials: LoginCredentials
): Promise<ApiResponse<AuthResponse>> {
  return getAuthClient().login(credentials);
}

/**
 * Registro de nuevo usuario
 */
export async function register(
  data: RegisterData
): Promise<ApiResponse<AuthResponse>> {
  return getAuthClient().register(data);
}

/**
 * Autenticación con token externo (Google, Facebook, etc.)
 */
export async function authenticateWithExternalToken(
  authData: ExternalTokenAuth
): Promise<ApiResponse<AuthResponse>> {
  return getAuthClient().authenticateWithExternalToken(authData);
}

/**
 * Autenticación con token JWT personalizado
 */
export async function authenticateWithToken(
  token: string
): Promise<ApiResponse<AuthUser>> {
  return getAuthClient().authenticateWithToken(token);
}

/**
 * Validar token actual
 */
export async function validateToken(): Promise<ApiResponse<AuthUser>> {
  return getAuthClient().validateToken();
}

/**
 * Obtener perfil del usuario autenticado
 */
export async function getProfile(): Promise<ApiResponse<AuthUser>> {
  return getAuthClient().getProfile();
}

/**
 * Refresh token
 */
export async function refreshToken(): Promise<
  ApiResponse<{ token: string; expiresAt: string }>
> {
  return getAuthClient().refreshToken();
}

/**
 * Logout (invalidar token en el servidor)
 */
export async function logout(): Promise<ApiResponse<{ message: string }>> {
  return getAuthClient().logout();
}

/**
 * Solicitar reset de password
 */
export async function requestPasswordReset(
  email: string
): Promise<ApiResponse<{ message: string }>> {
  return getAuthClient().requestPasswordReset(email);
}

/**
 * Reset password con token
 */
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<ApiResponse<{ message: string }>> {
  return getAuthClient().resetPassword(token, newPassword);
}

/**
 * Cambiar password (usuario autenticado)
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse<{ message: string }>> {
  return getAuthClient().changePassword(currentPassword, newPassword);
}

/**
 * Autenticación con Google OAuth
 */
export async function loginWithGoogle(
  googleToken: string
): Promise<ApiResponse<AuthResponse>> {
  return getAuthClient().loginWithGoogle(googleToken);
}

/**
 * Autenticación con Facebook
 */
export async function loginWithFacebook(
  facebookToken: string
): Promise<ApiResponse<AuthResponse>> {
  return getAuthClient().loginWithFacebook(facebookToken);
}

/**
 * Autenticación con GitHub
 */
export async function loginWithGitHub(
  githubToken: string
): Promise<ApiResponse<AuthResponse>> {
  return getAuthClient().loginWithGitHub(githubToken);
}

// Re-exportar tipos necesarios para las funciones directas
import type { ApiResponse } from '../client';
import type {
  AuthResponse,
  AuthUser,
  ExternalTokenAuth,
  LoginCredentials,
  RegisterData,
} from './types';
