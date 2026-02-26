import { useEffect, useState } from "react";
import type { User } from "../../model/User";
import ImageCircle from "../shared/imageCirlce/ImageCircle";
import UploadImageCircle from "../shared/imageCirlce/UploadImageCircle";
import { useAuth } from "../../context/AuthContext";
import "./UserProfile.css";
import { MdDelete } from "react-icons/md";
import LoadingButton from "../../feedback/loading/components/Loading/LoadingButton";

interface UserProfileProps {
  user: User;
  me?: boolean;
  editMode: boolean;
  onSave: (saveFn: () => Promise<void>) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, me, editMode, onSave }) => {
  const { updatePersonalia, updateHomeMember, deleteHomeMember } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [imgPath, setImgPath] = useState<string | undefined>(user?.avatarUrl || undefined);
  const [file, setFile] = useState<File | null>(null);

  function handleImageChange(dataUrl: string | null, file: File | null) {
    if (!dataUrl) return;
    setImgPath(dataUrl);
    setFile(file);
  }

  useEffect(() => {
    const saveProfile = async () => {
      if (!user) return;
      const isDirty = name !== (user?.name || "") || file !== null;
      if (!isDirty) return;

      if (me) {
        await updatePersonalia({ name }, file);
      } else {
        await updateHomeMember(user.email, { name }, file);
      }
    };

    onSave(saveProfile);
  }, [name, me, file, user, updatePersonalia, updateHomeMember, onSave]);

  useEffect(() => {
    if (!editMode) {
      setName(user?.name || "");
      setImgPath(user?.avatarUrl || undefined);
      setFile(null);
    }
  }, [editMode, user]);

  function renderFirstColumn() {
    if (me) {
      return <label className="section-label">👤 Me</label>;
    } else if (editMode) {
      return (
        <LoadingButton
          loadingKey={`delete-user-${user?.email}`}
          onClick={() => deleteHomeMember(user?.email)}
          className="button-tertiary"
        >
          <MdDelete />
        </LoadingButton>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="h-column gap-large">
      <div className="h-column">
        <div className="household-grid gap-large">
          {renderFirstColumn()}
          {user && !imgPath && !editMode ? (
            <ImageCircle text={user?.email.charAt(0).toUpperCase()} />
          ) : (
            <UploadImageCircle onImageChange={handleImageChange} imgPath={imgPath} disabled={!editMode} />
          )}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!editMode}
          />
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
