/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { assets } from '../assets/assets';

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    navigate("/");
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
            value={login}
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


