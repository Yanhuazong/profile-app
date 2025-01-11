import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.scss';
import { useContext } from 'react';
import AuthContext from '../contexts/auth-context'; 

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const loginData = {
      username,
      password,
    };
    // Send the login request to the backend using fetch
    fetch('https://web.ics.purdue.edu/~zong6/profile-app/login.php', {
      method: 'POST',  // Use POST method for login request
      headers: {
        'Content-Type': 'application/json',  // Set content type to JSON
      },
      body: JSON.stringify(loginData),  // Send login data as JSON
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(`Network response was not ok: ${response.status} - ${text}`); });
        }
        return response.json();
      })  // Parse response as JSON
      .then((data) => {
        if (data.username) {
          // If login is successful, update the user context
          login(data.username);  // This triggers a re-render in any component using the context
          navigate(-1); // Redirect to the previous page
        } else {
          // If login failed, display an error message
          setError(data.error || 'An unknown error occurred');
        }
      })
      .catch((err) => {
        setError(`There was an error with the login request: ${err.message}`);
        console.error(err);
      });
  };


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default LoginForm;
