import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { authApi, getErrorMessage } from '@/api';
import type { RegisterPayload } from '@/types';

const EMPTY_FORM: RegisterPayload = {
  userName: '',
  email: '',
  password: '',
  phoneNumber: '',
  profilepic: '',
};

export function RegisterPage() {
  const [form, setForm] = useState<RegisterPayload>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setForm((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const { message } = await authApi.register(form);

      toast.success(message || 'Registration successful!');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, 'Registration failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg p-4" style={{ width: 380, borderRadius: 20 }}>
        <h1 className="h3 text-center mb-3 fw-bold">Create Account</h1>
        <p className="text-center text-muted mb-4">Join us and start your journey ✨</p>

        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="userName">
            Full name
          </label>
          <input
            type="text"
            id="userName"
            className="form-control mb-3"
            placeholder="Ada Lovelace"
            autoComplete="name"
            value={form.userName}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control mb-3"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className="form-control mb-3"
            placeholder="9876543210"
            autoComplete="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control mb-3"
            placeholder="At least 6 characters"
            autoComplete="new-password"
            minLength={6}
            value={form.password}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="profilepic">
            Profile picture URL <span className="text-muted">(optional)</span>
          </label>
          <input
            type="url"
            id="profilepic"
            className="form-control mb-4"
            placeholder="https://…"
            value={form.profilepic}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{' '}
          <Link to="/login" className="fw-bold text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
