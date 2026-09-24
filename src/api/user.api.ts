import { http } from './http';
import type {
  ApiResponse,
  GetAllUsersResponse,
  GetProfileResponse,
  UpdateUserPayload,
  UpdateUserResponse,
  User,
} from '@/types';

export const userApi = {
  async getAll(): Promise<User[]> {
    const { data } = await http.get<GetAllUsersResponse>('/user/getallusers');

    return data.users;
  },

  async getProfile(): Promise<User> {
    const { data } = await http.get<GetProfileResponse>('/user/me');

    return data.profileDetails;
  },

  async update(id: string, payload: UpdateUserPayload): Promise<User> {
    const { data } = await http.put<UpdateUserResponse>(`/user/edituser/${id}`, payload);

    return data.userDetails;
  },

  async remove(id: string): Promise<ApiResponse> {
    const { data } = await http.delete<ApiResponse>(`/user/deleteuser/${id}`);

    return data;
  },
};
