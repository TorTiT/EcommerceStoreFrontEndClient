import React, { useState } from "react";
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

  // Effect to navigate upon registration success
  React.useEffect(() => {
    if (registrationSuccess) {
      alert("Registration successful!");
      navigate("/");
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newUsername">Username</label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newEmail">Email</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Register
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Already have an account?{" "}
        <a href="#" onClick={() => navigate("/")}>
          Log in here
        </a>
      </p>
    </div>
  );
}

export default Register;
