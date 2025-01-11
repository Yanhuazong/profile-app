import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/auth-context";

const Navbar = ({ toggleMode }) => {
  const { user, logout } = useContext(AuthContext); // Use useContext to access AuthContext

  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {
            user && <Link to="/add-profile">Add Profile</Link>
        }
      </div>
      <div>
        {user ? (
          <div>
            <span>{user.username}</span>{" "}
            {/* Display the logged-in user's name */}
            <button onClick={logout}>Logout</button> {/* Logout button */}
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link> {/* Login link */}
            <Link to="/register">Register</Link> {/* Register link */}
          </div>
        )}

        <button onClick={toggleMode}>Toggle Mode</button>
      </div>
    </nav>
  );
};

export default Navbar;
