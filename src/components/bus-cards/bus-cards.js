import moment from "moment";
import BusCard from "./bus-card";
import React, { useState, useEffect } from "react";
import Api from "../../Api";
import "./bus-cards.css";
import MainBusCard from "./main-bus-card";




function BusCards({ title, travelData, configCard, configColors }) {
  
  const { numRows, minFilter } = configCard;
  
  
  const [tripPatterns, settripPatterns] = useState(
    filterBusRides(travelData.data.trip.tripPatterns)
  );

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      settripPatterns((prevTripPatterns) => filterBusRides(prevTripPatterns));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [tripPatterns]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      updateTravelData();
    }, 7 * 60 * 1000);

    return () => clearInterval(updateInterval);
  }, []);



  function filterBusRides(tripPatterns) {
    return tripPatterns
      .map((tripPattern) => ({
        ...tripPattern,
        legs: tripPattern.legs.filter(
          (leg) =>
            leg.mode === "bus" &&
            calculateMinutesUntil(leg.expectedStartTime) >= minFilter
        ),
      }))
      .filter((tripPattern) => tripPattern.legs.length === 1);
  }

  function calculateMinutesUntil(startTime) {
    const now = moment().utc();
    const tripStartTime = moment(startTime).utc();
    const diffInMinutes = tripStartTime.diff(now, "minutes");
    return diffInMinutes;
  }

  // Pass the function...
  async function updateTravelData() {
    try {
      const updatedTravelData = await Api.fetchData();
      settripPatterns(filterBusRides(updatedTravelData.data.trip.tripPatterns));
    } catch (error) {
      console.error("Can't update data:", error);
    }
  }

  return (
    <div>
    <div className="bus-card-contianter">
      <div className="busstider-header mb-2">
          <h5><strong>{title}</strong></h5>
        </div>
        <div>
          {tripPatterns.slice(0, 1).map((tripPattern, tripIndex) => {
            return (
              <MainBusCard
                key={tripIndex}
                name={tripPattern.legs[0].line.name.split(" ")[0]}
                publicCode={tripPattern.legs[0].line.publicCode}
                startTime={tripPattern.legs[0].expectedStartTime}
                endTime={tripPattern.legs[0].expectedEndTime}
                tripIndex={tripIndex}
                minutesUntil={calculateMinutesUntil(
                  tripPattern.legs[0].expectedStartTime
                )}
                calculateMinutesUntil={calculateMinutesUntil}
                configColors={configColors}
              />
            );
          })}
        </div>
        <div>
          {tripPatterns.slice(1, numRows).map((tripPattern, tripIndex) => {
            return (
              <BusCard
                key={tripIndex}
                name={tripPattern.legs[0].line.name.split(" ")[0]}
                publicCode={tripPattern.legs[0].line.publicCode}
                startTime={tripPattern.legs[0].expectedStartTime}
                endTime={tripPattern.legs[0].expectedEndTime}
                tripIndex={tripIndex}
                minutesUntil={calculateMinutesUntil(
                  tripPattern.legs[0].expectedStartTime
                )}
                calculateMinutesUntil={calculateMinutesUntil}
                configColors={configColors}
              />
            );
          })}
        </div>
    </div>
      
    </div>
  );
}

export default BusCards;
