import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';

const BRAND_LOGO =
  'https://tse4.mm.bing.net/th/id/OIP.MgpWdoA_fSp_ZI3khbWVgAHaHX?pid=Api&P=0&h=180';
const FALLBACK_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  /** A real form submit, so Enter and the button take the same path. */
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = topic.trim();

    if (!query) {
      return;
    }

    navigate(`/getblogbytopic/${encodeURIComponent(query)}`);
    setTopic('');
    collapseMobileMenu();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={BRAND_LOGO}
            alt="Blog home"
            style={{ width: 60, height: 60, objectFit: 'contain' }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto align-items-lg-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            {user?.role === UserRole.USER && (
              <li className="nav-item">
                <Link to="/createblog" className="nav-link">
                  Create Blog
                </Link>
              </li>
            )}

            {user?.role === UserRole.ADMIN && (
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
            )}

            <li className="nav-item ms-lg-2 my-2 my-lg-0">
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <label className="visually-hidden" htmlFor="topic-search">
                  Search blogs by topic
                </label>
                <input
                  id="topic-search"
                  type="search"
                  className="form-control me-2"
                  placeholder="Search topic…"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                />
                <button type="submit" className="btn btn-primary text-nowrap">
                  Search
                </button>
              </form>
            </li>
          </ul>

          {user ? (
            <div className="d-flex align-items-center gap-2">
              <img
                src={user.profilepic || FALLBACK_AVATAR}
                alt=""
                className="rounded-circle"
                width={40}
                height={40}
                style={{ objectFit: 'cover' }}
              />
              <span>{user.userName}</span>
              <button type="button" onClick={handleLogout} className="btn btn-outline-danger">
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/register" className="btn btn-outline-success">
                Register
              </Link>
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

/** Closes the Bootstrap collapse menu after a search on small screens. */
function collapseMobileMenu(): void {
  const collapse = document.getElementById('navbarNav');

  if (collapse?.classList.contains('show')) {
    document.querySelector<HTMLButtonElement>('[data-bs-target="#navbarNav"]')?.click();
  }
}
