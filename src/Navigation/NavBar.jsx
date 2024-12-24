import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo">Paste<span className="logo-highlight">App</span></div>
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link non-active-link"
              }
            >
              Create Paste
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link non-active-link"
              }
            >
              My Pastes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
