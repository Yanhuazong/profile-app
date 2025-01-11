import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProfile from "./pages/AddProfile";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AuthContext from "./contexts/auth-context";
import { useContext } from 'react';
import "./styles/app.scss"; // Import the CSS file

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  const { user } = useContext(AuthContext);
  return (
    <Router basename="/profile-app">
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <Navbar toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          {user && <Route path="/add-profile" element={<AddProfile />} />} {/* Conditionally render route */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
