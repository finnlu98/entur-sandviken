import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BusCards from "./components/bus-cards/bus-cards";
import Api from "./Api";
import { TailSpin } from "react-loader-spinner";
import Header from "./components/header/header";
import Dailyweather from "./components/weather-widget/daily-weather";
import ElectrictyPrices from "./components/electricity-prices/electricity-prices";
import LaundryWeek from "./components/laundry-week/laundry-week";

function App() {
  const [tripData, setTripData] = useState(null);
  const [cityCenterData, setCityCenterData] = useState(null)

  const [kanyeQoute, setKanyeQoute] = useState(null);
  const [electrictyPrices, setElectrictyPrices] = useState(null);
  const [loading, setLoading] = useState(true);

  const reloadHour = 5;
  const reloadMinute = 30;

  const fetchandSetData = async () => {
    try {
      const trips = await Api.fetchNhhBusRides();
      const cityTrips = await Api.fetchCenterBusRides();
      const qoute = await Api.fetchKanyeQuote();
      const elecPries = await Api.fetchElectricityPrices();
      setTripData(trips);
      setCityCenterData(cityTrips);
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
      return (
        now.hour() === reloadHour &&
        now.minute() === reloadMinute &&
        now.second() === 0
      );
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
      <div className="dash-container container mt-2 mb-4">
        <div className="row">
          <Header kanyeQoute={kanyeQoute} />
        </div>

        <div className="row dash-rows">
          <div className="col-md-7 col-12">
            <div className="mb-2">
              {tripData && <BusCards 
                title={"Skutevikstoget - NHH"} 
                travelData={tripData}  
                configCard={{
                  numRows: 5, 
                  minFilter: 5
                }} 
                configColors={{
                  general: 13, 
                  green: 9, 
                  yellow: 6}} 
                fetchData={Api.fetchNhhBusRides} />}
            </div>
            <div>
              {tripData && <BusCards 
                title={"Øvre Sandviksvei - Olav Kyrres gate"} 
                travelData={cityCenterData} 
                configCard={{numRows: 3, minFilter: 1}} 
                configColors={{
                  general: 7, 
                  green: 5, 
                  yellow: 2}} 
                fetchData={Api.fetchCenterBusRides} />}
            </div>            
          </div>
          
          <div className="col-md-5 col-12">
            <div className="row mb-2">
              <Dailyweather />
            </div>
            <div className="row mb-2">
              <ElectrictyPrices electrictyPrices={electrictyPrices} />
            </div>
            <div className="row mb-2">
              <LaundryWeek />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
