// Tipos para autenticación
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  expiresAt: string;
}

export interface ExternalTokenAuth {
  provider: 'google' | 'facebook' | 'github' | 'custom';
  token: string;
  email?: string;
}

export interface AuthError {
  message: string;
  code: string;
}

// Estado de autenticación
export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: AuthError | null;
}
