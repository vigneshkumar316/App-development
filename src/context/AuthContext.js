// context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace with real logic
  const [isManager, setIsManager] = useState(true);   // Replace with real logic

  return (
    <AuthContext.Provider value={{ isLoggedIn, isManager }}>
      {children}
    </AuthContext.Provider>
  );
};
