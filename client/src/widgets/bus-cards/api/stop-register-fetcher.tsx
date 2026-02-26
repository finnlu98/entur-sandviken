import axios from "axios";
import Configuration from "../../../Configuration";
import type { StopSearchResponse } from "../model/StopSearchResponse";

const SearchStopFetcher = async (searchTrerm: string) => {
  const config = Configuration.getEnturConfig();
  const endpoint = config.StopRegister.Endpoint;
  const formattedEnpoint = endpoint.replace(":SEARCH", encodeURIComponent(searchTrerm));
  const identifier = Configuration.getIdentifierConfig();

  const response = await axios.get<StopSearchResponse>(formattedEnpoint, {
    headers: { "ET-Client-Name": identifier },
  });

  return response.data.features;
};
export default SearchStopFetcher;
