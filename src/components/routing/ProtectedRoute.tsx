import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  /** Roles allowed through. Omit to require only that the visitor is signed in. */
  allowedRoles?: UserRole[];
  children: ReactNode;
}

/**
 * Gates a route on the live auth context. The previous implementation read the role
 * from a module-level constant captured at page load, so routes did not unlock until
 * the user reloaded the page after signing in.
 */
export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // `state.from` lets the login page send the user back where they were headed.
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold">Not allowed</h2>
        <p className="text-muted mb-0">You don&apos;t have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
