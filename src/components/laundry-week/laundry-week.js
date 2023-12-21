import React, { useState, useEffect } from "react";
import moment from "moment";

import laundryData from "./laundry-week-data.json";
import "./laundry-week.css";
import logo from "./img/rodt_logo.png";

import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";

import LaundryRow from "./laundry-row";

function LaundryWeek() {
  const currentWeek = moment().isoWeekday(1).isoWeek();
  const [isHide, setHide] = useState(false);
  const [data, setData] = useState({ nodes: laundryData });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setData(() => ({
      nodes: !isHide
        ? laundryData.filter((week) => week.week === currentWeek)
        : laundryData,
    }));
  }, [isHide, currentWeek]);

  const filterLaundryData = () => {
    return !isHide
      ? laundryData.filter((week) => week.week === currentWeek)
      : laundryData;
  };

  const handleWeekChange = (fromObject, toObject) => {
    const cleanedData = filterLaundryData();

    setData((prevValue) => {
      const updatedNodes = cleanedData.map((week) => {
        if (week.week === fromObject.week) {
          return fromObject;
        }

        if (week.week === toObject.week) {
          return toObject;
        }

        return week;
      });

      return {
        ...prevValue,
        nodes: updatedNodes,
      };
    });
  };

  return (
    <div className="laundry-week">
      <div className="laundry-week-header">
        <h5>Vasking uke {currentWeek}</h5>
      </div>
      <div className="week-table-header">
        <div>Uke</div>
        <div>Stue osv.</div>
        <div>Bad osv.</div>
      </div>
      {data.nodes.map((week, weekIndex) => {
        return (
          <LaundryRow
            key={weekIndex}
            week={week}
            isHide={isHide}
            handleWeekChange={handleWeekChange}
            editMode={editMode}
          />
        );
      })}

      <div className="expand-icon" onClick={() => setHide(!isHide)}>
        {!isHide ? <SlArrowDown /> : <SlArrowUp />}
      </div>

      <div className="week-table-footer">
        <div className="rodt-slogan">
          <img src={logo} width={40} height={40}></img>
          <p>Fordi felleskap fungerer</p>
        </div>
        <div>
          <button onClick={() => setEditMode(!editMode)}>
            {!editMode ? <CiEdit /> : <FaCheck />} 
          </button>
        </div>
      </div>
    </div>
  );
}

export default LaundryWeek;
