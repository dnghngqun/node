import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div id="navbar">
      <div className="navbar-container">
        <div className="left">
          <span>
            <span style={{ color: "#127c71" }}>Lo</span>go
          </span>
        </div>
        <div className="center">
          <nav>
            <ul className="nav-ul">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/course" className="nav-link">
                  Course
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">About us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="right">
          <button
            className="btn btn-login"
            onClick={() => {
              navigate("/login");
            }}>
            Sign in
          </button>
          <button
            className="btn btn-regis"
            onClick={() => {
              navigate("/register");
            }}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
