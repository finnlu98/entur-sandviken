import React, { useState } from "react";
import moment from "moment";

import laundryData from "./laundry-week-data.json";
import "./laundry-week.css";
import logo from "./img/rodt_logo.png";

import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";


const washingEmojis = ["✨", "💧", "🛁", "🧴", "🧼", "🧽", "🚿", "🧹", "🧤", "🫧"];

function LaundryWeek() {
  
  const currentWeek = moment().isoWeekday(1).isoWeek();
  const currentEmoji = getEmoji();
  const [isHide, setHide] = useState(false);
  
  let data = { nodes: createLaundryList(37, 50, ["Karen", "Pernille", "Line"]) };

  data = {
    nodes: !isHide
      ? data.nodes.filter((week) => week.week === currentWeek)
      : data.nodes,
  };


  function createLaundryList(startWeek, endWeek, names) {
    const records = [];
    const totalNames = names.length;
    
    for (let week = startWeek; week <= endWeek; week++) {
      
      const nameIndex = (week - startWeek) % totalNames;
      records.push({
        week: week,
        name: names[nameIndex]
      });
    }

    return records;
  } 
  
  
  function getEmoji() {
    return washingEmojis[currentWeek % washingEmojis.length];
  }

   
  if (isHide) {
    return (
      <div className="laundry-week">
      <div className="laundry-week-header">
        <h5>Vasking uke {currentWeek}</h5>
      </div>
      <div className="week-table-header">
      </div>
      {data.nodes.map((week, weekIndex) => {
        return (
          <div className={`week-row expand ${week.week === currentWeek && isHide ? 'highlight' : ''}`} key={weekIndex}>
            <div>{week.week}</div>
            <div>{week.name}</div>
            
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



  return (
    <div className="laundry-week">
      <div className="laundry-week-header">
        <h5>Vasking uke {currentWeek}</h5>
      </div>
      <div className="week-table-header">
      </div>
      {data.nodes.map((week, weekIndex) => {
        return (
          <div className={`week-row ${week.week === currentWeek && isHide ? 'highlight' : ''}`} key={weekIndex}>
            <div>{week.name} {currentEmoji}</div>
            
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
