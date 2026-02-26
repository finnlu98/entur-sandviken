import { useRef, useState } from 'react';
import './profile-overview.css';
import { IoMdSend } from 'react-icons/io';
import { useAuth } from '../../context/auth-context';
import { CiEdit } from 'react-icons/ci';
import HomeProfile from './home-profile';
import UserProfile from './user-profile';
import HomeUsers from './home-users';
import { FaSignOutAlt } from 'react-icons/fa';
import LoadingButton from '../../feedback/loading/components/loading/loading-button';
import Login from './login';

const ProfileOverview: React.FC = () => {
  const [email, setEmail] = useState('');
  const { user, login, logout } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const userProfileSaveRef = useRef<(() => Promise<void>) | null>(null);
  const homeProfileSaveRef = useRef<(() => Promise<void>) | null>(null);
  const homeUsersSaveRef = useRef<(() => Promise<void>) | null>(null);

  function handleSubmit() {
    if (email === '') return;
    login(email);
  }

  async function saveAllProfiles() {
    try {
      setIsSaving(true);
      if (userProfileSaveRef.current) {
        await userProfileSaveRef.current();
      }
      if (homeProfileSaveRef.current) {
        await homeProfileSaveRef.current();
      }

      if (homeUsersSaveRef.current) {
        await homeUsersSaveRef.current();
      }

      setEditMode(false);
    } catch (error) {
      console.error('Failed to save profiles', error);
    } finally {
      setIsSaving(false);
    }
  }

  function cancelEdit() {
    setEditMode(false);
  }

  return (
    <>
      <div className={`login-container h-column gap-large surface ${user ? '' : 'logged-out'}`}>
        {!user ? (
          <Login email={email} setEmail={setEmail} handleSubmit={handleSubmit} />
        ) : (
          <div className="profile-overview-container h-column gap-large">
            <div>
              <p>Hi there! 👋</p>
              <p>You are logged in with {user.email}</p>
            </div>
            <div className="h-row profile-overview">
              <div className="h-column gap-large">
                <label className="section-label">👥 Household</label>
                <UserProfile
                  user={user}
                  me={true}
                  editMode={editMode}
                  onSave={(saveFn) => (userProfileSaveRef.current = saveFn)}
                />
                <HomeUsers
                  editMode={editMode}
                  onSave={(saveFn) => (homeUsersSaveRef.current = saveFn)}
                />
              </div>
              <HomeProfile
                editMode={editMode}
                onSave={(saveFn) => (homeProfileSaveRef.current = saveFn)}
              />
            </div>
          </div>
        )}
        {user && (
          <div className="h-row action-buttons">
            <div>
              <LoadingButton
                className="button-tertiary"
                onClick={() => logout()}
                loadingKey="logout"
              >
                Sign out <FaSignOutAlt />
              </LoadingButton>
            </div>
            <div className="h-row">
              {editMode ? (
                <>
                  <LoadingButton onClick={saveAllProfiles} isLoading={isSaving}>
                    Save <IoMdSend />
                  </LoadingButton>

                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)}>
                  Edit <CiEdit />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ProfileOverview;
