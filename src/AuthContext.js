import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load saved user from localStorage on component mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const register = (username, password) => {
    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      alert('Username already exists');
      return false;
    }

    // Add new user to the list
    users.push({ username, password });

    // Save updated users list to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const login = (username, password) => {
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists and password matches
    const userExists = users.some(user => user.username === username && user.password === password);
    if (userExists) {
      setUser(username);
      localStorage.setItem('user', username);
    } else {
      alert('Invalid username or password');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
