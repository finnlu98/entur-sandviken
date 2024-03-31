import moment from "moment";
import BusCard from "./bus-card";
import React, { useState, useEffect } from "react";
import Api from "../../Api";
import "./bus-cards.css";
import TrafficLightColor from "./TrafficLightColor";




function BusCards({ travelData }) {
  // Assuming there's at least one tripPattern

  const [color, setColor] = useState(TrafficLightColor.OFF);
  
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

  
  // Update traffic
  // Needs refactoring in functions and dup code in bus-card
  useEffect(() => {
    
    var maxColor = 0;
    
    tripPatterns.forEach(tripPattern => {
  
      const minUntil = calculateMinutesUntil(tripPattern.legs[0].expectedStartTime);
      var tripColor = 0;

      if (minUntil < 8) {
        tripColor = TrafficLightColor.GREEN
      }
  
      if (minUntil < 5) {
        tripColor = TrafficLightColor.ORANGE
      }
  
      if (minUntil < 3) {

        tripColor = TrafficLightColor.RED
      }

      if(tripColor > maxColor) {
        maxColor = tripColor;
      }
      
    }) 

    if (maxColor != color) {
      setColor(maxColor);
      Api.setTrafficLight(maxColor);
    }

  }, [tripPatterns]); 



  function filterBusRides(tripPatterns) {
    return tripPatterns
      .map((tripPattern) => ({
        ...tripPattern,
        legs: tripPattern.legs.filter(
          (leg) =>
            leg.mode === "bus" &&
            calculateMinutesUntil(leg.expectedStartTime) >= 0
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
      <div className="busstider-header mb-2">
        <h5>Møhlenpris - NHH</h5>
      </div>
      <div>
        {tripPatterns.slice(0, 6).map((tripPattern, tripIndex) => {
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default BusCards;
