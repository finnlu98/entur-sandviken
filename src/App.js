import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BusCards from "./components/bus-cards";
import Api from "./Api";


function App() {
  const [tripData, setTripData] = useState(null);
  const [kanyeQoute, setKanyeQoute] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchandSetData = async () => {
    try {
      const trips = await Api.fetchData()
      const qoute = await Api.fetchKanyeQuote()
      setTripData(trips);
      setKanyeQoute(qoute.quote)
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchandSetData();
  }, []); // Run the effect only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 mb-4">
      <header>
        <h1>Bendiks reiseplanlegger: Møhlenpris - NHH</h1>
        <p>{kanyeQoute} - Kanye</p>
        <hr />
      </header>
      {tripData && <BusCards travelData={tripData} />}
    </div>
  );
}

export default App;
