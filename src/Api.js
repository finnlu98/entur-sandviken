import axios from "axios";
import moment from "moment";

const fetchData = async () => {
  try {
    const graphqlQuery = `
      {
        trip(
          from: {
            coordinates: {
              latitude: 60.407031725927254
              longitude: 5.322168653633666
            }
          },
          to: {
            coordinates: {
              latitude: 60.42327833524445
              longitude: 5.302355076497197
            }, 
          }
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

    const endpoint = "https://api.entur.io/journey-planner/v3/graphql";

    const response = await axios.post(
      endpoint,
      { query: graphqlQuery },
      { headers: { "ET-Client-Name": "FinnGriggsProduksjoner-Villaveien" } }
    );

    return response.data;
  } catch (error) {
    console.error("GraphQL request error:", error);
    throw error;
  }
};

const fetchKanyeQuote = async () => {
  try {
    const response = await axios.get(
      "https://api.kanye.rest/"
    );

    return response.data; 
  } catch (error) {
    console.error("Can't get Kanye quote");
    throw error;
  }
};


const fetchElectricityPrices = async () => {
  try {
    const year = moment().year();
    const month =  moment().format('MM');
    const day = moment().format('DD');

    const response = await axios.get(
      `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_NO5.json`
    );

    return response.data; 
  } catch (error) {
    console.error("Can't get electrictyprices quote");
    throw error;
  }
}


const setTrafficLight = async(color) => {
  try {
    
    var serverColor = "off"

    if(color === 1) {
      serverColor = "red"
    }

    if(color === 2) {
      serverColor = "orange"
    }

    if(color === 3) {
      serverColor = "green"
    }


    const response = await axios.get(
      `http://192.168.68.51:5000/${serverColor}`
    );

    return "success"; 
  } catch (error) {
    console.error("Can`t reach server");
    throw error;
  }
}


export default {
  fetchData,
  fetchKanyeQuote,
  fetchElectricityPrices,
  setTrafficLight
};
