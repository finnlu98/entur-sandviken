import type { ElviaService } from '../services/elvia-service';
import type { ComponentData } from './electricity-prices';
import type { TimeSerie } from './elvia-consumption-response';

export class ElectricityData {
  constructor(elviaService: ElviaService) {
    this.consumptionMonth = elviaService.getConsumptionMonth();
    this.consumptionHighestHour = elviaService.getHighestHour();
    this.estimatedPrice = elviaService.getEstimatedPriceMonth();
    this.capacityLevel = elviaService.getCapacityLevel();
    this.meanMaxLevel = elviaService.getMeanMaxLevel();
    this.chartFormattedData = elviaService.getChartFormattedData();
  }

  consumptionMonth!: number;
  estimatedPrice!: number;
  capacityLevel!: number | undefined;
  consumptionHighestHour!: TimeSerie | undefined;
  meanMaxLevel!: number;
  chartFormattedData: ComponentData;
}
