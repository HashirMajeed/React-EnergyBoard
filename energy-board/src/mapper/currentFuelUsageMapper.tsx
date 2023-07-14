import { CurrentFuelUsage } from "../interfaces/CurrentFuelUsage";
import { getFuelDataByTypes } from "../repository/repository";

export function currentFuelUsageToPieChartData(){
    var chartData : CurrentFuelUsage[] = getFuelDataByTypes();
    var PieChartData : (string | number)[][] = chartData.map(item => [item.fuelType, item.currentUsage]);
    PieChartData.unshift(["Fuel Type", "Current Usage"]);
    return PieChartData;
}

export function currentFuelUsageToCategorisedPieChartData(){
    var chartData : CurrentFuelUsage[] = getFuelDataByTypes();

    var carbonFuelTypes : string[] = ["CCGT","COAL","OCGT","OIL"];
    var renewableFuelTypes : string[] = ["BIOMASS", "NPSHYD","WIND","PS"];
    var interconnectorFuelTypes : string[] = ["INTELEC", "INTEW", "INTFR", "INTIFA2", "INTIRL", "INTNED", "INTNEM", "INTNSL","INTVKL"];
    var otherFuelTypes : string[] = ["NUCLEAR","OTHER"];

    var carbonQuantity : number = 0;
    var renewableQuantity : number = 0;
    var interconnectorQuantity : number = 0;
    var otherQuantity : number = 0;

    var PieChartData : (string | number)[][] =[
        ["Fuel Category", "Current Usage"],
        ["Carbon", carbonQuantity],
        ["Renewable", renewableQuantity],
        ["Interconnector", interconnectorQuantity],
        ["Other", otherQuantity]
    ];

    for (var i = 0; i < chartData.length ; i++){
        if (carbonFuelTypes.includes(chartData[i].fuelType)){
            carbonQuantity += chartData[i].currentUsage;
        }
        if (renewableFuelTypes.includes(chartData[i].fuelType)){
            renewableQuantity += chartData[i].currentUsage;
        }
        if (interconnectorFuelTypes.includes(chartData[i].fuelType)){
            interconnectorQuantity += chartData[i].currentUsage;
        }
        else{
            otherQuantity += chartData[i].currentUsage;
        }
    }

    return PieChartData;
}

export function currentFuelUsageToCategorisedPieChartDataRaw(chartData : CurrentFuelUsage[] ){

    // console.log(chartData);

    var carbonFuelTypes : string[] = ["CCGT","COAL","OCGT","OIL"];
    var renewableFuelTypes : string[] = ["BIOMASS", "NPSHYD","WIND","PS"];
    var interconnectorFuelTypes : string[] = ["INTELEC", "INTEW", "INTFR", "INTIFA2", "INTIRL", "INTNED", "INTNEM", "INTNSL","INTVKL"];

    var carbonQuantity : number = 0;
    var renewableQuantity : number = 0;
    var interconnectorQuantity : number = 0;
    var otherQuantity : number = 0;

    for (var i = 0; i < chartData.length ; i++){
        if (carbonFuelTypes.includes(chartData[i].fuelType)){
            // console.log("HI");
            carbonQuantity += chartData[i].currentUsage;
        }
        if (renewableFuelTypes.includes(chartData[i].fuelType)){
            renewableQuantity += chartData[i].currentUsage;
        }
        if (interconnectorFuelTypes.includes(chartData[i].fuelType)){
            interconnectorQuantity += chartData[i].currentUsage;
        }
        else{
            otherQuantity += chartData[i].currentUsage;
        }
    }

    var PieChartData : (string | number)[][] =[
        ["Fuel Category", "Current Usage"],
        ["Carbon", carbonQuantity],
        ["Renewable", renewableQuantity],
        ["Interconnector", interconnectorQuantity],
        ["Other", otherQuantity]
    ];
    
    return PieChartData;
}