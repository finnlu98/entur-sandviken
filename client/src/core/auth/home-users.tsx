import { IoAddCircleOutline } from 'react-icons/io5';
import { useAuth } from '../../context/auth-context';
import UserProfile from './user-profile';
import PopupButton from '../shared/popup/popup';
import { IoMdSend } from 'react-icons/io';
import { useState } from 'react';
import LoadingButton from '../../feedback/loading/components/loading/loading-button';

interface HomeUsersProps {
  editMode: boolean;
  onSave: (saveFn: () => Promise<void>) => void;
}

const HomeUsers: React.FC<HomeUsersProps> = ({ editMode, onSave }) => {
  const { home, user, addHomeMember } = useAuth();
  const [addEmail, setAddEmail] = useState('');
  async function addEmailToHome(email: string, closePopup: () => void) {
    await addHomeMember(email);
    closePopup();
  }

  return (
    <>
      <div className="h-column">
        {home?.users &&
          home.users
            .filter((u) => u?.email !== user?.email)
            .map((user) => (
              <UserProfile key={user.email} user={user} editMode={editMode} onSave={onSave} />
            ))}
        {editMode && (
          <div className="h-row center">
            <PopupButton position="bottom">
              {(closePopup) => [
                <span className="center">
                  Add Member <IoAddCircleOutline />
                </span>,
                <div className="h-row">
                  <input
                    type="text"
                    placeholder="Enter email to invite"
                    className="popup-input"
                    value={addEmail}
                    onChange={(e) => setAddEmail(e.target.value)}
                  />

                  <LoadingButton
                    className="popup-button"
                    loadingKey={`add-user-${addEmail}`}
                    onClick={async () => addEmailToHome(addEmail, closePopup)}
                  >
                    <IoMdSend />
                  </LoadingButton>
                </div>,
              ]}
            </PopupButton>
          </div>
        )}
      </div>
    </>
  );
};
export default HomeUsers;
