import './upload-image-circle.css';
import ImageCircle from './image-circle';
import { IoMdAdd } from 'react-icons/io';

interface UploadImageCircleProps {
  imgPath?: string;
  onImageChange?: (dataUrl: string | null, file: File | null) => void;
  disabled?: boolean;
}

const UploadImageCircle: React.FC<UploadImageCircleProps> = ({
  onImageChange,
  imgPath,
  disabled,
}) => {
  function setImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      onImageChange?.(dataUrl, file);
    };

    reader.readAsDataURL(file);
  }

  return (
    <label className={`circle medium circle-upload ${!disabled ? ' circle-upload-active' : ''}`}>
      {imgPath ? (
        <>
          <input type="file" accept="image/*" onChange={setImage} disabled={disabled} />
          <ImageCircle imgPath={imgPath} alt="prev-img" />
        </>
      ) : (
        <>
          <input type="file" accept="image/*" onChange={setImage} disabled={disabled} />
          <IoMdAdd />
        </>
      )}
    </label>
  );
};
export default UploadImageCircle;
