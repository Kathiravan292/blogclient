import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthC } from "../Context/Authcontext";

const Navbar = () => {
  const { dispatch, user } = useContext(AuthC);
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT_SUCCESS",
      payload: { _id: null, name: null, email: null ,role:null},
      token: null,
      role: null,
    });
    navigate("/"); // redirect after logout
  };

  const handleSearch = () => {
    const q = topic.trim();
    if (!q) return;
    navigate(`/getblogbytopic/${encodeURIComponent(q)}`);
    setTopic("");
    // collapse mobile menu if open (Bootstrap)
    const collapse = document.getElementById("navbarNav");
    if (collapse?.classList.contains("show")) {
      const btn = document.querySelector('[data-bs-target="#navbarNav"]');
      btn && btn.click();
    }
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm">
      <div className="container-fluid">
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.MgpWdoA_fSp_ZI3khbWVgAHaHX?pid=Api&P=0&h=180"
          alt="Blog Icon"
          style={{ width: 60, height: 60, objectFit: "contain" }}
        />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>

            {user?.role === "user" && (
              <li className="nav-item">
                <Link to="/createblog" className="nav-link active">
                  CreateBlog
                </Link>
              </li>
            )}

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link to="/users" className="nav-link active">
                  Users
                </Link>
              </li>
            )}

            <li className="nav-item d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search topic…"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={onSearchKeyDown}
              />
              <button type="button" className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </li>
          </ul>

          <div className="d-flex">
            {user ? (
              <div className="d-flex align-items-center">
                <img
                  src={
                    user?.profilepic ??
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="User"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                  style={{ objectFit: "cover" }}
                />
                <span className="me-2">{user?.name ?? "User"}</span>
                <button type="button" onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/register" className="btn btn-outline-success" role="button">
                  Register
                </Link>
                <Link to="/login" className="btn btn-outline-primary" role="button">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
