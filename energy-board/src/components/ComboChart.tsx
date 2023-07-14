import { Chart } from "react-google-charts";

interface Props {
    title : string;
    data : (string | number)[][];
    vAxisName : string;
    hAxisName : string;
}

export const ComboChart : React.FC<Props> = ({title, vAxisName, hAxisName, data}) => 
{
    const options = {
        title: title,
        vAxis: {title: vAxisName},
        hAxis: {title: hAxisName},
        seriesType: "bars",
        series: {17: {type: "line"}},
    };

    return (
        <Chart
          chartType="ComboChart"
          data={data}
          options={options}
          width="100%"
          height="1000px"
        />
      );
}