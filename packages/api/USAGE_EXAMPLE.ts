import {
  getProfile,
  login,
  loginWithGoogle,
  logout,
  register,
} from '@hastee-xplat/api/auth';
import { del, get, post, put, setAuthToken } from '@hastee-xplat/api/client';

// ✨ HTTP Requests - automáticamente usa la URL del .env
async function ejemplosHTTP() {
  // GET - obtener usuarios
  const users = await get<User[]>('/users');
  if (users.data) {
    console.log('Usuarios:', users.data);
  }

  // POST - crear usuario
  const newUser = await post<User>('/users', {
    name: 'María García',
    email: 'maria@ejemplo.com',
  });

  // PUT - actualizar usuario
  const updatedUser = await put<User>('/users/123', {
    name: 'María García López',
  });

  // DELETE - eliminar usuario
  const deleteResult = await del('/users/123');

  console.log('Usuario eliminado:', deleteResult.status === 200);
}

// ✨ Autenticación - súper simple
async function ejemplosAuth() {
  // Login tradicional
  const loginResult = await login({
    email: 'usuario@ejemplo.com',
    password: 'password123',
  });

  if (loginResult.data) {
    const { user, token } = loginResult.data;
    console.log('Usuario logueado:', user);

    // El token ya se configuró automáticamente ✨
    // Todas las siguientes peticiones incluirán el token

    // Obtener perfil (petición autenticada)
    const profile = await getProfile();
    console.log('Perfil:', profile.data);
  }

  // Login con Google - una línea
  const googleToken = 'token-de-google-aqui';
  const googleAuth = await loginWithGoogle(googleToken);

  // Logout
  await logout();
}

// ✨ Registro de usuario
async function ejemploRegistro() {
  const registerResult = await register({
    name: 'Nuevo Usuario',
    email: 'nuevo@ejemplo.com',
    password: 'password123',
    confirmPassword: 'password123',
  });

  if (registerResult.data) {
    console.log('Usuario registrado:', registerResult.data.user);
  }
}

// ✨ Manejo de tokens manual (si es necesario)
async function ejemploTokens() {
  // Si ya tienes un token JWT de otra fuente
  const existingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

  // Configurarlo manualmente
  setAuthToken(existingToken);

  // Ahora todas las peticiones incluirán este token
  const protectedData = await get('/protected-endpoint');
}

// ========================================
// 3. COMPARACIÓN: ANTES vs AHORA
// ========================================

// ❌ ANTES (complejo)
/*
import { createApiClient, createAuthClient } from '@hastee-xplat/api';

const apiClient = createApiClient({
  baseURL: 'https://api.tuapp.com',
  timeout: 15000
});

const authClient = createAuthClient(apiClient);

const users = await apiClient.get('/users');
const loginResult = await authClient.login({ email, password });
*/

// ✅ AHORA (súper simple)
/*
import { get, login } from '@hastee-xplat/api';

// URL automática del .env, sin configuración
const users = await get('/users');
const loginResult = await login({ email, password });
*/

// ========================================
// 4. TIPOS TYPESCRIPT (automáticos)
// ========================================

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Las funciones son completamente tipadas
const typedUsers = await get<User[]>('/users'); // ✅ ApiResponse<User[]>
const typedLogin = await login({ email: '', password: '' }); // ✅ ApiResponse<AuthResponse>

export { ejemploRegistro, ejemplosAuth, ejemplosHTTP, ejemploTokens };
