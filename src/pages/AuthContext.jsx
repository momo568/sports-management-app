/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    return null;
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du token:', error);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Erreur lors de la suppression du token:', error);
  }
};

export const hasAuthenticated = () => !!getToken();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  useEffect(() => {
    setIsAuthenticated(hasAuthenticated());
  }, []);

  const login = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
