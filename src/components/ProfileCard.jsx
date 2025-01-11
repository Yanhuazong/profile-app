const ProfileCard = ({ profile }) => {
    return (
        <div className="profile-card">
            <div className="profile-card__image">
                <img src={profile.image_url} alt={profile.name} />
            </div>
            <h3>{profile.name}</h3>
            <p>{profile.title}</p>
        </div>
    );
};

export default ProfileCard;