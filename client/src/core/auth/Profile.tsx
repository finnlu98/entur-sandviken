import { useState } from 'react';
import './profile.css';
import { Modal } from '../shared/modal/modal';
import { useAuth } from '../../context/auth-context';
import ImageCircle from '../shared/image-cirlce/image-circle';
import ProfileOverview from './profile-overview';

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
