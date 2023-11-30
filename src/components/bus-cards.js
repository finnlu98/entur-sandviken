
import moment from "moment";
import BusCard from "./bus-card";

function BusCards({ travelData }) {
  // Assuming there's at least one tripPattern
  const tripPatterns = filterBusRides(travelData.data.trip.tripPatterns);

  function filterBusRides(tripPatterns) {
    
    return tripPatterns
      .map((tripPattern) => ({
        ...tripPattern,
        legs: tripPattern.legs.filter((leg) => leg.mode === "bus" && (calculateMinutesUntil(leg.expectedStartTime) > 0)),
      }))
      .filter((tripPattern) => tripPattern.legs.length === 1)
  }

  function calculateMinutesUntil(startTime) {
    const now = moment().utc();
    const tripStartTime = moment(startTime).utc();
    const diffInMinutes = tripStartTime.diff(now, "minutes");
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
            startTime={moment(tripPattern.legs[0].expectedStartTime).format("HH:mm")}
            endTime={moment(tripPattern.legs[0].expectedEndTime).format("HH:mm")}
            tripIndex={tripIndex}
            minutesUntil={calculateMinutesUntil(tripPattern.legs[0].expectedStartTime)}
          />
        );
      })}
    </div>
  );
}

export default BusCards;
