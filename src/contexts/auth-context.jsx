import React, { createContext, useState, useEffect, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // First, check if the user data is stored in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUser(storedUser);  // If found in localStorage, set user state
    } else {
      // If no user data in localStorage, check the backend session status
      fetch('https://web.ics.purdue.edu/~zong6/profile-app/session_status.php')
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);  // Set user state if session is active
            localStorage.setItem('user', JSON.stringify(data.user));  // Store user data in localStorage
          }
        })
        .catch((error) => console.error("Error checking session:", error));
    }
  }, []);  // Empty dependency array ensures this runs once on mount

  const login = (username) => {
    const userData = { username };
    setUser(userData);  // Set the user state on successful login
    localStorage.setItem('user', JSON.stringify(userData));  // Store the user data in localStorage
  };

  const logout = () => {
    // Call the backend to destroy the session
    fetch('https://web.ics.purdue.edu/~zong6/profile-app/logout.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Logged out successfully.') {
          setUser(null);  // Clear the user state in the context
          localStorage.removeItem('user');  // Remove the user data from localStorage
        }     
      })
      .catch((error) => console.error("Error logging out:", error));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
