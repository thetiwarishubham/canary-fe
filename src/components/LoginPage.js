import React, { useState } from "react";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authenticateUser = async () => {
    try {
      const response = await fetch("https://canary-be.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, pass: password }),
      });

      const body = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", body.data.token);
        window.location.href = "/chatbot";
      } else {
        setErrorMessage(body || "Login failed!");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div id="login-container">
      <div id="header">Login</div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button id="login-btn" onClick={authenticateUser}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
