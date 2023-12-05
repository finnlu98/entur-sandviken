import React, { useState, useEffect }  from 'react';

import './daily-weather.css'

function Dailyweather() {

  const [widget, setWidget] = useState("https://www.yr.no/en/content/1-92416/card.html?mode=dark")

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setWidget("https://www.yr.no/en/content/1-92416/card.html?mode=dark");
    }, 1000*60);

    return () => clearInterval(countdownInterval);
  }, [widget]);


  return (
    <div className='weather-widget'>
      <iframe
        title="Weather Widget"
        src={widget}
        width="100%"
        height="420px"
      />
    </div>
  );
};

export default Dailyweather;
