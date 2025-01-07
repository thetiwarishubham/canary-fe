import React, { useState } from "react";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <header className="main-header">
      <h1>Canary</h1>
      <button
        className="hamburger-btn"
        aria-label="Toggle navigation menu"
        onClick={toggleMenu}
      >
        ☰
      </button>
      <nav className={`navigation ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="/chatbot">Chatbot</a>
          </li>
          <li>
            <a href="/context">Context</a>
          </li>
          <li>
            <a href="/roles">Roles & Permissions</a>
          </li>
          <li>
            <a href="/user">User</a>
          </li>
          <li>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
