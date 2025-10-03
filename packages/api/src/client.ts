// Tipos para las respuestas de la API
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

// Configuración del cliente API
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Opciones para las peticiones
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

// Tipo para el cliente API
export interface ApiClient {
  get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>>;
  post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>>;
  put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>>;
  patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>>;
  delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>>;
  setAuthToken(token: string): void;
  removeAuthToken(): void;
  updateDefaultHeaders(headers: Record<string, string>): void;
}

// Cliente HTTP genérico usando funciones
export function createApiClient(config: ApiClientConfig): ApiClient {
  const baseURL = config.baseURL.replace(/\/$/, ''); // Remove trailing slash
  const timeout = config.timeout || 10000; // 10 segundos por defecto
  let defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  async function request<T>(
    method: string,
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = `${baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options?.timeout || timeout
    );

    try {
      const headers = {
        ...defaultHeaders,
        ...options?.headers,
      };

      const config: RequestInit = {
        method,
        headers,
        signal: options?.signal || controller.signal,
      };

      if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      let responseData;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        return {
          error:
            responseData?.message || responseData || `HTTP ${response.status}`,
          status: response.status,
        };
      }

      return {
        data: responseData,
        status: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        return {
          error:
            error.name === 'AbortError' ? 'Request timeout' : error.message,
          status: 0,
        };
      }

      return {
        error: 'Unknown error',
        status: 0,
      };
    }
  }

  return {
    // Método GET
    async get<T>(
      endpoint: string,
      options?: RequestOptions
    ): Promise<ApiResponse<T>> {
      return request<T>('GET', endpoint, undefined, options);
    },

    // Método POST
    async post<T>(
      endpoint: string,
      data?: any,
      options?: RequestOptions
    ): Promise<ApiResponse<T>> {
      return request<T>('POST', endpoint, data, options);
    },

    // Método PUT
    async put<T>(
      endpoint: string,
      data?: any,
      options?: RequestOptions
    ): Promise<ApiResponse<T>> {
      return request<T>('PUT', endpoint, data, options);
    },

    // Método PATCH
    async patch<T>(
      endpoint: string,
      data?: any,
      options?: RequestOptions
    ): Promise<ApiResponse<T>> {
      return request<T>('PATCH', endpoint, data, options);
    },

    // Método DELETE
    async delete<T>(
      endpoint: string,
      options?: RequestOptions
    ): Promise<ApiResponse<T>> {
      return request<T>('DELETE', endpoint, undefined, options);
    },

    // Configurar token de autorización
    setAuthToken(token: string): void {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    },

    // Remover token de autorización
    removeAuthToken(): void {
      delete defaultHeaders['Authorization'];
    },

    // Actualizar headers por defecto
    updateDefaultHeaders(headers: Record<string, string>): void {
      defaultHeaders = { ...defaultHeaders, ...headers };
    },
  };
}

function getApiBaseURL(): string {
  if (typeof window !== 'undefined') {
    const baseUrl =
      (window as any)?.ENV?.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error(
        'NEXT_PUBLIC_API_URL is not defined in the environment variables'
      );
    }
    return baseUrl;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
  if (!baseUrl) {
    throw new Error('API_URL is not defined in the environment variables');
  }
  return baseUrl;
}

// Cliente global singleton que se crea automáticamente
let globalApiClient: ApiClient | null = null;

function getGlobalApiClient(): ApiClient {
  if (!globalApiClient) {
    globalApiClient = createApiClient({
      baseURL: getApiBaseURL(),
      timeout: 10000,
    });
  }
  return globalApiClient;
}

// Funciones HTTP directas - no necesitas crear clientes
export async function get<T>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return getGlobalApiClient().get<T>(endpoint, options);
}

export async function post<T>(
  endpoint: string,
  data?: any,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return getGlobalApiClient().post<T>(endpoint, data, options);
}

export async function put<T>(
  endpoint: string,
  data?: any,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return getGlobalApiClient().put<T>(endpoint, data, options);
}

export async function patch<T>(
  endpoint: string,
  data?: any,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return getGlobalApiClient().patch<T>(endpoint, data, options);
}

export async function del<T>(
  endpoint: string,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  return getGlobalApiClient().delete<T>(endpoint, options);
}

// Funciones para manejo de auth tokens
export function setAuthToken(token: string): void {
  getGlobalApiClient().setAuthToken(token);
}

export function removeAuthToken(): void {
  getGlobalApiClient().removeAuthToken();
}

export function updateDefaultHeaders(headers: Record<string, string>): void {
  getGlobalApiClient().updateDefaultHeaders(headers);
}

// Re-configurar el cliente si necesitas cambiar la URL base
export function reconfigureApiClient(config: Partial<ApiClientConfig>): void {
  const currentConfig = {
    baseURL: getApiBaseURL(),
    timeout: 10000,
    ...config,
  };
  globalApiClient = createApiClient(currentConfig);
}

// Instancia por defecto (para compatibilidad con código existente)
export const apiClient = getGlobalApiClient();
