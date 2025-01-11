import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate for redirecting
import { useContext } from 'react';
import AuthContext from '../contexts/auth-context';  // Import the context

const Profile = () => {
    const { id } = useParams(); // Use useParams hook
    const [profile, setProfile] = useState(null);
    const { user } = useContext(AuthContext);  // Access user from AuthContext to check if logged in
    const navigate = useNavigate();  // Use useNavigate to redirect after deletion

    useEffect(() => {
        fetch(`https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php?id=${id}`)
            .then(response => response.json())
            .then(data => setProfile(data))
            .catch(error => console.log(error));
    }, [id]);

    // Function to handle profile deletion
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this profile?")) {
            fetch(`https://web.ics.purdue.edu/~zong6/profile-app/delete-profile.php?id=${id}`, {
                method: 'DELETE',  // Using DELETE method to remove the profile
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Profile deleted successfully") {
                    alert("Profile deleted successfully.");
                    navigate('/');  // Redirect to homepage or another page after deletion
                } else {
                    alert("Failed to delete profile.");
                }
            })
            .catch(error => {
                alert("There was an error deleting the profile.");
                console.error(error);
            });
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="page">
            <h1>{profile.name}</h1>
            <p>Title: {profile.title}</p>
            <p>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p>{profile.bio}</p>
            <img src={profile.image_url} alt={profile.name} />

            {/* Show Delete Profile button only if user is logged in */}
            {user && (
                <button className="delete-button" onClick={handleDelete}>Delete Profile</button>  
            )}
        </div>
    );
};

export default Profile;
