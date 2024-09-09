import React, { useState, useEffect } from "react";
import "./header.css";
import moment from "moment";

function Header({ kanyeQoute }) {
  const [minutes, setMinutes] = useState(moment().format("HH:mm:ss"));

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(moment().format("HH:mm:ss"));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="header-style">
      <div className="row header-row">
        <div className="header-column col-8">
          <header className="header-text">
            <h1><strong>Øvre Sandviksveien 20</strong></h1>
            <p><strong>{kanyeQoute}</strong></p>
          </header>
        </div>
        <div className="header-column col header-text header-text-clock">
          <h1>{minutes}</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
