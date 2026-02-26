import { useState } from 'react';
import './Profile.css';
import { Modal } from '../shared/modal/modal';
import { useAuth } from '../../context/AuthContext';
import ImageCircle from '../shared/imageCirlce/ImageCircle';
import ProfileOverview from './ProfileOverview';

const Profile: React.FC = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { user } = useAuth();

  return (
    <div>
      <div className="profile-container h-row" onClick={() => setEditProfile(true)}>
        {user ? (
          <>
            <ImageCircle imgPath={user?.avatarUrl} text={user.email.charAt(0).toUpperCase()} />
            <div>{user?.name}</div>
          </>
        ) : (
          <div>Heimr</div>
        )}
      </div>
      {editProfile && (
        <Modal open={editProfile} onClose={() => setEditProfile(false)} title="Profile settings">
          <ProfileOverview />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
