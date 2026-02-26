import configuration from "../../../Configuration";
import type { Address } from "../../../model/Adress";
import BaseWidgetApi from "../../core/api/BaseWidgetApi";
import type { SwimmingResponse } from "../model/swimming-response";

class SwimmingApi extends BaseWidgetApi {
  async getSwimmingData(adress: Address): Promise<SwimmingResponse[] | undefined> {
    let swimmingEndpoint = configuration.getSwimmingConfig().Endpoint;
    swimmingEndpoint = `${swimmingEndpoint}locations/${adress.coordinate.lat},${adress.coordinate.lon}/nearestwatertemperatures`;
    const res = await this.postInternalJson<SwimmingResponse[]>(
      "/broker",
      {},
      { integration: "yr", endpoint: swimmingEndpoint, internalIntegration: true },
      "fetch-swimming",
    );
    return res;
  }
}

const swimmingApi = new SwimmingApi();
export default swimmingApi;
