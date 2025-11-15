import React, { useContext, useState } from 'react';
import { BASE_URL } from "../util/config.js";
import { Link, useNavigate } from 'react-router-dom';
import { AuthC } from "../Context/Authcontext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const { dispatch } = useContext(AuthC);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const resData = await response.json();

      // ❌ If login failed, stop here
      if (!response.ok) {
        toast.error(resData.message || "Login failed!", { position: "top-center" });
        return;
      }

      // Save token in localStorage
      localStorage.setItem("token", resData.data.token);

      // Update global AuthContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          _id: resData.data._id,
          name: resData.data.userName, // use correct field
          email: resData.data.email,
          profilepic: resData.data.profilepic || "",
          role: resData.data.role,
        },
        token: resData.data.token,
        role: resData.data.role,
      });

      toast.success("Login Successful!", {
        autoClose: 500,
        position: "top-center"
      });

      setTimeout(() => navigate("/"), 600);

    } catch (err) {
      console.log(err);
      toast.error("Server error! Try again later.", { position: "top-center" });
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
       style={{ 
        //  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
       }}>
    
    <div className="p-4 shadow-lg rounded-4 bg-white"
         style={{
           width: "380px",
           backdropFilter: "blur(10px)"
         }}>
      
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>
        Welcome Back 👋
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          className="form-control mb-3 py-2"
          id="email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-4 py-2"
          id="password"
          onChange={handleChange}
          required
        />

        <button
          className="btn w-100 py-2 rounded-3 text-white fw-semibold"
          style={{
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            border: "none"
          }}
        >
          Login
        </button>
      </form>

      <p className="text-center mt-3" style={{ color: "#555", fontSize: "14px" }}>
        Don’t have an account?{" "}
        <Link to="/register" className="fw-bold text-primary">
            Register
          </Link>
      </p>

    </div>
  </div>
);

};

export default Login;
