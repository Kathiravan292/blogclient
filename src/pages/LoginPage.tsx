import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { authApi, getErrorMessage } from '@/api';
import { useAuth } from '@/hooks/useAuth';
import type { LoginCredentials } from '@/types';

interface RedirectState {
  from?: string;
}

export function LoginPage() {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setCredentials((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const { data } = await authApi.login(credentials);
      const { token, ...user } = data;

      login(user, token);
      toast.success('Login successful!');

      // Return to whatever page sent the visitor here, or home.
      const redirectTo = (location.state as RedirectState | null)?.from ?? '/';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, 'Login failed!'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="p-4 shadow-lg rounded-4 bg-white" style={{ width: 380 }}>
        <h1 className="h3 text-center mb-4 fw-bold" style={{ color: '#333' }}>
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control mb-3 py-2"
            placeholder="you@example.com"
            autoComplete="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control mb-4 py-2"
            placeholder="••••••••"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn w-100 py-2 rounded-3 text-white fw-semibold"
            style={{
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              border: 'none',
            }}
            disabled={submitting}
          >
            {submitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0" style={{ color: '#555', fontSize: 14 }}>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="fw-bold text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
