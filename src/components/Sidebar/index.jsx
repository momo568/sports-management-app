/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import {
  FiUser,
  FiBox,
  FiCreditCard,
  FiSun,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from '../../pages/AuthContext';

function Sidebar() {
  const [content, setContent] = useState("");
  const [menu, setMenu] = useState("menu");
  const { logout } = useAuth();
  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    setContent(menuName);
    if(menuName === "logout") {
      logout()
    }
  };

  return (
    <div className="content">
      <div className="sidenav active">
        <ul>
          <li className={content === "customerManagement" ? "active" : ""}>
            <NavLink to="/customerManagement" onClick={() => handleMenuClick("customerManagement")}>
              <FiUser /> Customer Management
            </NavLink>
          </li>
          <li className={content === "offresManagement" ? "active" : ""}>
            <NavLink to="/offerManagement" onClick={() => handleMenuClick("offresManagement")}>
              <FiBox /> Offers Management
            </NavLink>
          </li>
          <li className={content === "paymentsManagement" ? "active" : ""}>
            <NavLink to="/paymentsManagement" onClick={() => handleMenuClick("paymentsManagement")}>
              <FiCreditCard /> Payments Management
            </NavLink>
          </li>
          <li className={content === "holiday" ? "active" : ""}>
            <NavLink to="/holiday" onClick={() => handleMenuClick("holiday")}>
              <FiSun /> Holiday
            </NavLink>
          </li>
          <li className={content === "calendar" ? "active" : ""}>
            <NavLink to="/calendar" onClick={() => handleMenuClick("calendar")}>
              <FiCalendar /> Calendar
            </NavLink>
          </li>
          <li className={content === "logout" ? "active" : ""}>
            <NavLink to="/public/login" onClick={() => handleMenuClick("logout")}>
              <FiLogOut /> Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
