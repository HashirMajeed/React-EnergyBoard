import React, { useState } from 'react';
import { currentFuelUsageToPieChartData } from '../mapper/currentFuelUsageMapper';

function makeRequest(request : string) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', request);
    xhr.send();
    xhr.onload = function() {
      if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
      }
    };
    return JSON.parse("");
}


export function getAllFuelTypes() {
    return makeRequest("https://data.dev.elexon.co.uk/bmrs/api/v1/reference/fueltypes/all");
}

export function getFuelDataByTypes() {
    return makeRequest("https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/FUELINSTHHCUR");
}