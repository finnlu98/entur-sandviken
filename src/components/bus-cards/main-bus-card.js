import moment from "moment";
import React, { useState, useEffect } from "react";
import { FaBus } from "react-icons/fa";
import "./main-bus-card.css";

function MainBusCard({
  tripIndex,
  name,
  publicCode,
  startTime,
  endTime,
  minutesUntil,
  calculateMinutesUntil,
  configColors
}) {
  const [minutes, setMinutes] = useState(minutesUntil);
  const [badTime, setBadTime] = useState(evalBadTime(minutes));

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(calculateMinutesUntil(startTime));
      setBadTime(evalBadTime(minutes));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [startTime, calculateMinutesUntil]);


  function evalBadTime(time) {
    if (time > configColors.general) {
      return "general-time";
    }

    if (time > configColors.green) {
      return "good-time";
    }

    if (time > configColors.yellow) {
      return "medium-time";
    }
    return "bad-time";
  }

  return (
    <div key={tripIndex} className="bus-card card text-white mb-2 container">
      <div className="card-body">
        <div className="row">
          <div className="col-md-10 public">
            <div className="d-flex">
              <div className="public-icon">
                <FaBus />
              </div>

              <div className="public-header">
                <h5 className="card-title">
                  {name} {publicCode} - {moment(startTime).format("HH:mm")}
                </h5>
              </div>
            </div>

            <div>
              <p className="list-group-item">
                Forventet ankomst: {moment(endTime).format("HH:mm")}
              </p>
            </div>
          </div>
          <div
            className={`col-md-2 flex-column align-items-center minutes ${badTime}`}
          >
            <h1>{minutes}</h1>
            <p>min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBusCard;