import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const register = (username, password) => {
   
    const users = JSON.parse(localStorage.getItem('users')) || [];

    
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      alert('Username already exists');
      return false;
    }

   
    users.push({ username, password });

   
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const login = (username, password) => {
   
    const users = JSON.parse(localStorage.getItem('users')) || [];

   
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
