import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
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
              LOGO
            </div>
          </Link>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"></div>
        </div>
        <nav className="sidebar-nav scroll-sidebar mt-5" data-simplebar="">
          <ul id="sidebarnav" className="mt-5">
            <li className="sidebar-item my-3">
              <Link className="sidebar-link" to="/" aria-expanded="false">
                <b className="" style={{ fontSize: "20px" }}>
                  CREATE STUDENT
                </b>
              </Link>
            </li>
            <li className="sidebar-item my-3">
              <Link className="sidebar-link" to="/getall" aria-expanded="false">
                <b className="" style={{ fontSize: "20px" }}>
                  MANAGE STUDENT
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
