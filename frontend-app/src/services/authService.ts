import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types/auth';
import { api } from './api';


export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

/**
 * Register - Registra novo usuário
 */
export const register = async (credentials: RegisterCredentials): Promise<{ user: User }> => {
  const response = await api.post<{ message: string; user: User }>('/auth/register', credentials);
  return { user: response.data.user };
};

/**
 * Get Current User - Busca dados do usuário autenticado
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me');
  return response.data;
};


export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const verifyToken = async (): Promise<boolean> => {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
};
