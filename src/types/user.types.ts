/** Roles the API recognises. Mirrors `UserRole` on the server. */
export const UserRole = {
  USER: 'user',
  ADMIN: 'admin',
  MANAGER: 'manager',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

/** A user as the API returns it — never includes the password hash. */
export interface User {
  _id: string;
  email: string;
  userName: string;
  phoneNumber: string;
  profilepic: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/** Body of `PUT /user/edituser/:id`. */
export interface UpdateUserPayload {
  userName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  profilepic?: string;
}
