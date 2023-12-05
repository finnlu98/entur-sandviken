import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BusCards from "./components/bus-cards";
import Api from "./Api";
import { TailSpin } from "react-loader-spinner";
import Header from "./components/header/header";
import Dailyweather from "./components/daily-weather";
import ElectrictyPrices from "./components/electricity-prices";

function App() {
  const [tripData, setTripData] = useState(null);
  const [kanyeQoute, setKanyeQoute] = useState(null);
  const [electrictyPrices, setElectrictyPrices] = useState(null);
  const [loading, setLoading] = useState(true);

  const reloadHour = 5;
  const reloadMinute = 30

  const fetchandSetData = async () => {
    try {
      const trips = await Api.fetchData();
      const qoute = await Api.fetchKanyeQuote();
      const elecPries = await Api.fetchElectricityPrices();
      setTripData(trips);
      setKanyeQoute(qoute.quote);
      setElectrictyPrices(elecPries);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchandSetData();
  }, []);

  useEffect(() => {
    
    const shouldReload = () => {
      const now = moment();
      return now.hour() === reloadHour && now.minute() === reloadMinute && now.second() === 0;
    };

  
    const reloadAtTargetHour = () => {
      if (shouldReload()) {
        window.location.reload(true); 
      }
    };

    reloadAtTargetHour();

    const intervalId = setInterval(reloadAtTargetHour, 1000);

   
    return () => clearInterval(intervalId);
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
          <div className="mt-4">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="dash-container container mt-4 mb-4">
        <div className="row">
         
          <Header kanyeQoute={kanyeQoute} />
         
          
        </div>

        <div className="row">
          <div className="col-7">
            {tripData && <BusCards travelData={tripData} />}
          </div>
          <div className="col-5">
            <div className="row mb-2">
              <Dailyweather />
            </div>
            <div className="row">
              <ElectrictyPrices electrictyPrices={electrictyPrices} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
