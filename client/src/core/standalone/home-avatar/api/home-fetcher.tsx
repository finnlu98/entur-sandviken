import axios from 'axios';
import configuration from '../../../../configuration';
import type { HomeStatus } from '../model/home-status';

const HomeFetcher = async (entityId: string) => {
  try {
    const config = configuration.getHomeAssistantConfig();

    const endpoint = `${config.Endpoint}states/person.${entityId}`;
    const response = await axios.get<HomeStatus>(endpoint, {
      headers: { Authorization: `Bearer ${config.secretToken}`, 'Content-Type': 'text/plain' },
    });

    return response.data;
  } catch (error) {
    console.error("Can't get Home Assistant data");
    throw error;
  }
};

export default HomeFetcher;
