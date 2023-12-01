import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BusCards from "./components/bus-cards";
import Api from "./Api";
import { TailSpin } from "react-loader-spinner";

function App() {
  const [tripData, setTripData] = useState(null);
  const [kanyeQoute, setKanyeQoute] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchandSetData = async () => {
    try {
      const trips = await Api.fetchData();
      const qoute = await Api.fetchKanyeQuote();
      setTripData(trips);
      setKanyeQoute(qoute.quote);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchandSetData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div>
          <TailSpin
            height="150"
            width="150"
            color="lightblue"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <div className="mt-4">Loading</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container mt-4 mb-4">
        <header>
          <h1>"Skyss er ikke godt nok" - Bendik Gran Johnson</h1>
          <p>{kanyeQoute}</p>
          <hr />
        </header>
        {tripData && <BusCards travelData={tripData} />}
      </div>
    </div>
  );
}

export default App;
