import { FaBus } from "react-icons/fa";

function BusCard({
  tripIndex,
  name,
  publicCode,
  startTime,
  endTime,
  minutesUntil,
}) {
  return (
    <div key={tripIndex} className="card text-white bg-dark mb-3">
      <div className="card-body">
        <div style={{ display: "flex" }}>
          <div style={{ paddingRight: "10px" }}>
            <FaBus />
          </div>

          <div>
            <h5 className="card-title">
              {name} {publicCode} - {startTime} ({minutesUntil} min)
            </h5>
          </div>
        </div>

        <div>
          <p className="list-group-item">Forventet ankomst: {endTime}</p>
        </div>
      </div>
    </div>
  );
}

export default BusCard;
