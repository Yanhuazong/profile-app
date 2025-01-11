import { useState } from 'react';
import styles from './form.module.scss';

const ProfilePage = ({ profile, isLoggedIn, onDelete }) => {
  return (
    <div className={styles.profile}>
      <img src={profile.imageUrl} alt={profile.name} />
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <p>{profile.title}</p>
      <p>{profile.bio}</p>
      {isLoggedIn && <button onClick={() => onDelete(profile.id)} className={styles.deleteButton}>Delete</button>}
    </div>
  );
};

export default ProfilePage;
