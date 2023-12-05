import React from 'react';
import './daily-weather.css'

function Dailyweather() {
  return (
    <div className='weather-widget'>
      <iframe
        title="Weather Widget"
        src="https://www.yr.no/en/content/1-92416/card.html?mode=dark"
        width="100%"
        height="420px"
      />
    </div>
  );
};

export default Dailyweather;
