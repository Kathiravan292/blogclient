import type { Blog } from './blog.types';
import type { User, UserRole } from './user.types';

/** Envelope every endpoint wraps its payload in. */
export interface ApiResponse {
  message: string;
  success: boolean;
}

/** `POST /auth/register` reports its outcome under `status`, not `success`. */
export interface ApiStatusResponse {
  message: string;
  status: boolean;
}

export interface ApiDataResponse<T> extends ApiResponse {
  data: T;
}

/** Shape of an error body produced by the server's exception filter. */
export interface ApiErrorResponse {
  message: string;
  success: false;
  status: false;
}

/** `POST /auth/login` — the user record plus a freshly signed access token. */
export type LoginResponse = ApiDataResponse<User & { token: string }>;

export type RegisterResponse = ApiStatusResponse;

export interface GetAllBlogsResponse extends ApiResponse {
  blogs: Blog[];
}

export type GetSingleBlogResponse = ApiDataResponse<Blog>;
export type GetBlogsByTopicResponse = ApiDataResponse<Blog[]>;
export type UpdateBlogResponse = ApiDataResponse<Blog>;

export interface GetAllUsersResponse extends ApiResponse {
  users: User[];
}

export interface GetProfileResponse extends ApiResponse {
  profileDetails: User;
}

export interface UpdateUserResponse extends ApiResponse {
  userDetails: User;
}

/** Body of `POST /auth/login`. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Body of `POST /auth/register`. */
export interface RegisterPayload {
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;
  profilepic?: string;
  role?: UserRole;
}
