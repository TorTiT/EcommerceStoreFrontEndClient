// src/components/Login.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../redux/actions/authActions";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(username, password));
  };

  useEffect(() => {
    if (user) {
      navigate("/", { state: { user } }); // Redirect to HomePage with user state
    }
  }, [user, navigate]);

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Log In
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        New user?{" "}
        <a href="#" onClick={() => navigate("/register")}>
          Register here
        </a>
      </p>
    </div>
  );
}

export default Login;
