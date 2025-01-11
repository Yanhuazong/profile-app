import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.scss';
import { useContext } from 'react';
import AuthContext from '../contexts/auth-context'; 

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
     // Prepare registration data
     const registrationData = { username, password, email };

     // Send registration request to backend (register.php)
     fetch('https://web.ics.purdue.edu/~zong6/profile-app/register.php', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',  // Specify that we're sending JSON data
       },
       body: JSON.stringify(registrationData),  // Send the registration data as JSON
     })
       .then((response) => {
         if (!response.ok) {
           return response.text().then(text => { throw new Error(`Network response was not ok: ${response.status} - ${text}`); });
         }
         return response.json();
       })  // Parse response as JSON
       .then((data) => {
         console.log(data); // Log the response for debugging
         if (data.username) {
           // Registration successful, automatically log the user in
           login(data.username);  // Update the context state with the logged-in user
           navigate(-1); // Redirect to the previous page
         } else {
           // Registration failed, display the error message
           setError(data.error || 'An unknown error occurred');
         }
       })
       .catch((err) => {
         setError(`There was an error with the registration request: ${err.message}`);
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default RegisterForm;
