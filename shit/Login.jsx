import React, { useState } from "react";

function Login({ toggleForm, toggleForgotPassword }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login action

    if (username === "user" && password === "password") {
      alert("Login successful!");
    } else {
      alert("Invalid username or password.");
    }
  };

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
          <label htmlFor="password">Passwwwwwwwwwword</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        New user?{" "}
        <a href="#" onClick={toggleForm}>
          Register here
        </a>
      </p>
      <p>
        Forgot your password?{" "}
        <a href="#" onClick={toggleForgotPassword}>
          Click here
        </a>
      </p>
    </div>
  );
}

export default Login;
