import type { TravelResponse } from '../model/travel-response';
import Configuration from '../../../configuration';
import BaseWidgetApi from '../../core/api/base-widget-api';
import type { TravelRoute } from '../travel-card-widget';

class BusApi extends BaseWidgetApi {
  async getBusTimes(travelRoute: TravelRoute): Promise<TravelResponse | undefined> {
    try {
      const busTime = await this.fetchBusTimes(
        travelRoute.startPlace.properties.id,
        travelRoute.stopPlace.properties.id
      );
      return busTime;
    } catch (error) {
      console.error(
        `Error fetching bus times for route from ${travelRoute.startPlace.properties.id} to ${travelRoute.stopPlace.properties.id}:`,
        error
      );
    }
  }

  private async fetchBusTimes(fromPlace: string, toPlace: string): Promise<TravelResponse> {
    try {
      const graphqlQuery = `
               {
                 trip(
                   from: {
                     place: "${fromPlace}"       
                   },
                   to: {
                     place: "${toPlace}" 
                   },
                   maximumTransfers: 1
                 ) {
                   tripPatterns {
                     duration
                     legs {
                       expectedStartTime
                       expectedEndTime
                       mode
                       distance
                       fromPlace {
                         name
                       }
                       toPlace {
                         name
                       }
                       line {
                         id
                         publicCode
                         name
                       }
                     }
                   }
                 }
               }
             `;

      const config = Configuration.getEnturConfig();
      const endpoint = config.TravelPlanner.Endpoint;
      const identifier = Configuration.getIdentifierConfig();

      return await this.postExternalJson<TravelResponse>(
        endpoint,
        { headers: { 'ET-Client-Name': identifier } },
        { query: graphqlQuery },
        'fetch-bus-card'
      );
    } catch (error) {
      console.error('GraphQL request error:', error);
      throw error;
    }
  }
}

export const busApi = new BusApi();
