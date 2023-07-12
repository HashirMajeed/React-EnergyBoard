import { CurrentFuelUsage } from "../interfaces/CurrentFuelUsage";
import { getFuelDataByTypes } from "../repository/repository";

export function currentFuelUsageToPieChartData(){
    var chartData : CurrentFuelUsage[] = getFuelDataByTypes();
    var PieChartData : (string | number)[][] = chartData.map(item => [item.fuelType, item.currentUsage]);
    PieChartData.unshift(["Fuel Type", "Current Usage"]);
    return PieChartData;
}