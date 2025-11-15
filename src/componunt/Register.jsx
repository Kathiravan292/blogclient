import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../util/config";

const Register = () => {
  const [usedata, setusedata] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilepic: "",
  });

  const handlechange = (e) => {
    setusedata({ ...usedata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", usedata);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usedata),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "20px" }}>
        <h2 className="text-center mb-3 fw-bold">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Join us and start your journey ✨
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="userName"
            className="form-control mb-3"
            placeholder="Full Name"
            onChange={handlechange}
          />

          <input
            type="email"
            id="email"
            className="form-control mb-3"
            placeholder="Email Address"
            onChange={handlechange}
          />

          <input
            type="text"
            id="phoneNumber"
            className="form-control mb-3"
            placeholder="Phone Number"
            onChange={handlechange}
          />

          <input
            type="password"
            id="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={handlechange}
          />

          <input
            type="text"
            id="profilepic"
            className="form-control mb-4"
            placeholder="Profile Pic URL (Optional)"
            onChange={handlechange}
          />

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
