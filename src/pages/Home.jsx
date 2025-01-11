import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard'; 

const Home = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetch('https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProfiles(data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="page">
            <h1>Profile Gallery</h1>
            <p>Browse the profiles below:</p>
            <div className="gallery">
                {profiles.map(profile => (
                    <div key={profile.id}>
                        <Link to={`/profile/${profile.id}`}>
                            <ProfileCard profile={profile} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
