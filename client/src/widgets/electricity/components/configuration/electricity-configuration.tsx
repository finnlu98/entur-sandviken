import { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import LoadingButton from '../../../../feedback/loading/components/loading/loading-button';
import { useElviaKeyManagement } from '../../hook/electricity-key-hook';
import AlertResponse from '../../../../feedback/alert/component/alert-response';
import { AlertVariant } from '../../../../feedback/alert/model/alert-types';

const ElectricityConfiguration: React.FC = () => {
  const [elviaKey, setElviaKey] = useState<string>('');
  const { postElviaKey, hasElviaKey } = useElviaKeyManagement();
  const [postNewKey, setPostNewKey] = useState(false);
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null);

  const registerKey = async () => {
    const trimmedKey = elviaKey.trim();
    const isValid = await postElviaKey(trimmedKey);
    setIsValidKey(isValid);
    setPostNewKey(false);
  };

  return (
    <div className="h-column">
      <div className="h-row">
        {hasElviaKey && !postNewKey && isValidKey !== false ? (
          <div className="h-column gap-tiny">
            <label htmlFor="electricityKey">Elvia API Key:</label>

            <p>Key is active ✅</p>
            <button className="button-text-only font-small" onClick={() => setPostNewKey(true)}>
              (Register new key)
            </button>
          </div>
        ) : (
          <div className="h-column">
            <label>General:</label>
            <span>
              To use this widget, you need to have an account at <strong>Elvia</strong>. Visit their{' '}
              <a
                href="https://www.elvia.no/smart-forbruk/api-er-for-smartere-hjem-og-bedrifter/slik-kan-du-ta-i-bruk-metervalue-api/"
                target="_blank"
                rel="noopener noreferrer"
              >
                website
              </a>{' '}
              to obtain your API key.
            </span>
            <label htmlFor="electricityKey">Elvia Key:</label>
            <div className="h-row">
              <input
                type="text"
                value={elviaKey}
                onChange={(e) => setElviaKey(e.target.value)}
                onFocus={() => setIsValidKey(null)}
                placeholder="Paste your elvia API key"
              />
              <LoadingButton onClick={registerKey} loadingKey="post-elvia-key">
                <IoMdSend />
              </LoadingButton>
            </div>
            <label className="font-small">
              Note: due to security reasons, once you send the key, it cannot be retrieved again and
              the changes cannot be canceled. You can at any time regsiter a new key or delete it.
            </label>
            {isValidKey === false && (
              <AlertResponse
                variant={AlertVariant.ERROR}
                message="The provided key is not valid, please try again."
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectricityConfiguration;
