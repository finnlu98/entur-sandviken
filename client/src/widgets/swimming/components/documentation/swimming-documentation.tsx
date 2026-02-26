import DocumentationBase from '../../../core/components/documentation-base';

import { SWIMMING_FETCH_INTERVAL } from '../../swimming-constants';

const SwimmingDocumentation: React.FC = () => {
  return (
    <DocumentationBase
      provider={'Yr.no'}
      imgPaths={['./img/integrations/yr_logo.svg']}
      dataUpdateInterval={SWIMMING_FETCH_INTERVAL}
      generalDocumentation="<p>This amazing API is <strong>dugnadsbasert</strong>. Meaning people and organizations collaborate voluntarily. The Swimming Widget provides real-time information about swimming conditions at various locations. It displays the current water temperature, distance from the user's location, and allows users to highlight specific locations for easy reference.</p>"
    />
  );
};

export default SwimmingDocumentation;
