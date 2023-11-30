import moment from "moment";
import React, { useState, useEffect } from 'react';
import { FaBus } from "react-icons/fa";

function BusCard({
  tripIndex,
  name,
  publicCode,
  startTime,
  endTime,
  minutesUntil,
  calculateMinutesUntil
}) {

  const [minutes, setMinutes] = useState(minutesUntil);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(calculateMinutesUntil(startTime));
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(countdownInterval);
  }, []);


  return (
    <div key={tripIndex} className="card text-white bg-dark mb-3">
      <div className="card-body">
        <div style={{ display: "flex" }}>
          <div style={{ paddingRight: "10px" }}>
            <FaBus />
          </div>

          <div>
            <h5 className="card-title">
              {name} {publicCode} - {moment(startTime).format("HH:mm")} ({minutes} min)
            </h5>
          </div>
        </div>

        <div>
          <p className="list-group-item">Forventet ankomst: {moment(endTime).format("HH:mm")}</p>
        </div>
      </div>
    </div>
  );
}

export default BusCard;
