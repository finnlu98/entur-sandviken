import React, { useState } from "react";
import moment from "moment";

import laundryData from "./laundry-week-data.json";
import "./laundry-week.css";
import logo from "./img/rodt_logo.png";

import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";



function LaundryWeek() {
  const currentWeek = moment().isoWeekday(1).isoWeek();
  const [isHide, setHide] = useState(false);
  
  let data = { nodes: laundryData };

  data = {
    nodes: !isHide
      ? data.nodes.filter((week) => week.week === currentWeek)
      : data.nodes,
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
          <div className={`week-row ${week.week === currentWeek && isHide ? 'highlight' : ''}`} key={weekIndex}>
            <div>{week.week}</div>
            <div>{week.stue}</div>
            <div>{week.bad}</div>
          </div>
        )
      })}
      
      <div className="expand-icon" onClick={() => setHide(!isHide)}>
        {!isHide ?  <SlArrowDown /> : <SlArrowUp />} 
      </div>

      <div className="rodt-slogan">
        <img src={logo} width={40} height={40}></img>
        <p>Fordi felleskap fungerer</p>
      </div>
    </div>
  );
}

export default LaundryWeek;
