import axios from "axios";

const fetchData = async () => {
  try {
    const graphqlQuery = `
      {
        trip(
          from: {
            coordinates: {
              latitude: 60.38617115042553
              longitude: 5.320628492040638
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

export default {
  fetchData,
  fetchKanyeQuote
};
