import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

interface Props {
    width : number;
    height : number;
    redFrom : number;
    redTo : number;
    yellowFrom : number;
    yellowTo : number;
    minorTicks : number;
    data : number | string;
}

export const Gauge : React.FC<Props> = ({data, width, height, redFrom, redTo, yellowFrom, yellowTo, minorTicks}) => 
{
    const options = {
        width: width,
        height: height,
        redFrom: redFrom,
        redTo: redTo,
        yellowFrom: yellowFrom,
        yellowTo: yellowTo,
        minorTicks: minorTicks,
    };
    

    return (
        <Chart
          chartType="Gauge"
          data={[["Label", "Value"], ["Carbon", typeof data === "number" ? data / 1000 : 100]]}
          options={options}
          width="1%"   
          height="1%"
        />
      );
}