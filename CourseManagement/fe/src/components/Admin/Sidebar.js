import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();

  //check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const uid = localStorage.getItem("uid");
      const expriresAt = localStorage.getItem("expiresAt");
      if (uid && expriresAt) {
        if (Date.now() < expriresAt) {
          //token is valid
        } else {
          //token is expired
          localStorage.removeItem("idToken");
          localStorage.removeItem("uid");
          localStorage.removeItem("name");
          localStorage.removeItem("expiresAt");
          localStorage.removeItem("role");
          alert("Phiên đăng nhập đã hết hạn!!");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 1000); // Cập nhật mỗi giây

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    // Xóa token và thời gian hết hạn khỏi localStorage
    localStorage.removeItem("idToken");
    localStorage.removeItem("uid");
    localStorage.removeItem("name");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <aside className="left-sidebar" style={{ width: "260px" }}>
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link to="/" className="text-nowrap logo-img">
            <div
              style={{
                width: "140px",
                margin: "50px 30px",
                textDecoration: "none",
                color: "#000",
                fontSize: "30px",
                fontWeight: "650",
                textAlign: "center",
              }}>
              <span style={{ color: "#127c71" }}>Lo</span>go
            </div>
          </Link>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"></div>
        </div>
        <nav className="sidebar-nav scroll-sidebar mt-5" data-simplebar="">
          <ul id="sidebarnav" className="mt-5">
            <li className="sidebar-item my-3">
              <Link className="sidebar-link" to="/admin" aria-expanded="false">
                <b className="" style={{ fontSize: "20px" }}>
                  COURSE
                </b>
              </Link>
            </li>
            <li className="sidebar-item my-3">
              <Link className="sidebar-link" to="/admin/lecture" aria-expanded="false">
                <b className="" style={{ fontSize: "20px" }}>
                  LECTURE
                </b>
              </Link>
            </li>
            <li className="sidebar-item my-3">
              <Link className="sidebar-link" to="/search" aria-expanded="false">
                <b className="" style={{ fontSize: "20px" }}>
                  SEARCH STUDENT
                </b>
              </Link>
            </li>
            <li className="sidebar-item my-3">
              <Link
                className="sidebar-link"
                aria-expanded="false"
                onClick={handleLogout}>
                <b className="" style={{ fontSize: "20px" }}>
                  LOGOUT
                </b>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
