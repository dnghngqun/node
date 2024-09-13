import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false); // State kiểm tra đăng nhập thành công

  //check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const uid = localStorage.getItem("uid");
      const expriresAt = localStorage.getItem("expiresAt");
      if (uid && expriresAt) {
        if (Date.now() < expriresAt) {
          //token is valid
          setLoginSuccess(true);
        } else {
          //token is expired
          localStorage.removeItem("idToken");
          localStorage.removeItem("uid");
          localStorage.removeItem("name");
          localStorage.removeItem("expiresAt");
          localStorage.removeItem("role");
          setLoginSuccess(false);
        }
      } else {
        setLoginSuccess(false);
      }
    };
    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 1000); // Cập nhật mỗi giây

    return () => clearInterval(intervalId);
  }, []);

  const logout = () => {
    // Xóa token và thời gian hết hạn khỏi localStorage
    localStorage.removeItem("idToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("name");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("role");
    // Cập nhật trạng thái đăng nhập thành false
    setLoginSuccess(false);

    // Chuyển hướng người dùng tới trang đăng nhập hoặc trang chính
    navigate("/");
  };

  const handleLogout = () => {
    logout();
  };

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
                <Link to="/course/register" className="nav-link">
                  Registered
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">About us</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="right">
          {loginSuccess ? (
            <>
              Hello, {localStorage.getItem("name")}{" "}
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
