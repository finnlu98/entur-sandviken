import React from 'react';
import './daily-weather.css';
import DailyweatherRow from './daily-weather-row';
import moment from 'moment';
import { GiSunset, GiSunrise } from 'react-icons/gi';
import { WeatherType } from '../../model/Enum/WeatherType';
import LoadingHelperWidget from '../../../core/components/LoadingHelperWidget';
import type { WeatherData } from '../../model/data/WeatherData';
import { WidgetEnum } from '../../../core/model/widget-type';

interface DailyweatherProps {
  data?: WeatherData;
}

const Dailyweather: React.FC<DailyweatherProps> = ({ data: weatherData }) => {
  function umbrellaAdvice(precip: number | undefined, symbol_code: string | undefined): string {
    if (precip === undefined || symbol_code === undefined) return 'Have a beutiful day';

    if (!symbol_code.toUpperCase().includes(WeatherType.SNOW.toString())) {
      if (precip <= 1) return 'No umbrella needed today 🤷🏼‍♂️';
      if (precip < 2) return 'You could bring an umbrella 🌦️';
      if (precip < 5) return 'Better bring an umbrella ☂️';
      return 'Definitely bring an umbrella ☔';
    } else {
      if (precip < 0.5) return 'No snow to worry about today ☀️';
      if (precip < 2) return 'Light flurries tody 🌨️';
      if (precip < 5) return 'It is snowy, dress warm and watch your step ❄️';
      return 'Woaw! Heavy snow expected 🌨️';
    }
  }

  return (
    <LoadingHelperWidget
      widgetKey={WidgetEnum.weather}
      showConfig={() => !weatherData}
      loadingKeys={['fetch-weather', 'fetch-sunrise']}
    >
      <div className="weather-widget">
        <>
          <div className="weather-title">
            Going out?{' '}
            {umbrellaAdvice(
              weatherData?.weatherForecast.forecast_next_hours[0].precipitation_amount,
              weatherData?.weatherForecast.forecast_next_hours[0].symbol_code
            )}
          </div>
          <div className="weather-section">
            <div className="main-widget">
              <img
                src={`./img/weather/icons/${weatherData?.weatherForecast.symbol_code}.svg`}
                alt="Logo"
                className="main-icon"
              />
              <div className="main-temp">{weatherData?.weatherForecast.air_temperature}°</div>
              <div className="main-rain">
                {weatherData?.weatherForecast.precipitation_amount} mm
              </div>
            </div>
            <div className="secondary-widget">
              {weatherData &&
                weatherData?.weatherForecast.forecast_next_hours.map((forecast_next_hour) => {
                  return (
                    <DailyweatherRow
                      key={forecast_next_hour.intervall}
                      time={forecast_next_hour.intervall}
                      degree={forecast_next_hour.air_temperature}
                      rain={forecast_next_hour.precipitation_amount}
                      icon={forecast_next_hour.symbol_code}
                    />
                  );
                })}
            </div>
          </div>
          <div className="sunrise-section">
            <div className="sunset-column">
              <div>{moment(weatherData?.sunriseData.properties.sunrise.time).format('HH:mm')}</div>
              <GiSunrise fill="#e6c93aff" size="25px" />
            </div>
            <div className="sunset-column">
              <div>{moment(weatherData?.sunriseData.properties.sunset.time).format('HH:mm')}</div>
              <GiSunset className="react-icon-orange" size="25px" />
            </div>
          </div>
        </>
      </div>
    </LoadingHelperWidget>
  );
};

export default Dailyweather;
