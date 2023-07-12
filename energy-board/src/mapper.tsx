import { CurrentFuelUsage } from "./JSON-Objects/CurrentFuelUsage";

export function currentFuelUsageToPieChartData(chartData : CurrentFuelUsage[]){
    var PieChartData : (string | number)[][] = chartData.map(item => [item.fuelType, item.currentUsage]);
    PieChartData.unshift(["Fuel Type", "Current Usage"]);
    return PieChartData
}