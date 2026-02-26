import axios from "axios";
import moment from "moment";
import Configuration from "../../../Configuration";
import type { ElectricityPrice } from "../model/ElectricityPrices";
const FetchElectricityPrices = async () => {
  try {
    const year = moment().year();
    const month =  moment().format('MM');
    const day = moment().format('DD');

    let endpoint = Configuration.getElectricityEndpoint()

    endpoint = endpoint
                .replace(":year", year.toString())
                .replace(":month", month.toString())
                .replace(":day", day.toString())


    const response = await axios.get<ElectricityPrice[]>(
      endpoint
    );

    return response.data; 
  } catch (error) {
    console.error("Can't get electrictyprices quote");
    throw error;
  }
}

export default FetchElectricityPrices
