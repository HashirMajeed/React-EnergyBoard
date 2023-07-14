import { dailyMetadata } from "../interfaces/dailyMetadata";
import { DailyUsage } from "../interfaces/dailyUsage";

export function fourteenDayUsageToComboChart(chartData : DailyUsage[], allFuelTypes : string[]) {

    var fuels : string[] = [...allFuelTypes];
    fuels.unshift("Month");
    fuels.push("Average");
    fuels = fuels.filter(x => x != "INTVKL" && x != "OIL");
    var comboData : (string | number)[][] = [
        fuels
    ];


    for (let i = 0; i < chartData.length; i++) {
        var bars : (string | number)[] = [];
        bars.push(chartData[i].forecastDate);
        let sum = 0;
        for (let j = 0; j < chartData[i].data.length; j++) {
            bars.push(chartData[i].data[j].outputUsable);
            sum += chartData[i].data[j].outputUsable;
        }
        bars.push(sum / chartData[i].data.length);
        comboData.push(bars);
    }

    return comboData;
}