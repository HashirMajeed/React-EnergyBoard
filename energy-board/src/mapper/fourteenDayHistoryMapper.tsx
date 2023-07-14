import { kMaxLength } from "buffer";
import { forecastData } from "../interfaces/forecastData";
import { FourteenDayHistory } from "../interfaces/FourteenDayHistory";

export function fourteenDayHistoryToLineChart(lineData : FourteenDayHistory) {
    if (lineData.data.length === 0){
        console.log("empty");
        return [];
    }

    var chartData : forecastData[] = lineData.data;


    var fuels : (string | number)[] = ["Forecast Date"];
    var returnArray : (string | number)[][] = [];

    for (var i = 0; i < chartData.length; i++){
        if (!fuels.includes(chartData[i].fuelType)){
            fuels.push(chartData[i].fuelType)
        }
    }

    var currentDateArray : (string | number)[] = new Array<string | number>(fuels.length);
    currentDateArray[0] = chartData[0].forecastDate;
    for (var j = 0; j < chartData.length; j++){
        if (chartData[j].forecastDate !== currentDateArray[0]){
            returnArray.push(currentDateArray);
            currentDateArray = [chartData[j].forecastDate];
            continue;
        }
        var index : number = fuels.indexOf(chartData[j].fuelType);
        if (index != -1){
            currentDateArray[index] = chartData[j].outputUsable;
        }
        else{
            currentDateArray[index] = 0;
        }

    }

    returnArray.unshift(fuels);
    return returnArray;
}