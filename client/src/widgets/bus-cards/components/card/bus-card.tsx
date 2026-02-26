import moment from "moment";
import React, { useState, useEffect, useCallback } from "react";
import "./bus-card.css";
import type { ConfigColor } from "./ConfigColor";
import { FaBusAlt, FaTrain } from "react-icons/fa";
import { Mode } from "../../model/enum/Mode";
import { TbCircleLetterT } from "react-icons/tb";

interface BusCardProps {
  publicCode: string;
  mode: string;
  startTime: string;
  minutesUntil: number;
  calculateMinutesUntil: (startTime: string) => number;
  configColor: ConfigColor;
}

const BusCard: React.FC<BusCardProps> = ({
  publicCode,
  mode,
  startTime,
  minutesUntil,
  calculateMinutesUntil,
  configColor,
}) => {
  const [minutes, setMinutes] = useState<number>(minutesUntil);

  const evalBadTimeCallback = useCallback(
    (time: number) => {
      let timeClass = "bad-time";

      if (time > configColor.yellow) timeClass = "medium-time";

      if (time > configColor.green) timeClass = "good-time";

      if (time > configColor.general) timeClass = "general-time";

      return timeClass;
    },
    [configColor],
  );

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(calculateMinutesUntil(startTime));
      evalBadTimeCallback(minutes);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [startTime, minutes, calculateMinutesUntil, evalBadTimeCallback]);

  function formatShowTime(minutes: number) {
    if (minutes < 10) {
      return minutes + " min";
    } else {
      return moment(startTime).format("HH:mm");
    }
  }

  function getModeIcon(mode: string) {
    switch (mode.toLocaleUpperCase()) {
      case Mode.bus:
        return <FaBusAlt size={20} />;
      case Mode.tram:
        return <FaTrain size={20} />;
      case Mode.metro:
        return <TbCircleLetterT size={20} />;
      default:
        return <FaBusAlt size={20} />;
    }
  }

  return (
    <div className="bus-card h-column">
      <div className="h-row font-small">
        <div>{getModeIcon(mode)}</div>
        {publicCode}
      </div>
      <div>{formatShowTime(minutes)}</div>
    </div>
  );
};

export default BusCard;
