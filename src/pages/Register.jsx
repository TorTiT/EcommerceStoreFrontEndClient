import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../redux/actions/authActions";

function Register() {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, registrationSuccess } = useSelector(
    (state) => state.auth,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(newUsername, newEmail, newPassword));
  };

  useEffect(() => {
    if (registrationSuccess) {
      alert("Registration successful!");
      navigate("/");
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="newUsername"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="newEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50"
          >
            Register
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
