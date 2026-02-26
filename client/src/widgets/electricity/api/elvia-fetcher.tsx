import configuration from '../../../configuration';
import BaseWidgetApi from '../../core/api/base-widget-api';
import { ElectricityData } from '../model/electricity-data';
import type { ElviaConsumptionResponse } from '../model/elvia-consumption-response';
import { ElviaService } from '../services/elvia-service';
import moment from 'moment';

class ElviaApi extends BaseWidgetApi {
  async fetchConsumptionData(): Promise<ElectricityData> {
    const consumptionEndpoint = configuration.getElviaConfig().Consumption.Endpoint;
    const brokerEndpoint = '/broker';
    const formattedEndpoint = new URL(consumptionEndpoint);
    formattedEndpoint.searchParams.set('startTime', moment().startOf('month').format());
    try {
      const response = await this.postInternalJson<ElviaConsumptionResponse>(
        brokerEndpoint,
        {},
        { endpoint: formattedEndpoint.toString(), integration: 'Elvia' },
        'fetch-elvia-consumption'
      );

      const elecService = new ElviaService(response);
      return new ElectricityData(elecService);
    } catch (error) {
      console.error('Failed to fetch Elvia consumption data', error);
      throw error;
    }
  }

  async postElviaKey(key: string): Promise<boolean> {
    const formatKey = `Bearer ${key.trim()}`;

    try {
      const res = await this.postInternalJson<{ success: boolean }>(
        '/integration',
        {},
        { provider: 'Elvia', key: formatKey, endpoint: this.formatEndpoint() },
        'post-elvia-key'
      );
      return res.success;
    } catch (error) {
      console.error('Failed to post Elvia key', error);
      throw error;
    }
  }

  async getHasElviaKey(): Promise<boolean> {
    try {
      const res = await this.getInternalJson<{ integration: string | null }>('/integration', {
        params: { provider: 'Elvia' },
        meta: {
          loadingKey: 'has-elvia-key',
          errorMessage: 'Failed to get Elvia key status',
        },
      });
      return res.integration !== null;
    } catch (error) {
      console.error('Failed to get Elvia key status', error);
      return false;
    }
  }

  formatEndpoint(): string {
    const consumptionEndpoint = configuration.getElviaConfig().Consumption.Endpoint;
    const formattedEndpoint = new URL(consumptionEndpoint);
    formattedEndpoint.searchParams.set('startTime', moment().startOf('month').format());
    return formattedEndpoint.toString();
  }
}

const elviaApi = new ElviaApi();
export default elviaApi;
