import configuration from '../../../configuration';
import axios from 'axios';

const HomePostMan = async (event: string, selectedOption?: string) => {
  try {
    const config = configuration.getHomeAssistantConfig();
    let endpoint = '/api';
    endpoint = endpoint + '/homeactions';
    const homeEndpoint = `${config.Endpoint}events/${event}`;

    const response = await axios.post(
      endpoint,
      { endpoint: homeEndpoint, selectedOption: selectedOption },
      { headers: { HomeAuthorization: `Bearer ${config.secretToken}` } }
    );

    return response;
  } catch {
    console.error('Can`t post Home assistant data');
  }
};

export default HomePostMan;
