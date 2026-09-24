import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { BlogsByTopicPage } from '@/pages/BlogsByTopicPage';
import { CreateBlogPage } from '@/pages/CreateBlogPage';
import { DeleteUserPage } from '@/pages/DeleteUserPage';
import { EditBlogPage } from '@/pages/EditBlogPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { SingleBlogPage } from '@/pages/SingleBlogPage';
import { UsersPage } from '@/pages/UsersPage';
import { UserRole } from '@/types';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/getsingleblog/:id" element={<SingleBlogPage />} />
      <Route path="/getblogbytopic/:topic" element={<BlogsByTopicPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/createblog"
        element={
          <ProtectedRoute allowedRoles={[UserRole.USER]}>
            <CreateBlogPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editblog/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.USER]}>
            <EditBlogPage />
          </ProtectedRoute>
        }
      />

      {/* Admin-only routes are declared unconditionally and gated by the guard, so
          they start working the moment an admin signs in. */}
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deleteuser/:id"
        element={
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <DeleteUserPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
