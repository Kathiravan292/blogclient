import { http } from './http';
import type {
  LoginCredentials,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/types';

export const authApi = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await http.post<RegisterResponse>('/auth/register', payload);

    return data;
  },

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await http.post<LoginResponse>('/auth/login', credentials);

    return data;
  },
};
