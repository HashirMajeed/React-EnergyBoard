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
        backgroundColor: "transparent"
    };

    return (
      <div className="fulltilebackground">
      <div className="fulltileforeground">
        <Chart
          chartType="ComboChart"
          data={data}
          options={options}
          width="87vw"
          height="450px"
        />
      </div>
      </div>
      );
}