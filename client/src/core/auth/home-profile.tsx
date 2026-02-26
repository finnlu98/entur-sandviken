import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { IoAddCircleOutline } from 'react-icons/io5';
import './home-profile.css';
import AdressSearch from '../shared/adress-search/adress-search';
import type { Address } from '../../model/adress';
import LoadingButton from '../../feedback/loading/components/loading/loading-button';

interface HomeProfileProps {
  editMode: boolean;
  onSave: (saveFn: () => Promise<void>) => void;
}

const HomeProfile: React.FC<HomeProfileProps> = ({ editMode, onSave }) => {
  const { home, createHome, updateHome } = useAuth();
  const [homeName, setHomeName] = useState(home?.name || '');
  const [location, setLocation] = useState<{ lat: number; lon: number } | undefined>(
    home?.location || undefined
  );
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(home?.bannerUrl || null);
  useEffect(() => {
    const saveProfile = async () => {
      if (!home) return;
      if (homeName === '' && imgFile === null) return;

      await updateHome({ name: homeName, location: location }, imgFile);
    };

    onSave(saveProfile);
  }, [home, homeName, location, imgFile, updateHome, onSave]);

  useEffect(() => {
    if (!editMode) {
      setHomeName(home?.name || '');
      setLocation(home?.location || undefined);
      setImgFile(null);
    }
  }, [editMode, home]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onAddressSelect: (address: Address) => void = (address) => {
    setLocation({ lat: address.coordinate.lat, lon: address.coordinate.lon });
  };

  return (
    <div className="h-column">
      <label className="section-label">🖺 Home Information</label>
      {home ? (
        <>
          <div className="h-row">
            <p>🏷️</p>
            <input
              type="text"
              placeholder="Home Name"
              value={homeName}
              readOnly={!editMode}
              onChange={(e) => setHomeName(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div className="h-row">
            <p>📍</p>
            <AdressSearch
              onAddressSelect={onAddressSelect}
              adress={homeName}
              readonly={!editMode}
              disabled={!editMode}
            />
          </div>
          <div className="h-row">
            <p>🖼️</p>
            <div>
              <div className="banner-preview" style={{ backgroundImage: `url(${previewUrl})` }}>
                {(editMode || !home?.bannerUrl) && (
                  <input
                    className="banner-upload"
                    type="file"
                    accept="image/*"
                    disabled={!editMode}
                    onChange={handleFileChange}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingButton onClick={createHome} loadingKey="create-home">
          Create Home <IoAddCircleOutline />
        </LoadingButton>
      )}
    </div>
  );
};

export default HomeProfile;
