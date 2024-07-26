/* eslint-disable no-unused-vars */
// src/components/NavBar/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { assets } from "../../assets/assets";

function NavBar() {
  return (
    <><div className="navbar">
      <img src={assets.bagr} alt="Logo" className="logo" />
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
      </ul>
      <div className="navbar-right">

      </div>
      <div className="dot"></div>
    </div><button>Sign In</button></>
   
  );
}

export default NavBar;
