import { AiTwotoneDatabase } from 'react-icons/ai';
import { MdOutlineUpdate } from 'react-icons/md';
import './documentation-base.css';
import { formatDuration } from '../../../lib/format-duration';

interface DocumentationWrapperProps {
  provider?: string;
  imgPaths?: string[];
  dataUpdateInterval: number | string;
  generalDocumentation: string;
  extraRequirements?: string;
}

const DocumentationBase: React.FC<DocumentationWrapperProps> = ({
  provider,
  imgPaths,
  dataUpdateInterval,
  generalDocumentation,
  extraRequirements,
}) => {
  return (
    <div className="documentation-base h-column">
      <div className="h-row documentation-header">
        <div className="h-row">
          <p className="h-row gap-small">
            <AiTwotoneDatabase />
            Delivered by:
          </p>
          {imgPaths &&
            imgPaths.map((imgPath, index) => (
              <img
                key={index}
                src={imgPath}
                alt={`${provider} logo`}
                className="documentation-logo"
              />
            ))}
          {provider && <h5>{provider}</h5>}
        </div>
        <div>
          <p className="h-row">
            <MdOutlineUpdate />{' '}
            {formatDuration(
              typeof dataUpdateInterval === 'string'
                ? parseInt(dataUpdateInterval)
                : dataUpdateInterval
            )}
          </p>
        </div>
      </div>
      <hr />
      <div className="h-column">
        <h5>General Information</h5>
        <div dangerouslySetInnerHTML={{ __html: generalDocumentation }} />
      </div>
      {extraRequirements && (
        <div className="h-column">
          <h5>Extra Requirements</h5>
          <div dangerouslySetInnerHTML={{ __html: extraRequirements }} />
        </div>
      )}
    </div>
  );
};

export default DocumentationBase;
