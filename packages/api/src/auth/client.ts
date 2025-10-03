import { ApiClient, ApiResponse } from '../client';
import type {
  AuthResponse,
  AuthUser,
  ExternalTokenAuth,
  LoginCredentials,
  RegisterData,
} from './types';

// Tipo para el cliente de autenticación
export interface AuthClient {
  login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>>;
  register(data: RegisterData): Promise<ApiResponse<AuthResponse>>;
  authenticateWithExternalToken(
    authData: ExternalTokenAuth
  ): Promise<ApiResponse<AuthResponse>>;
  authenticateWithToken(token: string): Promise<ApiResponse<AuthUser>>;
  validateToken(): Promise<ApiResponse<AuthUser>>;
  getProfile(): Promise<ApiResponse<AuthUser>>;
  refreshToken(): Promise<ApiResponse<{ token: string; expiresAt: string }>>;
  logout(): Promise<ApiResponse<{ message: string }>>;
  requestPasswordReset(
    email: string
  ): Promise<ApiResponse<{ message: string }>>;
  resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse<{ message: string }>>;
  changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<{ message: string }>>;
  loginWithGoogle(googleToken: string): Promise<ApiResponse<AuthResponse>>;
  loginWithFacebook(facebookToken: string): Promise<ApiResponse<AuthResponse>>;
  loginWithGitHub(githubToken: string): Promise<ApiResponse<AuthResponse>>;
}

/**
 * Cliente de autenticación que maneja todas las operaciones auth
 */
export function createAuthClient(apiClient: ApiClient): AuthClient {
  /**
   * Autenticación con token externo (Google, Facebook, etc.)
   * Ejemplo de uso con token de terceros
   */
  async function authenticateWithExternalToken(
    authData: ExternalTokenAuth
  ): Promise<ApiResponse<AuthResponse>> {
    // Ejemplo: enviar token de Google/Facebook/GitHub al backend para validación
    return apiClient.post<AuthResponse>('/auth/external', {
      provider: authData.provider,
      token: authData.token,
      email: authData.email, // opcional, algunos providers lo incluyen en el token
    });
  }

  return {
    /**
     * Login con email y password
     */
    async login(
      credentials: LoginCredentials
    ): Promise<ApiResponse<AuthResponse>> {
      return apiClient.post<AuthResponse>('/auth/login', credentials);
    },

    /**
     * Registro de nuevo usuario
     */
    async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
      return apiClient.post<AuthResponse>('/auth/register', data);
    },

    /**
     * Autenticación con token externo (Google, Facebook, etc.)
     */
    authenticateWithExternalToken,

    /**
     * Autenticación con token JWT personalizado
     * Útil cuando ya tienes un token de tu propio sistema de auth
     */
    async authenticateWithToken(token: string): Promise<ApiResponse<AuthUser>> {
      // Configurar el token en el cliente
      apiClient.setAuthToken(token);

      // Verificar el token con el backend
      return apiClient.get<AuthUser>('/auth/me');
    },

    /**
     * Validar token actual
     */
    async validateToken(): Promise<ApiResponse<AuthUser>> {
      return apiClient.get<AuthUser>('/auth/validate');
    },

    /**
     * Obtener perfil del usuario autenticado
     */
    async getProfile(): Promise<ApiResponse<AuthUser>> {
      return apiClient.get<AuthUser>('/auth/profile');
    },

    /**
     * Refresh token
     */
    async refreshToken(): Promise<
      ApiResponse<{ token: string; expiresAt: string }>
    > {
      return apiClient.post('/auth/refresh');
    },

    /**
     * Logout (invalidar token en el servidor)
     */
    async logout(): Promise<ApiResponse<{ message: string }>> {
      const response = await apiClient.post<{ message: string }>(
        '/auth/logout'
      );

      // Remover token del cliente después del logout
      apiClient.removeAuthToken();

      return response;
    },

    /**
     * Solicitar reset de password
     */
    async requestPasswordReset(
      email: string
    ): Promise<ApiResponse<{ message: string }>> {
      return apiClient.post('/auth/forgot-password', { email });
    },

    /**
     * Reset password con token
     */
    async resetPassword(
      token: string,
      newPassword: string
    ): Promise<ApiResponse<{ message: string }>> {
      return apiClient.post('/auth/reset-password', {
        token,
        password: newPassword,
      });
    },

    /**
     * Cambiar password (usuario autenticado)
     */
    async changePassword(
      currentPassword: string,
      newPassword: string
    ): Promise<ApiResponse<{ message: string }>> {
      return apiClient.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
    },

    /**
     * Ejemplo: Autenticación con Google OAuth
     * Este método muestra cómo integrar con Google Sign-In
     */
    async loginWithGoogle(
      googleToken: string
    ): Promise<ApiResponse<AuthResponse>> {
      return authenticateWithExternalToken({
        provider: 'google',
        token: googleToken,
      });
    },

    /**
     * Ejemplo: Autenticación con Facebook
     */
    async loginWithFacebook(
      facebookToken: string
    ): Promise<ApiResponse<AuthResponse>> {
      return authenticateWithExternalToken({
        provider: 'facebook',
        token: facebookToken,
      });
    },

    /**
     * Ejemplo: Autenticación con GitHub
     */
    async loginWithGitHub(
      githubToken: string
    ): Promise<ApiResponse<AuthResponse>> {
      return authenticateWithExternalToken({
        provider: 'github',
        token: githubToken,
      });
    },
  };
}
