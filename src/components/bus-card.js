
import moment from "moment";
import { FaBus } from "react-icons/fa";

function BusCard({ travelData }) {
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
    
    const tripStartTime = moment(startTime, "HH:mm").utc();
    
    const diffInMinutes = tripStartTime.diff(now, "minutes");

    console.log('loging in bus', diffInMinutes)
    return diffInMinutes;
  }

  return (
    <div>
      {/* Map over all trip patterns */}
      {tripPatterns.map((tripPattern, tripIndex) => (
        <div key={tripIndex} className="card text-white bg-dark mb-3">
          <div className="card-body">
          
          <h5 className="card-title">
            <FaBus /> 
             {tripPattern.legs[0].line.name.split(" ")[0]} {tripPattern.legs[0].line.publicCode} - {moment(tripPattern.legs[0].expectedStartTime).format("HH:mm")} ({calculateMinutesUntil(tripPattern.legs[0].expectedStartTime)} min)
          </h5>
            {tripPattern.legs.map((leg, legIndex) => (
              <div key={legIndex}>
                  <p className="list-group-item">Forventet ankomst: {moment(leg.expectedEndTime).format("HH:mm")}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BusCard;
