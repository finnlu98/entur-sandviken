import React, { useState, useEffect } from "react";
import "./App.css";
import BusCard from "./components/bus-card";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const graphqlQuery = `
        {
          trip(
            from: {
              coordinates: {
                latitude: 60.38615464965549
                longitude: 5.32255747467224
              }
            },
            to: {
              coordinates: {
                latitude: 60.42327833524445
                longitude: 5.302355076497197
              }
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

      setTripData(response.data);
      setLoading(false); // Set loading to false once data is fetched
      console.log(tripData)
    } catch (error) {
      console.error("GraphQL request error:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run the effect only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 mb-4">
      <header>
        <h1>Bendiks reiseplanlegger fra Møhlenpris</h1>
        <hr />
      </header>
      {tripData && <BusCard travelData={tripData} />}
    </div>
  );
}

export default App;
