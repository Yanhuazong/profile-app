import { useState } from 'react';
import styles from './form.module.scss'; // Import css modules stylesheet as styles

const Form = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Add success state
  const fetchURL = 'https://web.ics.purdue.edu/~zong6/profile-app/upload.php';

  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setImage(file);
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!image || !name || !email) {
          alert('Please fill all required fields.');
          return;
      }

      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('title', title);
      formData.append('bio', bio);
      formData.append('username', 'zong6');  // Replace with dynamic value if needed

      try {
          setIsUploading(true);
          setError(null);

          const response = await fetch(fetchURL, {
              method: 'POST',
              body: formData,
          });

          const result = await response.json();

          if (result.success) {
              setImageUrl(result.url);
              setSuccess(true); // Set success to true
              setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
          } else {
              setError(result.message);
          }
      } catch (err) {
          setError('Error uploading image: ' + err.message);
      } finally {
          setIsUploading(false);
      }
  };

  return (
      <div>
          <h2 className='form-page-h2'>Upload Profile Image and Information</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
              <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
              />
              <button type="submit" disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Submit'}
              </button>
          </form>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>Profile saved successfully!</p>} {/* Success message */}

      </div>
  );
};

export default Form;
