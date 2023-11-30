import moment from "moment";
import BusCard from "./bus-card";
import React, { useState, useEffect } from "react";

function BusCards({ travelData }) {
  // Assuming there's at least one tripPattern

  const [tripPatterns, settripPatterns] = useState(
    filterBusRides(travelData.data.trip.tripPatterns)
  );
  
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      settripPatterns((prevTripPatterns) =>
        filterBusRides(prevTripPatterns)
      );
    }, 1000);
  
    // Cleanup the interval when the component is unmounted
    return () => clearInterval(countdownInterval);
  }, [travelData.data.trip.tripPatterns]); // Add travelData.data.trip.tripPatterns as a dependency
  
  function filterBusRides(tripPatterns) {
    return tripPatterns
      .map((tripPattern) => ({
        ...tripPattern,
        legs: tripPattern.legs.filter(
          (leg) =>
            leg.mode === 'bus' &&
            calculateMinutesUntil(leg.expectedStartTime) >= 0
        ),
      }))
      .filter((tripPattern) => tripPattern.legs.length === 1);
  }
  
  function calculateMinutesUntil(startTime) {
    const now = moment().utc();
    const tripStartTime = moment(startTime).utc();
    const diffInMinutes = tripStartTime.diff(now, 'minutes');
    return diffInMinutes;
  }
  

  return (
    <div>
      {tripPatterns.map((tripPattern, tripIndex) => {
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
  );
}

export default BusCards;
