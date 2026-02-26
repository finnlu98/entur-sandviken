import DocumentationBase from '../../../core/components/documentation-base';

import { CALENDER_FETCH_INTERVAL } from '../../calender-constants';

const CalenderDocumentation = () => (
  <DocumentationBase
    imgPaths={[
      './img/integrations/google_calender.png',
      './img/integrations/apple_calender.png',
      './img/integrations/microsoft_calender.png',
    ]}
    dataUpdateInterval={CALENDER_FETCH_INTERVAL}
    generalDocumentation="<p>This widget integrates with any calender that provides iCal endpoints, allowing you to display events from multiple calendar sources in one place.</p>"
    extraRequirements="<p>To use this widget, you need to find if your calender provides an iCal feed. Common calenders like Google Calendar, Apple Calendar, and Outlook Calendar offer this. Read more on your providers website.</p>"
  />
);
export default CalenderDocumentation;
