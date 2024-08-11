/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { assets } from "../assets/assets";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [usrname, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (usrname === "ouma" && password === "123456") {
      const token = "oumatoken";
      login(token);
    }
  };

  return (
    <div className="login-container">
      <h2>Dashboard</h2>
      <p>Please log in with your credentials</p>
      <form onSubmit={handleSubmit}>
        <label>
          Login
          <input
            type="text"
            name="login"
            value={usrname}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Login;
