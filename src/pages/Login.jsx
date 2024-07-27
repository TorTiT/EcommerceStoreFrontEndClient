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
      navigate("/", { state: { user } });
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-slate-800 p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-slate-100">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-100"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-100"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50"
          >
            Log In
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
        <p className="text-center text-sm text-slate-100">
          New user?{" "}
          <a
            href="#"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
