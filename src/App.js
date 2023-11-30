import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import BusCards from "./components/bus-cards";
import fetchData from "./Api";

function App() {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchandSetData = async () => {
    try {
      const data = await fetchData()
      setTripData(data);
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
        <h1>Bendiks reiseplanlegger fra Møhlenpris</h1>
        <hr />
      </header>
      {tripData && <BusCards travelData={tripData} />}
    </div>
  );
}

export default App;
