import type { ElviaService } from "../services/ElviaService";
import type { ComponentData } from "./ElectricityPrices";
import type { TimeSerie } from "./ElviaConsumptionResponse";

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
