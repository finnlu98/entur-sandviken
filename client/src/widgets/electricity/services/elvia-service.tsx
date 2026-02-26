import {
  ElectricityLevel,
  GetSortedElectricityLevel,
  ElectricityLevelFixedPrice,
} from '../model/enum/electricity-level';
import { ComponentData, Datasets } from '../model/electricity-prices';
import type {
  ElviaConsumptionResponse,
  MeteringPoint,
  TimeSerie,
} from '../model/elvia-consumption-response';
import moment, { type Moment } from 'moment';

// Needs to be rewritten so grouping is not called multiple times
export class ElviaService {
  elviaConsumption: MeteringPoint | null;

  constructor(elivaConsumptionResponse: ElviaConsumptionResponse) {
    this.elviaConsumption =
      elivaConsumptionResponse.meteringpoints.length === 1
        ? elivaConsumptionResponse.meteringpoints[0]
        : null;
  }

  getMonthlyConsumption() {
    return this.elviaConsumption?.metervalue.timeSeries;
  }

  getTodaysConsumption() {
    return this.getMonthlyConsumption()?.filter(
      (timeSerie) => moment(timeSerie.startTime) > moment().startOf('day')
    );
  }

  getConsumptionToday(): number {
    const c = this.getTodaysConsumption();
    if (c) return this.getSumConsumption(c);
    return -1;
  }

  getConsumptionMonth(): number {
    const c = this.getMonthlyConsumption();
    if (c) return Number(this.getSumConsumption(c).toFixed(0));
    return -1;
  }

  getSumConsumption(timeSerie: TimeSerie[]): number {
    const c = timeSerie.reduce((usage, c) => usage + c.value, 0);
    return Number((c ?? 0).toFixed(2));
  }

  getHighestHour(): TimeSerie | undefined {
    const c = this.getTodaysConsumption() ?? [];
    if (c.length === 0) return undefined;

    const h = c?.reduce((highestHour, curr) =>
      highestHour.value < curr.value ? curr : highestHour
    );
    if (h) h.value = Number((h.value ?? 0).toFixed(2));

    return h;
  }

  getThreeHighestHours(): number[] {
    const [, values] = this.getHighestConsumptionEachDay();
    const SLICE = 3;
    return values.sort((a, b) => b - a).slice(0, SLICE);
  }

  getMeanMaxLevel(): number {
    const threeHighest = this.getThreeHighestHours();
    return Number((threeHighest.reduce((cSum, c) => cSum + c) / threeHighest.length).toFixed(2));
  }

  getCapacityLevel(): ElectricityLevel | undefined {
    const threeHighest = this.getThreeHighestHours();
    const highestSum = threeHighest.reduce((cSum, c) => cSum + c);

    const capacityLevels = GetSortedElectricityLevel();
    const avg = highestSum / threeHighest.length;

    for (const level of capacityLevels) {
      if (avg <= level) return level as ElectricityLevel;
    }

    return undefined;
  }

  getHighestConsumptionEachDay(): [string[], number[]] {
    const monthlyData = this.getMonthlyConsumption();
    const days = Array.from({ length: moment().daysInMonth() }, () => 0);

    if (monthlyData) {
      const highestConsumption = monthlyData.reduce(
        (acc, t) => {
          const day = moment(t.startTime).date();

          if (!acc[day]) acc[day] = [];
          acc[day].push(t);

          return acc;
        },
        {} as Record<number, typeof monthlyData>
      );

      days.forEach((value, index) => {
        const consDay = highestConsumption[index + 1];
        const maxConsumption = consDay?.reduce((maxHour, curr) =>
          maxHour.value < curr.value ? curr : maxHour
        );
        if (maxConsumption) days[index] = Number((maxConsumption.value ?? 0).toFixed(2));
      });
    }

    const labels = days.map((value, index) => (index + 1).toString());

    return [labels, days];
  }

  getChartFormattedData(): ComponentData {
    const [labels, values] = this.getHighestConsumptionEachDay();
    const top3Indexes = values
      .map((v, i) => ({ v, i }))
      .sort((a, b) => b.v - a.v)
      .slice(0, 3)
      .map((x) => x.i);

    return new ComponentData(labels, [new Datasets(values, top3Indexes)]);
  }

  getEstimatedPriceMonth(): number {
    const c = this.getMonthlyConsumption();

    if (c) return Math.round(this.getEstimatedPrice(c));

    return -1;
  }

  getEstimatedPrice(timeSerie: TimeSerie[]): number {
    const fixedPrice = this.getFixedPrice();
    const sumPrices = timeSerie
      .map((entry) => {
        const energyPart = this.getEnergyPrice(entry.value, moment(entry.endTime));
        const norwayPrice = entry.value * 0.5;
        return energyPart + norwayPrice;
      })
      .reduce((totPrice, price) => totPrice + price);

    return fixedPrice + sumPrices;
  }

  getEnergyPrice(value: number, endTime: Moment): number {
    const prices = { priceDay: 0.4315, priceNight: 0.3315 };
    const time = { timeDayStart: 6, timeDayEnd: 22 };

    const endHour = endTime.hour();
    if (endHour > time.timeDayStart && endHour <= time.timeDayEnd) return value * prices.priceDay;
    else return value * prices.priceNight;
  }

  getFixedPrice() {
    const capLevel = this.getCapacityLevel();
    if (capLevel) {
      const key = ElectricityLevel[capLevel] as keyof typeof ElectricityLevelFixedPrice;
      return ElectricityLevelFixedPrice[key];
    }
    return -1;
  }
}
