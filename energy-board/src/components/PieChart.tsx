import { useState } from "react";
import { CurrentFuelUsage } from "../interfaces/CurrentFuelUsage";
import { Chart } from "react-google-charts";

interface Props {
    title : string;
    data : (string | number)[][];
}

export const PieChart : React.FC<Props> = ({title, data}) => 
{
    const options = {
        title: title,
        backgroundColor: 'transparent'
    };

    return (
        <div className="tilebackground">
        <div className="tileforeground">
        <div className="heading">Generation of Energy</div>    
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width="100%"
          height="100%"
        />
        </div>
        </div>
      );
}