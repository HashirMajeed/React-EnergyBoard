import React, { useState } from 'react';
import { currentFuelUsageToPieChartData } from '../mapper/currentFuelUsageMapper';
import { CurrentFuelUsage } from '../interfaces/CurrentFuelUsage';

function makeRequest(request : string) {
   var x : CurrentFuelUsage[] = [];
  //   const [data, setData] = useState(x);

    // setData(JSON.parse(""));

    const xhr = new XMLHttpRequest();
    xhr.open('GET', request);
    //xhr.send();
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("jdshfkjasdhf");
        x = JSON.parse(xhr.responseText);
        //console.log(x);
        return x;
        // setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
    // console.log((JSON.parse(xhr.responseText)));
    //console.log("2hakjefgadsfgdhasgfkasjfhjk");
    console.log(x);
    return x;
    return JSON.parse("");
    // return data;
}


export function getAllFuelTypes() {
    return makeRequest("https://data.dev.elexon.co.uk/bmrs/api/v1/reference/fueltypes/all");
}

export function getFuelDataByTypes() {
    var x = makeRequest("https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/FUELINSTHHCUR");
    console.log(x);
    return x;
}