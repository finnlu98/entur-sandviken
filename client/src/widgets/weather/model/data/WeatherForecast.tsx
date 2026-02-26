import { WeatherResponse, TimeSeries } from "../response/WeatherResponse";
import moment from "moment";

export class WeatherForecast {
    constructor(weatherData: WeatherResponse) {
        this.air_temperature = weatherData.properties.timeseries[0].data.instant.details.air_temperature;
        this.precipitation_amount = weatherData.properties.timeseries[0].data.next_1_hours.details.precipitation_amount;
        this.symbol_code = weatherData.properties.timeseries[0].data.next_1_hours.summary.symbol_code;
        this.forecast_next_hours = this.getIntervals(weatherData.properties.timeseries);
    }

    air_temperature: number
    precipitation_amount: number
    symbol_code: string
    forecast_next_hours: ForecastNextHours[]

    getIntervals(timeSeries: TimeSeries[]) : ForecastNextHours[] {
        const hour = moment().hour()
        let intervalls = [0, 6, 12, 18]
        const start = Math.floor(hour / 6) * 6;
        const end = (start + 6) % 24;
        intervalls = this.rotateFrom(intervalls, end)
        
        const forecasts = intervalls
            .map((intervall) => {
                const match = timeSeries.find(
                    (t) => moment(t.time).hour() === intervall
                );

                if (!match) return null;

                return new ForecastNextHours({
                    intervall: `${intervall.toString().padStart(2, "0")}–${((intervall + 6) % 24).toString().padStart(2, "0")}`,
                    air_temperature: Math.round(match.data.instant.details.air_temperature),
                    precipitation_amount: Math.round(match.data.next_6_hours.details.precipitation_amount),
                    symbol_code: match.data.next_6_hours.summary.symbol_code,
                });
            })
            .filter((x): x is ForecastNextHours => x !== null);

        return forecasts
    }

    rotateFrom(arr: number[], startValue: number): number[] {
        if(startValue === 0)
            return arr

        const index = arr.indexOf(startValue);
        if (index === -1) return arr; // value not found
             return arr.slice(index).concat(arr.slice(0, index)); 
}

}

class ForecastNextHours {
    intervall!: string; 
    air_temperature!: number;
    precipitation_amount!: number;
    symbol_code!: string;

    constructor(init?: Partial<ForecastNextHours>) {
        Object.assign(this, init);
    } 

}